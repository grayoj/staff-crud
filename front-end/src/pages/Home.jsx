import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages/Styles.css";

const Home = () => {
  const [data, getData] = useState([]);

  // const URL = "https://localhost:5000/";

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    getData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div style={{ margin: "auto", width: "10%", marginTop: "6rem" }}>
        <Link to='/addStaff'>
          <button className='btn btn-contact'>Add Staff</button>
        </Link>
      </div>
      <div style={{ marginTop: "15px" }}>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>First Name</th>
              <th style={{ textAlign: "center" }}>Last Name</th>
              <th style={{ textAlign: "center" }}>Gender</th>
              <th style={{ textAlign: "center" }}>Position</th>
              <th style={{ textAlign: "center" }}>DOFA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td scope='row'>{index + 1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.gender}</td>
                <td>{item.position}</td>
                <td>{item.dofa}</td>
                <Link to={`/update/${item.id}`}>
                  <button className='btn btn-edit'>Update</button>
                </Link>
                <Link to={`/delete/${item.id}`}>
                  <button className='btn btn-delete'>Delete</button>
                </Link>
                <Link to={`/view/${item.id}`}>
                  <button className='btn btn-view'>View</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
