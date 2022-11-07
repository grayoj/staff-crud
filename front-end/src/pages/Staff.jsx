import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Styles.css";

import { toast } from "react-toastify";
// Import CSV library
// import { CSVDownload } from "react-csv";
// import { FaFileExport, FaFile } from "react-icons/fa";

// sample exports
// const csvData = [
//   ["example", "example"],
//   ["example", "example"],
//   ["example", "example"],
//   ["example", "example"],
// ];

// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["Ahmed", "Tomi", "ah@smthing.co.com"],
//   ["Raed", "Labes", "rl@smthing.co.com"],
//   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
// ];

const Staff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5000/staff");
        setStaff(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllStaff();
  }, []);

  console.log(staff);

  const DeleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div style={{ margin: "auto", width: "10%", marginTop: "6rem" }}>
        <Link to='/AddStaff'>
          <button className='btn btn-contact'>Add Staff</button>
        </Link>
      </div>
      <div style={{ marginTop: "15px" }}>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>First Name</th>
              <th style={{ textAlign: "center" }}>Last Name</th>
              <th style={{ textAlign: "center" }}>Gender</th>
              <th style={{ textAlign: "center" }}>Position</th>
              <th style={{ textAlign: "center" }}>DOFA</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item, index) => (
              <tr key={item.id}>
                <th scope='row'>{index + 1}</th>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.gender}</td>
                <td>{item.position}</td>
                <td>{item.dofa}</td>
                <Link to={`/UpdateStaff/${item.id}`}>
                  <button className='btn btn-edit'>Update</button>
                </Link>
                <button
                  className='btn btn-delete'
                  onClick={() => DeleteStaff(item.id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ margin: "auto", width: "12%", marginTop: "3rem" }}>
          {/* <button className='btn btn-export-to-csv'>
            Export to CSV <FaFileExport />
            <CSVDownload data={csvData} />
          </button>
        </div>
        <div style={{ margin: "auto", width: "12%", marginTop: "3rem" }}>
          <button className='btn btn-export-to-pdf'>
            Export to PDF <FaFile />
            <CSVDownload data={csvData} target='_blank' />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Staff;
