import React, { useState, useEffect, useContext } from "react";
import { Stack } from "@mui/system";
import { Avatar, Grid } from "@mui/material";
import styles from "./WardBeds.module.css";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";
import PageContext from "../context/page";


const WardBeds = (props) => {
  const [patientsInWard, setPatientsInWard] = useState();
  const pageCtx = useContext(PageContext)

  // GET all beds/patients in the ward
  const getPatientsInWard = async () => {
    console.log("Ward selection : ", pageCtx.selectedWard);
    const { ok, data } = await fetchData("/api/patients/ward", "POST", {
      patient_ward: pageCtx.selectedWard,
    });

    if (ok) {
      setPatientsInWard(data);
      console.log(data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getPatientsInWard();
  }, []);

  pageCtx.setCurrentPage("Ward Page")
  
  return (
    <>
      <div>
        <Grid item xs={12}>
          <div className={styles["ward-header"]}>Ward {pageCtx.selectedWard}</div>
        </Grid>
      </div>

      <div className={styles.bedGrid}>
        <Grid container spacing={2}>
          {patientsInWard?.map((item) => {
            return (
              <Grid key={item._id} item xs={4}>
                <div
                  key={item._id}
                  className={styles.bedDetails}
                  onClick={() => props.handleBedClick(item.patient_bed, item)}
                >
                  <div key={item._id} className={styles.bedNumber}>
                    Bed {item.patient_bed}
                  </div>
                  <div className={styles.bedAvatar}>
                    <Avatar
                      key={item._id}
                      alt="Patient Photo"
                      src={item.patient_photo}
                      sx={{ width: 72, height: 72 }}
                    />
                  </div>
                  {item.firstName} <br />
                  {item.lastName}
                </div>
              </Grid>
            );
          })}
          <Grid item xs={4}>
            <div className={styles.bedDetailsAddPatient}>
              <div className={styles.bedNumber}>Bed </div>
              <div className={styles.bedAddPatientIcon}>+</div>
              Add Patient
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default WardBeds;
