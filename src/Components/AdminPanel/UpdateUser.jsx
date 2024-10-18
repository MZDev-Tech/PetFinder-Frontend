import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateUser = ({ currentId, setUpdateModal, refreshUser }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  // Fetch existing category data when component mounts or currentId changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/user/${currentId}`);
        const user = response.data;
        setUpdateData({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchUserData();
    }
  }, [currentId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.put(`http://localhost:8081/api/user/update/${currentId}`, updateData);
      setUpdateModal(false);
      refreshUser();
      toast.success('User Data updated successfully..');
    } catch (error) {
      toast.error('Something went wrong while updating User..');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className={`popup-modalBg ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
          <label>UseName</label>

            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                placeholder="User"
                required
              />
            </div>

            <div className="fieldAdd">
            <label>Email</label>

              <input
                type="text"
                name="email"
                value={updateData.email}
                onChange={handleInput}
                placeholder="email"
                required
              />
            </div>

           
            <div className="fieldAdd">
            <label>Password</label>

              <input
                type="text"
                name="password"
                value={updateData.password}
                onChange={handleInput}
                placeholder="password"
                required
              />
            </div>
    
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser
