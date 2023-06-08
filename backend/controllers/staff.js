const { validationResult } = require("express-validator");
const Staff = require("../models/Staff");

// GET : retrieve all staff from the DB
const getStaff = async (req, res) => {
  const allStaff = await Staff.find();
  res.json(allStaff);
};

// POST : retrieve one staff from the DB, based on DB id
const postStaffById = async (req, res) => {
  const staff = await Staff.findById(req.body.id);
  res.json(staff);
};

// POST : retrieve one staff from the DB, based on his NRIC
const postStaffByNric = async (req, res) => {
  const staff = await Staff.findOne({
    staff_nric: req.body.user,
  });
  res.json(staff);
};

// PUT : add a staff record to the DB
const putStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdStaff = new Staff({
    staff_id: req.body.staff_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    staff_hospitalId: req.body.staff_hospitalId,
    staff_gender: req.body.staff_gender,
    staff_nric: req.body.staff_nric,
    staff_photo: req.body.staff_photo,
    staff_ward: req.body.staff_ward,
    staff_password: req.body.staff_password,
  });

  await createdStaff.save();

  res.json({ status: "ok", msg: "created" });
};

const deleteStaff = async (req, res) => {
  //   await Staff.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Staff.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchStaff = async (req, res) => {
  try {
    const updatedStaff = {};

    if ("staff_id" in req.body) updatedStaff.staff_id = req.body.staff_id;
    if ("staff_hospitalId" in req.body)
      updatedStaff.staff_hospitalId = req.body.staff_hospitalId;
    if ("firstName" in req.body) updatedStaff.firstName = req.body.firstName;
    if ("lastName" in req.body) updatedStaff.lastName = req.body.lastName;
    if ("staff_gender" in req.body)
      updatedStaff.staff_gender = req.body.staff_gender;
    if ("staff_nric" in req.body) updatedStaff.staff_nric = req.body.staff_nric;
    if ("staff_photo" in req.body)
      updatedStaff.staff_photo = req.body.staff_photo;
    if ("staff_ward" in req.body) updatedStaff.staff_ward = req.body.staff_ward;
    if ("staff_password" in req.body)
      updatedStaff.staff_password = req.body.staff_password;

    await Staff.findByIdAndUpdate(req.params.id, updatedStaff);

    console.log(req.params.id);
    console.log(updatedStaff);
    //  or other method:
    //  const respStaff = await Staff.findById(req.params.id);
    //  await respStaff.updateOne(updatedStaff);

    res.json({ status: "ok", msg: "staff updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "error in updating staff" });
  }
};

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz1234567890";

const genRandomString = (length) => {
  let output = "";
  for (let i = 0; i < length; i++) {
    output += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return output;
};

module.exports = {
  getStaff,
  postStaffById,
  postStaffByNric,
  putStaff,
  deleteStaff,
  patchStaff,
};
