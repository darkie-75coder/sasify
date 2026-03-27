const express = require("express");
const messageController = require("../Controllers/message.controller");

const router = express.Router();

router.post("/create-message", messageController.createMessage);
router.get("/messages", messageController.getAllMessages);

module.exports = router;
