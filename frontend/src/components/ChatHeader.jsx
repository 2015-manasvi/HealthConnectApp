import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./ChatHeader.module.css";
import UserContext from "../context/user";

const ChatHeader = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className={styles["ward-header"]}>
            Ward {userCtx.patient.patient_ward}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={styles["bed-header"]}>
            Bed {userCtx.patient.patient_bed}
          </div>
        </Grid>

        <Grid container spacing={0} className={ styles["tall-container"] }>
          <Grid item xs={6}>
            <div className={styles["ward-details"]}>
              <Stack spacing={1.5}>
                <div>
                  Staff Nurse <br />{" "}
                  <span className={styles["name"]}>Mabel See</span>
                </div>
                <div>
                  Physiotherapist
                  <br /> <span className={styles["name"]}>Dr Tan</span>
                </div>
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles["bed-details"]}>
              <Stack spacing={1.5}>
                <div>
                  Patient's Name <br />{" "}
                  <span
                    className={styles["name"]}
                  >{`${userCtx.patient.firstName} ${userCtx.patient.lastName}`}</span>
                </div>
                <div>
                  Patient's NOK
                  <br />{" "}
                  <span
                    className={styles["name"]}
                  >{`${userCtx.patientNOK.firstName} ${userCtx.patientNOK.lastName}`}</span>{" "}
                  {`(${userCtx.patientNOK.contact_relationship})`}
                </div>
              </Stack>
            </div>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};

export default ChatHeader;
