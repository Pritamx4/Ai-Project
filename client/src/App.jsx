
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfileForm from './pages/ProfileForm';
import ResumeGenerator from './pages/ResumeGenerator';
import ResumePreview from './pages/ResumePreview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-resume"
            element={
              <ProtectedRoute>
                <ResumeGenerator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-preview"
            element={
              <ProtectedRoute>
                <ResumePreview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
