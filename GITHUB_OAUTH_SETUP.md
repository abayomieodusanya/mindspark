# GitHub OAuth Configuration Guide

## Overview
MindSpark now uses **GitHub OAuth for authentication** and **GitHub repositories for data storage**. This guide will help you set up everything needed.

## Prerequisites
- Node.js and npm installed
- A GitHub account
- A GitHub repository for storing user data

## Step 1: Create a GitHub OAuth Application

### 1.1 Create OAuth App on GitHub
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in the form:
   - **Application name**: MindSpark
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
4. Click **"Create OAuth Application"**
5. You'll get:
   - **Client ID**
   - **Client Secret** (keep this secret!)

### 1.2 Create a Personal Access Token
1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** (classic)
3. Give it a name: `mindspark-data-access`
4. Select these scopes:
   - `repo` (full control of private repositories)
   - `user:email` (read user email)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

## Step 2: Create Data Storage Repository

Create a new private GitHub repository named `mindspark-data` where user data will be stored.

**Repository structure:**
```
mindspark-data/
├── users/
│   └── (user profiles stored here)
└── assessments/
    └── (assessment results stored here)
```

## Step 3: Configure the Backend

### 3.1 Install Dependencies
```bash
cd /path/to/mindspark
npm install
```

### 3.2 Create `.env` File
Copy `.env.example` to `.env` and fill in your values:

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_TOKEN=your_github_personal_access_token_here

# GitHub Repository for Data Storage
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=mindspark-data

# Application Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
SESSION_SECRET=your_random_session_secret_here
```

**Get your values:**
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: From OAuth App (Step 1.1)
- `GITHUB_TOKEN`: From Personal Access Token (Step 1.2)
- `GITHUB_REPO_OWNER`: Your GitHub username
- `GITHUB_REPO_NAME`: `mindspark-data`
- `SESSION_SECRET`: Generate a random string (e.g., use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

## Step 4: Start the Backend Server

```bash
npm start
```

You should see:
```
MindSpark backend running on http://localhost:5000
GitHub OAuth configured
```

## Step 5: Update Frontend Configuration

The frontend is already configured to use the backend. Make sure `window.BACKEND_URL` matches your server:

In `index.html`, `login.html`, and `signup.html`:
```javascript
window.BACKEND_URL = 'http://localhost:5000';
```

## Step 6: Test the Authentication Flow

1. **Open the app**: http://localhost:3000
2. **Click "Sign In with GitHub"**
3. You'll be redirected to GitHub to authorize
4. After authorization, you'll be logged in and redirected to dashboard
5. Your user profile will be automatically created in `mindspark-data` repository

## API Endpoints

The backend provides these endpoints:

### Authentication
- `GET /api/auth/github` - Get GitHub OAuth URL
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `POST /api/auth/logout` - Logout user

### User Profile
- `GET /api/user/profile?username=<username>` - Get user profile
- `PUT /api/user/profile?username=<username>` - Update user profile

### Assessment Results
- `POST /api/assessments/results?username=<username>` - Save results
- `GET /api/assessments/results?username=<username>` - Get results

## Troubleshooting

### "Authorization callback mismatch" error
- Make sure your callback URL in GitHub OAuth App matches `GITHUB_CALLBACK_URL` in `.env`
- Format: `http://<host>:<port>/api/auth/github/callback`

### "File not saved" errors
- Check that `GITHUB_TOKEN` has `repo` scope
- Verify repository name and owner are correct
- Ensure the repository exists and token owner has access

### "Not authenticated" errors
- Check that token is being stored in localStorage
- Clear browser storage and try logging in again
- Check browser console for errors

### CORS errors
- Make sure `FRONTEND_URL` in `.env` matches where your frontend is running
- Default is `http://localhost:3000`

## Security Notes

⚠️ **Never commit `.env` to Git!**
- Add `.env` to `.gitignore`
- Keep `GITHUB_CLIENT_SECRET` and `GITHUB_TOKEN` private
- Use environment variables in production
- Rotate Personal Access Tokens regularly

## Production Deployment

For production, update:
1. `GITHUB_CALLBACK_URL` to your production domain
2. GitHub OAuth App callback URL to match
3. `FRONTEND_URL` to your production domain
4. Use secure session secrets
5. Set `NODE_ENV=production`
6. Store secrets in your hosting platform's environment variables

## Next Steps

1. Update all pages to use `GitHubAuthManager` instead of `AuthManager`
2. Add logout functionality to navbar
3. Add user profile page
4. Implement profile picture from GitHub
5. Add mentor matching that uses GitHub data

## Support

For issues:
1. Check browser console (F12) for errors
2. Check server logs (terminal where you ran `npm start`)
3. Verify all configuration values in `.env`
4. Ensure GitHub repository structure is correct
