import React, { useState } from "react";
import axios from "axios";

function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch(`http://11.11.1.18:83/${isRegistering ? "register" : "login"}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error with authentication");
        }
        return response.json();
      })
      .then((data) => {
        if (isRegistering) {
          alert("Registration successful!");
          setIsRegistering(false);
        } else {
          onLogin(data.access_token);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Login instead" : "Register instead"}
      </button>
    </div>
  );
}

// Add the following functions to the Auth.js file

export const getUserData = async () => {
  const token = localStorage.getItem("auth_token");
  const response = await axios.get("/user_dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("auth_token");
  const response = await axios.get("/admin_dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.users;
};

export default Auth;
