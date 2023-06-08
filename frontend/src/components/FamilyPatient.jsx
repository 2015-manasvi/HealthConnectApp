import React, { useContext, useState, useEffect } from "react";
import styles from "./FamilyPatient.module.css";
import { Avatar, Badge } from "@mui/material";
import { fetchData } from "../helpers/common";
import VerificationModal from "./VerificationModal";
import UserContext from "../context/user";
import PageContext from "../context/page";

const FamilyPatient = () => {
  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [action, setAction] = useState('')


  const getPatient = async () => {
    const { ok, data } = await fetchData("/api/patients/nric", "POST", {
      patient_nric: userCtx.user.contact_patientNric,
    });

    if (ok) {
      userCtx.setPatient(data);
    } else {
      console.log(data);
    }
  };

  const handleModal = (event) => {
    setAction('patientDetails')
    setShowVerificationModal(true);
    if (userCtx.authorised) {
      pageCtx.setShowPatientDetails(true);
    }
  };

  const handleChatModal = (event) => {
    setAction('chat')
    setShowVerificationModal(true);
    if (userCtx.authorised) {
      pageCtx.setShowChat(true);
    }
  };
  
  const handleCloseModal = (event) => {
    setShowVerificationModal(false);
  };
  
  useEffect(() => {
    getPatient();
  }, []);
  
  return (
    <>
      {showVerificationModal && !userCtx.authorised && action && (
        <VerificationModal
          setShowVerificationModal={setShowVerificationModal}
          action={action}
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className={styles.FamilyPatient}>
        <div className={styles.MyCareDisplay}>
          <div className={styles.MyCare}>My Care</div>
        </div>
        <div className={styles.PatientDetailsDisplay}>
          <div className={styles.PatientDetails}>
            <Avatar
              alt={userCtx.patient.firstName}
              src={userCtx.patient.patient_photo}
              sx={{ width: 96, height: 96 }}
            />
            <div className={styles.PatientDetailsBox}>
              <div className={styles.PatientNameBox}>
                <div className={styles.PatientName}>Patient Name</div>
                <div className={styles.PatientNameText}>
                  {`${userCtx.patient.firstName} ${userCtx.patient.lastName}`}
                </div>
              </div>
              <div className={styles.HospitalDetailsBox}>
                <div className={styles.admitted}>Admitted To</div>
                <div className={styles.hospName}>
                  Ang Mo Kio Community Hospital
                </div>
                <div className={styles.WardNoBedNo}>
                  Ward {userCtx.patient.patient_ward} / Bed {""}
                  {userCtx.patient.patient_bed}
                </div>
              </div>
              <div className={styles.StaffNameBox}>
                <div className={styles.StaffName}>Staff Name</div>
                <div className={styles.StaffNameText}>
                  {/* {staffs[0].staff_firstName} */}
                  {/* {staffs[0].staff_lastName} */}
                  Staff Nurse Mabel See
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ButtonBox}>
            <div className={styles.Button2Box}>
              {/* <Badge badgeContent={10} color="primary"> */}
                <button
                  className={styles.MessageStaffBox}
                  onClick={handleChatModal}
                >
                  <div className={styles.MessageStaffText}>Message Staff</div>
                </button>
              {/* </Badge> */}

              <button
                className={styles.PatientDetailsTextBox}
                onClick={handleModal}
              >
                <div className={styles.PatientDetailsText}>
                  Patient's Details
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyPatient;
