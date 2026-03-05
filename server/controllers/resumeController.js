// Resume Generator Controller with AI Integration
const Resume = require('../models/Resume');
const Profile = require('../models/Profile');
const axios = require('axios');

/**
 * Call Gemini API to generate content with improved prompt engineering
 * @param {string} prompt - The prompt with structured instructions and examples
 * @param {object} options - Optional configuration for temperature, tokens, etc.
 * 
 * Available Gemini Models (tried in order):
 * 1. gemini-1.5-flash-latest (v1beta) - Fast, cost-effective
 * 2. gemini-pro (v1) - Stable fallback
 * 3. Mock AI response - Intelligent fallback
 */
const callAI = async (prompt, options = {}) => {
  const apiKey = process.env.OPENAI_API_KEY; // Using same env variable for Gemini key

  if (!apiKey) {
    console.warn('⚠️ Gemini API key not configured. Using intelligent mock AI response.');
    return generateMockAIResponse(prompt);
  }

  // Configuration with sensible defaults for resume generation
  const config = {
    temperature: options.temperature || 0.7, // Balanced creativity and consistency
    maxOutputTokens: options.maxOutputTokens || 1000, // Increased for longer responses
    topP: options.topP || 0.9, // Nucleus sampling for quality
    topK: options.topK || 40, // Diverse but focused outputs
  };

  const safetySettings = [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  ];

  // Try multiple models in order of preference
  const models = [
    { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, name: 'gemini-1.5-flash-latest' },
    { url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, name: 'gemini-pro' },
  ];

  for (const model of models) {
    try {
      const response = await axios.post(
        model.url,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt, // Prompt already includes system context from our structured prompts
                },
              ],
            },
          ],
          generationConfig: config,
          safetySettings,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      // Extract and validate response
      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.warn(`⚠️ Unexpected ${model.name} response structure. Trying next model...`);
        continue;
      }

      const generatedText = response.data.candidates[0].content.parts[0].text.trim();
      
      // Basic validation - ensure we got meaningful content
      if (generatedText.length < 20) {
        console.warn(`⚠️ ${model.name} generated text too short. Trying next model...`);
        continue;
      }

      console.log(`✅ Successfully used ${model.name} model`);
      return generatedText;
    } catch (error) {
      if (error.response) {
        console.warn(`⚠️ ${model.name} error:`, {
          status: error.response.status,
          message: error.response.data?.error?.message || error.message,
        });
      } else {
        console.warn(`⚠️ ${model.name} request failed:`, error.message);
      }
      
      // Continue to next model
      if (model !== models[models.length - 1]) {
        console.log(`🔄 Trying next model...`);
      }
    }
  }

  // All models failed, use intelligent fallback
  console.warn('⚠️ All Gemini models failed. Using intelligent mock AI response.');
  return generateMockAIResponse(prompt);
};

/**
 * Generate intelligent mock AI response based on user data
 * Enhanced with better pattern matching and professional output
 */
const generateMockAIResponse = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Professional Summary Generation
  if (lowerPrompt.includes('professional summary') || lowerPrompt.includes('example 1:')) {
    const roleMatch = prompt.match(/target role:\s*(.+)/i);
    const skillsMatch = prompt.match(/key skills:\s*(.+)/i);
    const expMatch = prompt.match(/experience level:\s*(\d+\+?)\s*years/i);
    
    const role = roleMatch ? roleMatch[1].trim() : 'Software Professional';
    const skills = skillsMatch ? skillsMatch[1].split(',').slice(0, 4).join(', ').trim() : 'modern technologies';
    const years = expMatch ? expMatch[1] : '3+';
    
    return `Results-driven ${role} with ${years} years of experience specializing in ${skills}. Proven track record of delivering scalable solutions that improved system performance by 40% and enhanced user satisfaction by 35%. Expert in agile development methodologies with strong focus on code quality, testing, and continuous integration. Passionate about leveraging cutting-edge technologies to solve complex business challenges and drive measurable impact.`;
  }
  
  // Skills Formatting
  if (lowerPrompt.includes('input skills:') || lowerPrompt.includes('ats-optimized format')) {
    const skillsMatch = prompt.match(/input skills:\s*(.+)/i);
    if (skillsMatch) {
      const skills = skillsMatch[1].split(',').map(s => s.trim());
      
      // Categorize skills intelligently
      const languages = skills.filter(s => /java|python|javascript|typescript|c\+\+|go|ruby|php/i.test(s));
      const frameworks = skills.filter(s => /react|angular|vue|django|spring|express|flask|node/i.test(s));
      const databases = skills.filter(s => /sql|mongo|postgres|mysql|redis|dynamodb/i.test(s));
      const cloud = skills.filter(s => /aws|azure|gcp|docker|kubernetes|ci\/cd|jenkins/i.test(s));
      const other = skills.filter(s => 
        !languages.includes(s) && !frameworks.includes(s) && 
        !databases.includes(s) && !cloud.includes(s)
      );
      
      let result = [];
      if (languages.length) result.push(`Languages: ${languages.join(', ')}`);
      if (frameworks.length) result.push(`Frameworks: ${frameworks.join(', ')}`);
      if (databases.length) result.push(`Database: ${databases.join(', ')}`);
      if (cloud.length) result.push(`Cloud & DevOps: ${cloud.join(', ')}`);
      if (other.length && result.length < 4) result.push(`Tools: ${other.slice(0, 3).join(', ')}`);
      
      return result.join(' | ') || `Technical Skills: ${skills.slice(0, 8).join(', ')}`;
    }
  }
  
  // Work Experience Enhancement (STAR Method)
  if (lowerPrompt.includes('position:') && lowerPrompt.includes('company:')) {
    const positionMatch = prompt.match(/position:\s*(.+)/i);
    const companyMatch = prompt.match(/company:\s*(.+)/i);
    const position = positionMatch ? positionMatch[1].split('\n')[0].trim() : 'Software Engineer';
    const company = companyMatch ? companyMatch[1].split('\n')[0].trim() : 'Leading Tech Company';
    
    return `• Developed and deployed 10+ production features as ${position} at ${company}, utilizing modern development practices and achieving 95% code coverage
• Collaborated with cross-functional teams of 8+ members to design and implement scalable solutions, improving system performance by 50% and reducing latency by 200ms
• Architected RESTful APIs and microservices handling 100K+ daily requests, ensuring 99.9% uptime and optimal resource utilization
• Mentored 3 junior developers through code reviews and pair programming sessions, improving team productivity by 25% and reducing bug rate by 40%
• Implemented comprehensive testing strategies including unit, integration, and E2E tests, reducing production incidents by 60%`;
  }
  
  // Project Enhancement
  if (lowerPrompt.includes('project name:') && lowerPrompt.includes('technologies:')) {
    const projectMatch = prompt.match(/project name:\s*(.+)/i);
    const techMatch = prompt.match(/technologies:\s*(.+)/i);
    const project = projectMatch ? projectMatch[1].split('\n')[0].trim() : 'Software Application';
    const tech = techMatch ? techMatch[1].split('\n')[0].trim() : 'modern technology stack';
    
    return `Developed comprehensive ${project} utilizing ${tech}, implementing features including user authentication, data validation, real-time updates, and responsive design. Architected scalable backend with RESTful API architecture and optimized database queries, achieving sub-200ms response times. Deployed to production with CI/CD pipeline using Docker and cloud infrastructure, serving 5,000+ users with 99.5% uptime and garnering positive user feedback.`;
  }
  
  // Certification Enhancement
  if (lowerPrompt.includes('certification:') && (lowerPrompt.includes('issuer:') || lowerPrompt.includes('example 1:'))) {
    const certMatch = prompt.match(/certification:\s*(.+)/i);
    const issuerMatch = prompt.match(/issuer:\s*(.+)/i);
    const cert = certMatch ? certMatch[1].split('\n')[0].trim() : 'Professional Certification';
    const issuer = issuerMatch ? issuerMatch[1].split('\n')[0].trim() : '';
    
    if (issuer) {
      return `${cert} (${issuer}) | Validates professional competency and industry-standard best practices in technology and software development`;
    }
    return `${cert} | Demonstrates validated expertise and commitment to professional development in the field`;
  }

  // Generic fallback
  return 'Experienced professional with strong technical skills and proven track record of delivering high-quality solutions that drive business value and enhance user experience.';
};

/**
 * Transform raw profile data into professional ATS-optimized resume content
 * This is the core function that generates professional resume from user input
 */
const generateProfessionalResume = async (profile) => {
  console.log('🎯 Generating professional ATS-optimized resume...');

  // 1. Generate Professional Summary with Few-Shot Examples
  const yearsOfExperience = profile.experience.length > 0 ? `${profile.experience.length}+` : 'Emerging';
  const topSkills = profile.skills.slice(0, 5).join(', ');
  const educationLevel = profile.education[0]?.degree || 'qualified';
  
  const summaryPrompt = `You are an expert ATS resume writer. Generate a compelling professional summary.

EXAMPLE 1:
Input: Role: Full Stack Developer, Skills: React, Node.js, MongoDB, AWS, Docker, Experience: 3 positions
Output: "Results-driven Full Stack Developer with 3+ years of experience building scalable web applications using React, Node.js, and MongoDB. Proven track record of delivering high-performance solutions that improved user engagement by 40% and reduced load times by 60%. Expert in cloud deployment with AWS and containerization using Docker, with strong focus on code quality and agile methodologies."

EXAMPLE 2:
Input: Role: Data Scientist, Skills: Python, Machine Learning, TensorFlow, SQL, Tableau, Experience: 2 positions
Output: "Data-driven Data Scientist with 2+ years of experience leveraging Python, Machine Learning, and TensorFlow to extract actionable insights from complex datasets. Successfully developed predictive models that increased forecast accuracy by 35% and reduced operational costs by $200K annually. Skilled in data visualization using Tableau and advanced statistical analysis with demonstrated ability to communicate technical findings to non-technical stakeholders."

EXAMPLE 3:
Input: Role: DevOps Engineer, Skills: Kubernetes, CI/CD, AWS, Terraform, Python, Experience: 4 positions
Output: "Accomplished DevOps Engineer with 4+ years of experience architecting and maintaining cloud infrastructure using Kubernetes, AWS, and Terraform. Implemented CI/CD pipelines that reduced deployment time by 70% and increased release frequency by 300%. Expert in automation, infrastructure-as-code, and container orchestration with proven ability to enhance system reliability and team productivity."

YOUR TASK:
Input Data:
- Target Role: ${profile.targetJobRole || 'Software Professional'}
- Key Skills: ${topSkills}
- Experience Level: ${yearsOfExperience} years
- Education: ${educationLevel}

Instructions:
1. Follow the format shown in examples above
2. Start with role and experience level
3. Include 2-3 quantifiable achievements (use realistic percentages or metrics)
4. Incorporate 3-5 key technical skills naturally
5. Keep it 3-4 sentences, around 80-100 words
6. Use power verbs: "Architected", "Spearheaded", "Engineered", "Optimized"
7. Make it ATS-friendly with industry keywords

Output ONLY the professional summary. No preamble, no explanations.`;

  const professionalSummary = await callAI(summaryPrompt);

  // 2. Rewrite Skills Professionally with Structured Output
  const skillsPrompt = `You are a resume optimization expert. Transform these technical skills into ATS-optimized format.

EXAMPLE 1:
Input: JavaScript, React, CSS, HTML, Git, REST API
Output: "Frontend Development: React.js, JavaScript (ES6+), HTML5, CSS3 | Version Control: Git, GitHub | API Integration: RESTful APIs, Axios"

EXAMPLE 2:
Input: Python, Django, PostgreSQL, Docker, AWS, Redis, CI/CD
Output: "Backend Development: Python, Django, Flask | Database: PostgreSQL, Redis | Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, CI/CD Pipelines"

EXAMPLE 3:
Input: Java, Spring Boot, MySQL, Microservices, Kubernetes, Jenkins
Output: "Languages: Java 11+ | Frameworks: Spring Boot, Spring Cloud | Database: MySQL, MongoDB | Architecture: Microservices, RESTful APIs | DevOps: Jenkins, Kubernetes, Docker"

YOUR TASK:
Input Skills: ${profile.skills.join(', ')}

Instructions:
1. Group related skills into logical categories (e.g., Languages, Frameworks, Tools, Cloud, etc.)
2. Use professional naming (e.g., "React" → "React.js", "JS" → "JavaScript")
3. Add version numbers where appropriate (e.g., "Node 18+", "Python 3.x")
4. Separate categories with "|" pipe symbol
5. Within categories, use commas to separate items
6. Prioritize most relevant/strongest skills first
7. Make it scannable and ATS-friendly

Output format: "Category 1: skill, skill | Category 2: skill, skill | Category 3: skill, skill"
Output ONLY the formatted skills string. No preamble.`;

  const professionalSkills = await callAI(skillsPrompt);

  // 3. Enhance Work Experience with STAR Method Examples
  const enhancedExperience = await Promise.all(
    profile.experience.map(async (exp) => {
      if (!exp.title || !exp.company) {
        return exp;
      }

      const expPrompt = `You are an expert resume writer specializing in the STAR method (Situation, Task, Action, Result). Transform this work experience into impactful bullet points.

EXAMPLE 1:
Input: Position: Software Engineer, Company: TechCorp, Description: "Worked on backend APIs and database optimization"
Output:
• Architected and deployed 15+ RESTful APIs using Node.js and Express, reducing average response time by 45% and supporting 100K+ daily active users
• Optimized PostgreSQL database queries and implemented Redis caching layer, decreasing query execution time from 800ms to 120ms
• Collaborated with cross-functional teams in Agile sprints to deliver 20+ features, maintaining 98% on-time delivery rate
• Mentored 3 junior developers on best practices for code reviews, testing, and documentation, improving team code quality score by 30%

EXAMPLE 2:
Input: Position: Frontend Developer, Company: WebSolutions, Description: "Built responsive websites using React"
Output:
• Developed 10+ responsive web applications using React, TypeScript, and Tailwind CSS, achieving 95+ Lighthouse performance scores
• Implemented component library with 50+ reusable components, reducing development time by 40% across 5 projects
• Led migration from class components to React Hooks, improving code maintainability and reducing bundle size by 25%
• Conducted A/B testing on UI changes, resulting in 35% increase in user engagement and 20% improvement in conversion rates

EXAMPLE 3:
Input: Position: DevOps Engineer, Company: CloudTech, Description: "Managed cloud infrastructure and CI/CD pipelines"
Output:
• Designed and maintained AWS infrastructure using Terraform for 20+ microservices, achieving 99.95% uptime
• Implemented CI/CD pipelines with Jenkins and GitHub Actions, reducing deployment time from 2 hours to 15 minutes
• Automated infrastructure provisioning and configuration management using Ansible, eliminating 85% of manual deployment tasks
• Established monitoring with Prometheus and Grafana, proactively identifying and resolving 95% of issues before user impact

YOUR TASK:
Position: ${exp.title}
Company: ${exp.company}
Location: ${exp.location || 'N/A'}
Duration: ${exp.startDate} - ${exp.endDate || (exp.current ? 'Present' : 'N/A')}
Original Description: ${exp.description || 'No description provided'}

Instructions:
1. Generate 4-5 bullet points following the STAR method
2. Start each bullet with strong action verbs: Architected, Engineered, Developed, Implemented, Optimized, Spearheaded, Led
3. Include quantifiable metrics (percentages, numbers, timeframes) - be realistic for the role
4. Highlight technologies, tools, and methodologies used
5. Show impact on business, team, or users
6. Use "•" for bullet points
7. Make each bullet 1-2 lines maximum
8. Incorporate relevant keywords for ATS optimization

Output format: One bullet point per line with "•" prefix
Output ONLY the bullet points. No preamble, no additional text.`;

      const enhancedDescription = await callAI(expPrompt);

      return {
        title: exp.title,
        company: exp.company,
        location: exp.location || '',
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current || false,
        description: enhancedDescription,
        originalDescription: exp.description,
      };
    })
  );

  // 4. Enhance Projects with Impact-Focused Examples
  const enhancedProjects = await Promise.all(
    (profile.projects || []).slice(0, 5).map(async (project) => {
      if (!project.name) {
        return null;
      }

      const projectPrompt = `You are a resume writer expert in showcasing technical projects. Transform this project into an achievement-focused description.

EXAMPLE 1:
Input: Name: E-Commerce Platform, Tech: React, Node.js, MongoDB, Stripe, Description: "Online shopping website"
Output: "Developed full-stack e-commerce platform using React, Node.js, and MongoDB with integrated Stripe payment processing. Implemented features including user authentication, shopping cart, order tracking, and admin dashboard. Deployed on AWS with 99.9% uptime serving 5,000+ monthly users and processing $50K+ in transactions."

EXAMPLE 2:
Input: Name: Task Management App, Tech: Vue.js, Firebase, Tailwind, Description: "Todo app with real-time updates"
Output: "Built real-time task management application using Vue.js and Firebase, featuring collaborative workspaces, drag-and-drop interface, and push notifications. Implemented responsive design with Tailwind CSS achieving 95+ Lighthouse score. Gained 1,000+ active users within first month with 4.8/5 rating on product hunt."

EXAMPLE 3:
Input: Name: AI Chatbot, Tech: Python, TensorFlow, Flask, Docker, Description: "Chatbot using machine learning"
Output: "Engineered intelligent chatbot using Python, TensorFlow, and Natural Language Processing with 92% intent classification accuracy. Deployed as RESTful API using Flask and Docker, handling 10,000+ queries daily. Reduced customer support response time by 60% and improved customer satisfaction score from 3.2 to 4.5."

EXAMPLE 4:
Input: Name: DevOps Pipeline, Tech: Jenkins, Docker, Kubernetes, AWS, Description: "Automated deployment system"
Output: "Architected end-to-end CI/CD pipeline using Jenkins, Docker, and Kubernetes deployed on AWS EKS. Automated testing, building, and deployment processes reducing deployment time from 2 hours to 10 minutes. Implemented blue-green deployment strategy achieving zero-downtime releases for 20+ microservices."

YOUR TASK:
Project Name: ${project.name}
Technologies: ${project.technologies || 'Various technologies'}
Original Description: ${project.description || 'No description'}
${project.url || project.githubUrl ? `URL: ${project.url || project.githubUrl}` : ''}

Instructions:
1. Write 2-3 concise sentences (60-80 words total)
2. Start with strong verbs: Developed, Built, Engineered, Architected, Designed
3. Mention key technologies and technical approach
4. Highlight innovative features or technical challenges solved
5. Include metrics when possible: users, performance, uptime, ratings, impact
6. Show the value/impact of the project
7. Make it sound professional and impressive
8. Use industry terminology for ATS optimization

Output ONLY the project description. No preamble, no title.`;

      const enhancedDescription = await callAI(projectPrompt);

      return {
        name: project.name,
        description: enhancedDescription,
        technologies: project.technologies || '',
        url: project.url || '',
        githubUrl: project.githubUrl || '',
        originalDescription: project.description,
      };
    })
  );

  // 5. Enhance Certifications with Context
  const enhancedCertifications = await Promise.all(
    (profile.certifications || []).map(async (cert) => {
      if (!cert.name) {
        return cert;
      }

      const certPrompt = `You are a resume certification expert. Add professional context to this certification.

EXAMPLE 1:
Input: Certification: AWS Certified Solutions Architect, Issuer: Amazon Web Services, Date: 2023
Output: "AWS Certified Solutions Architect - Professional | Validates expertise in designing distributed systems and migrating complex workloads to AWS cloud infrastructure"

EXAMPLE 2:
Input: Certification: Google Data Analytics Professional, Issuer: Google, Date: 2024
Output: "Google Data Analytics Professional Certificate | Demonstrates proficiency in data cleaning, visualization with Tableau, R programming, and SQL for data-driven decision making"

EXAMPLE 3:
Input: Certification: Certified Kubernetes Administrator, Issuer: CNCF, Date: 2023
Output: "Certified Kubernetes Administrator (CKA) | Validates hands-on skills in Kubernetes cluster deployment, management, troubleshooting, and application lifecycle management"

EXAMPLE 4:
Input: Certification: CompTIA Security+, Issuer: CompTIA, Date: 2022
Output: "CompTIA Security+ | Industry-recognized certification validating foundational cybersecurity skills including threat detection, risk management, and secure network architecture"

YOUR TASK:
Certification: ${cert.name}
Issuer: ${cert.issuer || 'Not specified'}
Date: ${cert.date || 'Not specified'}

Instructions:
1. Format: "Certification Name | Brief description of what it validates"
2. Keep description to 10-15 words
3. Focus on skills/expertise validated
4. Use professional language
5. If it's a well-known cert, mention "industry-recognized" or "globally recognized"
6. Make it ATS-friendly with keywords

Output format: "Cert Name | Description"
Output ONLY the formatted certification. No preamble.`;

      const enhancedName = await callAI(certPrompt);

      return {
        name: cert.name,
        enhancedName: enhancedName,
        issuer: cert.issuer || '',
        date: cert.date || '',
        credentialUrl: cert.credentialUrl || '',
      };
    })
  );

  // 6. Format Education Professionally
  const enhancedEducation = profile.education.map((edu) => ({
    degree: edu.degree,
    institution: edu.institution,
    year: edu.year,
    gpa: edu.gpa || '',
    location: edu.location || '',
  }));

  // 7. Generate ATS Keywords for optimization
  const atsKeywords = [
    ...profile.skills,
    profile.targetJobRole,
    ...profile.education.map(e => e.degree),
    ...profile.experience.map(e => e.title),
    ...profile.certifications.map(c => c.name),
  ].filter(Boolean);

  // 8. Create Contact Information
  const contactInfo = {
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone || '',
    location: profile.location || '',
    linkedinUrl: profile.linkedinUrl || '',
    githubUsername: profile.githubUsername || '',
    portfolioUrl: profile.portfolioUrl || '',
  };

  console.log('✅ Professional resume generated successfully');

  return {
    contactInfo,
    professionalSummary,
    professionalSkills,
    enhancedExperience,
    enhancedProjects: enhancedProjects.filter(p => p !== null),
    enhancedCertifications,
    enhancedEducation,
    atsKeywords: [...new Set(atsKeywords)],
  };
};

/**
 * Generate AI-powered professional resume
 * POST /api/resume/generate
 */
exports.generateResume = async (req, res) => {
  try {
    // Get user profile
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Please complete your profile first' });
    }

    if (!profile.isComplete) {
      return res.status(400).json({ 
        message: 'Please complete your profile with required information before generating resume' 
      });
    }

    // *** KEY CHANGE: Transform raw profile data into professional resume content ***
    // User input is treated as REFERENCE DATA, not final content
    const professionalResumeData = await generateProfessionalResume(profile.toObject());

    // Create or update resume with professionally generated content
    let resume = await Resume.findOne({ userId: req.userId });

    if (resume) {
      // Update existing resume
      resume.profile = profile.toObject();
      resume.aiSummary = professionalResumeData.professionalSummary;
      resume.enhancedProjects = professionalResumeData.enhancedProjects;
      resume.atsKeywords = professionalResumeData.atsKeywords;
      resume.professionalSkills = professionalResumeData.professionalSkills;
      resume.enhancedExperience = professionalResumeData.enhancedExperience;
      resume.enhancedCertifications = professionalResumeData.enhancedCertifications;
      resume.contactInfo = professionalResumeData.contactInfo;
      resume.version = (resume.version || 0) + 1;
      resume.generatedAt = new Date();
    } else {
      // Create new resume
      resume = new Resume({
        userId: req.userId,
        profile: profile.toObject(),
        aiSummary: professionalResumeData.professionalSummary,
        enhancedProjects: professionalResumeData.enhancedProjects,
        atsKeywords: professionalResumeData.atsKeywords,
        professionalSkills: professionalResumeData.professionalSkills,
        enhancedExperience: professionalResumeData.enhancedExperience,
        enhancedCertifications: professionalResumeData.enhancedCertifications,
        contactInfo: professionalResumeData.contactInfo,
      });
    }

    await resume.save();

    res.json({
      message: 'Professional ATS-optimized resume generated successfully',
      resume: {
        ...resume.toObject(),
        // Include the professionally generated content in response
        generatedContent: professionalResumeData,
      },
    });
  } catch (error) {
    console.error('Generate resume error:', error);
    res.status(500).json({ 
      message: 'Error generating resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get user's resume
 * GET /api/resume
 */
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.userId });

    if (!resume) {
      return res.status(404).json({ message: 'No resume found. Please generate one first.' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Error fetching resume' });
  }
};

/**
 * Update resume
 * PUT /api/resume
 */
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({
      message: 'Resume updated successfully',
      resume,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Error updating resume' });
  }
};

/**
 * Delete resume
 * DELETE /api/resume
 */
exports.deleteResume = async (req, res) => {
  try {
    await Resume.findOneAndDelete({ userId: req.userId });

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
};
