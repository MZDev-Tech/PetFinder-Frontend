import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import './CSS/PopupModal.css';


const UpdateAdoption = ({ currentId, setUpdateModal, refreshAdoption }) => {
  const [updateData, setUpdateData] = useState({
    pet: '',
    category: '',
    user: '',
    address: '',
    delivery_status: '', 
  });

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/adoption/${currentId}`);
        setUpdateData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchAdoptionData();
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
      await axios.put(`http://localhost:8081/api/adoption/update/${currentId}`, {
        delivery_status: updateData.delivery_status,
      });
      setUpdateModal(false);
      refreshAdoption();
      toast.success('Adoption Status updated successfully.');
    } catch (error) {
      toast.error('Error while updating adoption status.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={`popup-modalBg smallScreen-Bg ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Adoption Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
            <label>Requested Pet</label>

              <input
                type="text"
                name="pet"
                value={updateData.pet}
                disabled
              />
            </div>

           

            <div className="fieldAdd">
            <label>UserName</label>

              <input
                type="text"
                name="user"
                value={updateData.user}
                disabled
              />
            </div>

            <div className="fieldAdd">
            <label>Shipping Address</label>

              <input
                type="text"
                name="address"
                value={updateData.shippingAddress}
                disabled
              />
            </div>

            <div className="fieldAdd">
            <label>Update Status</label>

              <select
                name="delivery_status"
                value={updateData.delivery_status}
                onChange={handleInput}
                required
              >
                <option value="">--Delivery Status--</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdoption;
