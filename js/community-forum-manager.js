// MindSpark Community Forum System
// ====================================
// Complete community discussion and engagement platform

class CommunityForumManager {

    // Create a new forum post/thread
    static async createForumPost(postData, userId, userName) {
        try {
            const post = {
                title: postData.title,
                content: postData.content,
                userId,
                userName,
                userAvatar: postData.userAvatar || '',
                category: postData.category || 'General Discussion',
                tags: postData.tags || [],
                isPinned: false,
                isLocked: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                views: 0,
                replies: 0,
                likes: 0,
                userLikes: [],
                comments: [],
                helpful: 0,
                solved: false
            };

            const docRef = await window.db.collection('forum').add(post);
            return { id: docRef.id, ...post };
        } catch (error) {
            console.error('Error creating forum post:', error);
            throw error;
        }
    }

    // Get all forum posts
    static async getAllForumPosts(category = null, limit = 20, sort = 'recent') {
        try {
            let query = window.db.collection('forum');

            if (category && category !== 'All') {
                query = query.where('category', '==', category);
            }

            let snapshot;
            if (sort === 'popular') {
                snapshot = await query.orderBy('views', 'desc').limit(limit).get();
            } else if (sort === 'trending') {
                snapshot = await query.orderBy('likes', 'desc').limit(limit).get();
            } else {
                snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get();
            }

            const posts = [];
            snapshot.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data() });
            });

            return posts;
        } catch (error) {
            console.error('Error fetching forum posts:', error);
            return [];
        }
    }

    // Get single forum post
    static async getForumPost(postId) {
        try {
            const doc = await window.db.collection('forum').doc(postId).get();

            if (!doc.exists) {
                throw new Error('Forum post not found');
            }

            // Increment views
            await window.db.collection('forum').doc(postId).update({
                views: doc.data().views + 1
            });

            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching forum post:', error);
            throw error;
        }
    }

    // Search forum posts
    static async searchForumPosts(searchTerm) {
        try {
            const allPosts = await this.getAllForumPosts(null, 100, 'recent');
            const term = searchTerm.toLowerCase();

            return allPosts.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.content.toLowerCase().includes(term) ||
                post.tags.some(tag => tag.toLowerCase().includes(term))
            );
        } catch (error) {
            console.error('Error searching forum posts:', error);
            return [];
        }
    }

    // Add reply/comment to post
    static async addReply(postId, reply, userId, userName, userAvatar = '') {
        try {
            const newReply = {
                id: Math.random().toString(36).substr(2, 9),
                userId,
                userName,
                userAvatar,
                content: reply,
                createdAt: new Date(),
                likes: 0,
                userLikes: []
            };

            const doc = await window.db.collection('forum').doc(postId).get();
            const currentReplies = doc.data().replies || 0;

            await window.db.collection('forum').doc(postId).update({
                comments: window.firebase.firestore.FieldValue.arrayUnion(newReply),
                replies: currentReplies + 1,
                updatedAt: new Date()
            });

            return newReply;
        } catch (error) {
            console.error('Error adding reply:', error);
            throw error;
        }
    }

    // Like/Unlike post
    static async toggleLike(postId, userId) {
        try {
            const doc = await window.db.collection('forum').doc(postId).get();
            const post = doc.data();
            const likes = post.likes || 0;
            const userLikes = post.userLikes || [];

            const hasLiked = userLikes.includes(userId);

            await window.db.collection('forum').doc(postId).update({
                likes: hasLiked ? likes - 1 : likes + 1,
                userLikes: hasLiked
                    ? userLikes.filter(id => id !== userId)
                    : [...userLikes, userId]
            });

            return !hasLiked;
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    }

    // Mark post as helpful
    static async markAsHelpful(postId) {
        try {
            const doc = await window.db.collection('forum').doc(postId).get();
            const current = doc.data().helpful || 0;

            await window.db.collection('forum').doc(postId).update({
                helpful: current + 1
            });
        } catch (error) {
            console.error('Error marking as helpful:', error);
        }
    }

    // Mark post as solved
    static async markAsSolved(postId, solutionReplyId) {
        try {
            await window.db.collection('forum').doc(postId).update({
                solved: true,
                solvedAt: new Date(),
                solutionReplyId
            });
        } catch (error) {
            console.error('Error marking as solved:', error);
            throw error;
        }
    }

    // Pin post
    static async pinPost(postId) {
        try {
            await window.db.collection('forum').doc(postId).update({
                isPinned: true,
                pinnedAt: new Date()
            });
        } catch (error) {
            console.error('Error pinning post:', error);
            throw error;
        }
    }

    // Unpin post
    static async unpinPost(postId) {
        try {
            await window.db.collection('forum').doc(postId).update({
                isPinned: false,
                pinnedAt: null
            });
        } catch (error) {
            console.error('Error unpinning post:', error);
            throw error;
        }
    }

    // Lock post (prevent new replies)
    static async lockPost(postId) {
        try {
            await window.db.collection('forum').doc(postId).update({
                isLocked: true,
                lockedAt: new Date()
            });
        } catch (error) {
            console.error('Error locking post:', error);
            throw error;
        }
    }

    // Unlock post
    static async unlockPost(postId) {
        try {
            await window.db.collection('forum').doc(postId).update({
                isLocked: false,
                lockedAt: null
            });
        } catch (error) {
            console.error('Error unlocking post:', error);
            throw error;
        }
    }

    // Get forum categories
    static async getForumCategories() {
        try {
            const snapshot = await window.db.collection('forum').get();
            const categories = new Set();

            snapshot.forEach(doc => {
                if (doc.data().category) {
                    categories.add(doc.data().category);
                }
            });

            return Array.from(categories).sort();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    // Get trending forum topics
    static async getTrendingTopics(limit = 5) {
        try {
            const snapshot = await window.db.collection('forum')
                .orderBy('likes', 'desc')
                .limit(limit)
                .get();

            const topics = [];
            snapshot.forEach(doc => {
                topics.push({ id: doc.id, ...doc.data() });
            });

            return topics;
        } catch (error) {
            console.error('Error fetching trending topics:', error);
            return [];
        }
    }

    // Get unanswered posts
    static async getUnansweredPosts(limit = 10) {
        try {
            const snapshot = await window.db.collection('forum')
                .where('solved', '==', false)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();

            const posts = [];
            snapshot.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data() });
            });

            return posts;
        } catch (error) {
            console.error('Error fetching unanswered posts:', error);
            return [];
        }
    }

    // Get posts by user
    static async getUserPosts(userId, limit = 10) {
        try {
            const snapshot = await window.db.collection('forum')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();

            const posts = [];
            snapshot.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data() });
            });

            return posts;
        } catch (error) {
            console.error('Error fetching user posts:', error);
            return [];
        }
    }

    // Delete post
    static async deletePost(postId) {
        try {
            await window.db.collection('forum').doc(postId).delete();
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }

    // Edit post
    static async editPost(postId, updates) {
        try {
            await window.db.collection('forum').doc(postId).update({
                ...updates,
                updatedAt: new Date(),
                edited: true
            });

            return { id: postId, ...updates };
        } catch (error) {
            console.error('Error editing post:', error);
            throw error;
        }
    }

    // Get forum stats
    static async getForumStats() {
        try {
            const allPosts = await this.getAllForumPosts(null, 1000);

            return {
                totalPosts: allPosts.length,
                totalReplies: allPosts.reduce((sum, p) => sum + (p.replies || 0), 0),
                solvedPosts: allPosts.filter(p => p.solved).length,
                unsolvedPosts: allPosts.filter(p => !p.solved).length,
                categories: Array.from(new Set(allPosts.map(p => p.category)))
            };
        } catch (error) {
            console.error('Error fetching forum stats:', error);
            return null;
        }
    }
}

// Export for use in other files
window.CommunityForumManager = CommunityForumManager;