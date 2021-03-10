import React from "react";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import i18n from "../../i18n";
import { NavLink } from "react-router-dom";
import { eventTracking } from "../../useTracking";

export function Footer() {
  const date = new Date();
  return (
    <footer>
      <div className="container">
        <span className="logo-and-social col">
          <div className="locoshop-logo">
            <img className="logo-footer" src="../images/Locoshop_logo_white.svg" alt="" />
          </div>
        </span>
        <span className="quick-links col">
          <p>{i18n.t("footer.quick links")}</p>
          <ul>
            <li>
              <NavLink className="link-footer" to="/home">
                {i18n.t("footer.home")}
              </NavLink>
            </li>
            <li>
              <NavLink className="link-footer" to="/about">
                {i18n.t("footer.about us")}
              </NavLink>
            </li>
          </ul>
        </span>
        <span className="customer-service col">
          <p>{i18n.t("footer.customer service")}</p>
          <ul>
            <li>
              <NavLink className="link-footer" to="/privacy">
                {i18n.t("footer.privacy")}
              </NavLink>
            </li>
            <li>
              <NavLink className="link-footer" to="/terms-agreement">
                {i18n.t("footer.terms of service")}
              </NavLink>
            </li>
            {/* <li>{i18n.t("footer.site map")}</li> */}
          </ul>
        </span>
        <div className="contact-info col">
          <span> 
            <p>{i18n.t("footer.contact info")}</p>
            <ul>
              {/* <li>
                <NavLink className="link-footer" to="/home">
                    <FontAwesomeIcon icon={faMapMarker} /> Locoshop.io
                </NavLink>
              </li> */}
              <li>
                <a className="link-footer" href='mailto:info@locoshop.io'>
                  {/* <FontAwesomeIcon icon={faMailBulk} /> */}
                  info@locoshop.io
                </a>
              </li>
            </ul>
          </span>
          <div className="logos">
            <a className='item-logo' href="https://www.linkedin.com/company/locoshop-io/" target="_blank" onClick={()=>{eventTracking({category:'website', action:'click', label:'linkedin'})}}>
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-network-logo linkedin"
              />
            </a>
            <a className='item-logo' href="https://www.facebook.com/locoshop.io/" target="_blank" onClick={()=>{eventTracking({category:'website', action:'click', label:'facebook'})}}>
              <FontAwesomeIcon
                icon={faFacebook}
                className="social-network-logo facebook"
              />
            </a>
            <a className='item-logo' href="https://www.instagram.com/locoshop.io/" target="_blank" onClick={()=>{eventTracking({category:'website', action:'click', label:'instagram'})}}>
              <FontAwesomeIcon
                icon={faInstagram}
                className="social-network-logo instagram"
              />
            </a>
            <a className='item-logo' href="https://twitter.com/locoshopio/" target="_blank" onClick={()=>{eventTracking({category:'website', action:'click', label:'twitter'})}}>
              <FontAwesomeIcon
                icon={faTwitter}
                className="social-network-logo twitter"
              />
            </a>
            <a className='item-logo' href="https://youtube.com" target="_blank" onClick={()=>{eventTracking({category:'website', action:'click', label:'youtube'})}}>
              <FontAwesomeIcon
                icon={faYoutube}
                className="social-network-logo youtube"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="copyrights">
        {i18n.t("footer.quebec-inc")}. {i18n.t("footer.all rights reserved")}. <br/> {i18n.t("footer.copyrigth-text")}.
      </div>
    </footer>
  );
}
