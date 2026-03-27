import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateMessage = () => {
  const [message, setMessage] = useState("");

  const [text, setText] = useState("");

  const navigate = useNavigate();

  async function handler(e) {
    e.preventDefault();

    setText("");

    await axios.post(
      "http://localhost:3000/api/message/create-message",
      {
        message,
      },
      {
        withCredentials: true,
      },
    );

    navigate("/");
  }

  return (
    <div className="create-box">
      <form onSubmit={handler}>
        <h1>Create Message</h1>
        <input
          type="text"
          placeholder="Your Message"
          onChange={(e) => {
            setMessage(e.target.value);
            setText(e.target.value);
          }}
          value={text}
        />
        <input type="submit" value="Send" className="last-btn send" />
      </form>
    </div>
  );
};

export default CreateMessage;
