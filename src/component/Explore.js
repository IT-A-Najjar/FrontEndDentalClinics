import React from "react";
import "./Explore.css";
import card1 from "../assets/5.png";
import card2 from "../assets/2.png";
import card3 from "../assets/6.png";
import card4 from "../assets/1.png";
import card5 from "../assets/4.png";
import card6 from "../assets/3.png";
import Button from "./Button";
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
                    <img src={card1} title="Card1" />
                    <h5 className="card-fo">تعويضات متحركة</h5>
                    <p className="card-f">
                        Restoration of the dental structure through partial or
                        complete acrylic molding
                    </p>

 
                </div>

                <div className="card-section">
                    <img src={card2} title="Card1" />
                    <h5 className="card-fo">تعويضات ثابتة</h5>
                    <p className="card-f">
                        Replacement of dental crowns and fixed dental bridges
                    </p>

                </div>
                <div className="card-section">
                    <img src={card3} title="Card1" />
                    <h5 className="card-fo">الترميمات الضوئية والمعدنية</h5>
                    <p className="card-f">
                        Reshaping the tooth with restorative fillings, composite
                        and amalgam
                    </p>
            
                </div>
                <div className="card-section">
                    <img src={card3} title="Card1" />
                    <h5 className="card-fo">فحص وتشخيص</h5>
                    <p className="card-f">
                        Evaluate dental functions and determine the nature or
                        condition of a disease
                    </p>
             
                </div>
                <div className="card-section">
                    <img src={card3} title="Card1" />
                    <h5 className="card-fo">تخدير وقلع</h5>
                    <p className="card-f">
                        Anesthesia and extraction of all teeth that need it with
                        the least possible pain and without any complications.
                    </p>
                 
                </div>
                <div className="card-section">
                    <img src={card4} title="Card1" />
                    <h5 className="card-fo">معالجة اطفال</h5>
                    <p className="card-f">
                        Caries removal of temporary teeth and tooth extraction
                        that obstructs the eruption process
                    </p>
              
                </div>
                <div className="card-section">
                    <img src={card5} title="Card1" />
                    <h5 className="card-fo">معالجة اللثة</h5>
                    <p className="card-f">
                        Assessment of the physiological condition of the gums
                        and the supporting tissues and treatment of their
                        diseases
                    </p>
                  
                </div>
                <div className="card-section">
                    <img src={card6} title="Card1" />
                    <h5 className="card-fo">معالجة لبية</h5>
                    <p className="card-f">
                        Treating teeth with caries reaching the pulp and
                        removing the nerve
                    </p>
             
                </div>
            </div>
        </div>
    );
}

export default Explore;
