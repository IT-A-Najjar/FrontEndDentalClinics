import React from "react";
import './Loding.css'
import load from '../../assets/loding4.gif'
function Loding() {

    return (
        <div className="loader">
            {/* <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-2"></div>
            <div className="cell d-3"></div>
            <div className="cell d-3"></div>
            <div className="cell d-4"></div> */}
           < img src={load} className="image__loading"/>
            <h4 className="h4__loading">جار تحميل البيانات
                <span className="span__loading1"> .</span>
                <span className="span__loading2"> .</span>
                <span className="span__loading3"> .</span>

            </h4>
        </div>

    );
}
export default Loding;