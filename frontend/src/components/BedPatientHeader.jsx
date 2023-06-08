import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import styles from "./BedPatientHeader.module.css";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";

const BedPatientHeader = () => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className={styles["wardHeader"]}>
            Ward {userCtx.patient.patient_ward}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={styles["bedHeader"]}>
            Bed {userCtx.patient.patient_bed}
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={styles["patientHeader"]}>
            <div className={styles.Avatar}>
              <Avatar
                key={userCtx.patient.patient_id}
                alt="Patient Photo"
                src={userCtx.patient.patient_photo}
                sx={{ width: 72, height: 72 }}
              />
            </div>
            <div className={styles["patientHeaderName"]}>
              {userCtx.patient.firstName} {userCtx.patient.lastName}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BedPatientHeader;
