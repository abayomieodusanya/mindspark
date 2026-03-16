// MindSpark Blog Data & Management System
// ====================================
// Blog article database and content management

class BlogManager {
  // Sample blog articles - add more as needed
  static SAMPLE_ARTICLES = [
    {
      id: 'mental-health-101',
      title: 'Understanding Mental Health as a Teenager',
      excerpt: 'Learn about common mental health challenges teens face and practical strategies to manage stress and anxiety.',
      content: `
        <h2>Understanding Mental Health as a Teenager</h2>
        <p>Being a teenager comes with unique challenges. Your brain is still developing, emotions can feel intense, and you're navigating social pressures, academic expectations, and planning for your future.</p>
        
        <h3>Common Mental Health Challenges</h3>
        <ul>
          <li><strong>Anxiety & Stress</strong> - From academics, social situations, or future uncertainty</li>
          <li><strong>Depression</strong> - Persistent sadness or loss of interest in activities</li>
          <li><strong>Low Self-Esteem</strong> - Doubting your abilities or worth</li>
          <li><strong>Social Pressure</strong> - Fitting in and peer expectations</li>
          <li><strong>Identity Questions</strong> - Figuring out who you are</li>
        </ul>
        
        <h3>Practical Strategies to Cope</h3>
        <ol>
          <li><strong>Talk About It</strong> - Share feelings with trusted friends, family, or counselors</li>
          <li><strong>Stay Active</strong> - Exercise releases mood-boosting chemicals</li>
          <li><strong>Sleep Well</strong> - Aim for 8-10 hours per night</li>
          <li><strong>Limit Social Media</strong> - Compare less, live more</li>
          <li><strong>Practice Mindfulness</strong> - Meditation and breathing exercises help</li>
          <li><strong>Set Goals</strong> - Break big worries into manageable actions</li>
        </ol>
        
        <h3>When to Seek Help</h3>
        <p>If you're experiencing persistent sadness, anxiety that interferes with daily life, or thoughts of self-harm, reach out to:</p>
        <ul>
          <li>Your school counselor or therapist</li>
          <li>A trusted adult (parent, teacher, mentor)</li>
          <li>Crisis helplines (available 24/7)</li>
        </ul>
        
        <p>Remember: Seeking help is a sign of strength, not weakness. You're not alone.</p>
      `,
      author: 'Dr. Sarah Johnson',
      category: 'Mental Health',
      tags: ['mental health', 'stress management', 'teens', 'anxiety'],
      coverImage: 'https://via.placeholder.com/800x400?text=Mental+Health',
      readTime: '5 min read',
      createdAt: new Date('2026-03-01'),
      views: 245,
      likes: 42
    },
    {
      id: 'career-discovery-guide',
      title: 'A Teenager\'s Guide to Career Discovery',
      excerpt: 'Discover how to explore different career paths, understand your strengths, and make informed decisions about your future.',
      content: `
        <h2>A Teenager's Guide to Career Discovery</h2>
        <p>You don't need to have your entire life figured out now, but exploring career options early can help you make better choices.</p>
        
        <h3>Why Career Exploration Matters</h3>
        <p>Understanding different careers helps you:</p>
        <ul>
          <li>Choose relevant subjects and courses</li>
          <li>Develop valuable skills early</li>
          <li>Make informed decisions about education and internships</li>
          <li>Feel more confident about your future</li>
        </ul>
        
        <h3>How to Explore Careers</h3>
        <ol>
          <li><strong>Take Assessments</strong> - Try personality and skills tests to understand yourself</li>
          <li><strong>Research Online</strong> - Use Bureau of Labor Statistics or CareerOneStop</li>
          <li><strong>Informational Interviews</strong> - Talk to professionals in fields you're interested in</li>
          <li><strong>Job Shadowing</strong> - Spend a day seeing what someone in that role does</li>
          <li><strong>Internships</strong> - Get real experience in your field of interest</li>
          <li><strong>Try Side Projects</strong> - Build skills through personal projects</li>
        </ol>
        
        <h3>Key Factors to Consider</h3>
        <ul>
          <li><strong>Your Interests</strong> - What subjects excite you?</li>
          <li><strong>Your Strengths</strong> - What do people compliment you on?</li>
          <li><strong>Work Environment</strong> - Do you prefer working alone, in teams, or with clients?</li>
          <li><strong>Salary & Growth</strong> - What are the income prospects and advancement opportunities?</li>
          <li><strong>Work-Life Balance</strong> - How much time do you want to dedicate to work?</li>
          <li><strong>Job Outlook</strong> - Is the field growing or declining?</li>
        </ul>
        
        <h3>Remember</h3>
        <p>Your first career choice doesn't have to be your final one. Many successful people have changed careers multiple times. What matters is continuous learning and adaptation.</p>
      `,
      author: 'Career Coach Mike Chen',
      category: 'Career Guidance',
      tags: ['career', 'exploration', 'planning', 'future'],
      coverImage: 'https://via.placeholder.com/800x400?text=Career+Discovery',
      readTime: '6 min read',
      createdAt: new Date('2026-02-28'),
      views: 381,
      likes: 67
    },
    {
      id: 'study-tips-success',
      title: 'Proven Study Techniques That Actually Work',
      excerpt: 'Master effective study methods used by top students. Learn how to study smarter, not harder.',
      content: `
        <h2>Proven Study Techniques That Actually Work</h2>
        <p>Studying smart beats studying hard. These techniques are backed by cognitive science and used by top students worldwide.</p>
        
        <h3>1. The Pomodoro Technique</h3>
        <p>Study for 25 minutes, then take a 5-minute break. After four sessions, take a 15-30 minute break.</p>
        <ul>
          <li>Maintains focus and prevents burnout</li>
          <li>Works especially well for difficult subjects</li>
          <li>Tracks how much time you actually spend studying</li>
        </ul>
        
        <h3>2. Active Recall & Spaced Repetition</h3>
        <p>Instead of re-reading, test yourself on the material at increasing intervals.</p>
        <ul>
          <li>Review after 1 day, 3 days, 1 week, 2 weeks, 1 month</li>
          <li>Use flashcards apps (Anki, Quizlet)</li>
          <li>Practice problems instead of reading examples</li>
        </ul>
        
        <h3>3. The Feynman Technique</h3>
        <p>Explain a concept out loud as if teaching it to someone else.</p>
        <ul>
          <li>Find gaps in your understanding</li>
          <li>Solidify knowledge in your memory</li>
          <li>Works for any subject</li>
        </ul>
        
        <h3>4. Mind Mapping</h3>
        <p>Create visual diagrams connecting related concepts.</p>
        <ul>
          <li>Better than linear notes for understanding relationships</li>
          <li>Engages multiple parts of your brain</li>
          <li>Great for exam preparation</li>
        </ul>
        
        <h3>5. Study in Different Locations</h3>
        <p>Change where you study periodically.</p>
        <ul>
          <li>Prevents context-dependent memory</li>
          <li>Keeps studying from becoming boring</li>
          <li>Helps knowledge transfer to tests</li>
        </ul>
        
        <h3>Pro Tips</h3>
        <ul>
          <li>Start studying 3+ days before the test</li>
          <li>Get 8 hours of sleep before exams</li>
          <li>Organize study sessions by difficulty (hard material when you're fresh)</li>
          <li>Find your peak productivity hours</li>
          <li>Study with purpose, not just time spent</li>
        </ul>
      `,
      author: 'Education Expert Lisa Wong',
      category: 'Study Tips',
      tags: ['studying', 'learning', 'productivity', 'success'],
      coverImage: 'https://via.placeholder.com/800x400?text=Study+Tips',
      readTime: '7 min read',
      createdAt: new Date('2026-02-25'),
      views: 523,
      likes: 89
    },
    {
      id: 'overcoming-imposter-syndrome',
      title: 'Overcoming Imposter Syndrome as a Teenager',
      excerpt: 'Feel like you\'re not good enough? Discover that imposter syndrome is common and learn how to overcome it.',
      content: `
        <h2>Overcoming Imposter Syndrome as a Teenager</h2>
        <p>Do you feel like you're not smart enough, talented enough, or deserving of your achievements? You might be experiencing imposter syndrome. Here's the truth: you're not alone, and it's completely normal.</p>
        
        <h3>What is Imposter Syndrome?</h3>
        <p>Imposter syndrome is the persistent belief that your success is due to luck or external factors, not your own abilities. People with imposter syndrome often:</p>
        <ul>
          <li>Doubt their skills despite evidence of competence</li>
          <li>Attribute success to luck or help from others</li>
          <li>Fear being exposed as a "fraud"</li>
          <li>Set unrealistically high standards</li>
          <li>Struggle to accept compliments</li>
        </ul>
        
        <h3>Why Teenagers Experience It</h3>
        <ul>
          <li><strong>New Environments</strong> - New school, new friends, higher academic standards</li>
          <li><strong>Comparison Culture</strong> - Social media shows everyone's highlight reel</li>
          <li><strong>Identity Formation</strong> - Still figuring out who you are</li>
          <li><strong>Growth Periods</strong> - Learning something new feels like failure</li>
          <li><strong>Perfectionism</strong> - You hold yourself to unrealistic standards</li>
        </ul>
        
        <h3>How to Overcome It</h3>
        
        <h4>1. Recognize the Pattern</h4>
        <p>Awareness is the first step. When you catch yourself thinking "I don't deserve this," pause and question it.</p>
        
        <h4>2. Document Your Achievements</h4>
        <p>Keep an "achievement log" with:</p>
        <ul>
          <li>Grades and test scores</li>
          <li>Positive feedback from teachers/friends</li>
          <li>Skills you've learned</li>
          <li>Challenges you've overcome</li>
        </ul>
        <p>Review this when self-doubt creeps in.</p>
        
        <h4>3. Reframe Your Mindset</h4>
        <p>Replace negative thoughts with realistic ones:</p>
        <ul>
          <li>"I got lucky" → "I prepared well and it paid off"</li>
          <li>"I'm not good enough" → "I'm still learning and growing"</li>
          <li>"Everyone else is better" → "Everyone is struggling with something"</li>
        </ul>
        
        <h4>4. Embrace the Learning Mindset</h4>
        <p>View challenges as opportunities to grow, not threats to your image. Mistakes are proof you're learning, not proof you're inadequate.</p>
        
        <h4>5. Talk About It</h4>
        <p>Share your feelings with trusted friends, family, or a mentor. You'll likely find others feel the same way.</p>
        
        <h4>6. Celebrate Small Wins</h3>
        <p>Don't wait for the big achievements. Celebrate every step forward.</p>
        
        <h3>The Reality Check</h3>
        <p>If you earned it, you deserve it. Your success might involve luck, but so does everyone's. The difference is that you also brought effort, intelligence, and resilience to the table.</p>
      `,
      author: 'Psychologist Dr. James Martinez',
      category: 'Mental Health',
      tags: ['imposter syndrome', 'confidence', 'mindset', 'mental health'],
      coverImage: 'https://via.placeholder.com/800x400?text=Imposter+Syndrome',
      readTime: '8 min read',
      createdAt: new Date('2026-02-20'),
      views: 412,
      likes: 76
    },
    {
      id: 'skills-teens-need',
      title: '10 Essential Skills Every Teenager Should Develop',
      excerpt: 'Beyond academics, these 10 skills will set you apart in college and career. Start developing them now.',
      content: `
        <h2>10 Essential Skills Every Teenager Should Develop</h2>
        <p>Success in college and career isn't just about grades. Here are the 10 skills that employers and universities actually care about:</p>
        
        <h3>1. Critical Thinking</h3>
        <p>Analyze information, question assumptions, and make informed decisions.</p>
        <p><strong>How to develop:</strong> Ask "why?" and "what if?", debate topics, solve complex problems.</p>
        
        <h3>2. Communication</h3>
        <p>Express your ideas clearly, listen actively, and adapt your communication to your audience.</p>
        <p><strong>How to develop:</strong> Join debate club, write essays, practice public speaking, have meaningful conversations.</p>
        
        <h3>3. Problem-Solving</h3>
        <p>Break down complex challenges and find creative solutions.</p>
        <p><strong>How to develop:</strong> Participate in competitions, work on projects, help others solve problems.</p>
        
        <h3>4. Teamwork & Collaboration</h3>
        <p>Work effectively with others toward common goals.</p>
        <p><strong>How to develop:</strong> Join clubs, sports teams, group projects, volunteer work.</p>
        
        <h3>5. Leadership</h3>
        <p>Inspire and guide others, even if you're not "in charge."</p>
        <p><strong>How to develop:</strong> Lead a project, mentor younger students, take initiative in groups.</p>
        
        <h3>6. Emotional Intelligence</h3>
        <p>Understand and manage your emotions, and empathize with others.</p>
        <p><strong>How to develop:</strong> Reflect on feelings, practice empathy, seek feedback, manage conflict respectfully.</p>
        
        <h3>7. Adaptability</h3>
        <p>Adjust to new situations and learn from changes.</p>
        <p><strong>How to develop:</strong> Try new activities, embrace challenges, learn from failures.</p>
        
        <h3>8. Time Management</h3>
        <p>Balance multiple responsibilities and priorities effectively.</p>
        <p><strong>How to develop:</strong> Use planners, set goals, break projects into steps, track your time.</p>
        
        <h3>9. Creativity & Innovation</h3>
        <p>Generate original ideas and approach problems uniquely.</p>
        <p><strong>How to develop:</strong> Create art, music, writing, code; brainstorm solutions; experiment.</p>
        
        <h3>10. Digital Literacy</h3>
        <p>Navigate technology responsibly and learn new tools quickly.</p>
        <p><strong>How to develop:</strong> Learn coding, master relevant software, understand cybersecurity, use social media wisely.</p>
        
        <h3>Start Now</h3>
        <p>You don't need to master all 10 immediately. Choose 2-3 to focus on this year, then add more. Remember, these skills compound over time. The earlier you develop them, the bigger your advantage.</p>
      `,
      author: 'Career Development Director Tom Anderson',
      category: 'Career Guidance',
      tags: ['skills', 'development', 'education', 'future'],
      coverImage: 'https://via.placeholder.com/800x400?text=Essential+Skills',
      readTime: '9 min read',
      createdAt: new Date('2026-02-15'),
      views: 634,
      likes: 112
    },
    {
      id: 'identity-crisis-teens',
      title: 'Navigating Identity Crisis as a Teenager',
      excerpt: 'Discovering your true identity can be a challenging journey. Learn how to overcome an identity crisis and embrace who you are.',
      content: `
        <h2>Navigating Identity Crisis as a Teenager</h2>
        <p>Identity crisis is a normal part of growing up. As a teenager, you're constantly evolving, questioning who you are, and trying to figure out where you fit in the world. This journey, while challenging, is essential for your personal development.</p>
        
        <h3>What is an Identity Crisis?</h3>
        <p>An identity crisis occurs when you begin to question your values, beliefs, and sense of self. It's common during adolescence because:</p>
        <ul>
          <li>Your brain is still developing</li>
          <li>You're exposed to new ideas and perspectives</li>
          <li>Social pressures and expectations change</li>
          <li>You're transitioning from childhood to adulthood</li>
        </ul>
        
        <h3>Signs You Might Be Experiencing an Identity Crisis</h3>
        <ul>
          <li>Feeling lost or directionless</li>
          <li>Questioning your values and beliefs</li>
          <li>Changing interests frequently</li>
          <li>Feeling pressure to fit in</li>
          <li>Doubting your abilities and worth</li>
          <li>Experiencing mood swings or confusion</li>
        </ul>
        
        <h3>How to Navigate Through It</h3>
        
        <h4>1. Self-Reflection</h4>
        <p>Take time to understand yourself better:</p>
        <ul>
          <li>Journal about your thoughts and feelings</li>
          <li>Identify what truly matters to you</li>
          <li>Explore your interests without judgment</li>
          <li>Notice patterns in what makes you happy</li>
        </ul>
        
        <h4>2. Try New Things</h4>
        <p>Experiment with different activities and experiences:</p>
        <ul>
          <li>Join clubs or sports teams</li>
          <li>Take different classes or electives</li>
          <li>Volunteer for causes you care about</li>
          <li>Explore hobbies and creative outlets</li>
        </ul>
        
        <h4>3. Seek Support</h4>
        <p>Don't go through this alone:</p>
        <ul>
          <li>Talk to trusted friends or family</li>
          <li>Consult a school counselor</li>
          <li>Consider talking to a therapist</li>
          <li>Join support groups or online communities</li>
        </ul>
        
        <h4>4. Be Patient with Yourself</h4>
        <p>Identity formation takes time. It's okay to:</p>
        <ul>
          <li>Change your mind about career goals</li>
          <li>Outgrow old friendships</li>
          <li>Question beliefs you've held for years</li>
          <li>Feel confused or uncertain</li>
        </ul>
        
        <h3>The Positive Side</h3>
        <p>While identity crises can be uncomfortable, they lead to:</p>
        <ul>
          <li>Greater self-awareness</li>
          <li>Stronger sense of purpose</li>
          <li>Better decision-making skills</li>
          <li>More authentic relationships</li>
          <li>Increased resilience</li>
        </ul>
        
        <h3>When to Seek Professional Help</h3>
        <p>If your identity crisis is causing:</p>
        <ul>
          <li>Severe anxiety or depression</li>
          <li>Difficulty functioning in daily life</li>
          <li>Thoughts of self-harm</li>
          <li>Persistent feelings of worthlessness</li>
        </ul>
        <p>Please reach out to a mental health professional or crisis hotline immediately.</p>
        
        <h3>Remember</h3>
        <p>Your identity is not fixed - it's a journey of discovery. Be kind to yourself during this process. You're not alone, and it's okay to take your time finding your path.</p>
      `,
      author: 'Dr. Sarah Johnson',
      category: 'Personal Development',
      tags: ['identity', 'self-discovery', 'teens', 'personal growth'],
      coverImage: 'Assets/whoami.jpg',
      readTime: '6 min read',
      createdAt: new Date('2026-03-10'),
      views: 189,
      likes: 34
    },
    {
      id: 'self-expression-teens',
      title: 'The Power of Self-Expression for Teenagers',
      excerpt: 'Self expression can feel hard when you\'re still finding yourself. This guide explores how to use creative outlets to learn more about who you are.',
      content: `
        <h2>The Power of Self-Expression for Teenagers</h2>
        <p>Self-expression is how you communicate your thoughts, feelings, and identity to the world. As a teenager, finding healthy ways to express yourself is crucial for mental health and personal development.</p>
        
        <h3>Why Self-Expression Matters</h3>
        <p>Expressing yourself helps you:</p>
        <ul>
          <li>Process emotions and experiences</li>
          <li>Discover and understand your identity</li>
          <li>Build confidence and self-esteem</li>
          <li>Connect with others who share your interests</li>
          <li>Reduce stress and anxiety</li>
          <li>Develop creativity and problem-solving skills</li>
        </ul>
        
        <h3>Different Ways to Express Yourself</h3>
        
        <h4>Creative Arts</h4>
        <ul>
          <li><strong>Drawing/Painting:</strong> Visual art can express emotions that words can't capture</li>
          <li><strong>Writing:</strong> Journaling, poetry, stories, or blogging</li>
          <li><strong>Music:</strong> Playing instruments, singing, or creating playlists</li>
          <li><strong>Dance/Movement:</strong> Physical expression through various dance styles</li>
          <li><strong>Photography:</strong> Capturing moments that represent how you see the world</li>
        </ul>
        
        <h4>Digital Expression</h4>
        <ul>
          <li><strong>Social Media:</strong> Share your thoughts, art, or experiences (mindfully)</li>
          <li><strong>Video Content:</strong> Vlogs, tutorials, or creative videos</li>
          <li><strong>Digital Art:</strong> Graphic design, digital painting, or animation</li>
          <li><strong>Coding/Gaming:</strong> Create apps, games, or websites</li>
        </ul>
        
        <h4>Physical Expression</h4>
        <ul>
          <li><strong>Sports/Exercise:</strong> Channel energy through physical activity</li>
          <li><strong>Fashion:</strong> Express your style through clothing and accessories</li>
          <li><strong>Body Art:</strong> Temporary tattoos, henna, or safe body modifications</li>
        </ul>
        
        <h4>Verbal Expression</h4>
        <ul>
          <li><strong>Public Speaking:</strong> Join debate club or give presentations</li>
          <li><strong>Podcasting:</strong> Share your voice and opinions</li>
          <li><strong>Conversations:</strong> Open discussions with friends and family</li>
        </ul>
        
        <h3>Overcoming Barriers to Self-Expression</h3>
        
        <h4>Fear of Judgment</h4>
        <p>Many teens worry about what others will think. Remember:</p>
        <ul>
          <li>Not everyone needs to like your expression</li>
          <li>Authenticity attracts the right people</li>
          <li>Practice privately before sharing publicly</li>
          <li>Start small with trusted friends</li>
        </ul>
        
        <h4>Lack of Confidence</h4>
        <p>Build confidence gradually:</p>
        <ul>
          <li>Focus on the process, not perfection</li>
          <li>Celebrate small improvements</li>
          <li>Learn from constructive feedback</li>
          <li>Compare yourself only to your past self</li>
        </ul>
        
        <h4>Time and Resource Constraints</h4>
        <ul>
          <li>Start with what you have (phone, paper, voice)</li>
          <li>Use free online resources and tutorials</li>
          <li>Express yourself during short daily moments</li>
          <li>Join free community groups or online forums</li>
        </ul>
        
        <h3>Finding Your Voice</h3>
        <p>Discover what works best for you:</p>
        <ol>
          <li><strong>Experiment:</strong> Try different forms of expression</li>
          <li><strong>Reflect:</strong> Notice what feels most authentic</li>
          <li><strong>Practice:</strong> Regular practice builds skills and confidence</li>
          <li><strong>Share:</strong> Start with safe spaces, expand gradually</li>
          <li><strong>Evolve:</strong> Your expression will change as you grow</li>
        </ol>
        
        <h3>The Impact on Mental Health</h3>
        <p>Regular self-expression can:</p>
        <ul>
          <li>Reduce stress and anxiety</li>
          <li>Improve mood and emotional regulation</li>
          <li>Build resilience and coping skills</li>
          <li>Increase self-awareness and acceptance</li>
          <li>Strengthen relationships and social connections</li>
        </ul>
        
        <h3>Final Thoughts</h3>
        <p>Your voice matters. Your experiences, thoughts, and feelings are unique and valuable. Don't wait for permission to express yourself - the world needs your perspective. Start small, be patient with yourself, and remember that self-expression is a journey, not a destination.</p>
      `,
      author: 'Creative Arts Therapist Maria Rodriguez',
      category: 'Personal Development',
      tags: ['self-expression', 'creativity', 'confidence', 'mental health'],
      coverImage: 'Assets/know_yourslf.jpg',
      readTime: '7 min read',
      createdAt: new Date('2026-03-08'),
      views: 156,
      likes: 28
    },
    {
      id: 'teen-mental-stress-causes',
      title: 'Understanding Mental Stress in Teenagers: Causes and Solutions',
      excerpt: 'Mental stress in teenagers is a common issue caused by pressure, relationships, and life changes. Learn practical coping strategies.',
      content: `
        <h2>Understanding Mental Stress in Teenagers: Causes and Solutions</h2>
        <p>Mental stress is a natural response to challenging situations, but when it becomes chronic, it can significantly impact a teenager's well-being, academic performance, and relationships. Understanding the causes and learning effective coping strategies is crucial for maintaining mental health.</p>
        
        <h3>Common Causes of Mental Stress in Teenagers</h3>
        
        <h4>Academic Pressure</h4>
        <ul>
          <li>Heavy coursework and homework loads</li>
          <li>High-stakes exams and standardized testing</li>
          <li>Performance expectations from parents and teachers</li>
          <li>Competition for college admissions</li>
          <li>Time management challenges</li>
        </ul>
        
        <h4>Social and Relationship Issues</h4>
        <ul>
          <li>Peer pressure and fitting in</li>
          <li>Bullying or social exclusion</li>
          <li>Romantic relationships and breakups</li>
          <li>Family conflicts or changes</li>
          <li>Social media comparison and cyberbullying</li>
        </ul>
        
        <h4>Developmental Changes</h4>
        <ul>
          <li>Puberty and physical changes</li>
          <li>Identity formation and self-discovery</li>
          <li>Increased independence and responsibility</li>
          <li>Future planning and career decisions</li>
          <li>Emotional regulation challenges</li>
        </ul>
        
        <h4>External Factors</h4>
        <ul>
          <li>Financial stress in the family</li>
          <li>Moving or changing schools</li>
          <li>Health issues or chronic illness</li>
          <li>Traumatic events or loss</li>
          <li>Societal and world events</li>
        </ul>
        
        <h3>Signs of Excessive Stress</h3>
        <p>While some stress is normal, excessive stress may show as:</p>
        <ul>
          <li>Physical symptoms: headaches, stomach aches, fatigue</li>
          <li>Emotional changes: irritability, mood swings, anxiety</li>
          <li>Behavioral changes: withdrawal, changes in eating/sleeping</li>
          <li>Cognitive issues: difficulty concentrating, memory problems</li>
          <li>Academic decline: dropping grades, skipping school</li>
        </ul>
        
        <h3>Effective Coping Strategies</h3>
        
        <h4>Immediate Stress Relief Techniques</h4>
        <ul>
          <li><strong>Deep Breathing:</strong> 4-7-8 breathing (inhale 4 counts, hold 7, exhale 8)</li>
          <li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li>
          <li><strong>Mindfulness:</strong> Focus on the present moment without judgment</li>
          <li><strong>Physical Activity:</strong> Walk, run, dance, or do yoga</li>
          <li><strong>Creative Outlets:</strong> Draw, write, play music, or create art</li>
        </ul>
        
        <h4>Long-term Stress Management</h4>
        <ul>
          <li><strong>Time Management:</strong> Use planners, break tasks into smaller steps</li>
          <li><strong>Healthy Lifestyle:</strong> Regular sleep, balanced diet, exercise</li>
          <li><strong>Social Support:</strong> Talk to friends, family, or counselors</li>
          <li><strong>Boundaries:</strong> Learn to say no and set limits</li>
          <li><strong>Hobbies:</strong> Engage in activities you enjoy</li>
          <li><strong>Professional Help:</strong> Therapy or counseling when needed</li>
        </ul>
        
        <h4>Digital Wellness</h4>
        <ul>
          <li>Limit social media time and comparison</li>
          <li>Take regular breaks from screens</li>
          <li>Curate your online environment positively</li>
          <li>Use technology mindfully, not as an escape</li>
        </ul>
        
        <h3>Building Resilience</h3>
        <p>Develop skills to handle stress better:</p>
        <ul>
          <li><strong>Growth Mindset:</strong> View challenges as opportunities to learn</li>
          <li><strong>Problem-Solving:</strong> Break problems into manageable parts</li>
          <li><strong>Emotional Intelligence:</strong> Understand and manage your emotions</li>
          <li><strong>Self-Compassion:</strong> Be kind to yourself during difficult times</li>
          <li><strong>Adaptability:</strong> Learn to adjust to changing circumstances</li>
        </ul>
        
        <h3>When to Seek Help</h3>
        <p>Consult a professional if stress is causing:</p>
        <ul>
          <li>Severe anxiety or panic attacks</li>
          <li>Depression or persistent sadness</li>
          <li>Changes in eating or sleeping patterns</li>
          <li>Difficulty functioning in daily life</li>
          <li>Thoughts of self-harm or suicide</li>
        </ul>
        
        <h3>Supporting Teens with Stress</h3>
        <p>If you're a parent, teacher, or friend:</p>
        <ul>
          <li>Listen without judgment</li>
          <li>Validate their feelings</li>
          <li>Help them identify stress sources</li>
          <li>Encourage healthy coping strategies</li>
          <li>Know when to suggest professional help</li>
          <li>Model healthy stress management</li>
        </ul>
        
        <h3>Final Thoughts</h3>
        <p>Stress is a normal part of life, but you don't have to face it alone. By understanding its causes and learning effective coping strategies, you can manage stress more effectively and maintain your mental health. Remember that seeking help is a sign of strength, not weakness.</p>
      `,
      author: 'Clinical Psychologist Dr. James Martinez',
      category: 'Mental Health',
      tags: ['mental health', 'stress management', 'teens', 'coping strategies'],
      coverImage: 'Assets/mental_stress.jpg',
      readTime: '8 min read',
      createdAt: new Date('2026-03-06'),
      views: 234,
      likes: 45
    },
    {
      id: 'finding-balance-teens',
      title: 'Finding Balance: Managing School, Life, and Well-being',
      excerpt: 'Balancing school, home, and social life is tough. This guide shares simple habits to reclaim calm and stay focused.',
      content: `
        <h2>Finding Balance: Managing School, Life, and Well-being</h2>
        <p>As a teenager, juggling schoolwork, extracurricular activities, social life, family responsibilities, and personal well-being can feel overwhelming. Finding balance isn't about doing everything perfectly - it's about creating a sustainable lifestyle that supports your health and happiness.</p>
        
        <h3>The Challenge of Balance</h3>
        <p>Modern teens face unprecedented demands:</p>
        <ul>
          <li>Heavy academic workloads and AP/IB courses</li>
          <li>Extracurricular activities and leadership roles</li>
          <li>Social media and online social life</li>
          <li>Part-time jobs or internships</li>
          <li>Family expectations and responsibilities</li>
          <li>College preparation and standardized testing</li>
        </ul>
        
        <h3>Signs You're Out of Balance</h3>
        <ul>
          <li>Constant fatigue or exhaustion</li>
          <li>Declining grades despite effort</li>
          <li>Neglecting personal relationships</li>
          <li>Loss of interest in hobbies</li>
          <li>Increased anxiety or irritability</li>
          <li>Physical symptoms like headaches or stomach issues</li>
          <li>Sleep deprivation or irregular sleep patterns</li>
        </ul>
        
        <h3>Creating a Balanced Schedule</h3>
        
        <h4>1. Audit Your Time</h4>
        <p>Track how you spend your time for a week:</p>
        <ul>
          <li>Note all activities, including screen time</li>
          <li>Identify time wasters and inefficiencies</li>
          <li>Find pockets of time for important activities</li>
          <li>Calculate actual sleep and study hours</li>
        </ul>
        
        <h4>2. Prioritize Ruthlessly</h4>
        <ul>
          <li><strong>Health First:</strong> Sleep, exercise, meals come before extra studying</li>
          <li><strong>Academic Essentials:</strong> Core classes and immediate deadlines</li>
          <li><strong>Quality over Quantity:</strong> Better to do fewer things well</li>
          <li><strong>Say No:</strong> It's okay to decline non-essential commitments</li>
        </ul>
        
        <h4>3. Design Your Ideal Week</h4>
        <p>Structure your time intentionally:</p>
        <ul>
          <li><strong>Sleep:</strong> 8-10 hours per night (aim for consistency)</li>
          <li><strong>Study Blocks:</strong> 45-60 minute focused sessions with breaks</li>
          <li><strong>Exercise:</strong> 30-60 minutes most days</li>
          <li><strong>Meals:</strong> Regular, balanced eating times</li>
          <li><strong>Social Time:</strong> Quality time with friends and family</li>
          <li><strong>Free Time:</strong> Unscheduled time for spontaneity</li>
        </ul>
        
        <h3>Practical Balance Strategies</h3>
        
        <h4>Study Smarter, Not Harder</h4>
        <ul>
          <li>Use the Pomodoro Technique (25 minutes study, 5-minute break)</li>
          <li>Create a dedicated study space free from distractions</li>
          <li>Review material regularly instead of cramming</li>
          <li>Start assignments early to avoid last-minute stress</li>
        </ul>
        
        <h4>Digital Balance</h4>
        <ul>
          <li>Set screen time limits and stick to them</li>
          <li>Designate phone-free zones (bedroom, study area)</li>
          <li>Use apps to block distracting websites during study time</li>
          <li>Schedule social media time rather than scrolling mindlessly</li>
        </ul>
        
        <h4>Social Balance</h4>
        <ul>
          <li>Quality over quantity in friendships</li>
          <li>Set boundaries with draining relationships</li>
          <li>Schedule regular check-ins with close friends</li>
          <li>Balance group activities with alone time</li>
        </ul>
        
        <h4>Self-Care Essentials</h4>
        <ul>
          <li><strong>Sleep Hygiene:</strong> Consistent bedtime routine, no screens before bed</li>
          <li><strong>Nutrition:</strong> Balanced meals, stay hydrated, limit caffeine</li>
          <li><strong>Exercise:</strong> Find activities you enjoy, not just "working out"</li>
          <li><strong>Mindfulness:</strong> Meditation, journaling, or quiet reflection</li>
          <li><strong>Hobbies:</strong> Activities that bring joy and relaxation</li>
        </ul>
        
        <h3>Dealing with Imbalance</h3>
        
        <h4>When You're Overwhelmed</h4>
        <ul>
          <li>Stop and breathe - use the 4-7-8 breathing technique</li>
          <li>Write down everything causing stress</li>
          <li>Prioritize the top 3 most important items</li>
          <li>Let go of perfectionism - done is better than perfect</li>
          <li>Ask for help from teachers, parents, or friends</li>
        </ul>
        
        <h4>Weekly Reset</h4>
        <ul>
          <li>Review what worked and what didn't</li>
          <li>Adjust your schedule based on real experiences</li>
          <li>Celebrate small wins and progress</li>
          <li>Plan for the upcoming week intentionally</li>
        </ul>
        
        <h3>Long-term Perspective</h3>
        <p>Balance is not static - it changes with life stages:</p>
        <ul>
          <li><strong>High School:</strong> Focus on building good habits and exploring interests</li>
          <li><strong>College Prep:</strong> Balance academics with personal growth</li>
          <li><strong>Future Planning:</strong> Consider work-life balance in career choices</li>
        </ul>
        
        <h3>Getting Support</h3>
        <p>Don't hesitate to seek help when needed:</p>
        <ul>
          <li>Talk to a school counselor about workload concerns</li>
          <li>Discuss time management with teachers or parents</li>
          <li>Consider professional help for anxiety or depression</li>
          <li>Join study groups or balance-focused support communities</li>
        </ul>
        
        <h3>Final Thoughts</h3>
        <p>Finding balance is a skill that improves with practice. Be patient with yourself as you learn what works best for you. Remember that balance doesn't mean equal time in every area - it means allocating time in a way that supports your well-being and goals. Small, consistent changes lead to lasting balance.</p>
      `,
      author: 'Life Coach and Educator Lisa Chen',
      category: 'Study Tips',
      tags: ['balance', 'time management', 'well-being', 'stress relief'],
      coverImage: 'Assets/Addiction_image.jpg',
      readTime: '9 min read',
      createdAt: new Date('2026-03-04'),
      views: 198,
      likes: 39
    },
    {
      id: 'managing-job-stress',
      title: 'Managing Job Stress: Finding Meaningful Work',
      excerpt: 'Choose a job that matches your interests and skills so work feels more meaningful and less stressful.',
      content: `
        <h2>Managing Job Stress: Finding Meaningful Work</h2>
        <p>Job stress affects millions of workers worldwide, but it doesn't have to be inevitable. By choosing careers that align with your interests, skills, and values, you can significantly reduce workplace stress and increase job satisfaction.</p>
        
        <h3>Understanding Job Stress</h3>
        <p>Job stress occurs when work demands exceed your ability to cope. Common sources include:</p>
        <ul>
          <li>Work overload and unrealistic deadlines</li>
          <li>Lack of control over work processes</li>
          <li>Unclear job expectations</li>
          <li>Poor work relationships</li>
          <li>Work-life imbalance</li>
          <li>Lack of recognition or growth opportunities</li>
          <li>Job insecurity or organizational changes</li>
        </ul>
        
        <h3>The Cost of Job Stress</h3>
        <ul>
          <li><strong>Physical Health:</strong> Headaches, fatigue, weakened immune system</li>
          <li><strong>Mental Health:</strong> Anxiety, depression, burnout</li>
          <li><strong>Productivity:</strong> Reduced focus, lower quality work</li>
          <li><strong>Relationships:</strong> Strained personal and professional relationships</li>
          <li><strong>Life Satisfaction:</strong> Decreased overall happiness and well-being</li>
        </ul>
        
        <h3>Finding Work That Fits</h3>
        
        <h4>Self-Assessment</h4>
        <p>Before choosing a career, understand yourself:</p>
        <ul>
          <li><strong>Interests:</strong> What activities energize you?</li>
          <li><strong>Skills:</strong> What are you naturally good at?</li>
          <li><strong>Values:</strong> What matters most to you (helping others, creativity, stability)?</li>
          <li><strong>Personality:</strong> Are you introverted/extroverted, analytical/creative?</li>
          <li><strong>Work Style:</strong> Do you prefer structure or flexibility?</li>
        </ul>
        
        <h4>Career Exploration</h4>
        <ul>
          <li><strong>Research Careers:</strong> Use O*NET, Bureau of Labor Statistics, LinkedIn</li>
          <li><strong>Informational Interviews:</strong> Talk to people in fields you're interested in</li>
          <li><strong>Job Shadowing:</strong> Spend time observing different jobs</li>
          <li><strong>Internships/Try Jobs:</strong> Gain hands-on experience</li>
          <li><strong>Career Assessments:</strong> Take personality and career tests</li>
        </ul>
        
        <h3>Reducing Workplace Stress</h3>
        
        <h4>At the Individual Level</h4>
        <ul>
          <li><strong>Time Management:</strong> Prioritize tasks, set boundaries, avoid overtime</li>
          <li><strong>Skill Development:</strong> Build capabilities to handle challenges</li>
          <li><strong>Stress Management:</strong> Exercise, meditation, hobbies</li>
          <li><strong>Work-Life Balance:</strong> Protect personal time, unplug after hours</li>
          <li><strong>Support Network:</strong> Build relationships with colleagues and mentors</li>
        </ul>
        
        <h4>At the Organizational Level</h4>
        <ul>
          <li><strong>Clear Communication:</strong> Understand expectations and provide feedback</li>
          <li><strong>Workload Management:</strong> Negotiate realistic deadlines</li>
          <li><strong>Professional Development:</strong> Seek growth opportunities</li>
          <li><strong>Work Environment:</strong> Advocate for positive workplace changes</li>
        </ul>
        
        <h3>Career Transitions</h3>
        <p>If your current job doesn't fit:</p>
        <ul>
          <li><strong>Assess Your Situation:</strong> Identify what's causing stress</li>
          <li><strong>Explore Options:</strong> Research alternative careers or roles</li>
          <li><strong>Skill Building:</strong> Identify gaps and create a development plan</li>
          <li><strong>Networking:</strong> Connect with people in your target field</li>
          <li><strong>Gradual Transition:</strong> Consider lateral moves or part-time exploration</li>
        </ul>
        
        <h3>Building Career Resilience</h3>
        <ul>
          <li><strong>Growth Mindset:</strong> View challenges as learning opportunities</li>
          <li><strong>Emotional Intelligence:</strong> Manage emotions and build relationships</li>
          <li><strong>Adaptability:</strong> Embrace change and learn new skills</li>
          <li><strong>Self-Care:</strong> Maintain physical and mental health</li>
          <li><strong>Continuous Learning:</strong> Stay current in your field</li>
        </ul>
        
        <h3>Workplace Rights and Resources</h3>
        <ul>
          <li><strong>Labor Laws:</strong> Know your rights regarding working conditions</li>
          <li><strong>Employee Assistance Programs:</strong> Many companies offer counseling</li>
          <li><strong>Professional Organizations:</strong> Join industry groups for support</li>
          <li><strong>Mental Health Resources:</strong> Access therapy or support groups</li>
        </ul>
        
        <h3>Long-term Career Planning</h3>
        <p>Think beyond immediate job satisfaction:</p>
        <ul>
          <li><strong>Work-Life Integration:</strong> How will this job fit your life goals?</li>
          <li><strong>Growth Potential:</strong> Are there advancement opportunities?</li>
          <li><strong>Work Culture:</strong> Does the environment align with your values?</li>
          <li><strong>Financial Stability:</strong> Can this career support your needs?</li>
          <li><strong>Legacy:</strong> Will this work give you a sense of purpose?</li>
        </ul>
        
        <h3>When to Seek Help</h3>
        <p>If job stress is severely impacting your health:</p>
        <ul>
          <li>Consider speaking with HR or a supervisor</li>
          <li>Consult a career counselor</li>
          <li>Seek professional mental health support</li>
          <li>Explore disability accommodations if applicable</li>
        </ul>
        
        <h3>Final Thoughts</h3>
        <p>Finding meaningful work that aligns with your interests and skills is one of the most important steps you can take for long-term well-being. While no job is perfect, choosing work that fits who you are significantly reduces stress and increases satisfaction. Remember that career exploration is an ongoing process - your needs and interests may evolve over time.</p>
      `,
      author: 'Career Development Director Tom Anderson',
      category: 'Career Guidance',
      tags: ['job stress', 'career planning', 'work-life balance', 'job satisfaction'],
      coverImage: 'Assets/job_stress.jpg',
      readTime: '10 min read',
      createdAt: new Date('2026-03-02'),
      views: 267,
      likes: 52
    },
    {
      id: 'finding-joy-work',
      title: 'Finding Joy at Work: Turning Your Job into a Source of Happiness',
      excerpt: 'Work doesn\'t have to feel like a burden. Learn how to find opportunities that make you excited to show up each day.',
      content: `
        <h2>Finding Joy at Work: Turning Your Job into a Source of Happiness</h2>
        <p>Many people spend more time at work than anywhere else, yet job satisfaction remains elusive for millions. The good news is that you can find joy and meaning in your work, regardless of your current role or industry.</p>
        
        <h3>The Reality of Work Dissatisfaction</h3>
        <p>Studies show that most workers are disengaged:</p>
        <ul>
          <li>Only 30% of workers are engaged and enthusiastic about their jobs</li>
          <li>50% are disengaged and just going through the motions</li>
          <li>20% are actively disengaged and unhappy</li>
        </ul>
        <p>This leads to decreased productivity, higher turnover, and personal unhappiness.</p>
        
        <h3>Redefining Work Success</h3>
        <p>Traditional measures of success (salary, title, prestige) don't guarantee happiness. True work joy comes from:</p>
        <ul>
          <li><strong>Purpose:</strong> Feeling your work matters</li>
          <li><strong>Autonomy:</strong> Having control over how you work</li>
          <li><strong>Mastery:</strong> Getting better at meaningful tasks</li>
          <li><strong>Connection:</strong> Positive relationships with colleagues</li>
          <li><strong>Growth:</strong> Learning and developing new skills</li>
        </ul>
        
        <h3>Finding Joy in Your Current Role</h3>
        
        <h4>Reframe Your Perspective</h4>
        <ul>
          <li><strong>Focus on Impact:</strong> How does your work help others or contribute to something larger?</li>
          <li><strong>Celebrate Small Wins:</strong> Acknowledge accomplishments, no matter how small</li>
          <li><strong>Find Meaning:</strong> Connect your tasks to your personal values</li>
          <li><strong>Practice Gratitude:</strong> Regularly note what's going well</li>
        </ul>
        
        <h4>Build Positive Relationships</h4>
        <ul>
          <li><strong>Connect with Colleagues:</strong> Build genuine relationships beyond work tasks</li>
          <li><strong>Find a Work Buddy:</strong> Someone you can vent to and celebrate with</li>
          <li><strong>Mentor Others:</strong> Teaching others often brings joy and purpose</li>
          <li><strong>Seek Support:</strong> Don't suffer in silence - talk about challenges</li>
        </ul>
        
        <h4>Optimize Your Environment</h4>
        <ul>
          <li><strong>Personalize Your Space:</strong> Add plants, photos, or items that make you happy</li>
          <li><strong>Take Breaks:</strong> Step away regularly to recharge</li>
          <li><strong>Healthy Boundaries:</strong> Protect your personal time</li>
          <li><strong>Work-Life Integration:</strong> Find ways to bring joy from home to work</li>
        </ul>
        
        <h3>Developing Work Joy Habits</h3>
        
        <h4>Morning Rituals</h4>
        <ul>
          <li>Start your day with intention and gratitude</li>
          <li>Listen to uplifting music or podcasts on your commute</li>
          <li>Practice positive visualization about your workday</li>
          <li>Set one or two priorities for the day</li>
        </ul>
        
        <h4>During the Workday</h4>
        <ul>
          <li><strong>Mindful Moments:</strong> Take 1-minute breathing breaks</li>
          <li><strong>Task Variety:</strong> Alternate between different types of tasks</li>
          <li><strong>Learning Time:</strong> Dedicate time to skill development</li>
          <li><strong>Social Interactions:</strong> Schedule positive interactions</li>
        </ul>
        
        <h4>End-of-Day Routines</h4>
        <ul>
          <li>Review accomplishments and lessons learned</li>
          <li>Disconnect from work communications</li>
          <li>Plan something enjoyable for after work</li>
          <li>Practice work-life boundary rituals</li>
        </ul>
        
        <h3>Cultivating Flow and Engagement</h3>
        <p>Flow is the state of complete immersion and joy in an activity:</p>
        <ul>
          <li><strong>Clear Goals:</strong> Know what you're working toward</li>
          <li><strong>Immediate Feedback:</strong> Get quick information about your progress</li>
          <li><strong>Balance Challenge and Skill:</strong> Tasks should be challenging but achievable</li>
          <li><strong>Deep Focus:</strong> Minimize distractions during important work</li>
        </ul>
        
        <h3>Long-term Career Joy</h3>
        
        <h4>Career Crafting</h4>
        <p>Shape your job to better fit your strengths and interests:</p>
        <ul>
          <li><strong>Job Crafting:</strong> Modify your current role to include more preferred tasks</li>
          <li><strong>Skill Development:</strong> Learn new skills that make work more enjoyable</li>
          <li><strong>Relationship Building:</strong> Cultivate positive work relationships</li>
          <li><strong>Meaning Making:</strong> Connect your work to a larger purpose</li>
        </ul>
        
        <h4>Career Exploration</h4>
        <ul>
          <li><strong>Side Projects:</strong> Explore interests outside your main job</li>
          <li><strong>Networking:</strong> Connect with people in fields that excite you</li>
          <li><strong>Informational Interviews:</strong> Learn about other careers</li>
          <li><strong>Volunteering:</strong> Try work in different fields</li>
        </ul>
        
        <h3>Overcoming Joy Blockers</h3>
        
        <h4>Toxic Work Environments</h4>
        <ul>
          <li>Document issues and consider speaking with HR</li>
          <li>Build external support networks</li>
          <li>Focus on what you can control</li>
          <li>Plan your exit strategy if needed</li>
        </ul>
        
        <h4>Internal Barriers</h4>
        <ul>
          <li><strong>Perfectionism:</strong> Accept "good enough" work</li>
          <li><strong>Comparison:</strong> Focus on your own growth journey</li>
          <li><strong>Entitlement:</strong> Work joy requires effort and mindset shifts</li>
          <li><strong>Fear of Change:</strong> Small changes can create big improvements</li>
        </ul>
        
        <h3>Measuring Work Joy</h3>
        <p>Track your progress with these indicators:</p>
        <ul>
          <li>Energy levels at the end of the workday</li>
          <li>Excitement about upcoming work tasks</li>
          <li>Quality of work relationships</li>
          <li>Sense of accomplishment and growth</li>
          <li>Work-life balance satisfaction</li>
        </ul>
        
        <h3>Final Thoughts</h3>
        <p>Work joy is not a destination but a journey of continuous discovery and adjustment. It requires intentional effort, but the rewards - increased happiness, better health, and greater life satisfaction - are worth it. Start small today: identify one thing that could make work more enjoyable and take action. Your future self will thank you.</p>
      `,
      author: 'Workplace Happiness Researcher Dr. Emily Watson',
      category: 'Career Guidance',
      tags: ['work joy', 'job satisfaction', 'workplace happiness', 'career fulfillment'],
      coverImage: 'Assets/happiness_dimension.jpg',
      readTime: '11 min read',
      createdAt: new Date('2026-02-28'),
      views: 312,
      likes: 67
    }
  ];

  // Save article to Firebase
  static async createArticle(articleData) {
    try {
      const docRef = await db.collection('blog').add({
        ...articleData,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now(),
        views: 0,
        likes: 0
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  // Get all articles with pagination
  static async getArticles(category = null, limit = 10, startAfter = null) {
    try {
      let query = db.collection('blog');

      if (category) {
        query = query.where('category', '==', category);
      }

      query = query.orderBy('createdAt', 'desc').limit(limit);

      if (startAfter) {
        query = query.startAfter(startAfter);
      }

      const snapshot = await query.get();
      const articles = [];

      snapshot.forEach(doc => {
        articles.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to sample articles if Firebase fails
      let filteredArticles = this.SAMPLE_ARTICLES;
      if (category) {
        filteredArticles = filteredArticles.filter(article => article.category === category);
      }
      return filteredArticles.slice(0, limit);
    }
  }

  // Alias for backward compatibility
  static async getAllBlogPosts(limit = 10) {
    return this.getArticles(null, limit);
  }

  // Get single article by ID
  static async getArticle(articleId) {
    try {
      const doc = await db.collection('blog').doc(articleId).get();
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching article:', error);
      // Fallback to sample articles
      return this.SAMPLE_ARTICLES.find(article => article.id === articleId) || null;
    }
  }

  // Alias for backward compatibility
  static async getBlogPost(articleId) {
    return this.getArticle(articleId);
  }

  // Increment article views
  static async incrementViews(articleId) {
    try {
      await db.collection('blog').doc(articleId).update({
        views: firebase.firestore.FieldValue.increment(1)
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  // Like an article
  static async likeArticle(articleId) {
    try {
      await db.collection('blog').doc(articleId).update({
        likes: firebase.firestore.FieldValue.increment(1)
      });
    } catch (error) {
      console.error('Error liking article:', error);
      throw error;
    }
  }

  // Search articles by title or tags
  static async searchArticles(searchTerm) {
    try {
      const snapshot = await db.collection('blog').get();
      const results = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const searchLower = searchTerm.toLowerCase();

        if (
          data.title.toLowerCase().includes(searchLower) ||
          data.excerpt.toLowerCase().includes(searchLower) ||
          (data.tags && data.tags.some(tag => tag.toLowerCase().includes(searchLower)))
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
      console.error('Error searching articles:', error);
      throw error;
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category) {
    try {
      const snapshot = await db.collection('blog')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc')
        .get();

      const articles = [];
      snapshot.forEach(doc => {
        articles.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });

      return articles;
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      throw error;
    }
  }

  // Add sample articles to Firebase (call once during setup)
  static async loadSampleArticles() {
    try {
      console.log('Loading sample blog articles...');
      
      for (const article of this.SAMPLE_ARTICLES) {
        const { id, ...articleData } = article;
        await this.createArticle(articleData);
      }

      console.log('Sample articles loaded successfully!');
      return true;
    } catch (error) {
      console.error('Error loading sample articles:', error);
      throw error;
    }
  }

  // Get blog categories
  static getBlogCategories() {
    return BLOG_CATEGORIES;
  }
}
