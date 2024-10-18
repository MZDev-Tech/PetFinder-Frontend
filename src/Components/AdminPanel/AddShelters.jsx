import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddShelters = ({ setOpenPopup,refreshShelters }) => {
  const [addData, setAddData] = useState({
    name: '',
    location: '',
    detail: '',
    link: '',
    image: null,
  });

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    console.log(files)
    if (type === 'file') {
      setAddData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setAddData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', addData.name);
    formData.append('location', addData.location);
    formData.append('detail', addData.detail);
    formData.append('link', addData.link);
    formData.append('image', addData.image);

    try {
      await axios.post('http://localhost:8081/api/shelters/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpenPopup(false); 
      refreshShelters();
      toast.success('Shelters added successfully..');

    } catch (error) {
      toast.error( 'Something went wrong while adding shelter..');

      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`popup-largerModel  ${setOpenPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setOpenPopup(false)}>×</span>
        <h2>Add New Shelters</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="Input-fields">
            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={addData.name}
                onChange={handleInput}
                placeholder="Animal Shelter"
              />
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="location"
                value={addData.location}
                onChange={handleInput}
                placeholder="Location"
              />
            </div>

            <div className='fieldAdd'>
              <textarea
                name="detail"
                value={addData.detail}
                onChange={handleInput}
                placeholder="Description"
                rows="3"
              ></textarea>
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="link"
                value={addData.link}
                onChange={handleInput}
                placeholder="Shelter SiteLink"
              />
            </div>

            <div className="img-field">
              <label>Upload Image</label>
              <input type="file" name="image" onChange={handleInput} />
            </div>
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddShelters
