// MindSpark Results Engine
// ====================================
// Advanced assessment results processing and analysis system

class ResultsEngine {

    constructor() {
        this.scoringWeights = {
            personality: {
                extroversion: 0.3,
                openness: 0.25,
                conscientiousness: 0.25,
                agreeableness: 0.2
            },
            skills: {
                technical: 0.4,
                soft: 0.35,
                creative: 0.25
            },
            aptitude: {
                logical: 0.4,
                mathematical: 0.35,
                spatial: 0.25
            }
        };
    }

    // Main results processing method
    async processResults(assessmentType, answers, userId = null) {
        try {
            const rawScore = this.calculateRawScore(answers);
            const normalizedScore = this.normalizeScore(rawScore, assessmentType);
            const detailedAnalysis = this.performDetailedAnalysis(assessmentType, answers);
            const careerMatches = await this.calculateCareerMatches(detailedAnalysis, userId);
            const recommendations = this.generateRecommendations(detailedAnalysis, careerMatches);
            const insights = this.generateInsights(detailedAnalysis);

            return {
                assessmentType,
                timestamp: new Date(),
                scores: {
                    raw: rawScore,
                    normalized: normalizedScore,
                    percentage: Math.round((rawScore / answers.length) * 100)
                },
                analysis: detailedAnalysis,
                careerMatches,
                recommendations,
                insights,
                userId
            };
        } catch (error) {
            console.error('Error processing results:', error);
            throw error;
        }
    }

    // Calculate raw score from answers
    calculateRawScore(answers) {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer !== null) {
                // Weight answers based on question importance
                const weight = this.getQuestionWeight(index);
                score += (answer + 1) * weight; // +1 because answers are 0-indexed
            }
        });
        return score;
    }

    // Get weight for specific questions (higher weight = more important)
    getQuestionWeight(questionIndex) {
        const highImportanceQuestions = [0, 4, 7, 9]; // First, middle, and last questions
        return highImportanceQuestions.includes(questionIndex) ? 1.5 : 1.0;
    }

    // Normalize score to 0-100 scale
    normalizeScore(rawScore, assessmentType) {
        const maxPossibleScore = this.getMaxPossibleScore(assessmentType);
        return Math.min(100, Math.max(0, (rawScore / maxPossibleScore) * 100));
    }

    // Get maximum possible score for assessment type
    getMaxPossibleScore(assessmentType) {
        // Try to get question count from global assessmentQuestions if available
        let questionCount = 10; // Default
        try {
            if (typeof assessmentQuestions !== 'undefined' && assessmentQuestions[assessmentType]) {
                questionCount = assessmentQuestions[assessmentType].length;
            }
        } catch (e) {
            // Use default if not available
        }
        
        const averageWeight = 1.2; // Average weight across questions
        const maxAnswerValue = 3; // 0, 1, 2 (3 options)
        return questionCount * maxAnswerValue * averageWeight;
    }

    // Perform detailed analysis based on assessment type
    performDetailedAnalysis(assessmentType, answers) {
        switch (assessmentType) {
            case 'personality':
                return this.analyzePersonality(answers);
            case 'skills':
                return this.analyzeSkills(answers);
            case 'aptitude':
                return this.analyzeAptitude(answers);
            default:
                return { type: 'unknown', traits: [] };
        }
    }

    // Advanced personality analysis
    analyzePersonality(answers) {
        const traits = {
            extroversion: 0,
            openness: 0,
            conscientiousness: 0,
            agreeableness: 0,
            neuroticism: 0
        };

        // Map answers to Big Five traits
        answers.forEach((answer, index) => {
            switch (index) {
                case 0: // Social situations
                    traits.extroversion += answer === 0 ? 3 : answer === 1 ? 1 : 2;
                    break;
                case 1: // Problem solving approach
                    traits.conscientiousness += answer === 1 ? 3 : answer === 0 ? 2 : 1;
                    break;
                case 2: // Work environment preference
                    traits.extroversion += answer === 0 ? 3 : answer === 2 ? 2 : 1;
                    break;
                case 3: // Learning style
                    traits.openness += answer === 1 ? 3 : answer === 0 ? 2 : 1;
                    break;
                case 4: // Future aspirations
                    traits.agreeableness += answer === 0 ? 3 : answer === 2 ? 2 : 1;
                    break;
                case 5: // Stress response
                    traits.neuroticism += answer === 1 ? 3 : answer === 2 ? 2 : 1;
                    break;
                case 6: // Motivation
                    traits.conscientiousness += answer === 0 ? 3 : answer === 2 ? 2 : 1;
                    break;
                case 7: // Group behavior
                    traits.extroversion += answer === 0 ? 3 : answer === 1 ? 2 : 1;
                    break;
                case 8: // Rules approach
                    traits.conscientiousness += answer === 0 ? 3 : answer === 1 ? 1 : 2;
                    break;
                case 9: // Fulfillment
                    traits.agreeableness += answer === 2 ? 3 : answer === 0 ? 2 : 1;
                    break;
            }
        });

        // Normalize traits to 0-100 scale
        Object.keys(traits).forEach(trait => {
            traits[trait] = Math.round((traits[trait] / 30) * 100);
        });

        // Determine personality type
        const personalityType = this.determinePersonalityType(traits);

        return {
            type: 'personality',
            traits,
            personalityType,
            dominantTraits: this.getDominantTraits(traits),
            careerImplications: this.getPersonalityCareerImplications(traits)
        };
    }

    // Determine personality type from traits
    determinePersonalityType(traits) {
        const { extroversion, openness, conscientiousness, agreeableness } = traits;

        if (extroversion > 60 && openness > 60) return 'ENFP'; // Campaigner
        if (extroversion > 60 && conscientiousness > 60) return 'ENFJ'; // Protagonist
        if (extroversion > 60 && agreeableness > 60) return 'ESFJ'; // Consul
        if (extroversion > 60) return 'ESTP'; // Entrepreneur

        if (openness > 60 && conscientiousness > 60) return 'INTP'; // Logician
        if (openness > 60 && agreeableness > 60) return 'INFP'; // Mediator
        if (openness > 60) return 'ISTP'; // Virtuoso

        if (conscientiousness > 60 && agreeableness > 60) return 'ISFJ'; // Defender
        if (conscientiousness > 60) return 'ISTJ'; // Logistician

        return 'INTJ'; // Architect (default analytical type)
    }

    // Get dominant personality traits
    getDominantTraits(traits) {
        const traitNames = {
            extroversion: 'Outgoing',
            openness: 'Creative',
            conscientiousness: 'Organized',
            agreeableness: 'Empathetic',
            neuroticism: 'Resilient'
        };

        return Object.entries(traits)
            .filter(([_, score]) => score > 60)
            .map(([trait, score]) => ({
                name: traitNames[trait],
                score
            }))
            .sort((a, b) => b.score - a.score);
    }

    // Get career implications from personality
    getPersonalityCareerImplications(traits) {
        const implications = [];

        if (traits.extroversion > 70) {
            implications.push('Thrives in social, team-oriented environments');
        }
        if (traits.openness > 70) {
            implications.push('Excels in creative, innovative roles');
        }
        if (traits.conscientiousness > 70) {
            implications.push('Well-suited for structured, detail-oriented work');
        }
        if (traits.agreeableness > 70) {
            implications.push('Ideal for helping professions and collaborative roles');
        }

        return implications;
    }

    // Analyze skills assessment
    analyzeSkills(answers) {
        const skillCategories = {
            communication: 0,
            problemSolving: 0,
            creativity: 0,
            leadership: 0,
            technical: 0,
            teamwork: 0,
            analytical: 0,
            helping: 0
        };

        // Map answers to skill categories
        answers.forEach((answer, index) => {
            const weight = answer; // 0, 1, 2 representing skill levels
            switch (index) {
                case 0: skillCategories.communication += weight; break;
                case 1: skillCategories.problemSolving += weight; break;
                case 2: skillCategories.creativity += weight; break;
                case 3: skillCategories.technical += weight; break; // Interest in technology
                case 4: skillCategories.leadership += weight; break;
                case 5: skillCategories.analytical += weight; break;
                case 6: skillCategories.teamwork += weight; break;
                case 7: skillCategories.helping += weight; break;
                case 8: skillCategories.technical += weight; break;
                case 9: skillCategories.helping += weight; break; // Healthcare interest
            }
        });

        // Normalize to 0-100
        Object.keys(skillCategories).forEach(skill => {
            skillCategories[skill] = Math.round((skillCategories[skill] / 6) * 100);
        });

        const topSkills = Object.entries(skillCategories)
            .filter(([_, score]) => score > 50)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return {
            type: 'skills',
            categories: skillCategories,
            topSkills,
            skillGaps: this.identifySkillGaps(skillCategories)
        };
    }

    // Identify skill gaps
    identifySkillGaps(skillCategories) {
        return Object.entries(skillCategories)
            .filter(([_, score]) => score < 40)
            .map(([skill, score]) => ({
                skill: skill.charAt(0).toUpperCase() + skill.slice(1),
                currentLevel: score,
                recommendedActions: this.getSkillImprovementActions(skill)
            }));
    }

    // Get skill improvement recommendations
    getSkillImprovementActions(skill) {
        const actions = {
            communication: ['Join public speaking clubs', 'Practice active listening', 'Take communication workshops'],
            problemSolving: ['Work on logic puzzles', 'Learn debugging techniques', 'Practice case studies'],
            creativity: ['Take art classes', 'Brainstorming exercises', 'Explore new hobbies'],
            leadership: ['Volunteer for team projects', 'Take leadership courses', 'Mentor others'],
            technical: ['Online coding courses', 'Build personal projects', 'Join tech communities'],
            teamwork: ['Join group activities', 'Collaborative projects', 'Team sports'],
            analytical: ['Data analysis courses', 'Statistical learning', 'Research projects'],
            helping: ['Volunteer work', 'Counseling courses', 'Community service']
        };
        return actions[skill] || ['Seek relevant training and practice'];
    }

    // Analyze aptitude assessment
    analyzeAptitude(answers) {
        const aptitudes = {
            logical: 0,
            mathematical: 0,
            spatial: 0,
            verbal: 0,
            analytical: 0
        };

        // Map aptitude test answers
        answers.forEach((answer, index) => {
            const correct = this.isCorrectAnswer(index, answer);
            const points = correct ? 3 : 0;

            switch (index) {
                case 0: case 1: aptitudes.logical += points; break; // Sequence and logic
                case 2: case 3: case 9: aptitudes.mathematical += points; break; // Math problems
                case 4: case 5: aptitudes.spatial += points; break; // Visual patterns
                case 6: case 7: aptitudes.analytical += points; break; // Odd one out, analogies
                case 8: aptitudes.verbal += points; break; // Language/logic
            }
        });

        // Normalize to 0-100
        Object.keys(aptitudes).forEach(aptitude => {
            aptitudes[aptitude] = Math.round((aptitudes[aptitude] / 9) * 100);
        });

        return {
            type: 'aptitude',
            aptitudes,
            strengths: this.getAptitudeStrengths(aptitudes),
            recommendations: this.getAptitudeRecommendations(aptitudes)
        };
    }

    // Check if aptitude answer is correct
    isCorrectAnswer(questionIndex, answer) {
        const correctAnswers = [2, 1, 1, 1, 1, 0, 1, 0, 2, 1]; // Based on the questions
        return answer === correctAnswers[questionIndex];
    }

    // Get aptitude strengths
    getAptitudeStrengths(aptitudes) {
        return Object.entries(aptitudes)
            .filter(([_, score]) => score > 60)
            .map(([aptitude, score]) => ({
                area: aptitude.charAt(0).toUpperCase() + aptitude.slice(1),
                score
            }))
            .sort((a, b) => b.score - a.score);
    }

    // Get aptitude-based recommendations
    getAptitudeRecommendations(aptitudes) {
        const recommendations = [];

        if (aptitudes.logical > 70) {
            recommendations.push('Consider careers in engineering, computer science, or research');
        }
        if (aptitudes.mathematical > 70) {
            recommendations.push('Strong candidate for STEM fields, finance, or data science');
        }
        if (aptitudes.spatial > 70) {
            recommendations.push('Well-suited for design, architecture, or engineering fields');
        }
        if (aptitudes.analytical > 70) {
            recommendations.push('Excellent for analytical roles in business, science, or technology');
        }

        return recommendations;
    }

    // Calculate career matches based on analysis
    async calculateCareerMatches(analysis, userId = null) {
        try {
            // Get all available careers
            const careers = await window.db.collection('careerPaths').get();
            const careerData = [];

            careers.forEach(doc => {
                careerData.push({ id: doc.id, ...doc.data() });
            });

            // Calculate match scores for each career
            const matches = careerData.map(career => {
                const matchScore = this.calculateCareerMatchScore(analysis, career);
                return {
                    career,
                    matchScore,
                    matchReasons: this.getMatchReasons(analysis, career)
                };
            });

            // Sort by match score and return top matches
            return matches
                .sort((a, b) => b.matchScore - a.matchScore)
                .slice(0, 5);

        } catch (error) {
            console.error('Error calculating career matches:', error);
            return [];
        }
    }

    // Calculate match score between analysis and career
    calculateCareerMatchScore(analysis, career) {
        let score = 0;

        if (analysis.type === 'personality') {
            // Personality-career matching
            score += this.getPersonalityCareerScore(analysis, career);
        } else if (analysis.type === 'skills') {
            // Skills-career matching
            score += this.getSkillsCareerScore(analysis, career);
        } else if (analysis.type === 'aptitude') {
            // Aptitude-career matching
            score += this.getAptitudeCareerScore(analysis, career);
        }

        // Factor in career requirements vs user skills
        if (career.requirements && analysis.skillCategories) {
            score += this.getRequirementsMatchScore(career.requirements, analysis.skillCategories);
        }

        return Math.min(100, Math.max(0, score));
    }

    // Get personality-career match score
    getPersonalityCareerScore(analysis, career) {
        const personalityKeywords = {
            'ENFP': ['creative', 'social', 'innovative', 'helping'],
            'ENFJ': ['leadership', 'social', 'organized', 'helping'],
            'ESFJ': ['social', 'organized', 'helping', 'practical'],
            'ESTP': ['practical', 'social', 'leadership', 'action'],
            'INTP': ['analytical', 'independent', 'creative', 'technical'],
            'INFP': ['creative', 'independent', 'helping', 'reflective'],
            'ISTP': ['practical', 'independent', 'technical', 'analytical'],
            'ISFJ': ['organized', 'helping', 'practical', 'detail'],
            'ISTJ': ['organized', 'practical', 'analytical', 'independent'],
            'INTJ': ['analytical', 'independent', 'strategic', 'innovative']
        };

        const userType = analysis.personalityType;
        const relevantKeywords = personalityKeywords[userType] || [];
        const careerText = (career.description + ' ' + career.skills.join(' ')).toLowerCase();

        let matchScore = 0;
        relevantKeywords.forEach(keyword => {
            if (careerText.includes(keyword)) {
                matchScore += 20;
            }
        });

        return matchScore;
    }

    // Get skills-career match score
    getSkillsCareerScore(analysis, career) {
        let score = 0;
        const careerSkills = career.skills || [];
        const userSkills = analysis.topSkills || [];

        userSkills.forEach(userSkill => {
            const skillName = userSkill[0].toLowerCase();
            if (careerSkills.some(careerSkill =>
                careerSkill.toLowerCase().includes(skillName) ||
                skillName.includes(careerSkill.toLowerCase())
            )) {
                score += 25;
            }
        });

        return score;
    }

    // Get aptitude-career match score
    getAptitudeCareerScore(analysis, career) {
        const aptitudeKeywords = {
            logical: ['engineering', 'computer', 'science', 'research', 'analysis'],
            mathematical: ['engineering', 'finance', 'data', 'science', 'statistics'],
            spatial: ['design', 'architecture', 'engineering', 'art', 'technical'],
            verbal: ['teaching', 'writing', 'communication', 'law', 'marketing'],
            analytical: ['research', 'analysis', 'strategy', 'consulting', 'science']
        };

        let score = 0;
        const careerText = career.title.toLowerCase() + ' ' + career.description.toLowerCase();

        analysis.strengths.forEach(strength => {
            const area = strength.area.toLowerCase();
            const keywords = aptitudeKeywords[area] || [];
            keywords.forEach(keyword => {
                if (careerText.includes(keyword)) {
                    score += 15;
                }
            });
        });

        return score;
    }

    // Get requirements match score
    getRequirementsMatchScore(requirements, userSkills) {
        let score = 0;
        const reqText = requirements.join(' ').toLowerCase();

        Object.keys(userSkills).forEach(skill => {
            if (reqText.includes(skill)) {
                score += 10;
            }
        });

        return score;
    }

    // Get reasons for career match
    getMatchReasons(analysis, career) {
        const reasons = [];

        if (analysis.type === 'personality') {
            if (analysis.personalityType) {
                reasons.push(`Matches ${analysis.personalityType} personality traits`);
            }
        }

        if (analysis.topSkills) {
            analysis.topSkills.forEach(([skill, score]) => {
                if (career.skills && career.skills.some(cSkill =>
                    cSkill.toLowerCase().includes(skill.toLowerCase())
                )) {
                    reasons.push(`Aligns with your ${skill} skills (${score}%)`);
                }
            });
        }

        if (career.salary) {
            reasons.push(`Potential salary range: ${career.salary.range || 'Competitive'}`);
        }

        return reasons;
    }

    // Generate personalized recommendations
    generateRecommendations(analysis, careerMatches) {
        const recommendations = {
            immediate: [],
            shortTerm: [],
            longTerm: [],
            resources: []
        };

        // Immediate recommendations
        if (analysis.type === 'personality') {
            recommendations.immediate.push('Take the skills assessment to identify your strengths');
            recommendations.immediate.push('Explore the recommended careers in more detail');
        } else if (analysis.type === 'skills') {
            recommendations.immediate.push('Consider taking the aptitude test');
            recommendations.immediate.push('Review skill development resources');
        }

        // Short-term recommendations
        if (careerMatches && careerMatches.length > 0) {
            recommendations.shortTerm.push(`Research ${careerMatches[0].career.title} in depth`);
            recommendations.shortTerm.push('Connect with mentors in your areas of interest');
        }

        // Long-term recommendations
        recommendations.longTerm.push('Develop a career plan with specific milestones');
        recommendations.longTerm.push('Build a professional network in your chosen field');

        // Resources
        recommendations.resources = this.getRecommendedResources(analysis, careerMatches);

        return recommendations;
    }

    // Get recommended resources
    getRecommendedResources(analysis, careerMatches) {
        const resources = [];

        if (analysis.skillGaps && analysis.skillGaps.length > 0) {
            resources.push({
                type: 'Courses',
                title: 'Skill Development Courses',
                description: 'Online courses to improve your weaker areas',
                link: '/videos.html'
            });
        }

        if (careerMatches && careerMatches.length > 0) {
            resources.push({
                type: 'Mentorship',
                title: 'Career Mentors',
                description: 'Connect with professionals in your recommended careers',
                link: '/mentors.html'
            });
        }

        resources.push({
            type: 'Community',
            title: 'Discussion Forums',
            description: 'Join conversations with peers and experts',
            link: '/community.html'
        });

        return resources;
    }

    // Generate insights from analysis
    generateInsights(analysis) {
        const insights = [];

        if (analysis.type === 'personality') {
            const dominant = analysis.dominantTraits[0];
            if (dominant) {
                insights.push(`Your strongest trait is ${dominant.name} (${dominant.score}%)`);
            }

            if (analysis.careerImplications.length > 0) {
                insights.push('Career Insight: ' + analysis.careerImplications[0]);
            }
        }

        if (analysis.type === 'skills') {
            if (analysis.topSkills.length > 0) {
                const topSkill = analysis.topSkills[0];
                insights.push(`Your top skill is ${topSkill[0]} (${topSkill[1]}%)`);
            }

            if (analysis.skillGaps.length > 0) {
                insights.push(`Consider developing your ${analysis.skillGaps[0].skill.toLowerCase()} skills`);
            }
        }

        if (analysis.type === 'aptitude') {
            if (analysis.strengths.length > 0) {
                const topStrength = analysis.strengths[0];
                insights.push(`You excel in ${topStrength.area} reasoning (${topStrength.score}%)`);
            }
        }

        return insights;
    }

    // Compare results with previous assessments
    async compareWithPrevious(userId, currentResults) {
        try {
            const previousAssessments = await window.db
                .collection('users')
                .doc(userId)
                .collection('assessments')
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get();

            const comparisons = [];
            previousAssessments.forEach(doc => {
                const prev = doc.data();
                if (prev.type === currentResults.assessmentType) {
                    comparisons.push({
                        date: prev.timestamp.toDate(),
                        previousScore: prev.scores?.percentage || 0,
                        currentScore: currentResults.scores.percentage,
                        improvement: currentResults.scores.percentage - (prev.scores?.percentage || 0)
                    });
                }
            });

            return comparisons;
        } catch (error) {
            console.error('Error comparing assessments:', error);
            return [];
        }
    }

    // Export results in different formats
    exportResults(results, format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(results, null, 2);
            case 'csv':
                return this.convertToCSV(results);
            case 'pdf':
                return this.generatePDF(results);
            default:
                return results;
        }
    }

    // Convert results to CSV format
    convertToCSV(results) {
        const headers = ['Category', 'Score', 'Details'];
        const rows = [];

        if (results.analysis.traits) {
            Object.entries(results.analysis.traits).forEach(([trait, score]) => {
                rows.push([trait, score, 'Personality Trait']);
            });
        }

        if (results.careerMatches) {
            results.careerMatches.forEach(match => {
                rows.push([match.career.title, match.matchScore, 'Career Match']);
            });
        }

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    // Generate PDF (placeholder - would need pdf library)
    generatePDF(results) {
        // This would require a PDF generation library like jsPDF
        console.log('PDF generation would be implemented with a PDF library');
        return 'PDF generation not implemented';
    }
}

// Export for use in other files
window.ResultsEngine = ResultsEngine;