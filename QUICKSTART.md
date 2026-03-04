# 🚀 Quick Start Guide

## Step-by-Step Setup Instructions

### 1️⃣ Install MongoDB (if not already installed)

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**Check if MongoDB is running:**
```bash
mongod --version
```

### 2️⃣ Setup Backend

```bash
# Navigate to server folder
cd server

# Install dependencies (already done)
# npm install

# Start the backend server
npm run dev
```

The server will start on `http://localhost:5000`

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

### 3️⃣ Setup Frontend

Open a **NEW terminal** window:

```bash
# Navigate to client folder
cd client

# Install dependencies (already done)
# npm install

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4️⃣ Open the Application

Open your browser and go to: **http://localhost:5173**

## 🎯 First-Time Usage

1. **Register**: Click "Get Started" and create an account
2. **Login**: Use your credentials to log in
3. **Complete Profile**: Fill in all your information
4. **Connect GitHub** (optional): Add your GitHub username
5. **Generate Resume**: Click to generate your AI resume
6. **Preview & Download**: View and download your resume

## 🔧 Optional Configuration

### Add OpenAI API Key (for real AI generation)

1. Get API key from: https://platform.openai.com/api-keys
2. Open `server/.env`
3. Add your key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```
4. Restart the backend server

**Note:** Without an OpenAI key, the app uses smart mock responses.

### Add GitHub Token (for unlimited API requests)

1. Generate token at: https://github.com/settings/tokens
2. Open `server/.env`
3. Add token:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```
4. Restart the backend server

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB
mongod

# Or use Atlas connection string in server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder
```

### Port Already in Use
```bash
# Backend (5000)
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (5173)
# Kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found Error
```bash
# Reinstall dependencies
cd server
npm install

cd ../client
npm install
```

## 📝 Development Commands

### Backend
```bash
npm run dev      # Development with auto-restart
npm start        # Production mode
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## ✅ Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 5173
- [ ] Can access http://localhost:5173 in browser
- [ ] Can register a new account
- [ ] Can log in successfully
- [ ] Can complete profile
- [ ] Can generate resume

## 🎉 You're All Set!

Your AI Resume and Portfolio Generator is ready to use!

For detailed documentation, see README.md
