import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [type, setType] = useState("password");
  const [showText, setShowText] = useState("Show Password 👁️");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToLogin() {
    navigate("/login");
  }

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
        "https://sasify.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/login");
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
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter your Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
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

        <button type="button" className="show-btn" onClick={ShowPass}>
          {showText}
        </button>
        <input type="submit" value="Register" className="last-btn" />

        <p>
          Already have an account? <a onClick={goToLogin}>Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
