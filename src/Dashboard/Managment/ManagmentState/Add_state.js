import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Get_all_state from './Get_all_state';
import http from "../../../http";
import "../ManagmentUsers/Add_doctor.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add_state() {
  const [pateints, setPatients] = useState([]); // تغيير اسم المرضى إلى patients
  const [users, setUsers] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
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
      // نظف الـ timeout عندما يتم تغيير الحالة مرة أخرى قبل انتهاء الوقت
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      }
    }
  }, [errore, done]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
    fetchAllPatients(); // تغيير اسم الدالة إلى fetchAllPatients
    fetchAllIllnesses(); // تغيير اسم الدالة إلى fetchAllIllnesses
  }, []);
  const fetchAllUsers =async () => {
  await axios.get("http://127.0.0.1:8000/api/users1")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.user);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };
  const fetchAllPatients = async() => { // تغيير اسم الدالة إلى fetchAllPatients
   await axios.get("http://127.0.0.1:8000/api/allpatenits1")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.patients);
          setPatients(res.data.patients);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };

  const fetchAllIllnesses =async () => { // تغيير اسم الدالة إلى fetchAllIllnesses
  await  axios.get("http://127.0.0.1:8000/api/illnesses1")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.illnesses);
          setIllnesses(res.data.illnesses);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [formData, setFormData] = useState({
    state_name: "",
    description: "",
    time: "",
    place: "",
    user_id: "",
    pateint_id: "", // تغيير اسم المتغير إلى patient_id
    illness_id: "", // تغيير اسم المتغير إلى illness_id
  });

  const handleSubmit =async (event) => {
    event.preventDefault();
   await axios.post('http://127.0.0.1:8000/api/state', formData)
      .then((res) => {
        setErrore(false);
        setDone(true);
      })
      .catch((err) => {

        setErrore(true);
        setDone(false);
      });
  };

  const selectedPatientId = formData.pateint_id || ""; // تغيير اسم المتغير إلى selectedPatientId
  const selectedIllnessId = formData.illness_id || ""; // تغيير اسم المتغير إلى selectedIllnessId
  const selectedUserId = formData.user_id || "";

  return (
    <>
      <Navbar
        addPath='/ManagmentState'
        showPath='/showState'
        addElement={<Add_state />}
        showElement={<Get_all_state />}
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
                <div className="input-group-prepend">
                  <i className='bx bx-list-check bx_user2'></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="state_name"
                  placeholder="اسم الحالة"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className='bx bxs-notepad bx_user'></i>
                </div>
                <textarea
                  rows={1}
                  type="text"
                  className="form-control"
                  placeholder="وصف الحالة"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className='bx bxs-calendar bx_user' ></i>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="تاريخ الحالة"
                  onChange={handleChange}
                  name="time"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className='bx bxs-home-alt-2 bx_user' ></i>
                </div>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="المكان"
                  name="place"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <i className='bx bxs-user bx_user'></i>

                </div>
                <select name="pateint_id" onChange={handleChange} value={selectedPatientId} className="select">
                  <option value="">اختر مريض  ...</option>
                  {pateints.map((pateint) => (
                    <option key={pateint.id} value={pateint.id}>
                      {pateint.full_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <i className='bx bxs-virus bx_user'></i>
                </div>
                <select name="illness_id" onChange={handleChange} value={selectedIllnessId} className="select">
                  <option value="">اختر مرض...</option>
                  {illnesses.map((illnesse) => (
                    <option key={illnesse.id} value={illnesse.id}>
                      {illnesse.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <i className='bx bxs-user bx_user'></i>

                </div>
                <select name="user_id" onChange={handleChange} value={selectedUserId} className="select">
                  <option value="">اختر الطبيب...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn_send">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span>أرسال</span>
                </div>
              </button>
              {/* <button type="submit" className="btn btn-secondary btn-block">
                Add
              </button> */}

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
        </div>
      </div>
    </>
  );
}

export default Add_state;
