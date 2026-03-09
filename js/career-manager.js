// MindSpark Career Paths Database
// ====================================
// Comprehensive career database with detailed information

class CareerManager {
  // Sample careers database
  static CAREERS = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'Design, develop, and test software applications and systems.',
      category: 'Technology & IT',
      salaryRange: { min: 75000, max: 180000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Programming', 'Problem Solving', 'Teamwork', 'Communication', 'Attention to Detail'],
      education: ['Bachelor\'s in Computer Science', 'Coding Bootcamp', 'Self-taught + Portfolio'],
      experienceLevel: 'Entry: 0-2 years | Mid-level: 2-5 years | Senior: 5+ years',
      jobOutlook: 'Growing 13% through 2032 (Much faster than average)',
      workEnvironment: 'Office, Remote, or Hybrid - Tech companies, startups, enterprises',
      dayToDay: [
        'Write and test code',
        'Debug software issues',
        'Collaborate with team members',
        'Attend meetings and code reviews',
        'Continuously learn new technologies'
      ],
      interests: ['Technology', 'Problem Solving', 'Building Things', 'Continuous Learning'],
      personalityTraits: ['Analytical', 'Detail-oriented', 'Patient', 'Creative'],
      relatedCareers: ['Web Developer', 'Data Scientist', 'DevOps Engineer', 'Cloud Architect'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Associate', 'Certified Kubernetes Administrator'],
      tipps: [
        'Build a GitHub portfolio with projects',
        'Learn Git version control',
        'Practice coding challenges on LeetCode',
        'Contribute to open-source projects',
        'Specialize in a programming language'
      ]
    },
    {
      id: 'physician',
      title: 'Physician (Doctor)',
      description: 'Diagnose and treat medical conditions, perform surgeries, and care for patients.',
      category: 'Healthcare',
      salaryRange: { min: 200000, max: 500000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Critical Thinking', 'Compassion', 'Communication', 'Problem Solving', 'Attention to Detail'],
      education: ['Bachelor\'s degree', 'MD or DO degree (4 years)', 'Residency (3-7 years)'],
      experienceLevel: 'Entry: Residency | Mid-level: 2-5 years practice | Experienced: 5+ years',
      jobOutlook: 'Growing 7% through 2032 (Faster than average)',
      workEnvironment: 'Hospitals, clinics, private practice, emergency rooms - Often on-call',
      dayToDay: [
        'Examine and interview patients',
        'Order and interpret tests',
        'Prescribe treatments',
        'Perform surgeries (specialty-dependent)',
        'Document patient records',
        'Continue medical education'
      ],
      interests: ['Helping Others', 'Science', 'Problem Solving', 'Health & Wellness'],
      personalityTraits: ['Compassionate', 'Decisive', 'Detail-oriented', 'Resilient'],
      relatedCareers: ['Nurse Practitioner', 'Physician Assistant', 'Surgeon', 'Psychiatrist'],
      certifications: ['Board Certification (specialty)', 'State Medical License', 'DEA License'],
      tipps: [
        'Maintain excellent grades in science classes',
        'Get volunteer experience at hospitals/clinics',
        'Prepare early for MCAT exam',
        'Shadow doctors to understand the work',
        'Build strong clinical experience'
      ]
    },
    {
      id: 'environmental-scientist',
      title: 'Environmental Scientist',
      description: 'Study environmental issues and develop solutions for pollution, climate change, and conservation.',
      category: 'Environmental & Agriculture',
      salaryRange: { min: 65000, max: 140000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Research', 'Data Analysis', 'Communication', 'Problem Solving', 'Fieldwork'],
      education: ['Bachelor\'s in Environmental Science', 'Master\'s degree (preferred)', 'Internships'],
      experienceLevel: 'Entry: 0-2 years | Experienced: 2+ years',
      jobOutlook: 'Growing 8% through 2032 (Faster than average)',
      workEnvironment: 'Government agencies, environmental firms, nonprofits, field sites, labs',
      dayToDay: [
        'Conduct field studies and collect samples',
        'Analyze data and create reports',
        'Develop environmental impact assessments',
        'Meet with stakeholders',
        'Propose conservation strategies',
        'Present findings'
      ],
      interests: ['Nature', 'Science & Discovery', 'Helping Others', 'Sustainability'],
      personalityTraits: ['Detail-oriented', 'Passionate', 'Analytical', 'Collaborative'],
      relatedCareers: ['Conservation Scientist', 'Geoscientist', 'Oceanographer', 'Climate Analyst'],
      certifications: ['GIS Certification', 'Environmental Compliance Specialist', 'Water Quality Analyst'],
      tipps: [
        'Participate in environmental projects and cleanups',
        'Take advanced science classes',
        'Get certified in GIS (Geographic Information Systems)',
        'Intern with environmental organizations',
        'Stay updated on environmental issues'
      ]
    },
    {
      id: 'graphic-designer',
      title: 'Graphic Designer',
      description: 'Create visual content for websites, marketing, branding, and digital/print media.',
      category: 'Creative & Arts',
      salaryRange: { min: 50000, max: 130000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Creativity', 'Communication', 'Technical (Adobe Suite)', 'Attention to Detail'],
      education: ['Bachelor\'s in Graphic Design', 'Design bootcamp', 'Self-taught with portfolio'],
      experienceLevel: 'Entry: Portfolio-based | Experience: 1-3 years | Senior: 3+ years',
      jobOutlook: 'Growing 3% through 2032 (As fast as average)',
      workEnvironment: 'Design studios, marketing agencies, in-house corporate design, freelance',
      dayToDay: [
        'Meet with clients to understand requirements',
        'Create design concepts',
        'Use design software (Adobe CC, Figma)',
        'Gather feedback and revise designs',
        'Present designs to stakeholders',
        'Collaborate with developers/marketers'
      ],
      interests: ['Art & Design', 'Creativity', 'Technology', 'Visual Communication'],
      personalityTraits: ['Creative', 'Detail-oriented', 'Communicative', 'Flexible'],
      relatedCareers: ['UX/UI Designer', 'Web Designer', 'Art Director', 'Illustrator'],
      certifications: ['Adobe Certified Associate', 'UI/UX Design Certificate', 'Web Design Certificate'],
      tipps: [
        'Build a strong portfolio on Behance or Dribbble',
        'Master Adobe Creative Suite',
        'Learn UI/UX design principles',
        'Follow design trends and best practices',
        'Take freelance projects to build experience'
      ]
    },
    {
      id: 'psychologist',
      title: 'Psychologist',
      description: 'Study human behavior and mental processes; provide counseling and therapy.',
      category: 'Healthcare',
      salaryRange: { min: 70000, max: 150000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Empathy', 'Communication', 'Research', 'Problem Solving', 'Active Listening'],
      education: ['Bachelor\'s in Psychology', 'Master\'s or PhD required', 'Licensing/certification'],
      experienceLevel: 'Entry: Doctorate + supervised experience | Experienced: 2+ years',
      jobOutlook: 'Growing 6% through 2032 (Faster than average)',
      workEnvironment: 'Mental health clinics, hospitals, private practice, schools, research facilities',
      dayToDay: [
        'Conduct psychological assessments',
        'Provide therapeutic counseling',
        'Document session notes',
        'Develop treatment plans',
        'Consult with medical teams',
        'Continue professional development'
      ],
      interests: ['Helping Others', 'Understanding People', 'Science', 'Mental Health'],
      personalityTraits: ['Empathetic', 'Patient', 'Non-judgmental', 'Analytical'],
      relatedCareers: ['Counselor', 'Therapist', 'Psychiatric Nurse', 'Social Worker'],
      certifications: ['State License (varies)', 'Certification in specialized therapy', 'Board Certification'],
      tipps: [
        'Volunteer with mental health organizations',
        'Get research experience during undergrad',
        'Maintain excellent grades in psychology',
        'Shadow practicing psychologists',
        'Develop strong written communication'
      ]
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      description: 'Develop and execute marketing strategies to promote products and services.',
      category: 'Business & Finance',
      salaryRange: { min: 70000, max: 160000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Communication', 'Leadership', 'Data Analysis', 'Creativity', 'Strategic Thinking'],
      education: ['Bachelor\'s in Marketing/Business', 'MBA helpful', 'Relevant certifications'],
      experienceLevel: 'Entry: Marketing coordinator (0-2 yrs) → Manager (3-5+ years)',
      jobOutlook: 'Growing 8% through 2032 (Faster than average)',
      workEnvironment: 'Corporate offices, agencies, startups, tech companies - Often fast-paced',
      dayToDay: [
        'Develop marketing campaigns',
        'Analyze market trends and data',
        'Manage marketing teams',
        'Set budgets and KPIs',
        'Collaborate across departments',
        'Present to executives'
      ],
      interests: ['Business', 'Communication', 'Creativity', 'Consumer Insights'],
      personalityTraits: ['Strategic', 'Creative', 'Data-driven', 'Leadership'],
      relatedCareers: ['Brand Manager', 'Digital Marketer', 'Product Manager', 'Social Media Manager'],
      certifications: ['Google Analytics', 'HubSpot Inbound Marketing', 'Digital Marketing Certificate'],
      tipps: [
        'Develop strong analytical skills',
        'Learn Google Analytics and marketing tools',
        'Build projects in digital marketing',
        'Understand consumer psychology',
        'Network in marketing community'
      ]
    },
    {
      id: 'mechanical-engineer',
      title: 'Mechanical Engineer',
      description: 'Design and develop mechanical equipment and machines.',
      category: 'Engineering',
      salaryRange: { min: 70000, max: 150000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Problem Solving', 'CAD Design', 'Physics/Math', 'Teamwork', 'Attention to Detail'],
      education: ['Bachelor\'s in Mechanical Engineering', 'FE exam', 'PE license (optional)'],
      experienceLevel: 'Entry: 0-2 years | Professional: 2+ years | Lead: 5+ years',
      jobOutlook: 'Growing 4% through 2032 (As fast as average)',
      workEnvironment: 'Automotive, aerospace, manufacturing, consulting firms - Mix of office/field',
      dayToDay: [
        'Design components using CAD software',
        'Run simulations and tests',
        'Review manufacturing plans',
        'Collaborate with teams',
        'Troubleshoot issues',
        'Comply with safety standards'
      ],
      interests: ['Building Things', 'Technology', 'Problem Solving', 'Engineering'],
      personalityTraits: ['Analytical', 'Detail-oriented', 'Creative', 'Practical'],
      relatedCareers: ['Aerospace Engineer', 'Automotive Engineer', 'Robotics Engineer'],
      certifications: ['Fundamentals of Engineering (FE)', 'Professional Engineer (PE)', 'CAD Specialist'],
      tipps: [
        'Excel in math and physics classes',
        'Learn CAD software (AutoCAD, SolidWorks)',
        'Build projects and prototypes',
        'Intern at engineering firms',
        'Pursue FE/PE certifications'
      ]
    },
    {
      id: 'teacher',
      title: 'Teacher (High School)',
      description: 'Educate and inspire students in a particular subject area.',
      category: 'Education',
      salaryRange: { min: 45000, max: 85000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Communication', 'Patience', 'Leadership', 'Creativity', 'Subject Matter Expertise'],
      education: ['Bachelor\'s degree + Teaching credential', 'Master\'s in Education helpful'],
      experienceLevel: 'Entry: New teacher | Experienced: 5+ years | Lead: 10+ years',
      jobOutlook: 'Growing 4% through 2032 (As fast as average) - Demand varies by subject/region',
      workEnvironment: 'Public/private schools, some hybrid/remote options, evening grading',
      dayToDay: [
        'Teach classes and lessons',
        'Create curriculum and assignments',
        'Grade papers and exams',
        'Meet with students and parents',
        'Attend professional development',
        'Supervise extracurriculars'
      ],
      interests: ['Helping Others', 'Education', 'Your subject area', 'Leadership'],
      personalityTraits: ['Patient', 'Passionate', 'Organized', 'Empathetic'],
      relatedCareers: ['Professor', 'Educational Consultant', 'Curriculum Developer', 'School Administrator'],
      certifications: ['Teaching License', 'Subject-specific credentials', 'Master\'s degree'],
      tipps: [
        'Excel in your subject area',
        'Get teaching experience (tutoring, volunteering)',
        'Develop effective communication skills',
        'Understand diverse learning needs',
        'Stay updated on education trends'
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Use data and analytics to solve business problems and drive decisions.',
      category: 'Technology & IT',
      salaryRange: { min: 100000, max: 200000, currency: 'USD', period: 'annual' },
      requiredSkills: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Communication', 'Problem Solving'],
      education: ['Bachelor\'s in Math/CS/Statistics', 'Master\'s helpful', 'Online certifications'],
      experienceLevel: 'Entry: Junior Data Scientist (0-2 yrs) | Experienced: 3-5+ years',
      jobOutlook: 'Growing 36% through 2032 (Much faster than average)',
      workEnvironment: 'Tech companies, tech startups, financial firms, healthcare - Often remote-friendly',
      dayToDay: [
        'Analyze large datasets',
        'Build predictive models',
        'Create visualizations and dashboards',
        'Present insights to stakeholders',
        'Optimize algorithms',
        'Collaborate with engineers/business teams'
      ],
      interests: ['Data & Analysis', 'Mathematics', 'Technology', 'Problem Solving'],
      personalityTraits: ['Analytical', 'Detail-oriented', 'Curious', 'Good communicator'],
      relatedCareers: ['Machine Learning Engineer', 'Data Analyst', 'Business Analyst', 'AI Researcher'],
      certifications: ['Google Data Analytics Certificate', 'IBM Data Science Professional', 'AWS Machine Learning'],
      tipps: [
        'Master Python and R programming',
        'Learn statistics and linear algebra',
        'Practice on Kaggle competitions',
        'Build portfolio projects with real datasets',
        'Understand business context'
      ]
    },
    {
      id: 'content-creator',
      title: 'Content Creator (YouTuber/Influencer)',
      description: 'Create engaging video, written, or social media content for audiences.',
      category: 'Creative & Arts',
      salaryRange: { min: 0, max: 500000, currency: 'USD', period: 'annual', note: 'Highly variable' },
      requiredSkills: ['Creativity', 'Communication', 'Video/Editing', 'Social Media', 'Consistency'],
      education: ['No formal requirement', 'Self-taught skills in editing/platform tools'],
      experienceLevel: 'Entry: Building audience (0-1 year) | Established: 1-3 years | Expert: 3+ years',
      jobOutlook: 'Growing rapidly as digital platforms expand',
      workEnvironment: 'Home studio, flexible schedule, audience-dependent income',
      dayToDay: [
        'Plan content ideas',
        'Create and film content',
        'Edit videos/photos',
        'Engage with audience',
        'Manage social media',
        'Collaborate with other creators',
        'Analyze metrics and trends'
      ],
      interests: ['Creativity', 'Technology', 'Communication', 'Your passion area'],
      personalityTraits: ['Creative', 'Authentic', 'Persistent', 'Comfortable on camera'],
      relatedCareers: ['Digital Marketer', 'Videographer', 'Social Media Manager', 'Podcaster'],
      certifications: ['Video editing bootcamps', 'Social media marketing courses'],
      tipps: [
        'Start creating content on your passion',
        'Learn video editing (Adobe Premiere, DaVinci Resolve)',
        'Study audience trends and analytics',
        'Stay authentic and consistent',
        'Diversify income streams (brands, Patreon, etc.)',
        'Understand platform algorithms'
      ]
    }
  ];

  // Get all careers
  static getAllCareers() {
    return this.CAREERS;
  }

  // Get career by ID
  static getCareerById(careerId) {
    return this.CAREERS.find(c => c.id === careerId);
  }

  // Get careers by category
  static getCareersByCategory(category) {
    return this.CAREERS.filter(c => c.category === category);
  }

  // Search careers
  static searchCareers(searchTerm) {
    const search = searchTerm.toLowerCase();
    return this.CAREERS.filter(c =>
      c.title.toLowerCase().includes(search) ||
      c.description.toLowerCase().includes(search) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(search))
    );
  }

  // Get careers by required skills
  static getCareersBySkills(skills) {
    return this.CAREERS.filter(career =>
      skills.some(skill =>
        career.requiredSkills.some(reqSkill =>
          reqSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  // Get careers by interests
  static getCareersByInterests(interests) {
    return this.CAREERS.filter(career =>
      interests.some(interest =>
        career.interests.some(careerInterest =>
          careerInterest.toLowerCase().includes(interest.toLowerCase())
        )
      )
    );
  }

  // Get unique categories
  static getCategories() {
    return [...new Set(this.CAREERS.map(c => c.category))];
  }

  // Get related careers
  static getRelatedCareers(careerId) {
    const career = this.getCareerById(careerId);
    if (!career) return [];

    return career.relatedCareers
      .map(title => this.CAREERS.find(c => c.title === title))
      .filter(c => c !== undefined);
  }

  // Get career recommendation based on skills and interests
  static getRecommendedCareers(skills, interests, limit = 5) {
    const bySkills = this.getCareersBySkills(skills);
    const byInterests = this.getCareersByInterests(interests);

    // Combine and score
    const scored = new Map();

    bySkills.forEach(career => {
      scored.set(career.id, (scored.get(career.id) || 0) + 2);
    });

    byInterests.forEach(career => {
      scored.set(career.id, (scored.get(career.id) || 0) + 1);
    });

    // Sort by score and return
    return Array.from(scored.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([careerId]) => this.getCareerById(careerId))
      .filter(c => c !== undefined);
  }

  // Save career to Firebase (for admin use)
  static async saveCareerToFirebase(careerData) {
    try {
      const docRef = await db.collection('careerPaths').add({
        ...careerData,
        createdAt: firebase.firestore.Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving career:', error);
      throw error;
    }
  }
}
