import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Css/SuccessPage.css';
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [adoptionData, setAdoptionData] = useState(null); // Store specific adoption data

  useEffect(() => {
    const saveAdoptionData = async () => {
      try {
        // Fetch the session details from Stripe
        const { data: session } = await axios.get(`http://localhost:8081/api/adoption/get-session/${sessionId}`);

        
        // Ensure that adoptionData exists in session.metadata
        if (session && session.metadata && session.metadata.adoptionData) {
          const adoptionData = JSON.parse(session.metadata.adoptionData);

          // Save the adoption form data with the payment ID
          const response = await axios.post('http://localhost:8081/api/adoption/add', {
            adoptionData,
            payment_id: session.payment_intent,
            payment_amount: session.amount_total / 100, // Convert back to PKR
          });

          if (response.status === 200) {
            toast.success('Adoption request sent successfully');
            // Fetch the specific adoption record for the user
            fetchAdoptionRecord(response.data.orderNumber); 
          }
        } else {
          toast.error('Unable to send adoption request...');
        }
      } catch (error) {
        console.error('Error saving adoption data', error);
      }
    };

    if (sessionId) {
      saveAdoptionData();
    }
  }, [sessionId]);

  // Fetch specific adoption record based on order number
  const fetchAdoptionRecord = async (orderNumber) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/adoption/get/${orderNumber}`); 
      console.log('Adoption data fetch successful for order:', orderNumber);
      setAdoptionData(response.data); 
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Go Back button click and remove sessionId
  const handleGoBack = () => {
    // Clear the session_id from the URL
    sessionStorage.removeItem('token');
    navigate('/pets');  

  };

  return (

    <section className="sec-container success-page">
      <div className="success-data">
      <h2>Thank You For making Pet Adoption</h2>

      {adoptionData ? ( // Check if specific adoption data exists
        <div>
          <p className="thank-mesg">Hi {adoptionData.user}, Your payment sent successfully</p>
          <p>Your order no. is {adoptionData.orderNumber}</p>
        </div>
      ) : (
        <p>No adoption data available.</p>
      )}
    <button type="button" className="btn btn-info m-3 btn-back" onClick={handleGoBack}>Go Back</button>
    </div>
        
    </section>
  );
};

export default Success;
