import React, { useState, useEffect } from "react";
import "react-bootstrap";
import "./Add_doctor.css";
import "./Add_state.css";
import http from "../../http";

function Add_sick() {
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
                      <path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Sick"
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

      </div >


    </>
  );
}
{/* <tbody className="table-hover">
            {users.map((user, index) => (
              <tr>
                <td className="text-left">{++index}</td>
                <td className="text-left">{user.casename}</td>
                <td className="text-left">{user.description}</td>
                <td className="text-left">{user.place}</td>
              </tr>
            ))}
          </tbody> */}
export default Add_sick;
