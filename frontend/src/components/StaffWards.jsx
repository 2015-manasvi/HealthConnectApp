import React, { useState, useEffect, useRef, useContext } from "react";
import { Avatar } from "@mui/material";
import styles from "./StaffWards.module.css";
import UserContext from "../context/user";

const StaffWards = (props) => {
  const userCtx = useContext(UserContext);
  // const [staffWards, setStaffWards] = useState([]);
  // const [wardToAdd, setWardToAdd] = useState();
  // const [showAddWard, setShowAddWard] = useState(false);
  // const didMount = useRef(false);

  // // PATCH new ward number to the staff document
  // const updateStaffWardNumber = async (id) => {
  //   const { ok, data } = await fetchData("/api/staff/" + id, "PATCH", {
  //     // staff_hospitalId: staff.staff_hospitalId,
  //     // staff_firstName: staff.staff_firstName,
  //     // staff_lastName: staff.staff_lastName,
  //     // staff_gender: staff.staff_gender,
  //     // staff_nric: staff.staff_nric,
  //     // staff_photo: staff.staff_photo,
  //     // staff_ward: staffWards,
  //     // staff_password: staff.staff_password,
  //   });

  //   if (ok) {
  //   } else {
  //     console.log(data);
  //   }
  // };

  // // needs finishing, but not priority 1...
  // const handleAddWard = (event) => {
  //   const wardAsNumber = parseInt(wardToAdd);
  //   if (staffWards.includes(wardAsNumber)) {
  //     return;
  // }
  // setStaffWards([...staffWards, wardAsNumber]);

  //   setWardToAdd("");
  //   setShowAddWard(false);
  // };

  // useEffect(() => {
  //   if (didMount.current) {
  //     updateStaffWardNumber();
  //   } else {
  //     didMount.current = true;
  //   }
  // }, [staffWards]);

  return (
    <>
      <div className={styles.StaffDisplay}>
        <Avatar
          alt={`${userCtx.user.firstName}" "${userCtx.user.lastName}`}
          src={userCtx.user.staff_photo}
          sx={{ width: 96, height: 96 }}
        />
        <div className={styles.StaffDetails}>
          <div className={styles.StaffIDBox}>
            <div className={styles.StaffID}>Staff ID</div>
            <div className={styles.ID}>{userCtx.user.staff_hospitalId}</div>
          </div>
          <div className={styles.StaffNameBox}>
            <div className={styles.StaffName}>Staff Name</div>
            <div className={styles.Name}>
              {userCtx.user.firstName} {userCtx.user.lastName}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.WardsTextBox}>
        <div className={styles.Wards}>Wards</div>
      </div>

      <div className={styles.WardsBox}>
        <div className={styles.WardsFrame}>
          {userCtx.user.staff_ward?.map((wardNumber) => {
            return (
              <button
                key={wardNumber}
                className={styles.WardsButton}
                onClick={props.handleWardClick}
              >
                {wardNumber}
              </button>
            );
          })}
        </div>
        {/* <div>
          {true && (
            <button
              className={styles.AddButton}
              onClick={(event) => {
                setShowAddWard(true);
              }}
            >
              <div className={styles.layer}>
                <div className={styles.text}>+ Add Ward</div>
              </div>
            </button>
          )}
          <div>
            {true && wardToAdd && (
              <button className={styles.AddButton} onClick={true}>
                <div className={styles.layer}>
                  <div className={styles.text}>OK</div>
                </div>
              </button>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default StaffWards;
