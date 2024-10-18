import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios'
import { toast } from 'react-toastify';


const DeleteUser = ({ setdeleteModal,currentId,refreshUser }) => {

const handleDelete=async()=>{
try{
    await axios.delete(`http://localhost:8081/api/user/${currentId}`);
    setdeleteModal(false);
    refreshUser();
    toast.success( 'User Data Delete Successfully..');

}catch(error){

   toast.error( 'Something went wrong while deleting..');
    console.log('Failed to delete: ',error);
}
}

    return (
        <div className={`popup-modalBg ${setdeleteModal ? 'show' : ''}`}>
            <div className="delete-popup">
                <div className="header">
                    <span className="deletepopup-button" onClick={() => setdeleteModal(false)}>×</span>
                    <h2>Delete User</h2>
                </div>
                <div className="modal-body">
                    <p>{`Are you sure, you want to delete this record Id: ${currentId}`}</p>
                    <p class="text-warning"><small>This action cann't be Undo.</small></p>

                </div>

                <div className="footer">
                    <button type="button" className="btn btn-secondary delete-modalbtn" onClick={() => setdeleteModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger delete-modalbtn" onClick={()=>handleDelete()} >Delete</button>

                </div>

            </div>
        </div>
    );
};

export default DeleteUser
