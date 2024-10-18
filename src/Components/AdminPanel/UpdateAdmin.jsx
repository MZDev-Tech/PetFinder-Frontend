import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; // Placeholder image
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateAdmin = ({ currentId, setUpdateModal, refreshAdmin }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    password:'',
    image: '', 
  });
  const [newImage, setNewImage] = useState(null);

  // Fetch existing admin data 
  useEffect(() => {
   
        const fetchAdminData = async () => {
          try {
            // Retrieve the token from sessionStorage 
            const token = sessionStorage.getItem('token');
      
            const response = await axios.get(`http://localhost:8081/api/admin/${currentId}`, {
              headers: {
                'Authorization': `Bearer ${token}`  // Add the token to the request headers
              },
            });
        const AdminData = response.data;
        setUpdateData({
          name: AdminData.name,
          email: AdminData.email,
          password:'',
          image: AdminData.image, 
        });
      } catch (error) {
        console.error('Error fetching Admin data:', error);
      }
    };

    if (currentId) {
      fetchAdminData();
    }
  }, [currentId]);

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setNewImage(URL.createObjectURL(files[0])); // Create a preview URL for the selected file
      setUpdateData((prevData) => ({
        ...prevData,
        image: files[0], // Handle file input
      }));
    } else {
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', updateData.name);
    formData.append('email', updateData.email);
    formData.append('password', updateData.password);
  
    if (updateData.image instanceof File) {
      formData.append('image', updateData.image); 
    }
  
    // Retrieve the token from sessionStorage (or wherever you're storing it)
    const token = sessionStorage.getItem('token');
  
    try {
      await axios.put(`http://localhost:8081/api/admin/update/${currentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  // Add the token to the request headers
        },
      });
      setUpdateModal(false);
      refreshAdmin();
      toast.success('Profile updated successfully.');
    } 
    catch (error) {
      toast.error('Something went wrong while updating.');
      console.error('Error updating Admin:', error);
    }
  };
  
  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
            <label>Admin</label>

              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                required
              />
            </div>

            <div className="fieldAdd">
            <label>Email ID</label>

              <input
                type="text"
                name="email"
                value={updateData.email}
                onChange={handleInput}
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
                placeholder='Update Previous Password(optional)'
               
              />
            </div>
            
            <div className="fieldAdd">
              <img
                src={newImage || (updateData.image ? `http://localhost:8081/uploads/${updateData.image}` : Img)}
                alt="Current Img"
                width="80"
                height="80"
              />
            </div>
            <div className="img-field">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleInput}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdmin;
