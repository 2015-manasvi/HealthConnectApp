const { validationResult } = require("express-validator");
const Chats = require("../models/Chats");

// GET : retrieve all chats from the DB
const getChats = async (req, res) => {
  const allChats = await Chats.find();
  res.json(allChats);
};

// POST : retrieve a chat history from the DB based on the chat_id (patient ID)
const postChatByChatId = async (req, res) => {
  const allChats = await Chats.find({ chat_id: req.body.chat_id }).populate(
    "msg_senderId"
  );

  res.json(allChats);
};

// POST : retrieve one chat message from the DB, based on a criteria
const postChats = async (req, res) => {
  const message = await Chats.findById(req.body.id);
  res.json(message);
};

// PUT : add a contact record to the DB
const putChats = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdChat = new Chats({
    chat_id: req.body.chat_id,
    msg_senderId: req.body.msg_senderId,
    role: req.body.role,
    msg_fromNurse: req.body.msg_fromNurse,
    msg_isRead: req.body.msg_isRead,
    msg_timeSent: req.body.msg_timeSent,
    msg_content: req.body.msg_content,
  });

  await createdChat.save();

  res.json({ status: "ok", msg: "created" });
};

const deleteChats = async (req, res) => {
  //   await Chats.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Chats.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchChats = async (req, res) => {
  await Chats.updateOne(
    { _id: req.params.id },
    {
      msg_isRead: req.body.msg_isRead,
    }
  );

  res.json({ status: "ok", msg: "updated" });
};

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz1234567890";

const genRandomString = (length) => {
  let output = "";
  for (let i = 0; i < length; i++) {
    output += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return output;
};

module.exports = {
  getChats,
  postChats,
  putChats,
  deleteChats,
  patchChats,
  postChatByChatId,
};
