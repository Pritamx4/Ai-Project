# 📊 Project Architecture & Features

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Pages     │  │  Components  │  │   Context    │       │
│  │  - Home     │  │  - Protected │  │  - Auth      │       │
│  │  - Login    │  │    Route     │  └──────────────┘       │
│  │  - Register │  └──────────────┘                          │
│  │  - Dashboard│                                            │
│  │  - Profile  │  ┌──────────────┐                          │
│  │  - Resume   │  │   Services   │                          │
│  └─────────────┘  │  - API calls │                          │
│                   └──────────────┘                          │
└────────────┬────────────────────────────────────────────────┘
             │ HTTP/HTTPS (REST API)
             │ JSON Data Transfer
             ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVER (Node.js/Express)                │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Routes    │  │ Controllers  │  │  Middleware  │       │
│  │  - Auth     │  │  - Auth      │  │  - JWT Auth  │       │
│  │  - Profile  │  │  - Profile   │  │  - CORS      │       │
│  │  - GitHub   │  │  - GitHub    │  │  - Error     │       │
│  │  - Resume   │  │  - Resume    │  └──────────────┘       │
│  │  - Portfolio│  │  - Portfolio │                          │
│  └─────────────┘  └──────────────┘                          │
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Models (Mongoose)                  │        │
│  │  - User  - Profile  - Resume                   │        │
│  └─────────────────────────────────────────────────┘        │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
    ┌────────────────┐        ┌──────────────┐
    │    MongoDB     │        │  External API│
    │   Database     │        │  - OpenAI    │
    └────────────────┘        │  - GitHub    │
                              └──────────────┘
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  lastLogin: Date
}
```

### Profile Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fullName: String,
  email: String,
  phone: String,
  targetJobRole: String,
  linkedinUrl: String,
  githubUsername: String,
  portfolioUrl: String,
  skills: [String],
  education: [{
    degree, institution, year, gpa
  }],
  experience: [{
    title, company, location, 
    startDate, endDate, description, current
  }],
  projects: [{
    name, description, technologies,
    url, githubUrl
  }],
  certifications: [{
    name, issuer, date, credentialUrl
  }],
  githubRepos: [{
    name, description, url, 
    language, stars, forks
  }],
  isComplete: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  profile: Mixed (snapshot of profile),
  aiSummary: String,
  enhancedProjects: [{
    name, originalDescription,
    aiEnhancedDescription, technologies
  }],
  atsKeywords: [String],
  generatedAt: Date,
  version: Number
}
```

## API Endpoints Reference

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user |
| GET | `/profile` | Yes | Get current user |

### 👤 Profile (`/api/profile`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | Get user profile |
| PUT | `/` | Yes | Update profile |
| DELETE | `/` | Yes | Delete profile |

### 💻 GitHub (`/api/github`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/repos/:username` | Yes | Fetch repositories |
| POST | `/connect` | Yes | Connect GitHub |
| GET | `/user/:username` | Yes | Get GitHub user info |

### 📄 Resume (`/api/resume`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/generate` | Yes | Generate AI resume |
| GET | `/` | Yes | Get user's resume |
| PUT | `/` | Yes | Update resume |
| DELETE | `/` | Yes | Delete resume |

### 🌐 Portfolio (`/api/portfolio`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/generate` | Yes | Generate portfolio |
| GET | `/:username` | No | Get public portfolio |

## Frontend Components

### Pages
- **Home** - Landing page with features
- **Login** - User authentication
- **Register** - User registration
- **Dashboard** - Main user hub
- **ProfileForm** - Complete user information
- **ResumeGenerator** - AI resume generation
- **ResumePreview** - View and download resume

### Components
- **ProtectedRoute** - Route guard for authenticated users

### Context
- **AuthContext** - Global authentication state management

### Services
- **API Service** - Centralized API calls with axios
  - authService
  - profileService
  - githubService
  - resumeService
  - portfolioService

## Key Features Implementation

### 1. Authentication Flow
```
Register → Hash Password → Save User → Create Profile → Generate JWT
Login → Verify Password → Generate JWT → Store in localStorage
Protected Routes → Verify JWT → Allow Access
```

### 2. AI Resume Generation Process
```
1. Fetch user profile
2. Validate profile completion
3. Generate AI summary (OpenAI/Mock)
4. Enhance project descriptions
5. Extract ATS keywords
6. Create/Update resume document
7. Return generated resume
```

### 3. GitHub Integration Flow
```
1. User enters GitHub username
2. Fetch repos from GitHub API
3. Filter non-forked repos
4. Sort by stars
5. Store top 10 in profile
6. Display in projects section
```

### 4. Profile Completion Check
```
Required Fields:
- Full Name ✓
- Email ✓
- Target Job Role ✓
- At least 1 skill ✓
- At least 1 education ✓
```

## Security Features

1. **Password Security**
   - bcrypt hashing with salt rounds
   - Passwords never returned in API responses

2. **JWT Authentication**
   - 30-day expiration
   - Bearer token in Authorization header
   - Middleware validates all protected routes

3. **Input Validation**
   - Email format validation
   - Required field checks
   - Password minimum length

4. **CORS Protection**
   - Configured for specific frontend URL
   - Prevents unauthorized access

## AI Integration Details

### OpenAI Implementation
- **Model**: GPT-3.5-turbo
- **Max Tokens**: 500 per request
- **Temperature**: 0.7 (balanced creativity)
- **Fallback**: Smart mock responses if API unavailable

### AI-Generated Content
1. **Professional Summary** (3-4 sentences)
2. **Project Descriptions** (2-3 sentences each)
3. **ATS Keywords** (extracted from profile)

## Styling Approach

### Tailwind CSS Classes
- Responsive design (`md:`, `lg:` prefixes)
- Gradient backgrounds
- Glassmorphism effects
- Hover animations
- Custom color palette

### Design System
```
Primary Color: Indigo (#6366f1)
Secondary Color: Purple (#8b5cf6)
Background: Gradient (indigo → purple → pink)
Glass Effect: rgba with backdrop-filter
```

## Performance Optimizations

1. **Frontend**
   - Vite for fast builds
   - React lazy loading (future enhancement)
   - Efficient state management

2. **Backend**
   - MongoDB indexing on email and userId
   - Async/await for non-blocking operations
   - Error handling middleware

3. **API Calls**
   - Axios instance with interceptors
   - Token auto-attachment
   - Centralized error handling

## Deployment Considerations

### Frontend Deployment
- Build command: `npm run build`
- Output: `dist/` folder
- Environment: `VITE_API_URL`

### Backend Deployment
- Entry point: `server.js`
- Environment variables required
- MongoDB connection string
- Process manager: PM2 (recommended)

### Environment Variables Checklist
```
Backend:
- PORT
- MONGODB_URI
- JWT_SECRET
- OPENAI_API_KEY (optional)
- GITHUB_TOKEN (optional)
- FRONTEND_URL

Frontend:
- VITE_API_URL
```

## Future Enhancements (Potential)

1. **PDF Generation** - Server-side PDF creation
2. **Email Integration** - Send resume via email
3. **Templates** - Multiple resume templates
4. **Analytics** - Track views and downloads
5. **Social Sharing** - Share portfolio on social media
6. **Multi-language** - Support for multiple languages
7. **AI Improvements** - Fine-tuned AI models
8. **Export Options** - Word, LaTeX formats

## Testing Strategy (Future)

### Frontend
- Unit tests: React Testing Library
- E2E tests: Cypress
- Component tests: Vitest

### Backend
- Unit tests: Jest
- Integration tests: Supertest
- API testing: Postman/Newman

## Monitoring & Logging

### Current Implementation
- Console logs for errors
- Request logging middleware
- MongoDB connection status

### Production Recommendations
- Winston for structured logging
- Error tracking: Sentry
- Performance monitoring: New Relic
- Uptime monitoring: Pingdom

---

**This architecture provides a solid foundation for a production-ready AI Resume and Portfolio Generator application.**
