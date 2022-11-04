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
      ></form>
    </div>
  );
};

export default AddEdit;
