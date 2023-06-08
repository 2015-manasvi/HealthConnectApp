import React, { useContext } from "react";
import styles from "./SubHeader.module.css";
import BackArrow from "./Images/BackArrow.png";
import LogOut from "./Images/LogOut.png";
import UserContext from "../context/user";
import PageContext from "../context/page"

const SubHeader = () => {
  const userCtx = useContext(UserContext)
  const pageCtx = useContext(PageContext)

  const handleBack = () => {
    switch (pageCtx.currentPage) {
      case "Ward Page":
        pageCtx.goToPage("Home Page")
        return
      case "Ward Bed Page":
        pageCtx.goToPage("Ward Page")
        return
      case "Chat Page":
        pageCtx.goToPage("Ward Bed Page")
        return
      case "Patient Details":
        pageCtx.goToPage("Ward Bed Page")
        return   
    }
  }

  const logout = () => {
    userCtx.setRole('');
    userCtx.setAuthorised(false);
    pageCtx.goToPage("Home Page")
  }

  console.log(pageCtx)
  return (
    <div className={styles.subHeader}>
      <div className={styles.Back} style={{ cursor: "pointer" }} onClick={handleBack}>
        <img className={styles.BackArrow} src={BackArrow} />
      </div>
      <div className={styles.LogOut} style={{ cursor: "pointer" }} onClick={logout} >
        <img className={styles.LogOutIcon} src={LogOut} />
      </div>
    </div>
  );
};

export default SubHeader;
