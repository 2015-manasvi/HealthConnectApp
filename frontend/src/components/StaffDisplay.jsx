import React, { useState, useEffect, useContext } from "react";
import { Avatar, Button } from "@mui/material";
import { fetchData } from "../helpers/common";
import StaffWards from "./StaffWards";
import WardBeds from "./WardBeds";
import Bed from "./Bed";

import UserContext from "../context/user";
import PageContext from "../context/page";

const StaffDisplay = () => {
  const userCtx = useContext(UserContext);
  const pageCtx = useContext(PageContext);

  // // GET all patients
  // const getAllPatients = async () => {
  //   const { ok, data } = await fetchData("/api/patients");
  //   if (ok) {
  //     setAllPatients(data);
  //   } else {
  //     console.log(data);
  //   }
  // };

  // Once a ward is clicked, the number is stored in selectedWard, and the ward component is hidden
  const handleWardClick = (event) => {
    pageCtx.setSelectedWard(event.target.textContent);
    console.log("selected ward: ", event.target.textContent);
    pageCtx.setShowWards(false);
    pageCtx.setShowBeds(true);
  };

  const handleBedClick = (bedNumber, item) => {
    userCtx.setPatient(item);
    console.log("event: ", bedNumber);
    pageCtx.setSelectedBed(bedNumber);
    pageCtx.setShowBeds(false);
    pageCtx.setShowPatient(true);
  };

  // useEffect(() => {
  //   getAllPatients();
  // }, []);

  return (
    <>
      <div>
        {pageCtx.showWards && (
          <StaffWards
            handleWardClick={handleWardClick}
          ></StaffWards>
        )}
      </div>
      <div>
        {pageCtx.showBeds && (
          <WardBeds
            handleBedClick={handleBedClick}
          ></WardBeds>
        )}
      </div>
      <div>
        {pageCtx.showPatient && (
          <Bed />
        )}
      </div>
    </>
  );
};

export default StaffDisplay;
