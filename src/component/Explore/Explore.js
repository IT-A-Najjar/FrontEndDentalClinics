import React from "react";
import "./Explore.css";
import card1 from "../../assets/5.png";
import card2 from "../../assets/2.png";
import card3 from "../../assets/6.png";
import card4 from "../../assets/1.png";
import card5 from "../../assets/4.png";
import card6 from "../../assets/3.png";
import Button from "../Button/Button";
function Explore() {
    return (
        <div className="Explore">
            <div className="Explore-section">
                <div className="Explore-section-1">
                    <h2 className="h2-Title">خدماتنا تبقيك مبتسماً</h2>
                    <p>
                        جميع الخدمات التي يقدمها طلاب كلية طب الفم والأسنان في
                        جامعة حلب في المناطق المحررة
                    </p>
                </div>
            </div>
            <div className="Explore-card">
                <div className="card-section">
                    <img src={card1} className="image__section" title="Card1" />
                    <h5 className="card-fo">تعويضات متحركة</h5>
                    <p className="card-f">
                        ترميم بنية الأسنان من خلال قولبة الأكريليك الجزئي أو الكامل
                      
                    </p>


                </div>

                <div className="card-section">
                    <img src={card2} className="image__section" title="Card1" />
                    <h5 className="card-fo">تعويضات ثابتة</h5>
                    <p className="card-f">
                        استبدال تيجان الأسنان وجسور الأسنان الثابتة

                    </p>

                </div>
                <div className="card-section">
                    <img src={card3} className="image__section" title="Card1" />
                    <h5 className="card-fo">الترميمات الضوئية والمعدنية</h5>
                    <p className="card-f">
                        إعادة تشكيل الأسنان بالحشوات الترميمية والمركبة والملغم

                    </p>

                </div>
                <div className="card-section">
                    <img src={card3} className="image__section" title="Card1" />
                    <h5 className="card-fo">فحص وتشخيص</h5>
                    <p className="card-f">
                        تقييم وظائف الأسنان وتحديد طبيعة أو حالة المرض

                    </p>

                </div>
                <div className="card-section">
                    <img src={card3} className="image__section" title="Card1" />
                    <h5 className="card-fo">تخدير وقلع</h5>
                    <p className="card-f">
                        تخدير وخلع كافة الأسنان التي تحتاج إليها بأقل ألم ممكن وبدون أي مضاعفات.

                    </p>

                </div>
                <div className="card-section">
                    <img src={card4} className="image__section" title="Card1" />
                    <h5 className="card-fo">معالجة اطفال</h5>
                    <p className="card-f">
                        إزالة التسوس للأسنان المؤقتة وخلع الأسنان التي تعيق عملية البزوغ

                    </p>

                </div>
                <div className="card-section">
                    <img src={card5} className="image__section" title="Card1" />
                    <h5 className="card-fo">معالجة اللثة</h5>
                    <p className="card-f">
                        تقييم الحالة الفسيولوجية للثة والأنسجة الداعمة لها وعلاج أمراضها

                    </p>

                </div>
                <div className="card-section">
                    <img src={card6} className="image__section" title="Card1" />
                    <h5 className="card-fo">معالجة لبية</h5>
                    <p className="card-f">
                        علاج الأسنان التي بها تسوس يصل إلى اللب ويزيل العصب

                    </p>

                </div>
            </div>
        </div>
    );
}

export default Explore;
