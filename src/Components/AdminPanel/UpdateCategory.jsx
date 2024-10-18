import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; // Placeholder image
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateCategory = ({ categoryId, setUpdateModal, refreshCategories }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    detail: '',
    image: '', 
  });
  const [newImage, setNewImage] = useState(null);

  // Fetch existing category data when component mounts or categoryId changes
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/categories/${categoryId}`);
        const category = response.data;
        setUpdateData({
          name: category.name,
          detail: category.detail,
          image: category.image, 
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

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
    formData.append('detail', updateData.detail);

    if (updateData.image instanceof File) {
      formData.append('image', updateData.image); 
    }

    try {
      await axios.put(`http://localhost:8081/api/categories/update/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUpdateModal(false);
      refreshCategories();
     toast.success('Category update successfully..');

    } 
    catch (error) {
      toast.error('Something went wrong while updating category..');
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className={`popup-modalBg smallScreen-Bg ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
            <label>Category</label>

              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                placeholder="Category"
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
                alt="Current Category"
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

export default UpdateCategory;
