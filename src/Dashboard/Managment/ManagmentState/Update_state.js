import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Get_all_state from './Get_all_state';
import "../ManagmentUsers/Add_doctor.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Add_state from "./Add_state";

function Update_state() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [pateints, setpateint] = useState([]);
  const [illnesses, setillnesses] = useState([]);
  const [stateData, setStateData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchState();
  }, [id]);
  useEffect(() => {
    fetchillness();
    fetchpatient();
    fetchUser();
  });
  const fetchState =async () => {
 await axios.get(`http://127.0.0.1:8000/api/state/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setStateData(res.data.states);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };
  const fetchUser =async () => {
   await axios.get(`http://127.0.0.1:8000/api/users1`)
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
  const fetchpatient = async() => {
  await  axios.get(`http://127.0.0.1:8000/api/pateints`)
      .then((res) => {
        if (res.status === 200) {
          setpateint(res.data.patients);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };
  const fetchillness =async () => {
  await  axios.get(`http://127.0.0.1:8000/api/illnesses`)
      .then((res) => {
        if (res.status === 200) {
          setillnesses(res.data.illnesses);
        } else {
          console.error("البيانات المسترجعة غير صالحة: ", res.status);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات: ", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateData({
      ...stateData,
      [name]: value,
    });
  };

  const updateuser =async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("state_name", stateData.state_name);
    formData.append("description", stateData.description);
    formData.append("time", stateData.time);
    formData.append("place", stateData.place);
    formData.append("user_id", stateData.user_id);
    formData.append("pateint_id", stateData.pateint_id);
    formData.append("illness_id", stateData.illness_id);
  await  axios.post(`http://127.0.0.1:8000/api/state/${id}`, formData)
      .then((res) => {
         navigate('/showState');
      })
      .catch((err) => {
        alert("Data failed... " + err);
      });
  };
  return (
    <>
      <Navbar
        addPath='/ManagmentState'
        showPath='/showState'
        addElement={<Add_state />}
        showElement={<Get_all_state />}
      />
      <div className="container" dir="rtl">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center"></h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form onSubmit={updateuser}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <i className='bx bx-list-plus bx_user2'></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="state_name"
                  placeholder="اسم الحالة"
                  value={stateData.state_name}
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
                  value={stateData.description}
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
                  value={stateData.time}
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
                  value={stateData.place}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <i className='bx bxs-user bx_user'></i>

                </div>
                <select name="pateint_id" onChange={handleChange} value={stateData.pateint_id} className="select">
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
                <select name="illness_id" onChange={handleChange} value={stateData.illness_id} className="select">
                  {illnesses.map((illness) => (
                    <option key={illness.id} value={illness.id}>
                      {illness.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <i className='bx bxs-user bx_user'></i>
                </div>
                <select name="user_id" onChange={handleChange} value={stateData.user_id} className="select">
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

export default Update_state;
