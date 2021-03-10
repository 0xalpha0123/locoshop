import React, { useEffect, useState } from "react";
import axios from "axios";
import i18n from "../../i18n";
import "./EmailConfirmation.scss";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../Components/Button";
import { Helmet } from "react-helmet";

export function EmailConfirmation() {
  const [userEmailValidated, setUserEmailValidated] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  const { uid } = useParams() as {
    uid: string;
  };

  useEffect(() => {
    (async () => {
      const registered = async () => {
        let userData = await axios.get(
          `${process.env.API_ENDPOINT}/register/validation/${uid}`
        );
        setRegisteredUser(userData.data);
      };
      try {
        await registered();
        setUserEmailValidated(true);
      } catch (err) {
        setUserEmailValidated(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMessage = (result: boolean) => {
    return (
      <div
        className={`email-validation-wrapper ${
          result ? "userEmailValidated" : "userEmailNotValid"
        }`}
      >
        <div className="icon-wrapper">
          <div className="icon">
            <FontAwesomeIcon icon={result ? faThumbsUp : faThumbsDown} />
          </div>
          <div className="icon-shadow"></div>
        </div>

        <span className="mail-respose">
          {result
            ? i18n.t("register-validation.sucess")
            : i18n.t("register-validation.fail")}
        </span>

        {result ? (
          <span className="mail-description">
            {i18n.t("register-validation.account-created")} <br />
            <strong>{registeredUser.email}</strong>{" "}
            {i18n.t("register-validation.is-verified")}.
          </span>
        ) : (
          <span className="mail-description">
            {i18n.t("register-validation.fail-message")}
          </span>
        )}

        <span className="mail-navigation">
          <Button
            text={i18n.t("register-validation.return-to-home")}
            icon={faArrowRight}
            route="/"
          ></Button>
        </span>
      </div>
    );
  };

  return (
    <>
    <Helmet>
      <title>Email confirmation</title>
    </Helmet>
    <div>
      <Header />
      <div className="email-validation">
        {renderMessage(registeredUser && userEmailValidated)}
      </div>
      <Footer />
    </div>
    </>
  );
}
