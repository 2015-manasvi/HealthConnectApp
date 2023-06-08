const { body, param } = require("express-validator");

const validateInsertContactData = [
  body("firstName", "First name is required").not().isEmpty(),
  body("lastName", "Last Name is required").not().isEmpty(),
];

module.exports = { validateInsertContactData };
