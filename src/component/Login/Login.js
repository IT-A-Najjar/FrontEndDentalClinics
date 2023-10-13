import React, { useState } from "react";
import "./Login.css";
import login from "../../assets/admin-login.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import http from "../../http";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    await http.post("/login", { email, password })
      .then((response) => {
        if (response.data.is == 0) {
          toast.error('الحساب معطل أو غير نشط')
        } else {
          // console.log(response.data);
          window.location.href = '/Landing_Dash';
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("photo", response.data.photo);
          sessionStorage.setItem("privilege", Number(response.data.privilege));
          sessionStorage.setItem("id", response.data.id);
          sessionStorage.setItem("administrativeCapacity", response.data.administrativeCapacity);
          if (response.status === 200) {
            toast.success('تم تسجيل الدخول بنجاح \n سيتم تحويلك الى صفحة التحكم')
            setTimeout(() => {
              window.location.href = '/c'
            }, 3000)
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error('البيانات خاطئة')
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="all" dir="rtl">
        <div className="login1-box">
          <form onSubmit={handleLogin}>
            <img src={login} className="image__login" />
            <div class="user-box">
              <p className="form-label">البريد الإلكتروني</p>
              <input
                type="text"
                name="email"
                placeholder="البريد الإلكتروني"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form__input"
              />
            </div>
            <div className="user-box">
              <p className="form-label" >كلمة السر</p>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form__input"
                placeholder="كلمة السر"

              />

            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}

            <button className="btn_sen3" type="submit">
              <center>
                تسجيل
                <span></span>
              </center>
            </button>

          </form>

        </div>

      </div >


    </>
  );
}
export default Login;
