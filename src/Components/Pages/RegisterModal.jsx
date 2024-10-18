import React, { useState } from 'react';
import './Css/Form.css';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import RegisterImg from '../../Images/register.png';
import axios from 'axios';
import { toast } from 'react-toastify';



const RegisterModal = ({ registerModal, setShowRegisterModal, setShowLoginModal }) => {
  const [RegisterData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    
    try {
      await axios.post('http://localhost:8081/api/user/add', RegisterData, {
        headers:{
          'Content-Type':'application/json',
        }
      });
      toast.success("User Register Successfully..")
      setShowRegisterModal(false);
      setShowLoginModal(true); // Show login modal after successful registration
    } catch (error) {
      toast.success("User Registration Failed..")
    }
  };

  // function to show login form
  const handleLoginClick = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
    <div className={`modal-background ${registerModal ? 'show' : ''}`}>
      <div className="register-form">
        <div className="modal-part1">
          <div className="registerModal-data">
            <h2>Get Registered</h2>
            <p>To become part of our community, please sign up using personal information</p>
          </div>
          <img src={RegisterImg} alt="" className="registerBg"/>
        </div>

        <div className="modal-content register-content">
          <span className="close-button" onClick={() => setShowRegisterModal(false)}>×</span>
          <h2>Sign UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="Input-fields">
              <div className="field1">
                <div className="form-icon">
                  <PersonIcon className="icon1" />
                </div>
                <input type="text" name="name" value={RegisterData.name} onChange={handleInput} placeholder="Your Name" required />
              </div>

              <div className="field1">
                <div className="form-icon">
                  <EmailIcon className="icon1" />
                </div>
                <input type="email" name="email" value={RegisterData.email} onChange={handleInput} placeholder="Email Address" required />
              </div>

              <div className="field1">
                <div className="form-icon">
                  <LockIcon className="icon1" />
                </div>
                <input type="password" name="password" value={RegisterData.password} onChange={handleInput} placeholder="Password" required />
              </div>
            </div>
            <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterModal;
