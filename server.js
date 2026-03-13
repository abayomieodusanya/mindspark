// MindSpark Backend Server with GitHub OAuth
// ==========================================

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// GitHub API helpers
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Get file from GitHub repo
async function getFileFromGithub(fileName) {
  try {
    const response = await githubApi.get(
      `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${fileName}`
    );
    return JSON.parse(Buffer.from(response.data.content, 'base64').toString());
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

// Save file to GitHub repo
async function saveFileToGithub(fileName, content) {
  try {
    const fileContent = JSON.stringify(content, null, 2);
    const encodedContent = Buffer.from(fileContent).toString('base64');
    
    // Get current file to obtain sha
    let sha = null;
    try {
      const existingFile = await githubApi.get(
        `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${fileName}`
      );
      sha = existingFile.data.sha;
    } catch (err) {
      // File doesn't exist, that's okay
    }

    const updateData = {
      message: `Update ${fileName}`,
      content: encodedContent,
      branch: 'main'
    };

    if (sha) {
      updateData.sha = sha;
    }

    await githubApi.put(
      `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${fileName}`,
      updateData
    );
  } catch (error) {
    console.error('Error saving to GitHub:', error.message);
    throw error;
  }
}

// ==================== AUTHENTICATION ROUTES ====================

// Initiate GitHub OAuth login
app.get('/api/auth/github', (req, res) => {
  const redirectUri = encodeURIComponent(process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback');
  const scope = 'user:email';
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
  res.json({ url: githubAuthUrl });
});

// GitHub OAuth callback
app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code
      },
      {
        headers: { 'Accept': 'application/json' }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { 'Authorization': `token ${accessToken}` }
    });

    const githubUser = userResponse.data;

    // Get user email
    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { 'Authorization': `token ${accessToken}` }
    });

    const userEmail = emailResponse.data.find(e => e.primary)?.email || githubUser.email;

    // Store session
    req.session.user = {
      id: githubUser.id,
      username: githubUser.login,
      email: userEmail,
      name: githubUser.name || githubUser.login,
      avatar: githubUser.avatar_url,
      accessToken: accessToken
    };

    // Load or create user profile
    const userProfileFile = `users/${githubUser.login}.json`;
    let userProfile = await getFileFromGithub(userProfileFile);

    if (!userProfile) {
      userProfile = {
        uid: githubUser.id,
        username: githubUser.login,
        email: userEmail,
        fullName: githubUser.name || githubUser.login,
        avatar: githubUser.avatar_url,
        age: null,
        grade: '',
        interests: [],
        assessmentResults: [],
        createdAt: new Date().toISOString()
      };

      await saveFileToGithub(userProfileFile, userProfile);
    }

    // Redirect to frontend with token in URL or set cookie
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?token=${accessToken}&user=${githubUser.login}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

// ==================== USER PROFILE ROUTES ====================

// Get current user
app.get('/api/user/profile', async (req, res) => {
  const username = req.query.username || (req.session.user?.username);

  if (!username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userProfileFile = `users/${username}.json`;
    const userProfile = await getFileFromGithub(userProfileFile);

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
app.put('/api/user/profile', async (req, res) => {
  const username = req.query.username || (req.session.user?.username);
  const updates = req.body;

  if (!username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userProfileFile = `users/${username}.json`;
    let userProfile = await getFileFromGithub(userProfileFile);

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Merge updates
    userProfile = { ...userProfile, ...updates, updatedAt: new Date().toISOString() };

    // Save to GitHub
    await saveFileToGithub(userProfileFile, userProfile);

    res.json(userProfile);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ==================== ASSESSMENT RESULTS ROUTES ====================

// Save assessment results
app.post('/api/assessments/results', async (req, res) => {
  const username = req.query.username || (req.session.user?.username);
  const results = req.body;

  if (!username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const resultsFile = `assessments/${username}-results.json`;
    let allResults = await getFileFromGithub(resultsFile) || [];

    // Add new result
    allResults.push({
      ...results,
      timestamp: new Date().toISOString()
    });

    await saveFileToGithub(resultsFile, allResults);

    res.json({ message: 'Results saved', results: allResults });
  } catch (error) {
    console.error('Error saving results:', error.message);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

// Get assessment results
app.get('/api/assessments/results', async (req, res) => {
  const username = req.query.username || (req.session.user?.username);

  if (!username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const resultsFile = `assessments/${username}-results.json`;
    const results = await getFileFromGithub(resultsFile);

    res.json(results || []);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MindSpark backend running on http://localhost:${PORT}`);
  console.log('GitHub OAuth configured');
});
