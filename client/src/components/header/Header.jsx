import logoImg from "./../../img/header/logo.png";
import header_btnImg from "./../../img/header/header_btn.png";
import "./header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../context";

function Header() {
    const { profile } = useContext(ProfileContext);
    return (
        <header className="header">
            <div className="container">
                <div className="header__row">
                    <div className="header__logo">
                        <img src={logoImg} alt="" />
                    </div>
                    {profile && (
                        <div className="header__nav">
                            <ul>
                                <li>
                                    <Link to="/">ГОЛОВНА</Link>
                                </li>
                                <li>
                                    <Link to="/statistics">ЗВІТ</Link>
                                </li>
                                <li>
                                    <Link to="/directory">ДОВІДНИК</Link>
                                </li>
                                <li>
                                    <Link
                                        className="header__nav-btn"
                                        to="/profile"
                                    >
                                        <img
                                            className="header__nav-btn-img"
                                            src={header_btnImg}
                                            alt=""
                                        />
                                        {profile.name}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Header;
