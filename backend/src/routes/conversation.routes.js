import express from "express";

import {
  getConversation,
  addMessage,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/:conversationId", getConversation);

router.post("/:conversationId/messages", addMessage);

export default router;
