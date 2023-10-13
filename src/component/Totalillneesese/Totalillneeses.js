import React from "react";
import "./Totalillneesese.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Totalillneeses() {
  const [count, setCount] = useState(0);
  const [countpatient, setCountpatient] = useState(0);
  const [countstate, setCountstates] = useState(0);
  useEffect(() => {
    getcountuser();
    getcountpatient();
    getcountstates();
  }, []);
  const getcountuser = async () => {
    await axios.get("http://127.0.0.1:8000/api/getcountUser").then((res) => {
      setCount(res.data.countuser);
    }).catch((err) => {
      console.log(err);
    }
    )
  }
  const getcountpatient = async () => {
    await axios.get("http://127.0.0.1:8000/api/countpatient").then((res) => {
      setCountpatient(res.data.countpatient);
    }).catch((err) => {
      console.log(err);
    }
    )
  }
  const getcountstates = async () => {
    await axios.get("http://127.0.0.1:8000/api/countstate").then((res) => {
      setCountstates(res.data.countstate);
    }).catch((err) => {
      console.log(err);
    }
    )
  }

  return (
    <div>
      <section className="section-1">
        <div className="container">
          <div className="heading">
            <h1>الإحصائيات</h1>
            <p>المرضى الذين تم العمل عليهم</p>
          </div>
          <div className="block">
            <div class="text">
              <strong class="number" data-number="376">
                {countstate}
              </strong>
              <span className="Ihsa">حالات المعالجة</span>
            </div>
            <div class="text">
              <strong class="number" data-number="374">
                {countpatient}
              </strong>
              <span className="Ihsa">عدد المرضى</span>
            </div>
            <div class="text">
              <strong class="number" data-number="28">
               {count}
              </strong>
              <span className="Ihsa">عدد الأطباء</span>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="ftco-section ftco-counter section-1 img" id="section-counter" data-stellar-background-ratio="0.5">
        <div class="container">
          <div class="row d-flex align-items-center container">
            <div class="col-md-3 aside-stretch py-5">
              <div class=" heading-section heading-section-white ftco-animate pr-md-4">
                <h2 class="mb-3">الاحصائيات</h2>
                <p>احصائيات المرضى الذين تم العمل عليهم</p>
              </div>
            </div>
            <div class="col-md-9 py-5 pl-md-5">
              <div class="row">
                <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div class="block-18">
                    <div class="text">
                      <strong class="number" data-number="{{count($preview)}}">0</strong>
                      <span>حالات المعالجة</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div class="block-18">
                    <div class="text">
                      <strong class="number" data-number="{{count($sick)}}">0</strong>
                      <span>عدد المرضى</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div class="block-18">
                    <div class="text">
                      <strong class="number" data-number="{{count($doctor)}}">0</strong>
                      <span>عدد الأطباء</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Totalillneeses;
