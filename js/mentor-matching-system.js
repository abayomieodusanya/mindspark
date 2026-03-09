// MindSpark Mentor Matching System
// ====================================
// Advanced mentor-mentee matching and relationship management

class MentorMatchingSystem {

    // Register as a mentor
    static async registerMentor(mentorData, userId) {
        try {
            const mentor = {
                userId,
                name: mentorData.name,
                email: mentorData.email || '',
                bio: mentorData.bio || '',
                profileImage: mentorData.profileImage || '',
                expertise: mentorData.expertise || [],
                fields: mentorData.fields || [],
                yearsExperience: mentorData.yearsExperience || 0,
                education: mentorData.education || [],
                certifications: mentorData.certifications || [],
                availability: mentorData.availability || 'available',
                hourlyRate: mentorData.hourlyRate || 0,
                maxMentees: mentorData.maxMentees || 5,
                currentMentees: 0,
                mentees: [],
                languages: mentorData.languages || ['English'],
                meetingPreference: mentorData.meetingPreference || 'virtual',
                responseTime: mentorData.responseTime || '24 hours',
                rating: 5,
                reviews: 0,
                successStories: [],
                verified: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const docRef = await window.db.collection('mentors').add(mentor);
            return { id: docRef.id, ...mentor };
        } catch (error) {
            console.error('Error registering mentor:', error);
            throw error;
        }
    }

    // Get available mentors
    static async getAvailableMentors(filters = {}) {
        try {
            let query = window.db.collection('mentors').where('availability', '==', 'available');

            if (filters.field) {
                query = query.where('fields', 'array-contains', filters.field);
            }

            const snapshot = await query.get();
            const mentors = [];

            snapshot.forEach(doc => {
                const mentor = { id: doc.id, ...doc.data() };
                if (!filters.maxRate || mentor.hourlyRate <= filters.maxRate) {
                    mentors.push(mentor);
                }
            });

            return mentors.sort((a, b) => b.rating - a.rating);
        } catch (error) {
            console.error('Error fetching available mentors:', error);
            return [];
        }
    }

    // Find best matching mentors for user
    static async findMatchingMentors(userProfile, limit = 5) {
        try {
            const availableMentors = await this.getAvailableMentors();
            const matchScores = [];

            availableMentors.forEach(mentor => {
                let score = 0;

                // Match by expertise/goals
                if (userProfile.interests) {
                    userProfile.interests.forEach(interest => {
                        if (mentor.expertise.some(exp =>
                            exp.toLowerCase().includes(interest.toLowerCase())
                        )) {
                            score += 30;
                        }
                    });
                }

                // Match by field
                if (userProfile.desiredField && mentor.fields.includes(userProfile.desiredField)) {
                    score += 25;
                }

                // Match by education level
                if (userProfile.education && mentor.education.includes(userProfile.education)) {
                    score += 15;
                }

                // Availability score
                if (mentor.currentMentees < mentor.maxMentees) {
                    score += 10;
                }

                // Rating bonus
                score += mentor.rating;

                matchScores.push({ ...mentor, matchScore: score });
            });

            return matchScores
                .sort((a, b) => b.matchScore - a.matchScore)
                .slice(0, limit);
        } catch (error) {
            console.error('Error finding matching mentors:', error);
            return [];
        }
    }

    // Request mentorship
    static async requestMentorship(mentorId, menteeUserId, message) {
        try {
            const request = {
                id: Math.random().toString(36).substr(2, 9),
                mentorId,
                menteeUserId,
                message,
                status: 'pending',
                createdAt: new Date(),
                respondedAt: null
            };

            await window.db.collection('mentors').doc(mentorId).update({
                mentorshipRequests: window.firebase.firestore.FieldValue.arrayUnion(request)
            });

            return request;
        } catch (error) {
            console.error('Error requesting mentorship:', error);
            throw error;
        }
    }

    // Accept mentorship request
    static async acceptMentorshipRequest(mentorId, requestId, menteeUserId) {
        try {
            const mentor = await window.db.collection('mentors').doc(mentorId).get();
            const mentorData = mentor.data();

            // Update mentor
            const requests = mentorData.mentorshipRequests || [];
            const updatedRequests = requests.map(req =>
                req.id === requestId ? { ...req, status: 'accepted', respondedAt: new Date() } : req
            );

            await window.db.collection('mentors').doc(mentorId).update({
                mentees: window.firebase.firestore.FieldValue.arrayUnion(menteeUserId),
                currentMentees: (mentorData.currentMentees || 0) + 1,
                mentorshipRequests: updatedRequests
            });

            // Update mentee user profile
            await window.db.collection('users').doc(menteeUserId).update({
                mentor: mentorId,
                mentorshipStartDate: new Date(),
                hasMentor: true
            });

            return { status: 'accepted', mentorId, menteeUserId };
        } catch (error) {
            console.error('Error accepting mentorship:', error);
            throw error;
        }
    }

    // Reject mentorship request
    static async rejectMentorshipRequest(mentorId, requestId) {
        try {
            const mentor = await window.db.collection('mentors').doc(mentorId).get();
            const mentorData = mentor.data();

            const requests = mentorData.mentorshipRequests || [];
            const updatedRequests = requests.map(req =>
                req.id === requestId ? { ...req, status: 'rejected', respondedAt: new Date() } : req
            );

            await window.db.collection('mentors').doc(mentorId).update({
                mentorshipRequests: updatedRequests
            });

            return { status: 'rejected', mentorId };
        } catch (error) {
            console.error('Error rejecting mentorship:', error);
            throw error;
        }
    }

    // Get mentor profile
    static async getMentorProfile(mentorId) {
        try {
            const doc = await window.db.collection('mentors').doc(mentorId).get();

            if (!doc.exists) {
                throw new Error('Mentor not found');
            }

            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching mentor profile:', error);
            throw error;
        }
    }

    // Rate mentor
    static async rateMentor(mentorId, rating, review) {
        try {
            const mentor = await window.db.collection('mentors').doc(mentorId).get();
            const mentorData = mentor.data();
            const currentRating = mentorData.rating || 5;
            const reviewCount = mentorData.reviews || 0;

            const newRating = (currentRating * reviewCount + rating) / (reviewCount + 1);

            await window.db.collection('mentors').doc(mentorId).update({
                rating: newRating,
                reviews: reviewCount + 1,
                lastReview: new Date(),
                lastReviewText: review
            });

            return newRating;
        } catch (error) {
            console.error('Error rating mentor:', error);
            throw error;
        }
    }

    // Get mentee's mentor
    static async getMentee(userId) {
        try {
            const userDoc = await window.db.collection('users').doc(userId).get();
            const userData = userDoc.data();

            if (!userData || !userData.mentor) {
                return null;
            }

            return await this.getMentorProfile(userData.mentor);
        } catch (error) {
            console.error('Error fetching mentee mentor:', error);
            return null;
        }
    }

    // End mentorship
    static async endMentorship(mentorId, menteeUserId) {
        try {
            const mentor = await window.db.collection('mentors').doc(mentorId).get();
            const mentorData = mentor.data();

            await window.db.collection('mentors').doc(mentorId).update({
                mentees: mentorData.mentees.filter(id => id !== menteeUserId),
                currentMentees: Math.max(0, (mentorData.currentMentees || 1) - 1)
            });

            await window.db.collection('users').doc(menteeUserId).update({
                mentor: null,
                hasMentor: false,
                mentorshipEndDate: new Date()
            });
        } catch (error) {
            console.error('Error ending mentorship:', error);
            throw error;
        }
    }

    // Get top mentors (by rating)
    static async getTopMentors(limit = 10) {
        try {
            const snapshot = await window.db.collection('mentors')
                .where('availability', '==', 'available')
                .orderBy('rating', 'desc')
                .limit(limit)
                .get();

            const mentors = [];
            snapshot.forEach(doc => {
                mentors.push({ id: doc.id, ...doc.data() });
            });

            return mentors;
        } catch (error) {
            console.error('Error fetching top mentors:', error);
            return [];
        }
    }

    // Search mentors
    static async searchMentors(searchTerm) {
        try {
            const allMentors = await this.getAvailableMentors();
            const term = searchTerm.toLowerCase();

            return allMentors.filter(mentor =>
                mentor.name.toLowerCase().includes(term) ||
                mentor.bio.toLowerCase().includes(term) ||
                mentor.expertise.some(exp => exp.toLowerCase().includes(term))
            );
        } catch (error) {
            console.error('Error searching mentors:', error);
            return [];
        }
    }
}

// Export for use in other files
window.MentorMatchingSystem = MentorMatchingSystem;