/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useLayoutEffect } from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import i18n from "../../i18n";

import "./MenuBurger.scss";

interface IMenuBurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MenuBurger({ open, setOpen }: IMenuBurgerProps) {

  const [userLogged, setUserLogged] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("token")) setUserLogged(true);
  }, []);

  function close(e: React.MouseEvent) {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <div className={cx("overlay", open && "open")}>
      {open && (
        <>
          <a href="" className="closebtn" onClick={(e) => close(e)}>
            &times;
          </a>
          {/** todo */}
          <div className="overlay-content">
            <NavLink activeClassName="active" className="link" to="/about">
              {i18n.t("header.about_us")}
            </NavLink>

            <NavLink activeClassName="active" className="link" to="/stores">
              {i18n.t("header.stores")}
            </NavLink>

            <NavLink activeClassName="active" className="link" to="/my-account">
              { userLogged ? i18n.t("header.my_store") : i18n.t("header.sign_in")}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
