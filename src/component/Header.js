import React from "react";
import "./Header.css";

import Logo from "../assets/logo.webp";
function Header() {
    return (
        <>
            <div>
                <nav className="nav__header">
                    <div className="nav__link">
                        <ul className="nav__ul">
                            <li>
                                <a>
                                    <i class="bx bx-log-in"></i>SingIn{" "}
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i class="bx bx-user-pin"></i>About Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="nav__logo">
                        <img src={Logo} />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
