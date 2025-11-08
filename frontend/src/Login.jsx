import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure this path matches your file structure

import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });
      setMessage(res.data.message || 'Login successful');
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">USER LOGIN</h2>
        <div className="user-icon">
          <FaUser size={50} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="input-icon" />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">LOG IN</button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}

export default Login;



/*import React, { useState } from 'react';
//import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure this path matches your file structure
import { FaUser, FaLock } from 'react-icons/fa';
import Register from './Register';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}

export default Login;
// import logo from './logo.svg';
// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Login';
// import Register from './Register';

// function Home() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:4000/')
//       .then(res => res.text())
//       .then(text => setMessage(text));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Backend Data:</p>
//         <p>{message}</p>
//       </header>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;*/