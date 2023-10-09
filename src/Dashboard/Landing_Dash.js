import React, { useEffect, useState } from "react";
import Person from "../assets/doctor.png";
import "./Landing_Dash.css";
import Add_doctor from "./Add/Add_doctor";
import { Link, Route, Routes } from "react-router-dom";
import Add_Mushref from "./Add/Add_Mushref";
import Add_sick from "./Add/Add_sick";
import Add_state from "./Add/Add_state";

function Landing_Dash() {
  let icon = document.getElementsByClassName("icon");
  let i = ">";
  const [icons, setIcons] = useState(i);
  function bb() {
    document
      .getElementsByClassName("Dashboard")[0]
      .classList.toggle("shiftRight");
        setIcons(">");
        if (icons == ">") {
          setIcons("<");
        }

  }



  return (
    <div className="body_all">
      <span className="icon3" onClick={bb}>
        {icons}
      </span>

      <div className="Dashboard">
        <div className="Dashboard_body">
          <div className="Dashboard_image">
            <div className="Dashboard_i1">
              <img src={Person} />
            </div>
            <h1>Hasan Amana</h1>
            <h1>hasanamane74@gmail.com</h1>
          </div>
          <div className="Dashboard_nav">
            <div className="Dashboard_header">
              <ul className="Dashboard_ul">
                <div className="Dashboard_li">
                  <li>
                    <Link to="/Adddoctor" className="link">
                      {" "}
                      Add docotor
                    </Link>
                  </li>
                </div>
                <div className="Dashboard_li">
                  <li>
                    <Link to="/AddMushref" className="link">
                      {" "}
                      Add a supervisor
                    </Link>
                  </li>
                </div>
                <div className="Dashboard_li">
                  <li>
                    <Link to="/addSick" className="link">
                      Add Sick &nbsp; &nbsp; &nbsp; &nbsp;
                    </Link>
                  </li>
                </div>
                <div className="Dashboard_li">
                  <li>
                    <Link to="/AddState" className="link">
                      Add state &nbsp; &nbsp; &nbsp;
                    </Link>
                  </li>
                </div>
                <div className="Dashboard_li">
                  <li>Add news &nbsp; &nbsp; &nbsp;</li>
                </div>
              </ul>
            </div>
            <div className="Dashboard_footer"></div>
          </div>
        </div>
      </div>
      <div className="body_right">
        <Routes>
          <Route path={"/Adddoctor"} element={<Add_doctor />} />
          <Route path={"/AddMushref"} element={<Add_Mushref />} />
          <Route path={"/AddSick"} element={<Add_sick />} />
          <Route path={"/AddState"} element={<Add_state />} />
        </Routes>
      </div>
    </div>
  );
}

export default Landing_Dash;
