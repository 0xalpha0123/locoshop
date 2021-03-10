/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useContext } from "react";
import i18n from "../../i18n";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faBars,
  faUser,
  faSignOutAlt,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { ToggleLanguage } from "../Toggle/Language";
import { NavLink, useHistory } from "react-router-dom";
import { MenuBurger } from "../MenuBurger";
import { UserContext } from "../../Contexts/UserContext";
import { getFirestoreAuth } from "../../Helpers/Firebase";

const WIDTH_CHANGING = 1024;

export function Header() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("token")) setUserLogged(true);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logOut = async () => {
    localStorage.removeItem("token");
    getFirestoreAuth().signOut();
    setUser(null);
    history.push("/");
  };

  return (
    <header>
      <div className="nav-left">
        <div className="locoshop-logo logo">
          <NavLink to="/">
            <img className="logo-header" src="../../images/Locoshop_logo_white.svg" alt="" />
          </NavLink>
        </div>
        {width <= WIDTH_CHANGING ? (
          <MenuBurger open={open} setOpen={setOpen} />
        ) : (
          <div className="links">
            <NavLink activeClassName="active" className="link" to="/about">
              {i18n.t("header.about_us")}
            </NavLink>

            <NavLink activeClassName="active" className="link" to="/stores">
              {i18n.t("header.stores")}
            </NavLink>

            <NavLink
              activeClassName="active"
              className={`link login ${userLogged.valueOf()}`}
              to="/signin"
            >
              {i18n.t("header.sign_in")}
            </NavLink>
          </div>
        )}
      </div>
      <div className="nav-right">
        {width <= WIDTH_CHANGING ? (
          <>
            <div className="lang-switch">
              <ToggleLanguage />
            </div>

            <button
              id="burger"
              onClick={() => setOpen(true)}
              className="burger"
            >
              <FontAwesomeIcon icon={faBars} className="burger-icon" />
            </button>
          </>
        ) : (
          <>
              <div className='nav-right-buttons-wrap'>
                <NavLink
                  activeClassName="active"
                  className={`nav-right-button store-add-button link-get-loco connected-${userLogged.valueOf()}`}
                  to="/store-registration"
                >
                  <FontAwesomeIcon icon={faStore} className='nav-right-button-icon' />
                  {"  "}
                  <span className='nav-right-button-text'>
                    {i18n.t("header.get_store_loco")}
                  </span>
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className={`nav-right-button user-button connected-${userLogged.valueOf()}`}
                  to="/my-account"
                >
                  <FontAwesomeIcon icon={faStore} className='nav-right-button-icon' />
                  {"  "}
                  <span className='nav-right-button-text'>
                    {i18n.t("header.my_store")}
                  </span>
                </NavLink>
                <div
                  className={`nav-right-button log-out connected-${userLogged.valueOf()}`}
                  onClick={logOut}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className='nav-right-button-icon' />
                  {" "}
                  <span className='nav-right-button-text'>
                    {i18n.t("header.log_out")}
                  </span>
                </div>
              </div>
              <div className="lang-switch">
                <ToggleLanguage />
              </div>
            </>
          )}
      </div>
    </header>
  );
}
