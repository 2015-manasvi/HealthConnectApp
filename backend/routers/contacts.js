const express = require("express");
const router = express.Router();
const {
  getContacts,
  postContactByPhoneNumber,
  postContactByPatientNric,
  postContactById,
  putContact,
  deleteContacts,
  patchContact,
} = require("../controllers/contacts");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { validateInsertContactData } = require("../validators/contacts");

router.get("/contacts", getContacts);
router.post("/contacts/id", postContactById);
router.post("/contacts/phone", postContactByPhoneNumber);
router.post("/contacts/nric", postContactByPatientNric);

router.put("/contacts", validateInsertContactData, putContact);
router.delete("/contacts", deleteContacts);
router.patch("/contacts/:id", patchContact);

module.exports = router;
