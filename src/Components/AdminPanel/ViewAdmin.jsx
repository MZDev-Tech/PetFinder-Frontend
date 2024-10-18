import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { MdModeEditOutline } from "react-icons/md";
import './CSS/MainPage.css';
import UpdateAdmin from './UpdateAdmin';
import { toast } from 'react-toastify';


const Admin = () => {
  // usestates for showing update modal on page
  const [updateModal, setUpdateModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const res = await axios.get('http://localhost:8081/api/admin/getAdmin', {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token
        },
      });
      setData(res.data);
    } catch (err) {
      toast.error("Unable to access profile Token not found");
      console.error('Error while fetching Data:', err);
    }
  };
  

  const handleEditClick = (id) => {
    setCurrentId(id);
    setUpdateModal(true);
  };

 

  return (
    <>



      {updateModal && (<UpdateAdmin setUpdateModal={setUpdateModal} currentId={currentId} refreshAdmin={fetchAdmin} />)}
     

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Admin Profile</h2>
          </div>

          <div className="table-part">
            <h2>Admin Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>image</th>
                    <th>Hashed Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (

                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td >{item.email}</td>
                      <td ><img src={`http://localhost:8081/uploads/${item.image}`} alt="" /></td>
                      <td className="Password">{item.password}</td>
                      <td className="actions">
                      <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </>

    </>
  );
};

export default Admin
