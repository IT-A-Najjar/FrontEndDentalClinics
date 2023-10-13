import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../../assets/logo.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Header() {
  const privilege = sessionStorage.getItem("privilege");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState(null);

  useEffect(() => {
    // استعادة الحالة المحفوظة من localStorage عند تحديث الصفحة
    const savedActiveNavLink = localStorage.getItem("activeNavLink");
    if (savedActiveNavLink !== null) {
      setActiveNavLink(parseInt(savedActiveNavLink, 10));
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = (index) => {
    setActiveNavLink(index);
    setIsNavOpen(false);
    // حفظ الحالة في localStorage
    localStorage.setItem("activeNavLink", index.toString());
  };

  const handleLogout = async() => {
    // حذف البيانات من التخزين
    sessionStorage.removeItem("privilege");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("photo");
   await axios.get("http://127.0.0.1:8000/api/logout").then((res) => {
    if (res.status === 200) {
      toast.success('تم تسجيل الخروج بنجاح \n سيتم تحويلك الى الصفحة الرئيسية')
      setTimeout(() => {
        window.location.href = '/'
      }, 5000)
    }

  }).catch((err) => {

     })
  };

  return (
    <nav className={`nav__header ${isNavOpen ? "open" : ""}`}>
      <ToastContainer />
      <div className="nav__toggle" onClick={toggleNav}>
        <i className={`bx ${isNavOpen ? "bx-x" : "bx-menu"}`}></i>
      </div>
      <div className="nav__logo">
        <a href="/">
          <img src={Logo} alt="Logo" onClick={() => handleNavLinkClick(9)} />
        </a>
      </div>
      <div className="nav__link">
        <ul className={`nav__ul ${isNavOpen ? "open" : ""}`}>
          <li>
            {privilege == null ? (
              <a
                href="/login"
                className={`li__login ${activeNavLink === 0 ? "Link__a" : ""
                  }`}
                onClick={() => handleNavLinkClick(0)}
              >
                تسجيل الدخول <i className="bx bx-log-in"></i>
              </a>
            ) : (
              <a
                href="/"
                onClick={handleLogout}
                className={`li__login ${activeNavLink === 0 ? "Link__a" : ""
                  }`}
              >
                تسجيل الخروج <i className="bx bx-log-out"></i>
              </a>
            )}
          </li>
          <li>
            <a
              href="/Business"
              className={`li__business ${activeNavLink === 1 ? "Link__a" : ""
                }`}
              onClick={() => handleNavLinkClick(1)}
            >
              الأعمال <i className="bx bx-user-pin"></i>
            </a>
          </li>
          <li>
            <a
              href="/Consultation"
              className={`li__consulation ${activeNavLink === 2 ? "Link__a" : ""
                }`}
              onClick={() => handleNavLinkClick(2)}
            >
              الإستفسارات <i className="bx bxs-quote-alt-right bx_q"></i>
            </a>
          </li>

          <li>
            <a
              href="/infoPatient"
              className={`li__info ${activeNavLink === 3 ? "Link__a" : ""
                }`}
              onClick={() => handleNavLinkClick(3)}
            >
              معلومات المريض <i className="bx bx-info-circle"></i>
            </a>
          </li>
          {privilege == null ? null : (
            <li>
              <a
                href="/Landing_Dash"
                className={`li__dash ${activeNavLink === 4 ? "Link__a" : ""
                  }`}
                onClick={() => handleNavLinkClick(4)}
              >
                لوحة القيادة <i className='bx bxs-dashboard'></i>
              </a>
            </li>)
          }
        </ul>

      </div>
    </nav>
  );
}

export default Header;
