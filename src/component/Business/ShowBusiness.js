import React, { useEffect, useState } from "react";
import './showBusiness.css';
import axios from "axios";
import p2 from '../../assets/عيادة.jpg'


function ShowBusiness() {
    useEffect(() => {
        fetchAllBusiness();
    }, []);

    const [business, setBusiness] = useState([]);

    const fetchAllBusiness =async () => {
    await axios.get(`http://127.0.0.1:8000/api/businesspublic`)
            .then((res) => {
                if (res.status === 200) {
                    setBusiness(res.data.business);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
    return (
        <div className="all" dir="rtl">
            <div className="all_1">
                <div className="contian1">
                    {business.map((busines, index) => (
                        <div className="card_all1" key={index}>
                            <div className="bgbu">
                                <div className="comments1">
                                    <div className="comment-container1">
                                        <img src={p2} className="image_card" alt="صورة العمل" />
                                        <div className="title1">
                                            <i className='bx bx-captions bx_alltitle' ></i>
                                            <span> العنوان : {busines.title}</span><hr />
                                        </div>
                                        <div className="description">
                                            <i className='bx bxs-user-circle bx_all2'></i>
                                            {busines.user?.name}
                                        </div> <br />
                                        <div className="description">
                                            <i className='bx bx-notepad bx_all2'></i>
                                            {busines.description}
                                        </div>

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

export default ShowBusiness;
