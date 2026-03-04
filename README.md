# AI Resume and Portfolio Generator 🚀

A full-stack web application that automatically generates professional ATS-optimized resumes and portfolio websites using AI, with GitHub integration.

## 🌟 Features

- **User Authentication** - Secure registration and login system
- **Profile Management** - Comprehensive profile form for personal information, skills, education, experience, projects, and certifications
- **GitHub Integration** - Automatically fetch and showcase your GitHub repositories
- **AI-Powered Resume Generation** - Uses OpenAI to create:
  - Professional summaries
  - Enhanced project descriptions
  - ATS-optimized keywords
- **Resume Preview & Export** - View and download your resume as PDF
- **Portfolio Website** - Auto-generated portfolio page with modern glassmorphism design
- **Dashboard** - Centralized hub to manage all features

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling with glassmorphism effects
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI content generation
- **GitHub API** - Repository fetching

## 📁 Project Structure

```
ai-resume-builder/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    ├── server.js         # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key (optional, falls back to mock responses)
- GitHub Personal Access Token (optional, for enhanced features)

### Installation

1. **Clone the repository**
   ```bash
   cd "Ai Project"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Configuration**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   JWT_SECRET=your_jwt_secret_key_change_this
   OPENAI_API_KEY=your_openai_api_key_here
   GITHUB_TOKEN=your_github_token_here
   FRONTEND_URL=http://localhost:5173
   ```

2. **Frontend Configuration**
   
   Create `client/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (protected)

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update profile (protected)
- `DELETE /api/profile` - Delete profile (protected)

### GitHub
- `GET /api/github/repos/:username` - Fetch user repositories (protected)
- `POST /api/github/connect` - Connect GitHub account (protected)
- `GET /api/github/user/:username` - Get GitHub user info (protected)

### Resume
- `POST /api/resume/generate` - Generate AI resume (protected)
- `GET /api/resume` - Get user resume (protected)
- `PUT /api/resume` - Update resume (protected)
- `DELETE /api/resume` - Delete resume (protected)

### Portfolio
- `POST /api/portfolio/generate` - Generate portfolio (protected)
- `GET /api/portfolio/:username` - Get public portfolio

## 🎨 UI Features

- **Glassmorphism Design** - Modern frosted glass effect
- **Gradient Backgrounds** - Beautiful color gradients
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Hover effects and transitions
- **Dark Theme** - Eye-friendly dark color scheme

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation
- CORS configuration

## 📝 Usage Flow

1. **Register/Login** - Create an account or sign in
2. **Complete Profile** - Fill in your personal information, skills, education, and experience
3. **Connect GitHub** - Link your GitHub account to import projects
4. **Generate Resume** - Let AI create your professional resume
5. **Preview & Download** - View and download your resume as PDF
6. **Share Portfolio** - Get a shareable link to your portfolio website

## 🤖 AI Integration

The application uses OpenAI's GPT model to:
- Generate compelling professional summaries
- Enhance project descriptions
- Optimize content for ATS systems
- Extract relevant keywords

**Note:** If no OpenAI API key is provided, the system uses intelligent mock responses as fallback.

## 🔧 Development

### Frontend Development
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd server
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL`

### Backend (Heroku/Railway/Render)
1. Push code to repository
2. Set environment variables
3. Ensure MongoDB connection string is correct

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ by a Senior Full Stack Developer

## 🙏 Acknowledgments

- OpenAI for the GPT API
- GitHub for the repositories API
- MongoDB for the database
- All open-source libraries used in this project

---

**Happy Job Hunting! 🎯**
