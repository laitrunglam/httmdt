const express = require('express');

const {
    getChatbotResponse,
  } = require("../../controllers/chatbot/chatbot-controller");

const router = express.Router();

router.post("/chat", getChatbotResponse);

module.exports = router;
