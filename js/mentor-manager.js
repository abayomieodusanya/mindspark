// MindSpark Mentor Matching System
// ====================================
// Mentor profiles and smart matching algorithm

class MentorManager {
  // Sample mentor profiles
  static MENTORS = [
    {
      id: 'mentor-001',
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      yearsExperience: 8,
      bio: 'Passionate about helping young developers launch their careers. I specialize in full-stack development and love mentoring college students.',
      skills: ['Python', 'JavaScript', 'React', 'Cloud Architecture', 'System Design'],
      expertise: ['Software Engineering', 'Technology', 'Career Development'],
      fields: ['Technology & IT', 'Software Development'],
      interests: ['Teaching', 'Innovation', 'Building Products'],
      availability: 'available',
      hourlyRate: 0, // Free mentoring
      profileImage: 'https://via.placeholder.com/150?text=Sarah',
      email: 'sarah@mindspark.com',
      certifications: ['AWS Certified Solutions Architect', 'Google Certified Professional Cloud Architect'],
      languages: ['English', 'Mandarin'],
      sessionPreference: 'Virtual',
      maxMentees: 5,
      currentMentees: 2,
      bio_long: 'I started as a junior developer fresh out of college and worked my way up to senior engineer at Google. I love sharing what I\'ve learned and helping younger people navigate the tech industry. I\'m particularly passionate about helping underrepresented groups in tech succeed.'
    },
    {
      id: 'mentor-002',
      name: 'Dr. James Martinez',
      title: 'Clinical Psychologist',
      company: 'Private Practice',
      yearsExperience: 12,
      bio: 'Specializing in adolescent mental health and career counseling. I help teens navigate stress, anxiety, and identity questions.',
      skills: ['Psychotherapy', 'Career Counseling', 'Mental Health Assessment', 'Cognitive Behavioral Therapy'],
      expertise: ['Mental Health', 'Career Counseling', 'Adolescent Psychology'],
      fields: ['Healthcare', 'Mental Health Services'],
      interests: ['Helping Others', 'Mental Wellness', 'Education'],
      availability: 'available',
      hourlyRate: 150,
      profileImage: 'https://via.placeholder.com/150?text=James',
      email: 'james@mindspark.com',
      certifications: ['Licensed Clinical Psychologist', 'Board Certified', 'Cognitive Behavioral Therapy Specialist'],
      languages: ['English', 'Spanish'],
      sessionPreference: 'Virtual & In-person',
      maxMentees: 4,
      currentMentees: 1,
      bio_long: 'With over a decade of experience working with teens, I understand the unique challenges you face. From academic stress to finding your path, I\'m here to help you develop resilience and clarity about your future.'
    },
    {
      id: 'mentor-003',
      name: 'Priya Patel',
      title: 'Product Manager',
      company: 'Meta',
      yearsExperience: 6,
      bio: 'I help ambitious students develop product thinking and leadership skills. Background in engineering turned product.',
      skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Leadership', 'Communication'],
      expertise: ['Product Management', 'Tech Leadership', 'Business Development'],
      fields: ['Technology & IT', 'Business & Finance'],
      interests: ['Product Development', 'Leadership', 'Mentoring'],
      availability: 'available',
      hourlyRate: 0,
      profileImage: 'https://via.placeholder.com/150?text=Priya',
      email: 'priya@mindspark.com',
      certifications: ['Reforge Product Strategy Certificate', 'Google Analytics Certified'],
      languages: ['English', 'Gujarati', 'Hindi'],
      sessionPreference: 'Virtual',
      maxMentees: 3,
      currentMentees: 1,
      bio_long: 'I transitioned from engineering to product management and it\'s been the best decision. I love helping students figure out if product is right for them and building their skills in this field.'
    },
    {
      id: 'mentor-004',
      name: 'Marcus Johnson',
      title: 'High School Teacher & Debate Coach',
      company: 'Lincoln High School',
      yearsExperience: 10,
      bio: 'Dedicated educator teaching English and leading debate team. I mentor students on public speaking, critical thinking, and finding their voice.',
      skills: ['Public Speaking', 'Critical Thinking', 'Essay Writing', 'Research', 'Leadership'],
      expertise: ['Education', 'Communication', 'Personal Development'],
      fields: ['Education', 'Communication & Media'],
      interests: ['Teaching', 'Debate', 'Empowering Youth'],
      availability: 'available',
      hourlyRate: 0,
      profileImage: 'https://via.placeholder.com/150?text=Marcus',
      email: 'marcus@mindspark.com',
      certifications: ['Certified Debate Coach', 'Master\'s in Education', 'Public Speaking Certified'],
      languages: ['English'],
      sessionPreference: 'Virtual & In-person',
      maxMentees: 6,
      currentMentees: 3,
      bio_long: 'As a high school teacher, I see potential in every student. I\'m here to help you develop confidence in public speaking, writing, and critical thinking - skills that will serve you in any career.'
    },
    {
      id: 'mentor-005',
      name: 'Lisa Wong',
      title: 'Environmental Consultant',
      company: 'EcoSolutions Inc',
      yearsExperience: 9,
      bio: 'Passionate about sustainability and helping the next generation of environmental leaders. I mentor on both career paths and environmental impact.',
      skills: ['Environmental Management', 'GIS', 'Data Analysis', 'Project Management', 'Writing'],
      expertise: ['Environmental Science', 'Sustainability', 'Conservation'],
      fields: ['Environmental & Agriculture', 'Sustainability'],
      interests: ['Environment', 'Conservation', 'Education', 'Sustainability'],
      availability: 'available',
      hourlyRate: 75,
      profileImage: 'https://via.placeholder.com/150?text=Lisa',
      email: 'lisa@mindspark.com',
      certifications: ['Certified Environmental Professional', 'GIS Specialist', 'LEED Accredited Professional'],
      languages: ['English', 'Mandarin'],
      sessionPreference: 'Virtual',
      maxMentees: 4,
      currentMentees: 2,
      bio_long: 'I\'ve spent my career working on environmental challenges that matter. If you care about the planet and want to make a difference, let\'s talk about how you can build a career doing what you love.'
    },
    {
      id: 'mentor-006',
      name: 'David Kim',
      title: 'Graphic Designer & Creative Director',
      company: 'Kim Creative Studio',
      yearsExperience: 11,
      bio: 'I help aspiring designers build their portfolios and land their first design job. From Adobe skills to design thinking.',
      skills: ['Adobe Creative Suite', 'UI/UX Design', 'Branding', 'Web Design', 'Art Direction'],
      expertise: ['Graphic Design', 'Creative Industries', 'Design Thinking'],
      fields: ['Creative & Arts', 'Technology & IT'],
      interests: ['Design', 'Creativity', 'Technology', 'Mentoring'],
      availability: 'available',
      hourlyRate: 100,
      profileImage: 'https://via.placeholder.com/150?text=David',
      email: 'david@mindspark.com',
      certifications: ['Adobe Certified Associate', 'User Experience Design Certificate'],
      languages: ['English', 'Korean'],
      sessionPreference: 'Virtual',
      maxMentees: 5,
      currentMentees: 2,
      bio_long: 'Design changed my life, and I want to help you discover if it\'s right for you. I\'ll help you build a portfolio that lands interviews and teach you the mindset successful designers have.'
    },
    {
      id: 'mentor-007',
      name: 'Amara Okafor',
      title: 'Business Analyst & Founder',
      company: 'African Tech Startups Founder',
      yearsExperience: 7,
      bio: 'Entrepreneur and business analyst passionate about helping young people develop business thinking and start their own ventures.',
      skills: ['Business Strategy', 'Analytics', 'Entrepreneurship', 'Leadership', 'Negotiation'],
      expertise: ['Business & Finance', 'Entrepreneurship', 'Business Development'],
      fields: ['Business & Finance', 'Entrepreneurship'],
      interests: ['Business', 'Innovation', 'Mentoring', 'Empowerment'],
      availability: 'available',
      hourlyRate: 0,
      profileImage: 'https://via.placeholder.com/150?text=Amara',
      email: 'amara@mindspark.com',
      certifications: ['Business Administration Degree', 'Lean Startup Certified'],
      languages: ['English', 'Yoruba', 'French'],
      sessionPreference: 'Virtual',
      maxMentees: 4,
      currentMentees: 2,
      bio_long: 'I started with nothing and built a successful business. I want to help young people develop the thinking and skills needed to be successful in business, whether working for others or starting their own company.'
    },
    {
      id: 'mentor-008',
      name: 'Dr. Sophia Russo',
      title: 'Mechanical Engineer & Professor',
      company: 'MIT University',
      yearsExperience: 14,
      bio: 'University professor and engineer who loves inspiring the next generation of engineers. I mentor on both technical skills and career strategy.',
      skills: ['Mechanical Engineering', 'CAD Design', 'Robotics', 'Manufacturing', 'Research'],
      expertise: ['Engineering', 'Mathematics', 'Innovation'],
      fields: ['Engineering', 'Technology & IT'],
      interests: ['Engineering', 'Innovation', 'Education', 'Research'],
      availability: 'available',
      hourlyRate: 0,
      profileImage: 'https://via.placeholder.com/150?text=Sophia',
      email: 'sophia@mindspark.com',
      certifications: ['PhD in Mechanical Engineering', 'Professional Engineer License', 'Robotics Specialist'],
      languages: ['English', 'Italian'],
      sessionPreference: 'Virtual',
      maxMentees: 3,
      currentMentees: 1,
      bio_long: 'Engineering is about solving real-world problems. If you\'re curious about how things work and want to design the future, I\'m here to guide you through your engineering journey.'
    }
  ];

  // Match mentors to a student based on skills needed
  static matchMentors(studentSkills, studentInterests, limit = 5) {
    const matches = this.MENTORS.filter(mentor => mentor.availability === 'available')
      .map(mentor => {
        let score = 0;

        // Score based on skill overlap
        studentSkills.forEach(skill => {
          if (mentor.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
            score += 2;
          }
        });

        // Score based on interest overlap
        studentInterests.forEach(interest => {
          if (mentor.interests.some(i => i.toLowerCase().includes(interest.toLowerCase()))) {
            score += 1;
          }
        });

        // Bonus points for availability
        if (mentor.currentMentees < mentor.maxMentees) {
          score += 1;
        }

        return { mentor, score };
      })
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(m => m.mentor);

    return matches;
  }

  // Get mentor by ID
  static getMentorById(mentorId) {
    return this.MENTORS.find(m => m.id === mentorId);
  }

  // Get all available mentors
  static getAvailableMentors() {
    return this.MENTORS.filter(m => m.availability === 'available');
  }

  // Get mentors by expertise
  static getMentorsByExpertise(expertise) {
    return this.MENTORS.filter(m =>
      m.expertise.some(e => e.toLowerCase().includes(expertise.toLowerCase()))
    );
  }

  // Get mentors by field
  static getMentorsByField(field) {
    return this.MENTORS.filter(m =>
      m.fields.some(f => f.toLowerCase() === field.toLowerCase())
    );
  }

  // Search mentors
  static searchMentors(searchTerm) {
    const search = searchTerm.toLowerCase();
    return this.MENTORS.filter(m =>
      m.name.toLowerCase().includes(search) ||
      m.title.toLowerCase().includes(search) ||
      m.expertise.some(e => e.toLowerCase().includes(search)) ||
      m.bio.toLowerCase().includes(search)
    );
  }

  // Contact mentor (for now, just returns contact info)
  static getControlInfo(mentorId) {
    const mentor = this.getMentorById(mentorId);
    return mentor ? {
      name: mentor.name,
      email: mentor.email,
      message: `You can contact ${mentor.name} to discuss mentorship opportunities.`
    } : null;
  }

  // Rate mentor (would be saved to database)
  static async rateMentor(mentorId, rating, review) {
    console.log(`Mentor ${mentorId} rated: ${rating}/5 - ${review}`);
    // TODO: Save to Firebase when ready
  }

  // Get mentor specialties
  static getSpecialties() {
    const specialties = new Set();
    this.MENTORS.forEach(m => {
      m.expertise.forEach(e => specialties.add(e));
    });
    return Array.from(specialties);
  }

  // Get all mentors
  static getAllMentors() {
    return this.MENTORS;
  }
}
