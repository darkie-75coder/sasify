import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [Message, setMessage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await axios.get(
          "https://sasify.onrender.com/api/message/messages",
          {
            withCredentials: true,
          },
        );

        setMessage(res.data.messages);
      } catch (err) {
        console.log(err.response.data.message);
        navigate("/login");
      }
    }

    getMessages();
  }, [navigate]);
  return (
    <div className="Mesages-box">
      {Message.map((msg) => {
        return (
          <div className="message">
            <h1 className="username">{msg.Username}</h1>
            <h2>{msg.message}</h2>
          </div>
        );
      })}

      <div>
        <button
          onClick={() => {
            navigate("/create");
          }}
          className="create-btn"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
