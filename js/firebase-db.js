// Firebase Database Module
// ====================================
// Handle all Firestore database operations for MindSpark

class DatabaseManager {
  
  // ============ ASSESSMENT OPERATIONS ============
  
  // Save assessment results
  static saveAssessmentResults(userId, assessmentData) {
    return window.db.collection('users').doc(userId).update({
      assessmentResults: firebase.firestore.FieldValue.arrayUnion({
        type: assessmentData.type,
        score: assessmentData.score,
        personalityType: assessmentData.personalityType || '',
        strengths: assessmentData.strengths || [],
        weaknesses: assessmentData.weaknesses || [],
        recommendedCareers: assessmentData.recommendedCareers || [],
        completedDate: new Date(),
        details: assessmentData.details || {}
      })
    })
    .catch(error => {
      console.error('Error saving assessment:', error.message);
      throw error;
    });
  }

  // Get user's assessment results
  static getUserAssessments(userId) {
    return window.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().assessmentResults || [];
        }
        return [];
      })
      .catch(error => {
        console.error('Error fetching assessments:', error.message);
        throw error;
      });
  }

  // ============ BLOG OPERATIONS ============
  
  // Create blog post
  static createBlogPost(postData) {
    return window.db.collection('blog').add({
      title: postData.title,
      content: postData.content,
      author: postData.author,
      category: postData.category,
      tags: postData.tags || [],
      featuredImage: postData.featuredImage || '',
      excerpt: postData.excerpt,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0
    })
    .then(docRef => {
      console.log('Blog post created with ID:', docRef.id);
      return docRef.id;
    })
    .catch(error => {
      console.error('Error creating blog post:', error.message);
      throw error;
    });
  }

  // Get all blog posts
  static getBlogPosts(limit = 10) {
    return window.db.collection('blog')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
      .then(querySnapshot => {
        const posts = [];
        querySnapshot.forEach(doc => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error.message);
        throw error;
      });
  }

  // Get single blog post by ID
  static getBlogPost(postId) {
    return window.db.collection('blog').doc(postId).get()
      .then(doc => {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
        return null;
      })
      .catch(error => {
        console.error('Error fetching blog post:', error.message);
        throw error;
      });
  }

  // ============ VIDEO/TED TALKS OPERATIONS ============
  
  // Add video/TED talk
  static addVideo(videoData) {
    return window.db.collection('videos').add({
      title: videoData.title,
      youtubeId: videoData.youtubeId || videoData.url,
      description: videoData.description,
      category: videoData.category,
      duration: videoData.duration || '',
      topic: videoData.topic,
      speaker: videoData.speaker || '',
      createdAt: new Date(),
      views: 0
    })
    .then(docRef => {
      console.log('Video added with ID:', docRef.id);
      return docRef.id;
    })
    .catch(error => {
      console.error('Error adding video:', error.message);
      throw error;
    });
  }

  // Get videos by category
  static getVideosByCategory(category, limit = 10) {
    return window.db.collection('videos')
      .where('category', '==', category)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
      .then(querySnapshot => {
        const videos = [];
        querySnapshot.forEach(doc => {
          videos.push({ id: doc.id, ...doc.data() });
        });
        return videos;
      })
      .catch(error => {
        console.error('Error fetching videos:', error.message);
        throw error;
      });
  }

  // ============ CAREER PATHS OPERATIONS ============
  
  // Create career path guide
  static createCareerPath(careerData) {
    return window.db.collection('careerPaths').add({
      title: careerData.title,
      description: careerData.description,
      requirements: careerData.requirements || [],
      salary: careerData.salary || {},
      skills: careerData.skills || [],
      education: careerData.education || [],
      outlook: careerData.outlook || '',
      relatedCareers: careerData.relatedCareers || [],
      createdAt: new Date()
    })
    .catch(error => {
      console.error('Error creating career path:', error.message);
      throw error;
    });
  }

  // Get all career paths
  static getAllCareerPaths() {
    return window.db.collection('careerPaths')
      .get()
      .then(querySnapshot => {
        const careers = [];
        querySnapshot.forEach(doc => {
          careers.push({ id: doc.id, ...doc.data() });
        });
        return careers;
      })
      .catch(error => {
        console.error('Error fetching career paths:', error.message);
        throw error;
      });
  }

  // ============ MENTOR OPERATIONS ============
  
  // Add mentor profile
  static addMentor(mentorData) {
    return window.db.collection('mentors').add({
      name: mentorData.name,
      email: mentorData.email,
      expertise: mentorData.expertise || [],
      bio: mentorData.bio,
      profileImage: mentorData.profileImage || '',
      fields: mentorData.fields || [],
      yearsExperience: mentorData.yearsExperience || 0,
      availability: mentorData.availability || 'available',
      mentees: [],
      createdAt: new Date()
    })
    .catch(error => {
      console.error('Error adding mentor:', error.message);
      throw error;
    });
  }

  // Get available mentors
  static getAvailableMentors(field = null) {
    let query = window.db.collection('mentors').where('availability', '==', 'available');
    
    if (field) {
      query = query.where('fields', 'array-contains', field);
    }
    
    return query.get()
      .then(querySnapshot => {
        const mentors = [];
        querySnapshot.forEach(doc => {
          mentors.push({ id: doc.id, ...doc.data() });
        });
        return mentors;
      })
      .catch(error => {
        console.error('Error fetching mentors:', error.message);
        throw error;
      });
  }

  // ============ COMMUNITY/FORUM OPERATIONS ============
  
  // Create forum post
  static createForumPost(postData) {
    return window.db.collection('forum').add({
      title: postData.title,
      content: postData.content,
      userId: postData.userId,
      category: postData.category || 'general',
      likes: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(docRef => {
      console.log('Forum post created:', docRef.id);
      return docRef.id;
    })
    .catch(error => {
      console.error('Error creating forum post:', error.message);
      throw error;
    });
  }

  // Get forum posts
  static getForumPosts(category = null, limit = 20) {
    let query = window.db.collection('forum');
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    return query.orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
      .then(querySnapshot => {
        const posts = [];
        querySnapshot.forEach(doc => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
      })
      .catch(error => {
        console.error('Error fetching forum posts:', error.message);
        throw error;
      });
  }
}
