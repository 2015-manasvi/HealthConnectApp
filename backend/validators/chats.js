const { check, param } = require("express-validator");

const validateInsertChatData = [
  check("chat_id", "chat_id is required").not().isEmpty(),
  check("msg_senderId", "msg_senderId  is required").not().isEmpty(),
  check("msg_fromNurse", "msg_fromNurse is required").not().isEmpty(),
  check("msg_isRead", "msg_isRead is required").not().isEmpty(),
  check("msg_timeSent", "msg_timeSent is required").not().isEmpty(),

  check(
    "msg_fromNurse",
    "A boolean confirming whether the message is from a nurse or not is required"
  ).isBoolean(),
  check(
    "msg_isRead",
    "A boolean confirming whether the message has been read is required"
  ).isBoolean(),
  check(
    "msg_timeSent",
    "msg_timeSent has to be in strict isodate format"
  ).isISO8601({ strict: false, strictSeparator: false }),
];

module.exports = { validateInsertChatData };
