import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUser = ({ setOpenPopup,refreshUser }) => {
  const [addData, setAddData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    
      setAddData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post('http://localhost:8081/api/user/add', addData);
      setOpenPopup(false);
      refreshUser();
      toast.success( 'User added successfully..');
    } catch (error) {
      toast.error('Something went wrong while adding ..');
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className={`popup-modalBg ${setOpenPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setOpenPopup(false)}>×</span>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="Input-fields">
            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={addData.name}
                onChange={handleInput}
                placeholder="UserName"
              />
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="email"
                value={addData.email}
                onChange={handleInput}
                placeholder="Email ID"
              />
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="password"
                value={addData.password}
                onChange={handleInput}
                placeholder="Password"
              />
            </div>

        
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser
