import React, { useState, useContext } from 'react';
import './Css/Form.css'; 
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../ContextAPI/UserContext';
import {jwtDecode} from 'jwt-decode';

const LoginModal = ({ loginModal, setShowLoginModal, setShowRegisterModal }) => {
  const { setUser } = useContext(UserContext);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8081/api/user/login', loginData);
      toast.success('Login successful!');

      const token = response.data.token; // Get the token from response
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token');

      // Decode the token to get user data
      const userData = jwtDecode(token);

      // Save user data to context
      setUser({
        id: userData.id, 
        name: userData.name,
        email: userData.email,
        
      });
      

      setShowLoginModal(false);
    } catch (error) {
      toast.error('Login failed. Please check your email and password.');
    }
  };

  // function to show signup form
  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <>
      <div className={`modal-background ${loginModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close-button" onClick={() => setShowLoginModal(false)}>×</span>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="Input-fields">
              <div className="field1">
                <div className="form-icon">
                  <EmailIcon className="icon1" />
                </div>
                <input type="text" name="email" value={loginData.email} onChange={handleInput} placeholder="Email Address" required />
              </div>
              <div className='field1'>
                <div className="form-icon">
                  <LockIcon className="icon1" />
                </div>
                <input type="password" name="password" value={loginData.password} onChange={handleInput} placeholder="Password" required />
              </div>
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
          <p>Don't have an account? <span onClick={handleSignUpClick}>Sign Up</span></p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
