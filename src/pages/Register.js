import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useHistory } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/users?username=' + encodeURIComponent(username));
    const existingUsers = await response.json();
    
    if (existingUsers.length > 0) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    const isSuccess = await register(username, password);
    if (isSuccess) {
      history.push('/home');
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
