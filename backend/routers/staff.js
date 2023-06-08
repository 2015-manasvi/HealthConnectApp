const express = require("express");
const router = express.Router();
const {
  getStaff,
  postStaffByNric,
  postStaffById,
  putStaff,
  deleteStaff,
  patchStaff,
} = require("../controllers/staff");
const auth = require("../middleware/auth");
const { validateInsertStaffData } = require("../validators/staff");

router.get("/staff", getStaff);
router.post("/staff/nric", postStaffByNric);
router.post("/staff/id", postStaffById);
router.put(
  "/staff",
  validateInsertStaffData,

  putStaff
);
router.delete("/staff", deleteStaff);
router.patch("/staff/:id", patchStaff);

module.exports = router;
