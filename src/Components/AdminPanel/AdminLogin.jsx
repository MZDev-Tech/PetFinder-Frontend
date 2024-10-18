import React, { useState, useEffect } from 'react'
import './CSS/AdminLogin.css';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AdminLogin = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const navigate=useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/admin/adminLogin', loginInfo);
            toast.success("Admin login successfully..");

            // Save token to localStorage/session storage or handle it as needed
            sessionStorage.setItem('token', response.data.token);
            navigate('/admin/dashboard');
          } catch (error) {
            toast.error('Login failed. Please check your email and password.');
         
      }

    }
    return (
        <>
            <section className="login-background2">
                <div className="login-content2">
                    <div className="head-data">
                        <p>Hi, Sign In to manage your website content.</p>
                    </div>
                    <div className="bg-padding">
                    <div className="login-head">
                        <div className="iconlogin">
                            <PetsOutlinedIcon className="icon" />
                        </div>
                        <div className="name-part">
                            <h2>DirectAdmin</h2>
                            <p>Pet Foundation</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="Input-fields2">

                            <div className="field2">
                                <label>Email ID</label>
                                <input type="text" name="email" value={loginInfo.email} onChange={handleInput} Placeholder="Enter Email" />
                            </div>

                            <div className="field2">
                            <label>Password</label>

                                <input type="password" name="password" value={loginInfo.password} onChange={handleInput} Placeholder="Enter Your Password" />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLogin
