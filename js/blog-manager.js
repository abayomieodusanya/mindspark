// MindSpark Blog Data & Management System
// ====================================
// Blog article database and content management

class BlogManager {
  // Sample blog articles - add more as needed
  static SAMPLE_ARTICLES = [
    {
      id: 'mental-health-101',
      title: 'Understanding Mental Health as a Teenager',
      excerpt: 'Learn about common mental health challenges teens face and practical strategies to manage stress and anxiety.',
      content: `
        <h2>Understanding Mental Health as a Teenager</h2>
        <p>Being a teenager comes with unique challenges. Your brain is still developing, emotions can feel intense, and you're navigating social pressures, academic expectations, and planning for your future.</p>
        
        <h3>Common Mental Health Challenges</h3>
        <ul>
          <li><strong>Anxiety & Stress</strong> - From academics, social situations, or future uncertainty</li>
          <li><strong>Depression</strong> - Persistent sadness or loss of interest in activities</li>
          <li><strong>Low Self-Esteem</strong> - Doubting your abilities or worth</li>
          <li><strong>Social Pressure</strong> - Fitting in and peer expectations</li>
          <li><strong>Identity Questions</strong> - Figuring out who you are</li>
        </ul>
        
        <h3>Practical Strategies to Cope</h3>
        <ol>
          <li><strong>Talk About It</strong> - Share feelings with trusted friends, family, or counselors</li>
          <li><strong>Stay Active</strong> - Exercise releases mood-boosting chemicals</li>
          <li><strong>Sleep Well</strong> - Aim for 8-10 hours per night</li>
          <li><strong>Limit Social Media</strong> - Compare less, live more</li>
          <li><strong>Practice Mindfulness</strong> - Meditation and breathing exercises help</li>
          <li><strong>Set Goals</strong> - Break big worries into manageable actions</li>
        </ol>
        
        <h3>When to Seek Help</h3>
        <p>If you're experiencing persistent sadness, anxiety that interferes with daily life, or thoughts of self-harm, reach out to:</p>
        <ul>
          <li>Your school counselor or therapist</li>
          <li>A trusted adult (parent, teacher, mentor)</li>
          <li>Crisis helplines (available 24/7)</li>
        </ul>
        
        <p>Remember: Seeking help is a sign of strength, not weakness. You're not alone.</p>
      `,
      author: 'Dr. Sarah Johnson',
      category: 'Mental Health',
      tags: ['mental health', 'stress management', 'teens', 'anxiety'],
      coverImage: 'https://via.placeholder.com/800x400?text=Mental+Health',
      readTime: '5 min read',
      createdAt: new Date('2026-03-01'),
      views: 245,
      likes: 42
    },
    {
      id: 'career-discovery-guide',
      title: 'A Teenager\'s Guide to Career Discovery',
      excerpt: 'Discover how to explore different career paths, understand your strengths, and make informed decisions about your future.',
      content: `
        <h2>A Teenager's Guide to Career Discovery</h2>
        <p>You don't need to have your entire life figured out now, but exploring career options early can help you make better choices.</p>
        
        <h3>Why Career Exploration Matters</h3>
        <p>Understanding different careers helps you:</p>
        <ul>
          <li>Choose relevant subjects and courses</li>
          <li>Develop valuable skills early</li>
          <li>Make informed decisions about education and internships</li>
          <li>Feel more confident about your future</li>
        </ul>
        
        <h3>How to Explore Careers</h3>
        <ol>
          <li><strong>Take Assessments</strong> - Try personality and skills tests to understand yourself</li>
          <li><strong>Research Online</strong> - Use Bureau of Labor Statistics or CareerOneStop</li>
          <li><strong>Informational Interviews</strong> - Talk to professionals in fields you're interested in</li>
          <li><strong>Job Shadowing</strong> - Spend a day seeing what someone in that role does</li>
          <li><strong>Internships</strong> - Get real experience in your field of interest</li>
          <li><strong>Try Side Projects</strong> - Build skills through personal projects</li>
        </ol>
        
        <h3>Key Factors to Consider</h3>
        <ul>
          <li><strong>Your Interests</strong> - What subjects excite you?</li>
          <li><strong>Your Strengths</strong> - What do people compliment you on?</li>
          <li><strong>Work Environment</strong> - Do you prefer working alone, in teams, or with clients?</li>
          <li><strong>Salary & Growth</strong> - What are the income prospects and advancement opportunities?</li>
          <li><strong>Work-Life Balance</strong> - How much time do you want to dedicate to work?</li>
          <li><strong>Job Outlook</strong> - Is the field growing or declining?</li>
        </ul>
        
        <h3>Remember</h3>
        <p>Your first career choice doesn't have to be your final one. Many successful people have changed careers multiple times. What matters is continuous learning and adaptation.</p>
      `,
      author: 'Career Coach Mike Chen',
      category: 'Career Guidance',
      tags: ['career', 'exploration', 'planning', 'future'],
      coverImage: 'https://via.placeholder.com/800x400?text=Career+Discovery',
      readTime: '6 min read',
      createdAt: new Date('2026-02-28'),
      views: 381,
      likes: 67
    },
    {
      id: 'study-tips-success',
      title: 'Proven Study Techniques That Actually Work',
      excerpt: 'Master effective study methods used by top students. Learn how to study smarter, not harder.',
      content: `
        <h2>Proven Study Techniques That Actually Work</h2>
        <p>Studying smart beats studying hard. These techniques are backed by cognitive science and used by top students worldwide.</p>
        
        <h3>1. The Pomodoro Technique</h3>
        <p>Study for 25 minutes, then take a 5-minute break. After four sessions, take a 15-30 minute break.</p>
        <ul>
          <li>Maintains focus and prevents burnout</li>
          <li>Works especially well for difficult subjects</li>
          <li>Tracks how much time you actually spend studying</li>
        </ul>
        
        <h3>2. Active Recall & Spaced Repetition</h3>
        <p>Instead of re-reading, test yourself on the material at increasing intervals.</p>
        <ul>
          <li>Review after 1 day, 3 days, 1 week, 2 weeks, 1 month</li>
          <li>Use flashcards apps (Anki, Quizlet)</li>
          <li>Practice problems instead of reading examples</li>
        </ul>
        
        <h3>3. The Feynman Technique</h3>
        <p>Explain a concept out loud as if teaching it to someone else.</p>
        <ul>
          <li>Find gaps in your understanding</li>
          <li>Solidify knowledge in your memory</li>
          <li>Works for any subject</li>
        </ul>
        
        <h3>4. Mind Mapping</h3>
        <p>Create visual diagrams connecting related concepts.</p>
        <ul>
          <li>Better than linear notes for understanding relationships</li>
          <li>Engages multiple parts of your brain</li>
          <li>Great for exam preparation</li>
        </ul>
        
        <h3>5. Study in Different Locations</h3>
        <p>Change where you study periodically.</p>
        <ul>
          <li>Prevents context-dependent memory</li>
          <li>Keeps studying from becoming boring</li>
          <li>Helps knowledge transfer to tests</li>
        </ul>
        
        <h3>Pro Tips</h3>
        <ul>
          <li>Start studying 3+ days before the test</li>
          <li>Get 8 hours of sleep before exams</li>
          <li>Organize study sessions by difficulty (hard material when you're fresh)</li>
          <li>Find your peak productivity hours</li>
          <li>Study with purpose, not just time spent</li>
        </ul>
      `,
      author: 'Education Expert Lisa Wong',
      category: 'Study Tips',
      tags: ['studying', 'learning', 'productivity', 'success'],
      coverImage: 'https://via.placeholder.com/800x400?text=Study+Tips',
      readTime: '7 min read',
      createdAt: new Date('2026-02-25'),
      views: 523,
      likes: 89
    },
    {
      id: 'overcoming-imposter-syndrome',
      title: 'Overcoming Imposter Syndrome as a Teenager',
      excerpt: 'Feel like you\'re not good enough? Discover that imposter syndrome is common and learn how to overcome it.',
      content: `
        <h2>Overcoming Imposter Syndrome as a Teenager</h2>
        <p>Do you feel like you're not smart enough, talented enough, or deserving of your achievements? You might be experiencing imposter syndrome. Here's the truth: you're not alone, and it's completely normal.</p>
        
        <h3>What is Imposter Syndrome?</h3>
        <p>Imposter syndrome is the persistent belief that your success is due to luck or external factors, not your own abilities. People with imposter syndrome often:</p>
        <ul>
          <li>Doubt their skills despite evidence of competence</li>
          <li>Attribute success to luck or help from others</li>
          <li>Fear being exposed as a "fraud"</li>
          <li>Set unrealistically high standards</li>
          <li>Struggle to accept compliments</li>
        </ul>
        
        <h3>Why Teenagers Experience It</h3>
        <ul>
          <li><strong>New Environments</strong> - New school, new friends, higher academic standards</li>
          <li><strong>Comparison Culture</strong> - Social media shows everyone's highlight reel</li>
          <li><strong>Identity Formation</strong> - Still figuring out who you are</li>
          <li><strong>Growth Periods</strong> - Learning something new feels like failure</li>
          <li><strong>Perfectionism</strong> - You hold yourself to unrealistic standards</li>
        </ul>
        
        <h3>How to Overcome It</h3>
        
        <h4>1. Recognize the Pattern</h4>
        <p>Awareness is the first step. When you catch yourself thinking "I don't deserve this," pause and question it.</p>
        
        <h4>2. Document Your Achievements</h4>
        <p>Keep an "achievement log" with:</p>
        <ul>
          <li>Grades and test scores</li>
          <li>Positive feedback from teachers/friends</li>
          <li>Skills you've learned</li>
          <li>Challenges you've overcome</li>
        </ul>
        <p>Review this when self-doubt creeps in.</p>
        
        <h4>3. Reframe Your Mindset</h4>
        <p>Replace negative thoughts with realistic ones:</p>
        <ul>
          <li>"I got lucky" → "I prepared well and it paid off"</li>
          <li>"I'm not good enough" → "I'm still learning and growing"</li>
          <li>"Everyone else is better" → "Everyone is struggling with something"</li>
        </ul>
        
        <h4>4. Embrace the Learning Mindset</h4>
        <p>View challenges as opportunities to grow, not threats to your image. Mistakes are proof you're learning, not proof you're inadequate.</p>
        
        <h4>5. Talk About It</h4>
        <p>Share your feelings with trusted friends, family, or a mentor. You'll likely find others feel the same way.</p>
        
        <h4>6. Celebrate Small Wins</h3>
        <p>Don't wait for the big achievements. Celebrate every step forward.</p>
        
        <h3>The Reality Check</h3>
        <p>If you earned it, you deserve it. Your success might involve luck, but so does everyone's. The difference is that you also brought effort, intelligence, and resilience to the table.</p>
      `,
      author: 'Psychologist Dr. James Martinez',
      category: 'Mental Health',
      tags: ['imposter syndrome', 'confidence', 'mindset', 'mental health'],
      coverImage: 'https://via.placeholder.com/800x400?text=Imposter+Syndrome',
      readTime: '8 min read',
      createdAt: new Date('2026-02-20'),
      views: 412,
      likes: 76
    },
    {
      id: 'skills-teens-need',
      title: '10 Essential Skills Every Teenager Should Develop',
      excerpt: 'Beyond academics, these 10 skills will set you apart in college and career. Start developing them now.',
      content: `
        <h2>10 Essential Skills Every Teenager Should Develop</h2>
        <p>Success in college and career isn't just about grades. Here are the 10 skills that employers and universities actually care about:</p>
        
        <h3>1. Critical Thinking</h3>
        <p>Analyze information, question assumptions, and make informed decisions.</p>
        <p><strong>How to develop:</strong> Ask "why?" and "what if?", debate topics, solve complex problems.</p>
        
        <h3>2. Communication</h3>
        <p>Express your ideas clearly, listen actively, and adapt your communication to your audience.</p>
        <p><strong>How to develop:</strong> Join debate club, write essays, practice public speaking, have meaningful conversations.</p>
        
        <h3>3. Problem-Solving</h3>
        <p>Break down complex challenges and find creative solutions.</p>
        <p><strong>How to develop:</strong> Participate in competitions, work on projects, help others solve problems.</p>
        
        <h3>4. Teamwork & Collaboration</h3>
        <p>Work effectively with others toward common goals.</p>
        <p><strong>How to develop:</strong> Join clubs, sports teams, group projects, volunteer work.</p>
        
        <h3>5. Leadership</h3>
        <p>Inspire and guide others, even if you're not "in charge."</p>
        <p><strong>How to develop:</strong> Lead a project, mentor younger students, take initiative in groups.</p>
        
        <h3>6. Emotional Intelligence</h3>
        <p>Understand and manage your emotions, and empathize with others.</p>
        <p><strong>How to develop:</strong> Reflect on feelings, practice empathy, seek feedback, manage conflict respectfully.</p>
        
        <h3>7. Adaptability</h3>
        <p>Adjust to new situations and learn from changes.</p>
        <p><strong>How to develop:</strong> Try new activities, embrace challenges, learn from failures.</p>
        
        <h3>8. Time Management</h3>
        <p>Balance multiple responsibilities and priorities effectively.</p>
        <p><strong>How to develop:</strong> Use planners, set goals, break projects into steps, track your time.</p>
        
        <h3>9. Creativity & Innovation</h3>
        <p>Generate original ideas and approach problems uniquely.</p>
        <p><strong>How to develop:</strong> Create art, music, writing, code; brainstorm solutions; experiment.</p>
        
        <h3>10. Digital Literacy</h3>
        <p>Navigate technology responsibly and learn new tools quickly.</p>
        <p><strong>How to develop:</strong> Learn coding, master relevant software, understand cybersecurity, use social media wisely.</p>
        
        <h3>Start Now</h3>
        <p>You don't need to master all 10 immediately. Choose 2-3 to focus on this year, then add more. Remember, these skills compound over time. The earlier you develop them, the bigger your advantage.</p>
      `,
      author: 'Career Development Director Tom Anderson',
      category: 'Career Guidance',
      tags: ['skills', 'development', 'education', 'future'],
      coverImage: 'https://via.placeholder.com/800x400?text=Essential+Skills',
      readTime: '9 min read',
      createdAt: new Date('2026-02-15'),
      views: 634,
      likes: 112
    }
  ];

  // Save article to Firebase
  static async createArticle(articleData) {
    try {
      const docRef = await db.collection('blog').add({
        ...articleData,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now(),
        views: 0,
        likes: 0
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  // Get all articles with pagination
  static async getArticles(category = null, limit = 10, startAfter = null) {
    try {
      let query = db.collection('blog');

      if (category) {
        query = query.where('category', '==', category);
      }

      query = query.orderBy('createdAt', 'desc').limit(limit);

      if (startAfter) {
        query = query.startAfter(startAfter);
      }

      const snapshot = await query.get();
      const articles = [];

      snapshot.forEach(doc => {
        articles.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  // Get single article by ID
  static async getArticle(articleId) {
    try {
      const doc = await db.collection('blog').doc(articleId).get();
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  }

  // Increment article views
  static async incrementViews(articleId) {
    try {
      await db.collection('blog').doc(articleId).update({
        views: firebase.firestore.FieldValue.increment(1)
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  // Like an article
  static async likeArticle(articleId) {
    try {
      await db.collection('blog').doc(articleId).update({
        likes: firebase.firestore.FieldValue.increment(1)
      });
    } catch (error) {
      console.error('Error liking article:', error);
      throw error;
    }
  }

  // Search articles by title or tags
  static async searchArticles(searchTerm) {
    try {
      const snapshot = await db.collection('blog').get();
      const results = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const searchLower = searchTerm.toLowerCase();

        if (
          data.title.toLowerCase().includes(searchLower) ||
          data.excerpt.toLowerCase().includes(searchLower) ||
          (data.tags && data.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        ) {
          results.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date()
          });
        }
      });

      return results;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category) {
    try {
      const snapshot = await db.collection('blog')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc')
        .get();

      const articles = [];
      snapshot.forEach(doc => {
        articles.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return articles;
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      throw error;
    }
  }

  // Add sample articles to Firebase (call once during setup)
  static async loadSampleArticles() {
    try {
      console.log('Loading sample blog articles...');
      
      for (const article of this.SAMPLE_ARTICLES) {
        const { id, ...articleData } = article;
        await this.createArticle(articleData);
      }

      console.log('Sample articles loaded successfully!');
      return true;
    } catch (error) {
      console.error('Error loading sample articles:', error);
      throw error;
    }
  }

  // Get blog categories
  static getBlogCategories() {
    return BLOG_CATEGORIES;
  }
}
