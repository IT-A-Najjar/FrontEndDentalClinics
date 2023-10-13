import React from "react";
import "./App.css";
import InfoPatient from "./component/infoPatient/infoPatient.js";
import Header from "./component/Header/Header";
import Login from "./component/Login/Login";
import Layour from "./component/HomePage/Layour";
import BookNow from "./component/BookNow/BookNow";
import Landing_Dash from "./Dashboard/Landing_Dash";
import ShowBusiness from "./component/Business/ShowBusiness";
import Consultation from "./component/Consultation/Consultation";
import ShowConsultation from "./component/Consultation/showConsultation.js";
import Footer from "./component/Footer/Footer";
function App() {
  const privilege = sessionStorage.getItem("privilege");

  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = <Layour />;
      break;
    case "/Business":
      Component = <ShowBusiness />;
      break;
    case "/login":
      Component = <Login />;
      break;
    case "/BookNow":
      Component = <BookNow />;
      break;
    case "/Landing_Dash":
      Component = <Landing_Dash />;
      // if (privilege) {
      //   Component = <Landing_Dash />;
      // } else {
      //   Component = <Layour />;
      // }
      break;
    case "/Consultation":
      Component = <Consultation />;
      break;
    case "/showConsultation":
      Component = <ShowConsultation />;
      break;
    case "/infoPatient":
      Component = <InfoPatient />;
      break;
    default:
      break;
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>{Component}</div>
      {/* <Layour /> */}
    </>
  );
}

export default App;
