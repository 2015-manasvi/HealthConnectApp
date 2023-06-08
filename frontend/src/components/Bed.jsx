import React, { useState, useContext } from "react";
import { Grid } from "@mui/material";
import styles from "./Bed.module.css";
import { fetchData } from "../helpers/common";
import PatientDetails from "./PatientDetails";
import BedPatientHeader from "./BedPatientHeader";
import UserContext from "../context/user";
import PageContext from "../context/page";

const Bed = () => {
  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext)

  const handleClickPatientDetails = () => {
    pageCtx.setShowPatientMenu(false);
    pageCtx.setShowPatientDetails(true);
  };

  const getPatientNOK = async () => {
    const { ok, data } = await fetchData("/api/contacts/nric", "POST", {
      contact_patientNric: userCtx.patient.patient_nric,
    });

    if (ok) {
      userCtx.setPatientNOK(data);
    } else {
      console.log(data);
    }
  };

  const handleSendMsgClick = () => {
    getPatientNOK();
    pageCtx.setShowChat(true);
  };

  pageCtx.setCurrentPage("Ward Bed Page")

  return (
    <>
      {pageCtx.showPatientMenu && (
        <div>
          <BedPatientHeader />
          <div className={styles.patientMenu}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <button
                  className={styles.AddButton}
                  onClick={() => handleSendMsgClick()}
                >
                  Send Message
                </button>
              </Grid>
              {/* <Grid item xs={12}>
              <button className={styles.AddButtonLight}>Add Team Member</button>
            </Grid> */}
              <Grid item xs={12}>
                <button
                  className={styles.AddButtonLight}
                  onClick={() => handleClickPatientDetails()}
                >
                  Patient's Details
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {pageCtx.showPatientDetails && <PatientDetails />}
    </>
  );
};

export default Bed;
