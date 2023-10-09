import React from "react";
import "./BookNow.css";
import "react-bootstrap"
function BookNow() {
  return (
    <div className="BookNow">
      <a href="/BookNow">
        <h1>
          <span>إضافة مريض جديد</span>
        </h1>
      </a>
      <div className="BookNow_1">
        <div className="Add__sick">
          <div className="view">
            <div className="container">
              <div className="row">
                <div className="col-md-5 m-x-auto pull-xs-none all_card_1">
                  {/*Panel*/}
                  <div className="card card-block z-depth-5 white-text">
                    <a href="#" className="card-link white-text active">
                   إضافة مريض 
                    </a>
                 
                    <div className="md-form m-t-3">
                      الاسم الكامل 
                      <input type="text" id="form1" className="form-control" />
                 </div>
                    <div className="md-form">
                      العمر
                      <input type="number" id="form1" className="form-control" />
                
                    </div>
                    <div className="md-form">
                      رقم التيلفون
                      <input type="text" id="form1" className="form-control" />
                
                    </div>
                    <div className="text-xs-center">
                      <a href="#" className="btn btn-indigo">
                      إضافة 
                      </a>
                      <h5>
                        <a href="#" className="white-text">
                          Forgot password?
                        </a>
                      </h5>
                    </div>
                  </div>
                  {/*/.Panel*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookNow;
