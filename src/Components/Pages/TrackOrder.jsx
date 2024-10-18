import React, { useState} from 'react';
import './Css/Contact.css'; 
import './Css/TrackOrder.css'; 
import { toast } from 'react-toastify';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import Shape from "../../Images/dogBg.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import trackImg from '../../Images/track4.png'

const TrackOrder= ({  setShowLoginModal }) => {
  
  const [trackStatus, setTrackStatus] = useState({
    orderNumber: '',
    contact: '',
  });
  const navigate=useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTrackStatus(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8081/api/adoption/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackStatus),
      });
  
      // Ensure you get a valid JSON response
      const data = await response.json();
      
      // Check if response contains adoption details
      if (data && data.adoptionDetails) {
        navigate('/myAdoptions', { state: { adoptionDetails: data.adoptionDetails } });
        toast.success('Order Track Successfully');
      } else {
        toast.error('No adoption details found');
      }
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Unable to Track now, Plz try again..');
    }
  };
  
  

  return (
    <>
        <Navbar setShowLoginModal={setShowLoginModal} />
      {/* <section className="page-banner">
        <div className="container">
          <h2>Track Order</h2>
          <p>Stay updated on the status of your adoption order with our easy tracking system.</p>
        </div>
        <div className="bg-shape">
          <img src={Shape} alt="" />
        </div>
      </section> */}
<div className="main-trackpart">

      <div className="track-parent">

      <div className="track-right">
        <img src={trackImg} alt=""/>
      </div>
      <div className="TrackForm track-left">
      <h2 className="track-heading">Track Your Order</h2>

            <form onSubmit={handleSubmit}>
              <div className="track-fields">
                <input type="text" name="orderNumber" value={trackStatus.orderNumber} onChange={handleInput} Placeholder="Order Number" />
                <input type="text" name="contact" value={trackStatus.contact} onChange={handleInput} placeholder='Mobile Number' />
                </div>
              <button type="submit" className="track-btn">Track</button>

            </form>
          </div>

        
          </div>
          </div>

<Footer/>

    </>
  );
};

export default TrackOrder
