import { useHistory, useParams, Link } from "react-router-dom";
import React from "react";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddEdit = () => {
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
        <select name='gender' id='gender' value={gender}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {/* Input for position */}
        <label htmlFor='position'>Change Position</label>
        <select name='position' id='position' value={position}>
          <option value='engineer'>Male</option>
          <option value='security'>security</option>
          <option value='designer'>designer</option>
        </select>
        {/* Input for dofa */}
        <label htmlFor='dofa'>DOFA</label>
        <input type='datetime-local' id='dofa' name='dofa' value={dofa} />
      </form>
    </div>
  );
};

export default AddEdit;
