import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './src/Register';
import Login from './Login'; // Import Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;