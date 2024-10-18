import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateFeedback = ({ currentId, setUpdateModal, refreshFeedback,showAlert }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    location: '',
    detail: '',
    link: '',
    image: '', 
  });
  const [newImage, setNewImage] = useState(null);

  // Fetch existing category data when component mounts or currentId changes
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/feedback/${currentId}`);
        const feedback = response.data;
        setUpdateData({
          name: feedback.name,
          location: feedback.location,
          detail: feedback.detail,
          image: feedback.image, 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchFeedbackData();
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
    formData.append('location', updateData.location);
    formData.append('detail', updateData.detail);

    if (updateData.image instanceof File) {
      formData.append('image', updateData.image); 
    }

    try {
      await axios.put(`http://localhost:8081/api/feedback/update/${currentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUpdateModal(false);
      refreshFeedback();
      toast.success('Feedback Data update successfully..');

    } 
    catch (error) {
      toast.error('Something went wrong while updating Feedback..');
      console.error('Error:', error);
    }
  };

  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">

            <div className="fieldAdd">
            <label>UserName</label>

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
            <label>Location</label>

              <input
                type="text"
                name="location"
                value={updateData.location}
                onChange={handleInput}
                placeholder="Location"
                required
              />
            </div>

            <div className="fieldAdd">
            <label>Description</label>

              <textarea
                name="detail"
                value={updateData.detail}
                onChange={handleInput}
                placeholder="Description"
                rows="3"
                required
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

export default UpdateFeedback
