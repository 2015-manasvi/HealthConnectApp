const { body, param, check } = require("express-validator");

const validateInsertPatientData = [
  body("firstName", "First name is required").not().isEmpty(),
  body("lastName", "Last Name is required").not().isEmpty(),
  body("patient_nric", "NRIC must be exactly 9 characters long").isLength({
    min: 9,
    max: 9,
  }),
  body("patient_ward", "Patient Ward number is required").not().isEmpty(),
];

module.exports = { validateInsertPatientData };
