const { body, param, check } = require("express-validator");

const validateInsertStaffData = [
  body("firstName", "First name is required").not().isEmpty(),
  body("lastName", "Last Name is required").not().isEmpty(),
  body("staff_nric", "NRIC must be exactly 9 characters long").isLength({
    min: 9,
    max: 9,
  }),
  body("staff_hospitalId", "Staff hospital Id is required").not().isEmpty(),
  body(
    "staff_hospitalId",
    "Staff hospital Id must be exactly 8 characters long"
  ).isLength({
    min: 8,
    max: 8,
  }),
];

module.exports = { validateInsertStaffData };
