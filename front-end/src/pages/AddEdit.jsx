import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial States
const initialState = {
  firstname: "",
  lastname: "",
  gender: "",
  position: "",
  dofa: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { firstname, lastname, gender, position, dofa } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !gender || !position || !dofa) {
      toast.error("Please provide a valid input");
    } else {
      axios
        .post("http://localhost:5000/api/post", {
          firstname,
          lastname,
          gender,
          position,
          dofa,
        })
        .then(() => {
          setState({
            firstname: "",
            lastname: "",
            gender: "",
            position: "",
            dofa: "",
          }).catch((err) => toast.error(err.response.data));
          setTimeout(() => navigate("/"), 500);
        });
    }
  };

  const handleInputChange = (e) => {
    const { firstname, value } = e.target;
    setState({ ...state, [firstname]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxwidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        {/* Input for First Name */}
        <label htmlFor='name'>Change First Name</label>
        <input
          type='text'
          id='firstname'
          placeholder='Change First Name'
          value={firstname}
          onChange={handleInputChange}
        ></input>
        {/* Input for Last Name */}
        <label htmlFor='name'>Change Last Name</label>
        <input
          type='text'
          id='lastname'
          placeholder='Change Last Name'
          value={lastname}
          onChange={handleInputChange}
        ></input>
        {/* Input for gender */}
        <label htmlFor='name'>Change Gender</label>
        <select
          name='gender'
          id='gender'
          value={gender}
          onChange={handleInputChange}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {/* Input for position */}
        <label htmlFor='position'>Change Position</label>
        <select
          name='position'
          id='position'
          value={position}
          onChange={handleInputChange}
        >
          <option value='engineer'>engineer</option>
          <option value='security'>security</option>
          <option value='designer'>designer</option>
        </select>
        {/* Input for dofa */}
        <label htmlFor='dofa'>DOFA</label>
        <input
          onChange={handleInputChange}
          type='datetime-local'
          id='dofa'
          name='dofa'
          value={dofa}
        />
        <input type='submit' value='Save' />
        <Link to='/'>
          <input type='button' value='Previous' />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
