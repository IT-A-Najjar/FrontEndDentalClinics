import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import "./Add_doctor.css";
import Get_all_doctor from "./Get_all_doctor";
import { useNavigate, useParams } from "react-router-dom";
import Add_doctor from "./Add_doctor";
import Loading from "../Loding";
import axios from "axios";
function Update_users() {
    const { id } = useParams();
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    }, [id]);
    const fetchUser = async() => {
     await axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setUsers(res.data.user);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "file") {
            setUsers({
                ...users,
                [name]: event.target.files[0],
            });
        } else {
            setUsers({
                ...users,
                [name]: value,
            });
        }
    };

    const updateUser = async(event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", users.name);
        formData.append("email", users.email);
        formData.append("age", users.age);
        formData.append("gender", users.gender);
        formData.append("phone_number", users.phone_number);
        formData.append("administrativeCapacity", formData.administrativeCapacity);
        formData.append("university", users.university);
        formData.append("privilege", users.privilege);
        // formData.append("photo", users.photo); // Assuming users.photo is a File object
      await  axios.post(`http://127.0.0.1:8000/api/users/${id}`, formData)
            .then((res) => {
                console.log("Data Update Successfully...");
                setLoading(false);
                navigate("/showDoctor");
            })
            .catch((err) => {
                alert(err.response.data);
            });

        if (loading) {
            return <Loading />;
        }
    };
    return (
        <>
            <Navbar
                addPath='/Managmentdoctor'
                showPath='/showDoctor'
                addElement={<Add_doctor />}
                showElement={<Get_all_doctor />}
            />
            <div className="container" dir="rtl">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"></h4>
                        <div className="image"></div>
                    </div>
                    <div className="body-form">
                        <form onSubmit={updateUser}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className='bx bxs-user bx_user'></i>
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={users.name}
                                    className="form-control"
                                    placeholder="الاسم الكامل"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className="bx bxs-envelope bx_user"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="الإيميل"
                                    name="email"
                                    value={users.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <i className="bx bxs-time-five bx_user"></i>

                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="العمر"
                                    name="age"
                                    value={users.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                            <i className="bx bx-male-female bx_user"></i>
                                <select type="text" name="gender" className="select" onChange={handleChange} value={users.gender}>
                                    <option value='male'>
                                        ذكر
                                    </option>
                                    <option value='female'>
                                        أنثى
                                    </option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className='bx bxs-phone bx_user'></i>

                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tel:+90xxxxxxxxxxxxxx"
                                    name="phone_number"
                                    value={users.phone_number}
                                    onChange={handleChange} />
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
                                    value={users.administrativeCapacity}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <i className="bx bxs-graduation bx_user"></i>

                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="الجامعة"
                                    name="university"
                                    onChange={handleChange}
                                    value={users.university}
                                />
                            </div>
                            <div className="input-group mb-3">
                            <i className="bx bxs-lock-alt bx_user"></i>
                                <select name="privilege" className="select" onChange={handleChange} value={users.privilege}>
                                    <option value={0}>
                                        مدير نظام
                                    </option>
                                    <option value={1}>
                                        دكتور
                                    </option>
                                    <option value={2}>
                                        مشرف
                                    </option>
                                </select>
                            </div>
                            {/* <div className="input-group mb-3">
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
                                    type="file"
                                    name="photo"
                                    onChange={handleChange}

                                />

                            </div> */}
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
                    </div >
                </div>
            </div>


        </>
    );
}
export default Update_users;
