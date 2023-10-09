import React from "react";
import "./Totalillneesese.css";
function Totalillneeses() {
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
                376
              </strong>
              <span className="Ihsa">حالات المعالجة</span>
            </div>
            <div class="text">
              <strong class="number" data-number="374">
                374
              </strong>
              <span className="Ihsa">عدد المرضى</span>
            </div>
            <div class="text">
              <strong class="number" data-number="28">
                28
              </strong>
              <span className="Ihsa">عدد الأطباء</span>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="ftco-section ftco-counter img" id="section-counter" style={bg}>
    <div class="container">
        <div class="row d-flex align-items-center">
            <div class="col-md-3 aside-stretch py-5">
                <div class="heading-section heading-section-white ftco-animate pr-md-4 fadeInUp ftco-animated">
                    <h2 class="mb-4">الاحصائيات</h2>
                    <p>احصائيات المرضى الذين تم العمل عليهم</p>
                </div>
            </div>
            <div class="col-md-9 py-5 pl-md-5">
                <div class="row">
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate fadeInUp ftco-animated">
                        <div class="block-18">
                            <div class="text">
                                <strong class="number" data-number="376">376</strong>
                                <span>حالات المعالجة</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate fadeInUp ftco-animated">
                        <div class="block-18">
                            <div class="text">
                                <strong class="number" data-number="374">374</strong>
                                <span>عدد المرضى</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate fadeInUp ftco-animated">
                        <div class="block-18">
                            <div class="text">
                                <strong class="number" data-number="28">28</strong>
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
