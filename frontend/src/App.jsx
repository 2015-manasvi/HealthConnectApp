import React, { useState } from "react";
import UserContext from "./context/user";
import PageContext from "./context/page"

import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

function App() {
  // current user's Object
  const [user, setUser] = useState({});

  // set on login
  const [role, setRole] = useState(""); // 'staff' or 'contact'

  // for staff - this will be set after Ward+Bed are selected
  // for contact - this will be set after login
  const [patient, setPatient] = useState({});
  const [patientNOK, setPatientNOK] = useState({});
  const [authorised, setAuthorised] = useState(false);

  // for conditional rendering of pages
  const [showBeds, setShowBeds] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPatient, setShowPatient] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showPatientMenu, setShowPatientMenu] = useState(true);
  const [showWards, setShowWards] = useState(true);

  const [selectedWard, setSelectedWard] = useState('')
  const [selectedBed, setSelectedBed] = useState('')
  
  const [currentPage, setCurrentPage] = useState('')
  
  // states to render the pages 
  const pages = {
    "Home Page": [false, false, false, false, true, true, '', ''],
    "Ward Page": [true, false, false, false, true, false, selectedWard, ''],
    "Ward Bed Page": [false, false, true, false, true, false, selectedWard, selectedBed],
    "Chat Page": [false, true, true, false, true, false, selectedWard, selectedBed],
    "Patient Details": [false, false, true, true, false, false, selectedWard, selectedBed],  
  }

  const goToPage = (page) => {
    setShowBeds(pages[page][0])
    setShowChat(pages[page][1])
    setShowPatient(pages[page][2])
    setShowPatientDetails(pages[page][3])
    setShowPatientMenu(pages[page][4])
    setShowWards(pages[page][5])
    setSelectedWard(pages[page][6])
    setSelectedBed(pages[page][7])
  }

  return (
    <>
      <PageContext.Provider
        value={{
          showPatientDetails,
          setShowPatientDetails,
          showChat,
          setShowChat,
          showWards,
          setShowWards,
          showBeds,
          setShowBeds,
          showPatient,
          setShowPatient,
          showPatientMenu, 
          setShowPatientMenu,
          selectedWard,
          setSelectedWard,
          selectedBed,
          setSelectedBed,
          currentPage,
          setCurrentPage,
          goToPage
        }}>
        <UserContext.Provider
          value={{
            authorised,
            setAuthorised,
            user,
            setUser,
            role,
            setRole,
            patient,
            setPatient,
            patientNOK,
            setPatientNOK,
          }}
        >
          <div className="centered">
            <div
              style={{
                width: "420px",
                height: "100vh",
                display: "flex",
                flexFlow: "column",
              }}
            >
              {!role && <LoginPage />}

              {role && (
                <>
                  <Header />
                  <SubHeader />
                  <HomePage />
                </>
              )}

            </div>
          </div>
        </UserContext.Provider>
      </PageContext.Provider>
    </>
  );
}

export default App;
