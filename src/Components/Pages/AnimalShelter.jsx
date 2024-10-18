import React,{useState,useEffect} from 'react'
import './Css/AnimalShelters.css'
import Shape from "../../Images/dogBg.png"
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { Person, LocationOn } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import Process from '../AdoptionProcess/Process'
import axios from 'axios'
import PageLanding from './PageLanding'


const AnimalShelter = ({setShowLoginModal}) => {
    const[shelterData,setShelterData]=useState([]);


    useEffect(()=>{
    const fetchData=async()=>{
    try{
    const response=await axios.get('http://localhost:8081/api/shelters/getShelters');
     setShelterData(response.data);
    }catch(error){
        console.log('Error: ',error);
    }
     } 
     fetchData();   

},[]);
    return (
        <>
      <Navbar setShowLoginModal={setShowLoginModal} />


            <PageLanding
          head="Our Partners"
          parah="Meet the Animal Shelters & Rescues Proudly Partnering with Us"
        />

            <section className="animal-shelterPart">
                <div className="conatiner">
                    <div className="row">
                            {shelterData.map((item) => {
                                return (
                                    <div className="col-lg-6 col-md-12 mb-4" key={item.id}>

                                    <Link to={item.link} >

                                        <div className='shelter-card1'>
                                            <img src={`http://localhost:8081/uploads/${item.image}`} alt="" />
                                            <div className="shelterCard-content">
                                                <h2>{item.name}</h2>
                                                <p className="location-p"><LocationOn className="shelter-icon" /><span>{item.location}</span></p>
                                                <p>{item.detail}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                )
                            })}

                        </div>

                    </div>

                


            </section>
            <Process/>
            <Footer />

        </>
    )
}

export default AnimalShelter
