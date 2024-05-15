import logoImg from "./../../img/header/logo.png";
import header_btnImg from "./../../img/header/header_btn.png";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <img src={logoImg} alt="" />
          </div>

          <div className="header__nav">
            <ul>
              <li>
                <Link to="/">ГОЛОВНА</Link>
              </li>
              <li>
                <Link to="/statistics">СТАТИСТИКА </Link>
              </li>
              <li>
                <Link to="/recipes">РЕЦЕПТИ</Link>
              </li>
              <li>
                <a href="#!" className="header__nav-btn">
                  <img
                    className="header__nav-btn-img"
                    src={header_btnImg}
                    alt=""
                  />
                  ВХІД
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
