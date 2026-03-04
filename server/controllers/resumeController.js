// Resume Generator Controller with AI Integration
const Resume = require('../models/Resume');
const Profile = require('../models/Profile');
const axios = require('axios');

/**
 * Call OpenAI API to generate content
 */
const callOpenAI = async (prompt) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn('OpenAI API key not configured. Using mock AI response.');
      return generateMockAIResponse(prompt);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer and career coach. Generate concise, professional, and ATS-optimized content.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    return generateMockAIResponse(prompt);
  }
};

/**
 * Generate mock AI response when OpenAI is not available
 */
const generateMockAIResponse = (prompt) => {
  if (prompt.includes('professional summary')) {
    return 'Results-driven professional with expertise in full-stack development and a proven track record of delivering high-quality software solutions. Skilled in modern web technologies, problem-solving, and collaborative team environments. Passionate about creating efficient, scalable applications that enhance user experience and drive business growth.';
  }
  
  if (prompt.includes('project description')) {
    return 'Developed a comprehensive web application utilizing modern frameworks and best practices. Implemented robust features including user authentication, responsive design, and efficient data management. Successfully delivered a scalable solution that improved user engagement and operational efficiency.';
  }

  return 'Professional, detail-oriented individual with strong technical skills and a commitment to excellence.';
};

/**
 * Generate AI-powered resume
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

    // Generate professional summary using AI
    const summaryPrompt = `Generate a professional summary for a resume based on this information:
    Target Role: ${profile.targetJobRole}
    Skills: ${profile.skills.join(', ')}
    Experience: ${profile.experience.length} positions
    Education: ${profile.education.map(e => e.degree).join(', ')}
    
    Create a compelling 3-4 sentence professional summary that highlights key strengths and is ATS-optimized.`;

    const aiSummary = await callOpenAI(summaryPrompt);

    // Enhance project descriptions
    const enhancedProjects = await Promise.all(
      profile.projects.slice(0, 5).map(async (project) => {
        if (!project.name) return null;

        const projectPrompt = `Enhance this project description for a resume:
        Project: ${project.name}
        Description: ${project.description || 'No description'}
        Technologies: ${project.technologies}
        
        Create a concise, impactful description (2-3 sentences) that highlights achievements and technical skills.`;

        const enhancedDescription = await callOpenAI(projectPrompt);

        return {
          name: project.name,
          originalDescription: project.description,
          aiEnhancedDescription: enhancedDescription,
          technologies: project.technologies,
        };
      })
    );

    // Generate ATS keywords
    const keywords = [
      ...profile.skills,
      profile.targetJobRole,
      ...profile.education.map(e => e.degree),
      ...profile.experience.map(e => e.title),
    ].filter(Boolean);

    // Create or update resume
    let resume = await Resume.findOne({ userId: req.userId });

    if (resume) {
      resume.profile = profile.toObject();
      resume.aiSummary = aiSummary;
      resume.enhancedProjects = enhancedProjects.filter(p => p !== null);
      resume.atsKeywords = [...new Set(keywords)];
      resume.version += 1;
      resume.generatedAt = new Date();
    } else {
      resume = new Resume({
        userId: req.userId,
        profile: profile.toObject(),
        aiSummary,
        enhancedProjects: enhancedProjects.filter(p => p !== null),
        atsKeywords: [...new Set(keywords)],
      });
    }

    await resume.save();

    res.json({
      message: 'Resume generated successfully',
      resume,
    });
  } catch (error) {
    console.error('Generate resume error:', error);
    res.status(500).json({ message: 'Error generating resume' });
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
