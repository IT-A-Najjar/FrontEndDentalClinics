import React, { useState, useEffect } from "react";
import './Consultation.css';
import axios from "axios";

function ShowConsultation() {
    const [consultations, setConsultations] = useState([]);
    const [commentsAndConsultation, setCommentsAndConsultation] = useState({});
    const privilege = sessionStorage.getItem("privilege");
    const [formData, setFormData] = useState({
        content: "",
        consultation_id: ""
    });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const fetchConsultations =async () => {
     await   axios.get("http://127.0.0.1:8000/api/consultation")
            .then((res) => {
                setConsultations(res.data.consultation);

            })
            .catch((err) => {
                console.log("An error occurred while fetching consultations.");
            });
    };
    const fetchCommentsAndConsultation =async (consultationId) => {
        await axios.get(`http://127.0.0.1:8000/api/consultation/${consultationId}`)
            .then((res) => {
                setCommentsAndConsultation({
                    ...commentsAndConsultation,
                    [consultationId]: res.data.consultation
                });

            }).catch((err) => {
                console.log("An error occurred while fetching comments.");
            });
    };

    useEffect(() => {
        fetchConsultations();
    }, []);
    const deleteHandler =async (consultationId, e) => {
        e.preventDefault();
       await axios.delete(`http://127.0.0.1:8000/api/consultation/${consultationId}`).then((res) => {
            fetchConsultations();
        }).catch((err) => {
            console.log('there is errore...');
        })
    }
    const addCommentHandler = async(consultationId, e) => {
        e.preventDefault();
        setFormData({ ...formData, consultation_id: consultationId });
      await  axios.post('http://127.0.0.1:8000/api/comment', formData)
            .then((res) => {
                fetchCommentsAndConsultation(consultationId);
            

            })
            .catch((err) => {
                console.log('there is errore');
            });
    };
    const deleteComment =async (consultationId, commentId, e) => {
        e.preventDefault();
     await   axios.delete(`http://127.0.0.1:8000/api/comment/${commentId}`).then((res) => {
            fetchCommentsAndConsultation(consultationId);

        }).catch((err) => {
            console.log('there is errore...');
        })
    }

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
                <div className="card__all">
                    {consultations.map((consultation, index) => (
                        <div key={index} className="card___">
                            <div className="bg">
                                <div className="bx_al">
                                    <i className='bx bx-question-mark bx_mark bx_comment' ></i>
                                    <div className="__comments">
                                        <h4 className="body__card">
                                            {consultation.content}
                                        </h4>
                                    </div>
                                    {privilege == 2 || privilege == 0 || privilege == 1 ? (
                                        <textarea cols="33" id="txt" type="text" name="content" onChange={handleChange} placeholder="أضف تعليقك"></textarea>) : null
                                    }
                                    {
                                        privilege == 2 || privilege == 0 || privilege == 1 ? (
                                            <div className="btn__all">
                                                <button className="btn_add" onClick={(e) => addCommentHandler(consultation.id, e)}> <i className='bx bx-comment-dots'></i> </button>
                                                <button className="btn_delete" onClick={(e) => deleteHandler(consultation.id, e)}> <i className='bx bxs-message-x'></i> </button>
                                            </div>
                                        ) : null
                                    }
                                    <div className="comments-section">

                                        <button className="btn__comm" onClick={() => fetchCommentsAndConsultation(consultation.id)}>
                                            <i className='bx bx-message-square-dots  '></i>
                                        </button>
                                        {commentsAndConsultation[consultation.id]?.comments.map((comment, index) => (

                                            <p key={comment.id} className="comment__text">
                                                {comment.content}
                                                {privilege == 2 || privilege == 0 || privilege == 1 ? (

                                                <i className='bx bxs-message-square-x btn_del2' onClick={(e) => deleteComment(consultation.id, comment.id, e)}></i>
                                                ):null } </p>






                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="blob"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowConsultation;
