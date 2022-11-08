import React, { useState, useEffect } from "react";
import axios from "axios";
import Guest from "../components/Guest";
import Mod from "../components/Mod";
import Admin from "../components/Admin";

function Page() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  return (
    <div>
      {role === "visitor" && <Guest />}
      {role === "visitor" && <Mod />}
      {role === "visitor" && <Admin />}
    </div>
  );
}

export default Page;
