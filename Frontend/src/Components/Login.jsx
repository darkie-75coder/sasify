import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [type, setType] = useState("password");
  const [showText, setShowText] = useState("Show Password 👁️");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // function goToReg() {
  //   navigate("/register");
  // }

  function ShowPass(e) {
    e.preventDefault();
    if (type === "password") {
      setType("text");
      setShowText("Hide Password 👁️");
    } else {
      setType("password");
      setShowText("Show Password 👁️");
    }
  }

  async function Handler(e) {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message, {
        theme: "dark",
        position: "top-right",
      });
    }
  }

  return (
    <div className="formBox">
      <form onSubmit={Handler}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type={type}
          placeholder="Enter your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button className="show-btn" onClick={ShowPass}>
          {showText}
        </button>
        <input type="submit" value="Login" className="last-btn" />

        <p>
          Don't have an account? <a /* onClick={goToReg} */>Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
