const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    staff_id: { type: String, require: true },
    staff_hospitalId: { type: String, require: true },
    staff_gender: { type: String, require: true },
    staff_nric: { type: String, require: true },
    staff_photo: { type: String, require: false },
    staff_password: { type: String, require: true },
    staff_ward: { type: Array, require: true },
  },
  { collection: "staff" }
);

module.exports = mongoose.model("Staff", StaffSchema);
