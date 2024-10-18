import React, { useState } from 'react';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import './Css/Contact.css';
import Process from '../AdoptionProcess/Process'
import { IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';
import PageLanding from './PageLanding'

const ContactPage = ({setShowLoginModal}) => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleContactInput = (event) => {
    const { name, value } = event.target;
    setContactData(preValue => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post('http://localhost:8081/api/contact/add', contactData);
      toast.success("Thank you for contacting us");
       // Reset the form fields to the initial state
    setContactData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
      
  }
      catch (error) {
      toast.error('Unable to contact right now, Try later.');
    }
  };


  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} />
      <PageLanding
      head="Contact Us"
      parah="We are dedicated to provide exceptional support & solutions tailored to your needs."
      />
     

      <section className="sec-container">
        {/* Google Mapa Part */}

        <div className="google-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53580.319565509984!2d72.80218163079884!3d32.93067519113062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39205d0b0f9d67b3%3A0xfb3c76a4496ca679!2sChakwal%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1721989761506!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: '2px solid #fff',borderRadius:'12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

          </iframe>
        </div>


        <div className="contact-info">
          <div className="contact-leftPart">
            <form onSubmit={handleSubmit}>
              <h2>Contact</h2>
              <div className="contact-fields">
                <input type="text" name="name" value={contactData.name} onChange={handleContactInput} Placeholder="Name" />
                <input type="text" name="email" value={contactData.email} onChange={handleContactInput} placeholder='Email' />
                <input type="text" name="phone" value={contactData.phone} onChange={handleContactInput} placeholder='Phone Number' />
                <textarea type="text" name="message" value={contactData.message} onChange={handleContactInput} row="4" col="4" placeholder='Message'></textarea>
              </div>
              <button type="submit" className="contactPage-btn">Send</button>

            </form>
          </div>

          <div className="contact-rightPart">
            <h2>Get in touch with us</h2>
            <ul className="rightPart-list">
              <li><IoHome className="contactPage-icon" /> <span>123 Pet Foundation Street, Chakwal City, Pakistan</span></li>
              <li><FaPhoneAlt className="contactPage-icon" /> <span>+923425678690</span></li>
              <li><MdEmail className="contactPage-icon" /> <span>info@petfinder.com</span></li>
              <li>< FaInfo className="contactPage-icon" /> <span>Monady - Friday 10AM - 6PM</span></li>

            </ul>
          </div>
        </div>
      </section>
      <Process />
      <Footer />
    </>
  )
}

export default ContactPage
