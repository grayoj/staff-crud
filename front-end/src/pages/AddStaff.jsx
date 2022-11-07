import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/AddEdit.css";

const AddStaff = () => {
  const [staff, setStaff] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    position: "",
    date: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStaff((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/staff", staff);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className='form'>
      <h1>Create New Staff</h1>
      <input
        type='text'
        placeholder='First Name'
        name='firstname'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Last Name'
        name='lastname'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Gender'
        name='gender'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Position'
        name='position'
        onChange={handleChange}
      />
      <input type='datetime-local' name='dofa' onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
      {error && "Something went wrong there!"}
      <Link to='/'>See all Staff</Link>
    </div>
  );
};

export default AddStaff;
