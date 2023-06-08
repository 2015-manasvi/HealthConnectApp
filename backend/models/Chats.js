const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatsSchema = new mongoose.Schema(
  {
    chat_id: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    msg_senderId: {
      type: Schema.Types.ObjectId,
      refPath: "role",
      required: true,
    },
    role: {
      type: String,
      enum: ["Staff", "Patients", "Contacts"],
      required: true,
    },
    msg_fromNurse: { type: Boolean, require: true },
    msg_isRead: { type: Boolean, require: true },
    msg_timeSent: { type: Date, require: true },
    msg_content: { type: String, require: true },
  },
  { collection: "chats" }
);

module.exports = mongoose.model("Chats", ChatsSchema);
