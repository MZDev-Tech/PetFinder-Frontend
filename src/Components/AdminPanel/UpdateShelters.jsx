import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateShelters = ({ currentId, setUpdateModal, refreshShelters }) => {
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
    const fetchSheltersData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/shelters/${currentId}`);
        const shelter = response.data;
        setUpdateData({
          name: shelter.name,
          location: shelter.location,
          detail: shelter.detail,
          link: shelter.link,
          image: shelter.image, 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchSheltersData();
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
    formData.append('link', updateData.link);

    if (updateData.image instanceof File) {
      formData.append('image', updateData.image); 
    }

    try {
      await axios.put(`http://localhost:8081/api/shelters/update/${currentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUpdateModal(false);
      refreshShelters();
     toast.success( 'Shelters Data update successfully..');

    } 
    catch (error) {
      toast.error( 'Something went wrong while updating Shelters..');
      console.error('Error:', error);
    }
  };

  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Animal Shelters</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
          <label>Shelter</label>

            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                placeholder="Animal Shelters"
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
              <input
                type="text"
                name="link"
                value={updateData.link}
                onChange={handleInput}
                placeholder="Shelter Site Link"
                required
              />
            </div>

            <div className="fieldAdd">
              <img
                src={newImage || (updateData.image ? `http://localhost:8081/uploads/${updateData.image}` : Img)}
                alt="Current shelter"
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

export default UpdateShelters
