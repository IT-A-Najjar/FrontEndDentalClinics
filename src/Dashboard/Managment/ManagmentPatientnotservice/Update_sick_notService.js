import React, { useState, useEffect } from "react";
import "react-bootstrap";
import Navbar from '../Navbar/Navbar'
import "../ManagmentUsers/Add_doctor.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Get_all_sicks_not_service from "./Get_all_sicks_not_service";
function Update_sick_notService() {
    let { id } = useParams();
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
    const [pateints, setPateints] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getpeint() {
           await axios.get(`http://127.0.0.1:8000/api/pateints/${id}`).then(res => {
                setPateints(res.data.pateints);
            });
        }
        getpeint();

    }, [id]);
    useEffect(() => {
        fetchAllUsers();
    });
    const fetchAllUsers = async () => {
        await axios.get("http://127.0.0.1:8000/api/users1")
            .then((res) => {
                if (res.status == 200) {
                    setUsers(res.data.user);
                }
            })

            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });


    };
    const navigate = useNavigate();
    const handleChange = (event) => {
        setPateints({ ...pateints, [event.target.name]: event.target.value })
    };
    const updatePatient = async (event) => {
        event.preventDefault();
        const data = {
            'full_name': pateints.full_name,
            'age': pateints.age,
            'phone_number': pateints.phone_number,
            'user_id': pateints.user_id,

        }
        await axios.post(`http://127.0.0.1:8000/api/pateints/${id}`, data)
            .then((res) => {
                setErrore(false);
                setDone(true);
                navigate('/PatientnotService');
            })
            .catch(err => {
                setErrore(true);
                setDone(false);
            });
    }
    const selectedUserId = pateints.user_id || ""; // يمكن تحديد قيمة فارغة إذا لم يكن المستخدم قد قام بتحديد أي قيمة بعد.
    const selectedIllness = pateints.illness_id || ""; // يمكن تحديد قيمة فارغة إذا لم يكن المستخدم قد قام بتحديد أي قيمة بعد.

    // تحقق من صحة الحقول قبل تفعيل زر "Add"
    // const isFormValid = formData.title.trim() !== "" && formData.description.trim() !== "" && selectedUserId !== "";

    return (
        <>
            <Navbar
                addPath='/ManagmentSick'
                showElement={<Get_all_sicks_not_service />}
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
                        <form onSubmit={updatePatient}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className='bx bxs-user bx_user'></i>
                                </div>
                                <input
                                    type="text"
                                    name="full_name"
                                    onChange={handleChange}
                                    value={pateints.full_name}
                                    className="form-control"
                                    placeholder="اسم المريض الكامل"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className="bx bxs-time-five bx_user"></i>

                                </div>
                                <input
                                    type="number"
                                    name="age"
                                    value={pateints.age}
                                    className="form-control"
                                    placeholder="العمر"
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className='bx bxs-phone bx_user'></i>

                                </div>
                                <input
                                    type="text"
                                    onChange={handleChange}

                                    name="phone_number"
                                    value={pateints.phone_number}
                                    className="form-control"
                                    placeholder="+90xxxxxxxx"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <i className='bx bxs-user bx_user'></i>
                                </div>
                                <select name="user_id" onChange={handleChange} value={selectedUserId} className="select">
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <button type="submit" className='btn_send'>
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
                </div >
            </div >
        </>
    );
}

export default Update_sick_notService;
