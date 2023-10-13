import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InfoPatient() {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [errore, setErrore] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ symbol: "" });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
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
    }, [errore,done]);
    const sendDataHandler = async(e) => {
        e.preventDefault();
      await  axios.post("http://127.0.0.1:8000/api/showpateint", formData)
            .then((res) => {
                setData(res.data.statePatient);
                setErrore(false);
                setDone(true);
                console.log(res.data.statePatient);
            })
            .catch((err) => {
                setErrore(true);
                setDone(false);
            });
    }

    return (
        <div className="all">
            <div className="Consultation" dir="rtl">
                <div className="header">
                    <ul>
                        <li>
                            <a href="/infoPatient" className="aurl">
                                <i className='bx bxs-message-square-add'></i>ادخال الرمز الخاص بك
                            </a>
                        </li>
                    </ul>
                </div>
                {
                    (done == true ? (
                        <div className="alert alert-success alert__" role="alert">
                            تمت العملية بنجاح
                        </div>
                    ) : null)

                }
                {
                    (errore == true ? (
                        <div className="alert alert-danger alert__" role="alert">
                            لم تنجح العملية حاول مرة أحرى
                        </div>) : null)
                }
                <div>
                    <div className="cardshowpatient">
                        {data.length === 0 ? (
                            <form onSubmit={sendDataHandler}>
                                <div className="bg_Consu">
                                    <div className="bx_al">
                                        <i className='bx bx-search-alt-2 bx_search bx_markser'></i>
                                        <h4 className="h4_con">
                                            أدخل الرمز الخاص بك
                                        </h4>
                                        <input className="question__input" type="text" name="symbol" onChange={handleChange} placeholder="ادخل رمزك" />
                                    </div>
                                    <div className="btn__addcon">
                                        <button className="btn_addinfo" type="submit">بحث <i className='bx bx-search-alt-2 bx_search'></i></button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg_info">
                                {Object.values(data).map((patient) => (
                                    <div className="bx_al" key={patient.id}>
                                        <i className='bx bxs-select-multiple bx_markser bx_markpat'></i>
                                        <h3 className="info__patient"> اسم الـــــمريض: {patient.pateint?.full_name}</h3>
                                        <h3 className="info__patient"> الطــــــــــبــــيب: {patient.user?.name}</h3>
                                        <h3 className="info__patient"> رقم الطــــــــبيب: {patient.user?.phone_number}</h3>
                                        <h3 className="info__patient"> اسم الحــــــــــالة: {patient.state_name}</h3>
                                        <h3 className="info__patient"> وصف الحـــــالة: {patient.description}</h3>
                                        <h3 className="info__patient"> تاريخ الحــــــالة: {patient.time}</h3>
                                        <h3 className="info__patient"> المكـــــــــــــــان: {patient.place}</h3>
                                        <h3 className="info__patient"> الجامعـــــــــــــة: {patient.user?.university}</h3>

                                    </div>
                                ))}
                                <div className="btn__addcon">
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="blob"></div>
                </div>
            </div>
        </div>

    )
}

export default InfoPatient;
