// MindSpark Results Dashboard
// ====================================
// Component for displaying assessment results and progress tracking

class ResultsDashboard {

    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.resultsEngine = new ResultsEngine();
    }

    // Load and display user's assessment history
    async loadUserDashboard(userId) {
        try {
            const assessments = await this.getUserAssessments(userId);
            const stats = this.calculateStats(assessments);
            const progress = await this.calculateProgress(userId, assessments);

            this.renderDashboard(assessments, stats, progress);
        } catch (error) {
            console.error('Error loading dashboard:', error);
            this.showError('Failed to load assessment dashboard');
        }
    }

    // Get user's assessment history
    async getUserAssessments(userId) {
        try {
            const snapshot = await window.db
                .collection('users')
                .doc(userId)
                .collection('assessments')
                .orderBy('timestamp', 'desc')
                .get();

            const assessments = [];
            snapshot.forEach(doc => {
                assessments.push({ id: doc.id, ...doc.data() });
            });

            return assessments;
        } catch (error) {
            console.error('Error fetching assessments:', error);
            return [];
        }
    }

    // Calculate dashboard statistics
    calculateStats(assessments) {
        const stats = {
            totalAssessments: assessments.length,
            averageScore: 0,
            personalityTypes: new Set(),
            topSkills: new Map(),
            careerMatches: new Map(),
            recentActivity: []
        };

        if (assessments.length === 0) return stats;

        let totalScore = 0;
        const recentAssessments = assessments.slice(0, 5);

        assessments.forEach(assessment => {
            // Calculate average score
            if (assessment.scores && assessment.scores.percentage) {
                totalScore += assessment.scores.percentage;
            }

            // Collect personality types
            if (assessment.analysis && assessment.analysis.personalityType) {
                stats.personalityTypes.add(assessment.analysis.personalityType);
            }

            // Collect top skills
            if (assessment.analysis && assessment.analysis.topSkills) {
                assessment.analysis.topSkills.forEach(([skill, score]) => {
                    stats.topSkills.set(skill, (stats.topSkills.get(skill) || 0) + score);
                });
            }

            // Collect career matches
            if (assessment.careerMatches) {
                assessment.careerMatches.forEach(match => {
                    stats.careerMatches.set(match.career.title,
                        (stats.careerMatches.get(match.career.title) || 0) + match.matchScore);
                });
            }
        });

        stats.averageScore = Math.round(totalScore / assessments.length);
        stats.recentActivity = recentAssessments;

        // Convert maps to sorted arrays
        stats.topSkills = Array.from(stats.topSkills.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        stats.careerMatches = Array.from(stats.careerMatches.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        stats.personalityTypes = Array.from(stats.personalityTypes);

        return stats;
    }

    // Calculate progress over time
    async calculateProgress(userId, assessments) {
        const progress = {
            scoreImprovement: 0,
            skillsDevelopment: [],
            assessmentFrequency: 0
        };

        if (assessments.length < 2) return progress;

        // Calculate score improvement
        const firstAssessment = assessments[assessments.length - 1];
        const latestAssessment = assessments[0];

        if (firstAssessment.scores && latestAssessment.scores) {
            progress.scoreImprovement = latestAssessment.scores.percentage - firstAssessment.scores.percentage;
        }

        // Calculate assessment frequency (assessments per month)
        if (assessments.length >= 2) {
            const firstDate = assessments[assessments.length - 1].timestamp.toDate();
            const lastDate = assessments[0].timestamp.toDate();
            const monthsDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 30);

            if (monthsDiff > 0) {
                progress.assessmentFrequency = Math.round(assessments.length / monthsDiff * 10) / 10;
            }
        }

        // Track skills development
        const skillProgress = new Map();

        assessments.forEach(assessment => {
            if (assessment.analysis && assessment.analysis.topSkills) {
                assessment.analysis.topSkills.forEach(([skill, score]) => {
                    if (!skillProgress.has(skill)) {
                        skillProgress.set(skill, []);
                    }
                    skillProgress.get(skill).push({
                        date: assessment.timestamp.toDate(),
                        score: score
                    });
                });
            }
        });

        // Calculate improvement for each skill
        skillProgress.forEach((scores, skill) => {
            if (scores.length >= 2) {
                scores.sort((a, b) => a.date - b.date);
                const firstScore = scores[0].score;
                const lastScore = scores[scores.length - 1].score;
                const improvement = lastScore - firstScore;

                if (Math.abs(improvement) > 5) { // Only show significant changes
                    progress.skillsDevelopment.push({
                        skill,
                        improvement,
                        trend: improvement > 0 ? 'improving' : 'declining'
                    });
                }
            }
        });

        return progress;
    }

    // Render the complete dashboard
    renderDashboard(assessments, stats, progress) {
        if (!this.container) return;

        const dashboardHTML = `
            <div class="results-dashboard">
                <!-- Overview Stats -->
                <div class="dashboard-section">
                    <h3><i class="fas fa-chart-bar"></i> Assessment Overview</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">${stats.totalAssessments}</div>
                            <div class="stat-label">Total Assessments</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${stats.averageScore}%</div>
                            <div class="stat-label">Average Score</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${progress.assessmentFrequency}</div>
                            <div class="stat-label">Assessments/Month</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number ${progress.scoreImprovement >= 0 ? 'positive' : 'negative'}">
                                ${progress.scoreImprovement > 0 ? '+' : ''}${progress.scoreImprovement}%
                            </div>
                            <div class="stat-label">Score Improvement</div>
                        </div>
                    </div>
                </div>

                <!-- Personality Insights -->
                ${stats.personalityTypes.length > 0 ? `
                <div class="dashboard-section">
                    <h3><i class="fas fa-user-circle"></i> Personality Profile</h3>
                    <div class="personality-types">
                        ${stats.personalityTypes.map(type => `
                            <span class="personality-badge">${type}</span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Top Skills -->
                ${stats.topSkills.length > 0 ? `
                <div class="dashboard-section">
                    <h3><i class="fas fa-star"></i> Your Top Skills</h3>
                    <div class="skills-chart">
                        ${stats.topSkills.map(([skill, score]) => `
                            <div class="skill-bar">
                                <div class="skill-name">${skill}</div>
                                <div class="skill-progress">
                                    <div class="skill-progress-fill" style="width: ${score / stats.topSkills[0][1] * 100}%"></div>
                                </div>
                                <div class="skill-score">${score}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Skills Development -->
                ${progress.skillsDevelopment.length > 0 ? `
                <div class="dashboard-section">
                    <h3><i class="fas fa-chart-line"></i> Skills Development</h3>
                    <div class="development-list">
                        ${progress.skillsDevelopment.map(dev => `
                            <div class="development-item ${dev.trend}">
                                <span class="skill-name">${dev.skill}</span>
                                <span class="improvement ${dev.trend}">
                                    ${dev.improvement > 0 ? '+' : ''}${dev.improvement}%
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Career Matches -->
                ${stats.careerMatches.length > 0 ? `
                <div class="dashboard-section">
                    <h3><i class="fas fa-briefcase"></i> Career Interests</h3>
                    <div class="career-list">
                        ${stats.careerMatches.map(([career, score]) => `
                            <div class="career-item">
                                <div class="career-name">${career}</div>
                                <div class="career-score">${Math.round(score / stats.totalAssessments)}% avg match</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Recent Activity -->
                ${stats.recentActivity.length > 0 ? `
                <div class="dashboard-section">
                    <h3><i class="fas fa-history"></i> Recent Assessments</h3>
                    <div class="activity-list">
                        ${stats.recentActivity.map(assessment => `
                            <div class="activity-item">
                                <div class="activity-type">${assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)} Assessment</div>
                                <div class="activity-score">${assessment.scores?.percentage || 0}%</div>
                                <div class="activity-date">${assessment.timestamp.toDate().toLocaleDateString()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Action Buttons -->
                <div class="dashboard-section">
                    <h3><i class="fas fa-rocket"></i> Next Steps</h3>
                    <div class="action-buttons">
                        <a href="assessment.html" class="btn btn-primary">
                            <i class="fas fa-plus"></i> Take New Assessment
                        </a>
                        <a href="mentors.html" class="btn btn-outline-primary">
                            <i class="fas fa-user-friends"></i> Find Mentors
                        </a>
                        <a href="videos.html" class="btn btn-outline-primary">
                            <i class="fas fa-play-circle"></i> Skill Development
                        </a>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = dashboardHTML;
        this.addDashboardStyles();
    }

    // Add dashboard-specific styles
    addDashboardStyles() {
        if (document.getElementById('dashboard-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'dashboard-styles';
        styles.textContent = `
            .results-dashboard {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            .dashboard-section {
                background: white;
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .dashboard-section h3 {
                color: #333;
                margin-bottom: 20px;
                font-size: 1.4em;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
            }

            .stat-card {
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }

            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }

            .stat-number.positive {
                color: #28a745;
            }

            .stat-number.negative {
                color: #dc3545;
            }

            .stat-label {
                color: #666;
                font-size: 0.9em;
            }

            .personality-types {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .personality-badge {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: 500;
            }

            .skills-chart {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .skill-bar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .skill-name {
                min-width: 120px;
                font-weight: 500;
            }

            .skill-progress {
                flex: 1;
                height: 12px;
                background: #e9ecef;
                border-radius: 6px;
                overflow: hidden;
            }

            .skill-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                border-radius: 6px;
                transition: width 0.3s ease;
            }

            .skill-score {
                min-width: 50px;
                text-align: right;
                font-weight: 500;
                color: #667eea;
            }

            .development-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .development-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-radius: 5px;
            }

            .development-item.improving {
                border-left: 4px solid #28a745;
            }

            .development-item.declining {
                border-left: 4px solid #dc3545;
            }

            .improvement.improving {
                color: #28a745;
                font-weight: bold;
            }

            .improvement.declining {
                color: #dc3545;
                font-weight: bold;
            }

            .career-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .career-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 5px;
                border-left: 4px solid #17a2b8;
            }

            .career-name {
                font-weight: 500;
            }

            .career-score {
                color: #17a2b8;
                font-weight: bold;
            }

            .activity-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .activity-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                background: #f8f9fa;
                border-radius: 5px;
            }

            .activity-type {
                font-weight: 500;
            }

            .activity-score {
                color: #667eea;
                font-weight: bold;
            }

            .activity-date {
                color: #666;
                font-size: 0.9em;
            }

            .action-buttons {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }

            .action-buttons .btn {
                flex: 1;
                min-width: 200px;
            }

            @media (max-width: 768px) {
                .results-dashboard {
                    padding: 10px;
                }

                .dashboard-section {
                    padding: 15px;
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .skill-bar {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                }

                .action-buttons {
                    flex-direction: column;
                }

                .action-buttons .btn {
                    min-width: auto;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Show error message
    showError(message) {
        if (this.container) {
            this.container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    ${message}
                </div>
            `;
        }
    }

    // Export dashboard data
    async exportDashboard(userId, format = 'json') {
        try {
            const assessments = await this.getUserAssessments(userId);
            const stats = this.calculateStats(assessments);
            const progress = await this.calculateProgress(userId, assessments);

            const exportData = {
                userId,
                exportDate: new Date(),
                assessments,
                statistics: stats,
                progress,
                summary: {
                    totalAssessments: stats.totalAssessments,
                    averageScore: stats.averageScore,
                    topSkills: stats.topSkills,
                    personalityTypes: stats.personalityTypes,
                    scoreImprovement: progress.scoreImprovement
                }
            };

            return this.resultsEngine.exportResults(exportData, format);
        } catch (error) {
            console.error('Error exporting dashboard:', error);
            throw error;
        }
    }
}

// Export for use in other files
window.ResultsDashboard = ResultsDashboard;