const express = require("express");
const router = express.Router();
const {
  getPatients,
  postPatientById,
  postPatientByNric,
  postPatientsByWard,
  putPatients,
  deletePatients,
  patchPatients,
} = require("../controllers/patients");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { validateInsertPatientData } = require("../validators/patients");

router.get("/patients", getPatients);
router.post("/patients/nric", postPatientByNric);
router.post("/patients/id", postPatientById);
router.post("/patients/ward", postPatientsByWard);

router.put("/patients", validateInsertPatientData, putPatients);
router.delete("/patients", deletePatients);
router.patch("/patients/:id", validateInsertPatientData, patchPatients);

module.exports = router;
