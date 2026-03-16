// MindSpark Video Library System
// =================================
// Curated educational videos from TED, YouTube, and other sources

class VideoManager {
  // Sample video library
  static VIDEOS = [
    {
      id: '1',
      title: 'How to Find Your Passion | TEDx',
      speaker: 'Scott Dinsmore',
      duration: '12:45',
      category: 'Career Discovery',
      tags: ['passion', 'career', 'purpose'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'A powerful talk about discovering what truly drives you in life and career.',
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      title: 'The Surprising Secret to Speaking with Confidence',
      speaker: 'Caroline Goyder',
      duration: '15:30',
      category: 'Communication',
      tags: ['confidence', 'speaking', 'presentation'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'Learn the breathing techniques that can transform your public speaking.',
      views: 2100,
      likes: 156
    },
    {
      id: '3',
      title: 'Why School Should Start Later for Teens',
      speaker: 'Dr. Wendy Troxel',
      duration: '11:20',
      category: 'Education',
      tags: ['sleep', 'health', 'school'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'The science behind why teenagers need more sleep and how it affects learning.',
      views: 890,
      likes: 67
    },
    {
      id: '4',
      title: 'How to Achieve Your Most Ambitious Goals',
      speaker: 'Stephen Duneier',
      duration: '14:15',
      category: 'Motivation',
      tags: ['goals', 'success', 'achievement'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'A step-by-step framework for turning big dreams into reality.',
      views: 1800,
      likes: 134
    },
    {
      id: '5',
      title: 'The Benefits of a Bilingual Brain',
      speaker: 'Mimi Stephan',
      duration: '10:45',
      category: 'Education',
      tags: ['languages', 'brain', 'learning'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'How learning a second language changes your brain and opens new opportunities.',
      views: 750,
      likes: 52
    },
    {
      id: '6',
      title: 'Grit: The Power of Passion and Perseverance',
      speaker: 'Angela Lee Duckworth',
      duration: '16:30',
      category: 'Motivation',
      tags: ['grit', 'perseverance', 'success'],
      thumbnail: 'https://img.youtube.com/vi/2g0V3kZrJ1w/maxresdefault.jpg',
      url: 'https://www.youtube.com/embed/2g0V3kZrJ1w',
      description: 'Why talent alone isn\'t enough - the role of grit in achieving success.',
      views: 3200,
      likes: 245
    }
  ];

  // Categories for filtering
  static CATEGORIES = [
    'All',
    'Career Discovery',
    'Communication',
    'Education',
    'Motivation'
  ];

  // Get all videos
  static getAllVideos() {
    return this.VIDEOS;
  }

  // Get videos by category
  static getVideosByCategory(category) {
    if (category === 'All') return this.VIDEOS;
    return this.VIDEOS.filter(video => video.category === category);
  }

  // Search videos by title, speaker, or tags
  static searchVideos(query) {
    const searchTerm = query.toLowerCase();
    return this.VIDEOS.filter(video =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.speaker.toLowerCase().includes(searchTerm) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      video.category.toLowerCase().includes(searchTerm)
    );
  }

  // Get video by ID
  static getVideoById(id) {
    return this.VIDEOS.find(video => video.id === id);
  }

  // Get featured/popular videos
  static getFeaturedVideos(limit = 3) {
    return this.VIDEOS
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  // Increment view count (for future Firebase integration)
  static incrementViews(videoId) {
    const video = this.getVideoById(videoId);
    if (video) {
      video.views++;
    }
  }

  // Toggle like (for future Firebase integration)
  static toggleLike(videoId) {
    const video = this.getVideoById(videoId);
    if (video) {
      video.likes++;
    }
  }
}