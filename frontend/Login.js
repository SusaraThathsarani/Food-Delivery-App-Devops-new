import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './src/Register';
function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Add your login logic here
    setMessage('Login logic not implemented');
  };

  return (
    <div>
        
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate('/register')}>Go to Register</button>
    <Register />
  
    </div>
  );
}

export default Login;