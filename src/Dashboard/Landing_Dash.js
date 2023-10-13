import React, { useEffect, useState } from "react";
import "./Landing_Dash.css";
import logo from '../assets/logo.webp';
import photo1 from '../assets/doctor.png';
import { Link, Route, Routes } from "react-router-dom";
import Managment_sick from "./Managment/ManagmentPatient/Get_all_sicks";
import Managment_state from "./Managment/ManagmentState/Get_all_state";
import Managment_doctor from "./Managment/ManagmentUsers/Add_doctor";
import Managment_Category from "./Managment/ManagmentCategory/Get_all_category";
import Get_all_doctor from "./Managment/ManagmentUsers/Get_all_doctor";
import Get_all_Business from "./Managment/ManagmentBusiness/Get_all_Business";
import Get_all_illnesse from './Managment/ManagmentIllnesse/Get_all_illnesse';
import Update_users from "./Managment/ManagmentUsers/Update_users";
import EditInfo from "./Managment/EditInfo/EditInfo";
import Update_Business from "./Managment/ManagmentBusiness/Update_Business";
import Get_all_sicks_not_service from "./Managment/ManagmentPatientnotservice/Get_all_sicks_not_service";
import Update_sick_notService from "./Managment/ManagmentPatientnotservice/Update_sick_notService";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
import File_sick from "./Managment/ManagmentPatient/File_sick";
function Landing_Dash() {
  let icon = document.getElementsByClassName("icon");
  const email = sessionStorage.getItem("email");
  const administrativeCapacity = sessionStorage.getItem("administrativeCapacity");
  const photo = sessionStorage.getItem("photo");
  const privilege = sessionStorage.getItem("privilege");
  const id_user = sessionStorage.getItem("id");
  const [name, setName] = useState('');
  useEffect(() => {
    async function getusers() {
      await axios.get(`http://127.0.0.1:8000/api/users/${id_user}`).then((res) => {
        setName(res.data.user.name);
        console.log("Done");

      }).catch((err) => {

        console.log("errore");

      });

    }
    getusers();
  });
  let i = ">";
  const [icons, setIcons] = useState(i);
  const [isLinkOpen, setLinkOpen] = useState(false);
  const [carddash, setCarddash] = useState('card__dash');
  const [isLinkOpen1, setLinkOpen1] = useState(false);
  const [isLinkOpen2, setLinkOpen2] = useState(false);
  const [isLinkOpen3, setLinkOpen3] = useState(false);
  const [isLinkOpen4, setLinkOpen4] = useState(false);
  const [isLinkOpen5, setLinkOpen5] = useState(false);
  const [isLinkOpen6, setLinkOpen6] = useState(false);
  const togglelink = () => {
    setLinkOpen(!isLinkOpen);
    setCarddash('hidecard__dash');
    setLinkOpen1(false);
    setLinkOpen2(false);
    setLinkOpen3(false);
    setLinkOpen4(false);
    setLinkOpen5(false);
  };
  const togglelink1 = () => {
    setLinkOpen(false);
    setCarddash('hidecard__dash');
    setLinkOpen1(!isLinkOpen1);
    setLinkOpen2(false);
    setLinkOpen3(false);
    setLinkOpen4(false);
    setLinkOpen5(false);
    setLinkOpen6(false);

  };

  const togglelink2 = () => {
    setLinkOpen(false);
    setLinkOpen1(false);
    setCarddash('hidecard__dash');
    setLinkOpen2(!isLinkOpen2);
    setLinkOpen3(false);
    setLinkOpen4(false);
    setLinkOpen5(false);
    setLinkOpen6(false);


  };
  const togglelink3 = () => {
    setLinkOpen(false);
    setLinkOpen1(false);
    setCarddash('hidecard__dash');
    setLinkOpen2(false);
    setLinkOpen3(!isLinkOpen3);
    setLinkOpen4(false);
    setLinkOpen5(false);
    setLinkOpen6(false);


  };
  const togglelink4 = () => {
    setLinkOpen(false);
    setCarddash('hidecard__dash');
    setLinkOpen1(false);
    setLinkOpen2(false);
    setLinkOpen3(false);
    setLinkOpen4(!isLinkOpen4);
    setLinkOpen5(false);
    setLinkOpen6(false);

  };
  const togglelink5 = () => {
    setLinkOpen(false);
    setLinkOpen1(false);
    setCarddash('hidecard__dash');
    setLinkOpen2(false);
    setLinkOpen3(false);
    setLinkOpen4(false);
    setLinkOpen5(!isLinkOpen5);
    setLinkOpen6(false);

  };
  const togglelink6 = () => {
    setLinkOpen(false);
    setCarddash('hidecard__dash');
    setLinkOpen1(false);
    setLinkOpen2(false);
    setLinkOpen3(false);
    setLinkOpen4(false);
    setLinkOpen5(false);
    setLinkOpen6(!isLinkOpen6);
  };
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
    <div className="body_all" dir="rtl">
      <span className="icon3" onClick={bb}>
        {icons}
      </span>

      <div className="Dashboard" dir="rtl" >
        <div className="Dashboard_body">
          <div className="Dashboard_image">
            <div className="Dashboard_i1">
              <img src={photo1} alt="dddddddd" />
              <button className="btn_edit">
                <Link to="/EditInfo" onClick={() => setCarddash('hidecard__dash')}>
                  <i className='bx bx-edit bxedit'></i>
                </Link>
              </button>

            </div>
            <h1>{"  مرحبا بك ," + name}</h1>
            <h1>{"الصفة الإدارية ," + administrativeCapacity}</h1>
            <h1>{"الصلاحيات ," + (privilege == 0 ? "مدير نظام" : (privilege == 1 ? "مشرف" : "دكتور"))}</h1>
            <h1>{email}</h1>
          </div>
          <div className="Dashboard_nav">
            <div className="Dashboard_header">
              <ul className="Dashboard_ul">
                {privilege == "0" || privilege == "1" ? (
                  <ul onClick={togglelink} className={`Dashboard_li ${isLinkOpen ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/Managmentdoctor" onClick={togglelink} className={`link ${isLinkOpen ? "clicklink" : ""}`}>
                        <i className='bx bxs-user-rectangle bx_all1'></i>
                        إدارة المستخدمين
                      </Link>
                    </li>
                  </ul>
                ) : ""}
                {privilege == "0" ? null : (
                  <div onClick={togglelink6} className={`Dashboard_li ${isLinkOpen6 ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/ManagmentCategory" className="link">
                        <i className='bx bxs-backpack bx_all1'></i>
                        إدارة اقسام الأمراض
                      </Link>
                    </li>
                  </div>)}
                {privilege == "0" ? null : (
                  <div onClick={togglelink1} className={`Dashboard_li ${isLinkOpen1 ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/ManagmentIllnesse" className="link">
                        <i className='bx bxs-backpack bx_all1'></i>
                        إدارة الأمراض
                      </Link>
                    </li>
                  </div>)}
                {privilege == "0" ? null : (
                  <div onClick={togglelink2} className={`Dashboard_li ${isLinkOpen2 ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/ManagmentSick" className="link">
                        <i className='bx bx-plus-medical bx_all1'></i>
                        إدارة المرضى
                      </Link>
                    </li>
                  </div>)}
                {privilege == "0" ? null : (
                  <div onClick={togglelink3} className={`Dashboard_li ${isLinkOpen3 ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/ManagmentState" className="link">
                        <i className='bx bx-spreadsheet bx_all1' ></i>
                        إداة الحالات &nbsp; &nbsp; &nbsp;
                      </Link>
                    </li>
                  </div>)}
                {privilege == "0" || privilege == "1" ? null : (
                  <div onClick={togglelink4} className={`Dashboard_li ${isLinkOpen4 ? "clicklink" : ""}`}>

                    <li>
                      <Link to="/ManagmentBusiness" className="link">
                        <i className='bx bxs-business bx_all33'></i>
                        إدارة الأعمال
                      </Link>
                    </li>
                  </div>)
                }
                {privilege == "0" || privilege == "1" ? null : (
                  <div onClick={togglelink5} className={`Dashboard_li ${isLinkOpen5 ? "clicklink" : ""}`}>
                    <li>
                      <Link to="/PatientnotService" className="link">
                        <i className='bx bxs-business bx_all33'></i>
                        المرضى الغير مخدمين
                      </Link>
                    </li>
                  </div>)
                }
              </ul>
            </div>
            <div className="Dashboard_footer"></div>
          </div>
        </div>
      </div>
      <div className="body_right">

        <Routes>
          <Route path={"/Managmentdoctor"} element={<Managment_doctor />} />
          <Route path={"/ManagmentBusiness"} element={<Get_all_Business />} />
          <Route path={"/ManagmentSick"} element={<Managment_sick />} />
          <Route path={"/ManagmentState"} element={<Managment_state />} />
          <Route path={"/ManagmentCategory"} element={<Managment_Category />} />
          <Route path={"/ManagmentIllnesse"} element={<Get_all_illnesse />} />
          <Route path={"/showDoctor"} element={<Get_all_doctor />} />
          <Route path={"/showBusiness"} element={<Get_all_Business />} />
          <Route path={"/users/:id"} element={<Update_users />} />
          <Route path={"/business/:id"} element={<Update_Business />} />
          <Route path={"/pateint/:id"} element={<Update_sick_notService />} />
          <Route path={"/EditInfo"} element={<EditInfo />} />
          <Route path={"/File_sick"} element={<File_sick />} />
          <Route path={"/PatientnotService"} element={<Get_all_sicks_not_service />} />
        </Routes>
        <div className={` ${carddash == "hidecard__dash" ? "hidecard__dash" : "card__dash"}`}>
          <div className="block__dash">
            <img src={logo} className="logo__dash" />
            <h3>
              {privilege == 0 ? "المدير" : (privilege == 1 ? "المشرف" : "الدكتور")} {name}
            </h3>
            <h4 className="h3__dash"> اهلا وسهلا بك في موقع العيادات السنية</h4>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Landing_Dash;
