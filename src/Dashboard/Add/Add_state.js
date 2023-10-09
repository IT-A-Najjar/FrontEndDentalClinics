import React, { useState, useEffect } from "react";
import "react-bootstrap";
import "./Add_doctor.css";
import "./Add_state.css";
import http from "../../http";
function Add_state() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllusers();
  }, []);
  const fetchAllusers = () => {
    http.get("/cases").then((res) => {
      setUsers(res.data);
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
                      <path d="M20 1.999H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm-6 11H7v-2h7v2zm3-4H7v-2h10v2z"></path>
                    </svg>
                  </span>
                </div>
                <textarea
                  rows="1"
                  className="form-control"
                  placeholder="Description Of State"
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
                />
              </div>

              <button type="button" className="btn btn-secondary btn-block">
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
                </tr>
              </thead>
              <tbody className="table-hover">
                {users.map((user, index) => (
                  <tr>
                    <td className="text-left">{++index}</td>
                    <td className="text-left">{user.casename}</td>
                    <td className="text-left">{user.description}</td>
                    <td className="text-left">{user.place}</td>
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

export default Add_state;
