const Staff = require("../models/Staff");
const Contacts = require("../models/Contacts");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    if (req.body.role == "staff") {
      const userDetails = await Staff.findOne({ staff_nric: req.body.user });
      if (!userDetails) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
      const result = await bcrypt.compare(
        req.body.password,
        userDetails.staff_password
      );
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails);
      }
    } else {
      const userDetails2 = await Contacts.findOne({
        contact_phoneNumber: req.body.user,
      });
      if (!userDetails2) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }

      const result2 = await bcrypt.compare(
        req.body.password,
        userDetails2.contact_password
      );
      if (!result2) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails2);
      }
    }
  } catch (error) {
    return res.status(400).json({ status: "error", msg: "login fail" });
  }
};

module.exports = {
  login,
};
