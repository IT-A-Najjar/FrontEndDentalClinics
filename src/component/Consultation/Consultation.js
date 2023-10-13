import React, { useEffect, useState } from "react";
import './Consultation.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Consultation() {
    const navegate = useNavigate();
    const [done, setDone] = useState(false);
    const [errore, setErrore] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
        is_viwe: 0
    });
    useEffect(() => {
        if (errore || done) {
            const timeout = setTimeout(() => {
                setErrore(false);
            }, 2000);
            const timeout2 = setTimeout(() => {
                setDone(false);
            }, 2000);
            return () => {
                clearTimeout(timeout);
                clearTimeout(timeout2);
            }
        }
    }, [errore,done]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const addConsultationHandler =async (e) => {
        console.log(formData.content);
        e.preventDefault();
      await  axios.post('http://127.0.0.1:8000/api/consultation', formData)
            .then((res) => {
                // navegate("/showConsultation");
                setDone(true);
                setErrore(false);

                // window.location.pathname = "/showConsultation";
            })
            .catch((err) => {
                setErrore(true);
                setDone(false);

            });
    };

    return (
        <div className="all">

            <div className="Consultation" dir="rtl">

                <div className="header">

                    <ul>
                        <li>
                            <a href="/Consultation" className="aurl">
                                <i className='bx bxs-message-square-add' ></i>إضافة استفسار
                            </a>
                        </li>
                        <li>
                            <a href="/showConsultation" className="aurl">
                                <i className='bx bx-list-check bx_i'></i> عرض الإستفسارات
                            </a>
                        </li>
                    </ul>
                </div>
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
                <div>
                    <div className="cardConsultation" >

                        <form onSubmit={addConsultationHandler}>
                            <div className="bg_Consu">
                                <div className="bx_al">
                                    <i className='bx bx-question-mark bx_mark' ></i>
                                    <h4 className="h4_con">
                                        أضف استفسارك
                                    </h4>
                                    <textarea cols="53" type="text" className="text_area" name="content" onChange={handleChange} placeholder="أضف استفسارك"></textarea>
                                </div>
                                <div className="btn__addcon">
                                    <button className="btn_addcon" type="submit">أضف</button>
                                </div>
                            </div>
                        </form>
                        <div className="blob"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultation;
