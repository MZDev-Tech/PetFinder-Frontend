import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';



const UpdatePets = ({ currentId, setUpdateModal, refreshPets}) => {
    const [updateData, setUpdateData] = useState({
        Pet: '',
        category: '',
        age: '',
        price: '',
        breed: '',
        gender: '',
        health: '',
        size: '',
        color: '',
        location: '',
        publish_date: '',
        energylevel: '',
        friendliness: '',
        ease_of_training: '',
        vendor: '',
        status: '',
        detail: '',
        image: '',
    });
    const [newImage, setNewImage] = useState(null);

    // Fetch existing data when currentId changes
    useEffect(() => {
        const fetchPetsData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/Pets/${currentId}`);
                const pet = response.data;
                setUpdateData({
                    pet: pet.pet,
                    category: pet.category,
                    age: pet.age,
                    price: pet.price,
                    breed: pet.breed,
                    gender: pet.gender,
                    health: pet.health,
                    size: pet.size,
                    color: pet.color,
                    location: pet.location,
                    publish_date: pet.publish_date,
                    energylevel: pet.energylevel,
                    friendliness: pet.friendliness,
                    ease_of_training: pet.ease_of_training,
                    vendor: pet.vendor,
                    status: pet.status,
                    detail: pet.detail,
                    image: pet.image,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (currentId) {
            fetchPetsData();
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
        formData.append('pet', updateData.pet);
        formData.append('category', updateData.category);
        formData.append('age', updateData.age);
        formData.append('price', updateData.price);
        formData.append('breed', updateData.breed);
        formData.append('gender', updateData.gender);
        formData.append('health', updateData.health);
        formData.append('size', updateData.price);
        formData.append('color', updateData.color);
        formData.append('location', updateData.location);
        formData.append('publish_date', updateData.publish_date);
        formData.append('energylevel', updateData.energylevel);
        formData.append('friendliness', updateData.friendliness);
        formData.append('ease_of_training', updateData.ease_of_training);
        formData.append('vendor', updateData.vendor);
        formData.append('status', updateData.status);
        formData.append('detail', updateData.detail);

        if (updateData.image instanceof File) {
            formData.append('image', updateData.image);
        }

        try {
            await axios.put(`http://localhost:8081/api/Pets/update/${currentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUpdateModal(false);
            refreshPets();
           toast.success( 'Pets Data update successfully..');

        }
        catch (error) {
            toast.error('Something went wrong while updating..');
            console.error('Error:', error);
        }
    };

    return (
        <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
            <div className="popup-content">
                <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
                <h2>Update Pet Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="Input-fields">
                        <div className="fieldAdd">
                        <label>Pet</label>

                            <input
                                type="text"
                                name="pet"
                                value={updateData.pet}
                                onChange={handleInput}
                                placeholder="PetName"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Category</label>

                            <input
                                type="text"
                                name="category"
                                value={updateData.category}
                                onChange={handleInput}
                                placeholder="category"
                                readOnly
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Age</label>

                            <input
                                type="text"
                                name="age"
                                value={updateData.age}
                                onChange={handleInput}
                                placeholder="age"
                            />
                        </div>


                        <div className="fieldAdd">
                        <label>Adoption Fees</label>

                            <input
                                type="text"
                                name="price"
                                value={updateData.price}
                                onChange={handleInput}
                                placeholder="price"
                            />
                        </div>


                        <div className="fieldAdd">
                        <label>Breed</label>

                            <input
                                type="text"
                                name="breed"
                                value={updateData.breed}
                                onChange={handleInput}
                                placeholder="breed"
                            />
                        </div>

                        <div className="fieldAdd">

                        <label>Gender</label>

                            <input
                                type="text"
                                name="gender"
                                value={updateData.gender}
                                onChange={handleInput}
                                placeholder="gender"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Health Status</label>

                            <input
                                type="text"
                                name="health"
                                value={updateData.health}
                                onChange={handleInput}
                                placeholder="health"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Size</label>

                            <input
                                type="text"
                                name="size"
                                value={updateData.size}
                                onChange={handleInput}
                                placeholder="size"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Color</label>

                            <input
                                type="text"
                                name="color"
                                value={updateData.color}
                                onChange={handleInput}
                                placeholder="color"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={updateData.location}
                                onChange={handleInput}
                                placeholder="location"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Publish Date</label>

                            <input
                                type="date"
                                name="publish_date"
                                value={updateData.publish_date}
                                onChange={handleInput}
                                placeholder="Publish Date"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Energy Level</label>

                            <input
                                type="text"
                                name="energylevel"
                                value={updateData.energylevel}
                                onChange={handleInput}
                                placeholder="energylevel"
                            />
                        </div>

                        <div className="fieldAdd">
                        <label>Friendliness</label>

                            <input
                                type="text"
                                name="friendliness"
                                value={updateData.friendliness}
                                onChange={handleInput}
                                placeholder="friendliness"
                            />
                        </div>


                        <div className="fieldAdd">
                        <label>Ease Of Training</label>

                            <input
                                type="text"
                                name="ease_of_training"
                                value={updateData.ease_of_training}
                                onChange={handleInput}
                                placeholder="Ease of training"
                            />
                        </div>

                       
                        <div className="fieldAdd">
                        <label>Vendor</label>

                            <input
                                type="text"
                                name="vendor"
                                value={updateData.vendor}
                                onChange={handleInput}
                                placeholder="vendor"
                            />
                        </div>

                       

                        <div className="fieldAdd">
                        <label>Status</label>

                            <input
                                type="text"
                                name="status"
                                value={updateData.status}
                                onChange={handleInput}
                                placeholder="status"
                            />
                        </div>

                        <div className='fieldAdd'>
                        <label>Description</label>

                            <textarea
                                name="detail"
                                value={updateData.detail}
                                onChange={handleInput}
                                placeholder="Description"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="fieldAdd">
                            <img
                                src={newImage || (updateData.image ? `http://localhost:8081/uploads/${updateData.image}` : Img)}
                                alt="Current pet"
                                width="80"
                                height="80"
                            />
                        </div>
                        <div className="img-field">
                            <label>Upload Image</label>
                            <input type="file" name="image" onChange={handleInput} />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePets
