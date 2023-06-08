const express = require("express");
const router = express.Router();
const {
  getChats,
  postChats,
  putChats,
  deleteChats,
  patchChats,
  postChatByChatId,
} = require("../controllers/chats");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { validateInsertChatData } = require("../validators/chats");

router.get("/chats", getChats);
router.post("/chats", postChats);
router.post("/chats/id", postChatByChatId);

router.put(
  "/chats", validateInsertChatData ,
  putChats
);
router.delete("/chats", deleteChats);
router.patch("/chats/:id", patchChats);

module.exports = router;
