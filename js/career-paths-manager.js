// MindSpark Career Paths Database
// ====================================
// Comprehensive career information and matching system

class CareerPathsManager {

    // Create a new career path/guide
    static async createCareerPath(careerData) {
        try {
            const career = {
                title: careerData.title,
                description: careerData.description,
                longDescription: careerData.longDescription || '',
                requirements: careerData.requirements || [],
                salary: {
                    min: careerData.salaryMin || 0,
                    max: careerData.salaryMax || 0,
                    range: careerData.salaryRange || 'Competitive'
                },
                skills: careerData.skills || [],
                education: careerData.education || [],
                certifications: careerData.certifications || [],
                outlook: careerData.outlook || 'Growing',
                jobMarketTrend: careerData.jobMarketTrend || 'stable',
                relatedCareers: careerData.relatedCareers || [],
                workEnvironment: careerData.workEnvironment || '',
                dayInLife: careerData.dayInLife || '',
                challenges: careerData.challenges || [],
                rewards: careerData.rewards || [],
                createdAt: new Date(),
                updatedAt: new Date(),
                helpfulCount: 0,
                views: 0
            };

            const docRef = await window.db.collection('careerPaths').add(career);
            return { id: docRef.id, ...career };
        } catch (error) {
            console.error('Error creating career path:', error);
            throw error;
        }
    }

    // Get all career paths
    static async getAllCareerPaths(limit = 50) {
        try {
            const snapshot = await window.db.collection('careerPaths')
                .orderBy('views', 'desc')
                .limit(limit)
                .get();

            const careers = [];
            snapshot.forEach(doc => {
                careers.push({ id: doc.id, ...doc.data() });
            });

            return careers;
        } catch (error) {
            console.error('Error fetching career paths:', error);
            return [];
        }
    }

    // Get career path by ID
    static async getCareerPath(careerId) {
        try {
            const doc = await window.db.collection('careerPaths').doc(careerId).get();

            if (!doc.exists) {
                throw new Error('Career path not found');
            }

            // Increment views
            await window.db.collection('careerPaths').doc(careerId).update({
                views: doc.data().views + 1
            });

            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching career path:', error);
            throw error;
        }
    }

    // Search careers by title or skills
    static async searchCareers(searchTerm) {
        try {
            const allCareers = await this.getAllCareerPaths(100);
            const term = searchTerm.toLowerCase();

            return allCareers.filter(career =>
                career.title.toLowerCase().includes(term) ||
                career.description.toLowerCase().includes(term) ||
                career.skills.some(skill => skill.toLowerCase().includes(term))
            );
        } catch (error) {
            console.error('Error searching careers:', error);
            return [];
        }
    }

    // Get careers by required skill
    static async getCareersWithSkill(skill) {
        try {
            const snapshot = await window.db.collection('careerPaths')
                .where('skills', 'array-contains', skill)
                .get();

            const careers = [];
            snapshot.forEach(doc => {
                careers.push({ id: doc.id, ...doc.data() });
            });

            return careers;
        } catch (error) {
            console.error('Error fetching careers with skill:', error);
            return [];
        }
    }

    // Get careers by education requirement
    static async getCareersWithEducation(education) {
        try {
            const snapshot = await window.db.collection('careerPaths')
                .where('education', 'array-contains', education)
                .get();

            const careers = [];
            snapshot.forEach(doc => {
                careers.push({ id: doc.id, ...doc.data() });
            });

            return careers;
        } catch (error) {
            console.error('Error fetching careers with education:', error);
            return [];
        }
    }

    // Get salary range for career
    static async getSalaryInfo(careerId) {
        try {
            const career = await this.getCareerPath(careerId);
            return {
                min: career.salary.min,
                max: career.salary.max,
                range: career.salary.range,
                average: (career.salary.min + career.salary.max) / 2
            };
        } catch (error) {
            console.error('Error fetching salary info:', error);
            return null;
        }
    }

    // Update career path
    static async updateCareerPath(careerId, updates) {
        try {
            await window.db.collection('careerPaths').doc(careerId).update({
                ...updates,
                updatedAt: new Date()
            });

            return { id: careerId, ...updates };
        } catch (error) {
            console.error('Error updating career path:', error);
            throw error;
        }
    }

    // Mark career as helpful
    static async markAsHelpful(careerId) {
        try {
            const doc = await window.db.collection('careerPaths').doc(careerId).get();
            const current = doc.data().helpfulCount || 0;

            await window.db.collection('careerPaths').doc(careerId).update({
                helpfulCount: current + 1
            });
        } catch (error) {
            console.error('Error marking as helpful:', error);
        }
    }

    // Get popular careers (by views)
    static async getPopularCareers(limit = 10) {
        try {
            const snapshot = await window.db.collection('careerPaths')
                .orderBy('views', 'desc')
                .limit(limit)
                .get();

            const careers = [];
            snapshot.forEach(doc => {
                careers.push({ id: doc.id, ...doc.data() });
            });

            return careers;
        } catch (error) {
            console.error('Error fetching popular careers:', error);
            return [];
        }
    }

    // Get careers matching user assessment results
    static async getMatchingCareers(assessmentResults) {
        try {
            const allCareers = await this.getAllCareerPaths(100);

            // Score each career based on skills match
            const scored = allCareers.map(career => {
                let score = 0;

                if (assessmentResults.skills) {
                    assessmentResults.skills.forEach(userSkill => {
                        if (career.skills.some(careerSkill =>
                            careerSkill.toLowerCase().includes(userSkill.toLowerCase()) ||
                            userSkill.toLowerCase().includes(careerSkill.toLowerCase())
                        )) {
                            score += 25;
                        }
                    });
                }

                if (assessmentResults.education) {
                    if (career.education.some(careerEdu =>
                        careerEdu.toLowerCase().includes(assessmentResults.education.toLowerCase())
                    )) {
                        score += 15;
                    }
                }

                return { ...career, matchScore: Math.min(100, score) };
            });

            return scored
                .filter(c => c.matchScore > 0)
                .sort((a, b) => b.matchScore - a.matchScore);
        } catch (error) {
            console.error('Error finding matching careers:', error);
            return [];
        }
    }

    // Get career roadmap (learning path)
    static async getCareerRoadmap(careerId) {
        try {
            const career = await this.getCareerPath(careerId);

            return {
                title: career.title,
                roadmap: [
                    { stage: 'Foundation', skills: career.education, duration: '2-3 years' },
                    { stage: 'Development', skills: career.requirements, duration: '1-2 years' },
                    { stage: 'Specialization', skills: career.certifications, duration: 'Ongoing' }
                ],
                estimatedTime: '3-5 years',
                keySkills: career.skills,
                resources: {
                    courses: [],
                    certifications: career.certifications,
                    mentors: []
                }
            };
        } catch (error) {
            console.error('Error generating career roadmap:', error);
            return null;
        }
    }
}

// Export for use in other files
window.CareerPathsManager = CareerPathsManager;