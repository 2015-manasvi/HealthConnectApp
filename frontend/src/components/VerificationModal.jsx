import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./VerificationModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "../context/user";
import PageContext from "../context/page"

const OverLay = (props) => {
  const inputRef = useRef(null);
  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext)

  const handleConfirmPatient = (event) => {
    if (inputRef.current.value === userCtx.patient.patient_nric) {
      userCtx.setAuthorised(true);
      if (props.action == 'patientDetails') {
        pageCtx.setShowPatientDetails(true)
      } else if (props.action == 'chat') {
        pageCtx.setShowChat(true)
      }
    }
    props.setShowVerificationModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        <div className={styles.firstBox}>
          <div className={styles.firstTextBox}>Verification</div>
          <div className={styles.firstXBox}>
            <CloseIcon
              sx={{ width: 24, height: 24 }}
              role="button"
              onClick={props.handleCloseModal}
            />
          </div>
        </div>
        <div className={styles.secondBox}>
          <div className={styles.secondTextBox}>
            <div className={styles.secondBoxText}>
              Please Key in the NRIC of the patient to proceed.
            </div>
          </div>
        </div>
        <div className={styles.thirdBox}>
          <div className={styles.NRICBox}>
            <input
              type="NRIC"
              className={styles.NRICInput}
              placeholder="e.g S1234567A"
              ref={inputRef}
            ></input>
            <div className={styles.NRICYellowBox}>
              <div className={styles.NRICYellowBoxText}>NRIC</div>
            </div>
          </div>
        </div>
        <div className={styles.fourthBox}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmPatient}
          >
            <div className={styles.confirmText}>Confirm</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const VerificationModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowVerificationModal={props.setShowVerificationModal}
          handleCloseModal={props.handleCloseModal}
          action={props.action}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default VerificationModal;
