const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    contact_gender: { type: String, require: true },
    contact_phoneNumber: { type: Number, require: true },
    contact_order: { type: Number, require: true },
    contact_password: { type: String, require: true },
    contact_patientNric: { type: String, require: true },
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contacts", ContactsSchema);
