// MindSpark Community Forum System
// ====================================
// Discussion forum with threads, comments, reputation system

class CommunityManager {
  // Forum categories
  static CATEGORIES = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'Off-topic chat and general discussions',
      icon: 'fas fa-comments'
    },
    {
      id: 'career-questions',
      name: 'Career Questions',
      description: 'Ask about different careers and career paths',
      icon: 'fas fa-briefcase'
    },
    {
      id: 'study-help',
      name: 'Study Help',
      description: 'Get help with academics and studying',
      icon: 'fas fa-book'
    },
    {
      id: 'mental-health',
      name: 'Mental Health & Wellness',
      description: 'Share experiences and support each other',
      icon: 'fas fa-heart'
    },
    {
      id: 'success-stories',
      name: 'Success Stories',
      description: 'Share your wins and celebrate achievements',
      icon: 'fas fa-star'
    },
    {
      id: 'interview-prep',
      name: 'Interview Prep',
      description: 'Tips and advice for interviews',
      icon: 'fas fa-microphone'
    },
    {
      id: 'internships',
      name: 'Internships & Jobs',
      description: 'Discuss internship and job opportunities',
      icon: 'fas fa-rocket'
    },
    {
      id: 'mentor-qa',
      name: 'Ask the Mentors',
      description: 'Direct questions to our mentors',
      icon: 'fas fa-user-tie'
    }
  ];

  // Create a forum post
  static async createPost(userId, title, content, category) {
    try {
      const postRef = await db.collection('forum_posts').add({
        userId: userId,
        title: title,
        content: content,
        category: category,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now(),
        likes: 0,
        replies: 0,
        views: 0,
        isPinned: false,
        isLocked: false,
        tags: []
      });

      return postRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all posts in a category
  static async getPostsByCategory(category, limit = 20, orderBy = 'createdAt') {
    try {
      const snapshot = await db.collection('forum_posts')
        .where('category', '==', category)
        .where('isLocked', '==', false)
        .orderBy(orderBy, 'desc')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();

      const posts = [];
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get single post
  static async getPost(postId) {
    try {
      const doc = await db.collection('forum_posts').doc(postId).get();

      if (doc.exists) {
        // Increment views
        await db.collection('forum_posts').doc(postId).update({
          views: firebase.firestore.FieldValue.increment(1)
        });

        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // Add reply to a post
  static async addReply(postId, userId, content, parentReplyId = null) {
    try {
      const replyRef = await db.collection('forum_posts').doc(postId)
        .collection('replies').add({
          userId: userId,
          content: content,
          createdAt: firebase.firestore.Timestamp.now(),
          likes: 0,
          parentReplyId: parentReplyId,
          isEdited: false,
          editedAt: null
        });

      // Increment reply count
      await db.collection('forum_posts').doc(postId).update({
        replies: firebase.firestore.FieldValue.increment(1)
      });

      return replyRef.id;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }

  // Get relpies for a post
  static async getReplies(postId) {
    try {
      const snapshot = await db.collection('forum_posts').doc(postId)
        .collection('replies')
        .orderBy('createdAt', 'desc')
        .get();

      const replies = [];
      snapshot.forEach(doc => {
        replies.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return replies;
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }
  }

  // Like a post
  static async likePost(postId, userId) {
    try {
      // Add user to likes array and increment count
      await db.collection('forum_posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
      });

      return true;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Unlike a post
  static async unlikePost(postId, userId) {
    try {
      await db.collection('forum_posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
      });

      return true;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  }

  // Search forum posts
  static async searchPosts(searchTerm) {
    try {
      const snapshot = await db.collection('forum_posts').get();

      const results = [];
      const search = searchTerm.toLowerCase();

      snapshot.forEach(doc => {
        const data = doc.data();
        if (
          data.title.toLowerCase().includes(search) ||
          data.content.toLowerCase().includes(search)
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
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  // Report a post (for moderation)
  static async reportPost(postId, userId, reason) {
    try {
      await db.collection('forum_reports').add({
        postId: postId,
        reportedBy: userId,
        reason: reason,
        createdAt: firebase.firestore.Timestamp.now(),
        resolved: false
      });

      return true;
    } catch (error) {
      console.error('Error reporting post:', error);
      throw error;
    }
  }

  // Get user reputation (based on activity)
  static async getUserReputation(userId) {
    try {
      // Get user's posts
      const postsSnap = await db.collection('forum_posts')
        .where('userId', '==', userId)
        .get();

      let reputation = 0;

      postsSnap.forEach(doc => {
        reputation += doc.data().likes || 0; // Each like = 1 point
        reputation += (doc.data().replies || 0) * 0.5; // Each reply = 0.5 points
      });

      return Math.round(reputation);
    } catch (error) {
      console.error('Error getting reputation:', error);
      return 0;
    }
  }

  // Pin a post (admin only)
  static async pinPost(postId) {
    try {
      await db.collection('forum_posts').doc(postId).update({
        isPinned: true
      });

      return true;
    } catch (error) {
      console.error('Error pinning post:', error);
      throw error;
    }
  }

  // Lock a post (admin only)
  static async lockPost(postId) {
    try {
      await db.collection('forum_posts').doc(postId).update({
        isLocked: true
      });

      return true;
    } catch (error) {
      console.error('Error locking post:', error);
      throw error;
    }
  }

  // Get trending posts
  static async getTrendingPosts(limit = 10) {
    try {
      const snapshot = await db.collection('forum_posts')
        .where('isLocked', '==', false)
        .orderBy('likes', 'desc')
        .limit(limit)
        .get();

      const posts = [];
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return posts;
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      throw error;
    }
  }

  // Get most recent posts
  static async getRecentPosts(limit = 20) {
    try {
      const snapshot = await db.collection('forum_posts')
        .where('isLocked', '==', false)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();

      const posts = [];
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return posts;
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  }

  // Get user's posts
  static async getUserPosts(userId) {
    try {
      const snapshot = await db.collection('forum_posts')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const posts = [];
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return posts;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  }

  // Get categories
  static getCategories() {
    return this.CATEGORIES;
  }

  // Get category by ID
  static getCategoryById(categoryId) {
    return this.CATEGORIES.find(c => c.id === categoryId);
  }

  // Get all forum stats
  static async getForumStats() {
    try {
      const postsSnap = await db.collection('forum_posts').get();
      const usersSnap = await db.collection('users').get();

      return {
        totalPosts: postsSnap.size,
        totalUsers: usersSnap.size,
        totalReplies: 0 // Would need to count subcollections
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { totalPosts: 0, totalUsers: 0, totalReplies: 0 };
    }
  }
}
