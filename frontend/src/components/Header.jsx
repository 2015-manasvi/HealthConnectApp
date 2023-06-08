import React, { useContext } from "react";
import styles from "./Header.module.css";
import Hamburger from "./Images/Hamburger.png";
import MiddleLogo from "./Images/MiddleLogo.png";
import Bell from "./Images/Bell.png";

import PageContext from "../context/page"


const Header = () => {
  const pageCtx = useContext(PageContext)

  const goHome = () => {
    pageCtx.goToPage("Home Page")
  }

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        {/* <img
          className={styles.hamburger}
          src={Hamburger}
          alt="Menu button"
          onClick={handleClick}
        /> */}
      </div>

      <div className={styles.middle} >
        <img src={MiddleLogo} />
        <div className={styles.text} onClick={goHome} style={{ cursor: 'pointer' }}>HealthConnect</div>
      </div>
      <div className={styles.notification}>
        {/* <img className={styles.bell} alt="Notification" src={Bell} /> */}
      </div>
    </div>
  );
};

export default Header;
