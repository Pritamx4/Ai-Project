// Resume Generator Controller with AI Integration
const Resume = require('../models/Resume');
const Profile = require('../models/Profile');
const axios = require('axios');

/**
 * Call Gemini API to generate content
 */
const callAI = async (prompt) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY; // Using same env variable for Gemini key

    if (!apiKey) {
      console.warn('Gemini API key not configured. Using intelligent mock AI response.');
      return generateMockAIResponse(prompt);
    }

    // Gemini API endpoint - Using correct v1 API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an expert ATS resume writer and career coach. Generate professional, achievement-focused, and ATS-optimized content.\n\n${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract text from Gemini's response format
    const generatedText = response.data.candidates[0].content.parts[0].text.trim();
    return generatedText;
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    console.warn('Falling back to intelligent mock AI response.');
    return generateMockAIResponse(prompt);
  }
};

/**
 * Generate intelligent mock AI response based on user data
 */
const generateMockAIResponse = (prompt) => {
  // Extract data from prompt for context-aware responses
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('professional summary')) {
    // Extract role from prompt
    const roleMatch = prompt.match(/target role:\s*(.+)/i);
    const skillsMatch = prompt.match(/skills:\s*(.+)/i);
    const role = roleMatch ? roleMatch[1].trim() : 'professional';
    const skills = skillsMatch ? skillsMatch[1].split(',').slice(0, 3).join(', ') : 'various technologies';
    
    return `Results-driven ${role} with demonstrated expertise in ${skills}. Proven track record of delivering high-quality solutions and driving project success. Strong problem-solving abilities combined with excellent collaboration skills. Passionate about leveraging technology to create impactful applications that enhance user experience and achieve business objectives.`;
  }
  
  if (lowerPrompt.includes('work experience') || lowerPrompt.includes('position:')) {
    const positionMatch = prompt.match(/position:\s*(.+)/i);
    const companyMatch = prompt.match(/company:\s*(.+)/i);
    const position = positionMatch ? positionMatch[1].split('\n')[0].trim() : 'Professional';
    const company = companyMatch ? companyMatch[1].split('\n')[0].trim() : 'the organization';
    
    return `• Led development initiatives as ${position} at ${company}, contributing to key technical decisions and project delivery\n• Collaborated with cross-functional teams to design and implement scalable solutions, improving system performance and user satisfaction\n• Utilized modern development practices including code reviews, testing, and continuous integration to ensure high-quality deliverables\n• Mentored team members and participated in knowledge-sharing sessions to foster a culture of continuous improvement`;
  }
  
  if (lowerPrompt.includes('project')) {
    const projectMatch = prompt.match(/project:\s*(.+)/i);
    const techMatch = prompt.match(/technologies:\s*(.+)/i);
    const project = projectMatch ? projectMatch[1].split('\n')[0].trim() : 'application';
    const tech = techMatch ? techMatch[1].split('\n')[0].trim() : 'modern technologies';
    
    return `Developed and deployed ${project} utilizing ${tech}. Implemented comprehensive features including user authentication, data validation, and responsive design. Employed best practices in code organization and architecture to ensure maintainability and scalability. Successfully delivered a production-ready solution that improved efficiency and enhanced user experience.`;
  }
  
  if (lowerPrompt.includes('skills')) {
    const skillsList = prompt.match(/original skills:\s*(.+)/i);
    if (skillsList) {
      const skills = skillsList[1].split(',').map(s => s.trim());
      return skills.map(skill => `${skill} (Proficient)`).join(', ');
    }
    return 'Full-stack development, Modern frameworks, Database design, API development, Testing and deployment';
  }
  
  if (lowerPrompt.includes('certification')) {
    const certMatch = prompt.match(/certification:\s*(.+)/i);
    const cert = certMatch ? certMatch[1].split('\n')[0].trim() : 'Professional Certification';
    return `${cert} - Validated expertise in professional best practices and industry-standard methodologies`;
  }

  return 'Professional, detail-oriented individual with strong technical skills and a commitment to delivering excellence in every project.';
};

/**
 * Transform raw profile data into professional ATS-optimized resume content
 * This is the core function that generates professional resume from user input
 */
const generateProfessionalResume = async (profile) => {
  console.log('🎯 Generating professional ATS-optimized resume...');

  // 1. Generate Professional Summary
  const summaryPrompt = `Generate a compelling professional summary for a ${profile.targetJobRole || 'professional'} position.

Context:
- Target Role: ${profile.targetJobRole || 'Not specified'}
- Key Skills: ${profile.skills.join(', ') || 'Not specified'}
- Years of Experience: ${profile.experience.length} position(s)
- Education: ${profile.education.map(e => e.degree).join(', ') || 'Not specified'}

Requirements:
- Write a powerful 3-4 sentence professional summary
- Highlight key technical competencies and achievements
- Use strong action verbs and measurable impact statements
- Make it ATS-friendly with relevant keywords
- Sound confident and professional

Return only the summary text, no additional formatting.`;

  const professionalSummary = await callAI(summaryPrompt);

  // 2. Rewrite Skills Professionally
  const skillsPrompt = `Rewrite these skills professionally for a resume:

Original skills: ${profile.skills.join(', ')}

Requirements:
- Group related skills together
- Add proficiency indicators where appropriate
- Use industry-standard terminology
- Make it ATS-optimized

Return as comma-separated list.`;

  const professionalSkills = await callAI(skillsPrompt);

  // 3. Enhance Work Experience
  const enhancedExperience = await Promise.all(
    profile.experience.map(async (exp) => {
      if (!exp.title || !exp.company) {
        return exp;
      }

      const expPrompt = `Transform this work experience into professional ATS-optimized resume content:

Position: ${exp.title}
Company: ${exp.company}
Location: ${exp.location || 'Not specified'}
Duration: ${exp.startDate} - ${exp.endDate || exp.current ? 'Present' : 'Not specified'}
Original Description: ${exp.description || 'No description provided'}

Requirements:
- Create 3-5 impactful bullet points
- Start each bullet with strong action verbs (Led, Developed, Implemented, Architected, etc.)
- Include quantifiable achievements where possible
- Highlight technical skills, tools, and methodologies used
- Emphasize impact and results
- Make it ATS-optimized with relevant keywords
- Format with • bullet points

Return only the bullet points, no additional text.`;

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

  // 4. Enhance Projects with Impact and Technologies
  const enhancedProjects = await Promise.all(
    (profile.projects || []).slice(0, 5).map(async (project) => {
      if (!project.name) {
        return null;
      }

      const projectPrompt = `Transform this project into professional resume content:

Project Name: ${project.name}
Original Description: ${project.description || 'No description'}
Technologies: ${project.technologies || 'Not specified'}
URL: ${project.url || project.githubUrl || 'Not provided'}

Requirements:
- Write a compelling 2-3 sentence description
- Highlight the problem solved and the impact created
- Showcase technical architecture and key features
- Emphasize technologies used and best practices applied
- Include measurable outcomes if possible (users, performance, etc.)
- Make it sound professional and achievement-focused

Return only the enhanced description, no additional formatting.`;

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

  // 5. Enhance Certifications
  const enhancedCertifications = await Promise.all(
    (profile.certifications || []).map(async (cert) => {
      if (!cert.name) {
        return cert;
      }

      const certPrompt = `Professionally rewrite this certification entry:

Certification: ${cert.name}
Issuer: ${cert.issuer || 'Not specified'}
Date: ${cert.date || 'Not specified'}

Requirements:
- Make it sound professional and credible
- Add context about what this certification validates
- Keep it concise (1-2 sentences)

Return only the enhanced certification description.`;

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
