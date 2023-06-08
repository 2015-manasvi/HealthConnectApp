import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React, { useState, useContext } from "react";
import BedPatientHeader from "./BedPatientHeader";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";
import PageContext from "../context/page";

const PatientDetails = () => {
  // this date formatting formula need to be positionned above the state declaration because dateAdmitted and dateOfBirth make use of them...
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  };
  // this date & time formatting formula need to be positionned above the state declaration because dateAdmitted and dateOfBirth make use of them...
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext);

  const [dateOfBirth, setDateOfBirth] = useState(
    formatDate(userCtx.patient.patient_dateOfBirth)
  );
  const [dateAdmitted, setDateAdmitted] = useState(
    formatDateTime(userCtx.patient.patient_dateAdmitted)
  );
  const [diet, setDiet] = useState(userCtx.patient.patient_diet);
  const [wardNumber, setWardNumber] = useState(userCtx.patient.patient_ward);
  const [bedNumber, setBedNumber] = useState(userCtx.patient.patient_bed);
  const [language, setLanguage] = useState(userCtx.patient.patient_language);
  const [attention, setAttention] = useState(userCtx.patient.patient_attention);
  const [doctorRemark, setDoctorRemark] = useState(
    userCtx.patient.patient_doctorRemark
  );

  const buttonStyling = {
    backgroundColor: "#004B64",
    fontWeight: 400,
    font: "Roboto",
    fontSize: "1rem",
    textTransform: "none",
  };

  const floatingLabel = {
    backgroundColor: "#ffecb3",
    font: "Roboto",
    fontWeight: "400",
    fontSize: "14px",
    textTransform: "none",
    padding: "0px 4px",
  };

  // // PATCH new patient details to the patient document
  const updatePatient = async (id) => {
    const { ok, data } = await fetchData("/api/patients/" + id, "PATCH", {
      // patient_id: userCtx.patient.patient_id,
      firstName: userCtx.patient.firstName,
      lastName: userCtx.patient.lastName,
      patient_gender: userCtx.patient.patient_gender,
      patient_nric: userCtx.patient.patient_nric,
      patient_phoneNumber: userCtx.patient.patient_phoneNumber,
      patient_dateOfBirth: userCtx.patient.patient_dateOfBirth,
      patient_dateAdmitted: userCtx.patient.patient_dateAdmitted,
      patient_diet: diet,
      patient_language: language,
      patient_attention: attention,
      patient_doctorRemark: doctorRemark,
      patient_photo: userCtx.patient.patient_photo,
      patient_ward: wardNumber,
      patient_bed: bedNumber,
    });

    if (ok) {
      alert("Patient details have been updated.");
    } else {
      console.log(data);
    }
  };

  const updatedPatient = {};

  pageCtx.setCurrentPage("Patient Details");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 96px)",
      }}
    >
      <BedPatientHeader />
      <div
        style={{
          padding: "0px 20px",
          paddingBottom: "20px",
          overflow: "scroll",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            fontSize: "22px",
            color: "#004B64",
            textAlign: "left",
            padding: "32px 4px 16px",
          }}
        >
          Patient's details
        </div>
        <div
          style={{
            padding: "10px 0 0 0 ",
            overflowY: "scroll",
          }}
        >
          <Stack spacing={5}>
            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="First Name">
                First Name
              </InputLabel>
              <OutlinedInput
                id="firstName"
                type="text"
                value={userCtx.patient.firstName}
                label="First Name"
                disabled={true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="Last Name">
                Last Name
              </InputLabel>
              <OutlinedInput
                id="lastName"
                type="text"
                value={userCtx.patient.lastName}
                label="Last Name"
                disabled={true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="Gender">
                Gender
              </InputLabel>
              <OutlinedInput
                id="gender"
                type="text"
                value={userCtx.patient.patient_gender}
                label="gender"
                disabled={true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="Date of BirthA">
                Date of birth
              </InputLabel>
              <OutlinedInput
                id="Date of birth"
                type="date"
                value={dateOfBirth}
                label="Date of birth"
                disabled={true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="dateTime admitted">
                Date & Time admitted
              </InputLabel>
              <OutlinedInput
                id="dateTime admitted"
                type="datetime-local"
                value={dateAdmitted}
                label="dateTime admitted"
                disabled={true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="ward">
                Ward number
              </InputLabel>
              <OutlinedInput
                id="wardNumber"
                type="number"
                value={wardNumber}
                onChange={(e) => setWardNumber(e.target.value)}
                label="wardNumber"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="bed">
                Bed number
              </InputLabel>
              <OutlinedInput
                id="bedNumber"
                type="number"
                value={bedNumber}
                onChange={(e) => setBedNumber(e.target.value)}
                label="bedNumber"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="Dietary requirements">
                Dietary requirements
              </InputLabel>
              <OutlinedInput
                id="Dietary requirements"
                type="text"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                label="Dietary requirements"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="language">
                Language
              </InputLabel>
              <OutlinedInput
                id="language"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="language"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="attention">
                Attention
              </InputLabel>
              <OutlinedInput
                id="attention"
                type="text"
                value={attention}
                onChange={(e) => setAttention(e.target.value)}
                label="attention"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel sx={floatingLabel} htmlFor="doctor remarks">
                Doctor's remarks
              </InputLabel>
              <OutlinedInput
                id="doctor remarks"
                type="text"
                value={doctorRemark}
                onChange={(e) => setDoctorRemark(e.target.value)}
                label="doctor remarks"
                disabled={userCtx.role == "staff" ? false : true}
              />
            </FormControl>

            {userCtx.role == "staff" && (
              <Button
                sx={buttonStyling}
                // disabled={!(user && password)}
                variant="contained"
                size="large"
                onClick={(e) => {
                  updatePatient(userCtx.patient._id);
                }}
              >
                Save
              </Button>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
