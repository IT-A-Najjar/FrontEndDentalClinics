import React, { useState,useEffect } from "react";
import "react-bootstrap";
import "./Add_doctor.css";
import http from "../../http";
import { useNavigate } from "react-router-dom";
function Add_doctor() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handChange = (event) => {
    const name = event.target.fullname;
    const E_mail = event.target.e_mail;
    const number = event.target.number;
    const jurisdiction = event.target.jurisdiction;
    setInputs((val) => ({ ...val, [name]: E_mail }));
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllusers();
  }, []);
  const fetchAllusers = () => {
    http.get("/cases").then((res) => {
      setUsers(res.data);
    });
  };
  const submitform = () => {
    http.post("/patients").then((res) => {
      navigate("/");

    });
  };
  return (
    <>
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center"></h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      Style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                    >
                      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>{" "}
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name "
                  value={inputs.name}
                  onChange={handChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      Style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                    >
                      <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  name="E_mail"
                  value={inputs.E_mail}
                  onChange={handChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      Style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                    >
                      <path d="M15.793 6.793 13 4v7h7l-2.793-2.793 4.5-4.5-1.414-1.414z"></path>
                      <path d="M16.422 13.443a1.001 1.001 0 0 0-1.391.043l-2.392 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.86 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1.001 1.001 0 0 0-.291.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.324 21 17.705 21c.203 0 .326-.006.359-.008a.99.99 0 0 0 .648-.291l1.861-2.171a1.001 1.001 0 0 0-.086-1.391l-4.065-3.696z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Tel:+90xxxxxxxxxxxxxx"
                  value={inputs.number}
                  name="number"
                  onChange={handChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      Style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                    >
                      <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM8 8h12v3H4V8h4zM4 19v-6h6v2h4v-2h6l.001 6H4z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jurisdiction"
                  value={inputs.jurisdiction}
                  name="jurisdiction"
                  onChange={handChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      Style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                    >
                      <path d="M11.024 11.536 10 10l-2 3h9l-3.5-5z"></path>
                      <circle cx="9.503" cy="7.497" r="1.503"></circle>
                      <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Photo "
                />
              </div>
              <div className="radio">
                <span className="Sp"> is Admin</span>
                <br />
                <span className="ch"> Yes</span> &nbsp;{" "}
                <input type="radio" name="name" />
                <br />
                <span className="ch ch1">No </span> &nbsp;&nbsp;
                <input type="radio" name="name" />
              </div>

              <button
                type="button"
                onClick={submitform}
                className="btn btn-secondary btn-block"
              >
                Add
              </button>
              <div className="message">
                <div>
                  <input type="checkbox" /> Remember ME
                </div>
              </div>
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
          <div>
            <table>
              <thead>
                <tr>
                  <th>الرقم</th>
                  <th>اسم الحالة</th>
                  <th>الوصف </th>
                  <th>المكان </th>
                  <th>العملية</th>
                </tr>
              </thead>
              <tbody className="table-hover">
                {users.map((user, index) => (
                  <tr>
                    <td className="text-left">{++index}</td>
                    <td className="text-left">{user.casename}</td>
                    <td className="text-left">{user.description}</td>
                    <td className="text-left">{user.place}</td>
                    <td>
                      <button><a>تعديل</a></button>
                      <button><a>حذف</a></button>
                    </td>
                  </tr>
                 
                ))}
              
              </tbody>

            </table>
          </div >
        </div>
      </div>
    </>
  );
}

export default Add_doctor;
