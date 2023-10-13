import React, { useEffect, useState } from "react";
import "./BookNow.css";
import 'react-notifications/lib/notifications.css';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import login from "../../assets/sike_login.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import http from '../../http';



function BookNow() {
  const notify = () => toast("Wow so easy!");
  var i = Math.floor(Math.random() * 10000);
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

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    age: "",
    user_id: "",
    symbol: `$patient${i}`
  });
  if (formData.full_name == null || formData.phone_number == null || formData.age == null) {
    setErrore(true);
    setDone(false);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const addPatientHandle = async (e) => {
    e.preventDefault();
    await http.post('/pateints', formData)
      .then((res) => {
        // setErrore(false);
        // setDone(true);
        if (res.status === 200) {
          toast('....تم التسجيل بنجاح')
          setTimeout(() => {
            window.location.href = '/BookNow'
          }, 2000)
        }
      })
      .catch(err => {
        toast.error('البيانات خاطئة')

      });
  };

  return (
    <>

      <ToastContainer />
      <div className="BookNow" dir="rtl">

        <div className="card">
          <img src={login} className="image_sike" />
          <a href="#" className="card-link white-text active">
            إضافة مريض
          </a>
          <form onSubmit={addPatientHandle}>
            <div className="md-form m-t-3">
              الاسم الكامل
              <input
                type="text"
                id="form1"
                className="form-control"
                name="full_name"
                placeholder="الاسم الكامل"
                onChange={handleChange}
              />
            </div>
            <div className="md-form">
              العمر
              <input
                type="number"
                id="form1"
                className="form-control"
                name="age"
                placeholder="العمر"
                onChange={handleChange}
              />
            </div>
            <div className="md-form">
              رقم التيلفون
              <input
                type="text"
                id="form1"
                className="form-control"
                name="phone_number"
                placeholder="رقم التيلفون"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <button type="submit" className="btn_green1">
                إضافة
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookNow;
