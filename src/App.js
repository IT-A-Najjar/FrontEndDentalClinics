import { Component, Fragment } from "react";
import { Route, Routes, Router } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
// import Slidebar from "./component/Slidebar";
// import Explore from "./component/Explore";
// import Doctoassistatn from "./component/Doctoassistatn";
// import Totalillneeses from "./component/Totalillneeses";
// import Footer from "./component/Footer";
import Login from "./component/Login";
import Layour from "./component/Layour";
import BookNow from "./component/BookNow/BookNow";
import Landing_Dash from "./Dashboard/Landing_Dash";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = <Layour />;
      break;
    case "/Login":
      Component = <Login />;
      break;
    case "/BookNow":
      Component = <BookNow />;
      break;
      case "/Landing_Dash":
        Component = <Landing_Dash />;
        break;
    default:
      break;
  }
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        {/* <Routes>
          <Route path={"/"} element={<Layour />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Booknow"} element={<BookNow />} />
          {/* <Route path={"/Landing_Dash"} element={<Landing_Dash />} /> 
        </Routes> */}
        {Component}
      </div>
    </>
  );
}

export default App;
