const mongoose = require("mongoose");

const PatientsSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    patient_gender: { type: String, require: true },
    patient_nric: { type: String, require: true },
    patient_phoneNumber: { type: Number, require: true },
    patient_dateOfBirth: { type: Date, require: true },
    patient_dateAdmitted: { type: Date, require: true },
    patient_diet: { type: String, require: true },
    patient_language: { type: String, require: false },
    patient_attention: { type: String, require: false },
    patient_doctorRemark: { type: String, require: false },
    patient_photo: { type: String, require: false },
    patient_ward: { type: Number, require: true },
    patient_bed: { type: Number, require: true },
  },
  { collection: "patients", useNewUrlParser: true, dbName: "healthconnect" }
);

module.exports = mongoose.model("Patients", PatientsSchema);
