import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // import useNavigate
import "./LoginForm.scss";
// for build
const loginAPI = "/college-club-management-backend-service/auth/signIn";
const fetchUserAPI ="/college-club-management-backend-service/user/getUser?username=";
// for dev
//const loginAPI = "https://localhost/college-club-management-backend-service/auth/signIn"
// const fetchUser ="https://localhost/college-club-management-backend-service/user/getUser?username=";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [error, setError] = useState(null);

  const submitLoginRequest = async (event) => {
    event.preventDefault();
  
    try {
      
      const response = await fetch(loginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        }) ,
        credentials: "include", 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      
      const userDetailsResponse = await fetch(fetchUserAPI + username, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });
  
      if (!userDetailsResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
  
      const userDetails = await userDetailsResponse.json();
  
      
      localStorage.setItem("user", JSON.stringify(userDetails)); 
  
      
      navigate("/"); 
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="main-LoginForm">
      <form onSubmit={submitLoginRequest} target="#">
        <h1>LogIn</h1>
        <div className="userInput">
          <FaRegUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="userInput">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="app__loginForm-forgotPassword">
          <label>
            <a href="#"> Forgot Password</a>
          </label>
        </div>
        <button className="app__loginForm-submitButton">Login</button>

        <div className="register">
          Don't have an account? <a href="/register"> Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
