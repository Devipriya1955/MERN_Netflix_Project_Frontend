import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails';
import DownloadManager from './components/DownloadManager';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/browse" />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
            <Route path="/" element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/browse" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/movie/:id" element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } />
            <Route path="/my-list" element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            } />
            <Route path="/tv-shows" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/movies" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/new-popular" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/browse-by-language" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/kids" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/manage-profiles" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/downloads" element={
              <ProtectedRoute>
                <DownloadManager />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;