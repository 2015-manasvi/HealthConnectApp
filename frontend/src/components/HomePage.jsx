import React from "react";
import { useContext, useState } from "react";
import styles from "./HomePage.module.css";
import StaffDisplay from "./StaffDisplay";
import FamilyPatient from "./FamilyPatient";
import PatientDetails from "./PatientDetails";
import ChatPage from "./ChatPage";
import UserContext from "../context/user";
import PageContext from "../context/page"


const HomePage = () => {
  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext);

  return (
    <div className={styles.HomePage}>
      {userCtx.role == "staff" && !pageCtx.showChat && !pageCtx.showPatientDetails && (
        <StaffDisplay />
      )}
      {userCtx.role == "contact" && !pageCtx.showChat && !pageCtx.showPatientDetails && (
        <FamilyPatient />
      )}
      {userCtx.authorised && pageCtx.showPatientDetails && !pageCtx.showChat && (
        <PatientDetails />
      )}
      {pageCtx.showChat && <ChatPage />}
    </div>
  );
};

export default HomePage;
