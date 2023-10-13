import React, { useState } from "react";
import "./Add_doctor.css";
import Get_all_doctor from "./Get_all_doctor";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Add_doctor() {
  const privilegeStatus = sessionStorage.getItem("privilege");
  console.log(privilegeStatus);
  const [done, setDone] = useState(false);
  const [errore, setErrore] = useState(false);
  useEffect(() => {
    if (errore || done) {
      const timeout = setTimeout(() => {
        setErrore(false);
      }, 2000);
      const timeout2 = setTimeout(() => {
        setDone(false);
      }, 2000);
       return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      }
    }
  }, [errore, done]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    phone_number: "",
    university: "",
    photo: null,
    privilege: "0",
    administrativeCapacity: ""
  });
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "file" ? event.target.files[0] : value;
    console.log(event.privilege);
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.university === "" ||
      formData.phone_number === ""
    ) {
      setErrore(false);
      setDone(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("university", formData.university);
    formDataToSend.append("administrativeCapacity", formData.administrativeCapacity);
    formDataToSend.append("privilege", Number(formData.privilege));

    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
    console.log(formDataToSend.password);
   await axios.post("http://127.0.0.1:8000/api/users", formDataToSend)
      .then((res) => {
        setErrore(false);
        setDone(true);

      })
      .catch((err) => {
        setErrore(true);
        setDone(false);
      });
  }

  return (
    <>
      <Navbar
        addPath="/Managmentdoctor"
        showPath="/showDoctor"
        addElement={<Add_doctor />}
        showElement={<Get_all_doctor />}
      />
      {
        (done == true ? (
          <div className="alert alert-success alert__" role="alert">
            تمت الإضافة بنجاح
          </div>
        ) : null)

      }
      {
        (errore == true ? (
          <div className="alert alert-danger alert__" role="alert">
            لم تنجح عملية الاضافة حاول مرة أحرى
          </div>) : null)
      }
      <div className="container" dir="rtl">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center"></h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form onSubmit={handleSubmit}>

              <div className="input-group mb-3">
                <i className="bx bxs-user bx_user"></i>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="الاسم الكامل"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <i className="bx bxs-envelope bx_user"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="الإيميل"
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <i className="bx bxs-lock-open-alt bx_user"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="كلمة المرور"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <i className="bx bxs-time-five bx_user"></i>
                <input
                  type="number"
                  className="form-control"
                  placeholder="العمر"
                  name="age"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className="bx bx-male-female bx_user"></i>
                </div>
                <select
                  name="gender"
                  className="select"
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className='bx bxs-briefcase bx_user'></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ادخل الصفة الإدارية"
                  name="administrativeCapacity"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className="bx bxs-phone bx_user"></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="90xxxxxxxxxxxxxx+"
                  name="phone_number"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <i className="bx bxs-graduation bx_user"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="الجامعة"
                  name="university"
                  onChange={handleChange}
                />
              </div>
              {privilegeStatus === "0" ? (
                <div className="input-group mb-3">
                  <i className="bx bxs-lock-alt bx_user"></i>
                  <select
                    name="privilege"
                    className="select"
                    onChange={handleChange}
                    value={formData.privilege = 1}
                  >
                    <option value="1">مشرف</option>
                  </select>
                </div>) : (privilegeStatus === "1" ? (
                  <div className="input-group mb-3">
                    <i className="bx bxs-lock-alt bx_user"></i>
                    <select
                      name="privilege"
                      className="select"
                      onChange={handleChange}
                      value={formData.privilege = 2}
                    >

                      <option value="2">دكتور</option>
                    </select>
                  </div>) :
                  null
              )
              }




              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className="bx bxs-image-add bx_user"></i>
                </div>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn_send">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>إرسال</span>
                  </div>
                </div>
              </button>
            </form>

            <div className="social">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="#">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Add_doctor;
