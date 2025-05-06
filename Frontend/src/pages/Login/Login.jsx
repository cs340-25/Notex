import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useAuth } from '../../Providers/AuthContext'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth(); 
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we accept any input
    setLoggedIn(true);         
    navigate('/Profile');      
  };

  return (
    <div className="LoginCont">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;