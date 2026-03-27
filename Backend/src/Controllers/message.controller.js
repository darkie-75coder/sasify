const messageModel = require("../Models/message.model");
const jwt = require("jsonwebtoken");

async function createMessage(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Your are not Logged In.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const Username = decoded.user;
    const { message } = req.body;

    const Message = await messageModel.create({
      Username,
      message,
    });

    res.status(201).json({
      Work: "Message created Succesfully! 🎉",
      Username,
      message,
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: "Your token is invalid!",
    });
  }
}

async function getAllMessages(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Your are not Logged In.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const messages = await messageModel.find();

    res.status(200).json({
      message: "Fetched Successfully! 🎉",
      messages,
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: "Your token is invalid!",
    });
  }
}

module.exports = { createMessage, getAllMessages };
