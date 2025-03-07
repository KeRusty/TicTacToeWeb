import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import TicTacToe from './components/TicTacToe';
import Stats from './components/Stats';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50 py-12">
                <TicTacToe />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Your Statistics</h2>
                <Stats />
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;