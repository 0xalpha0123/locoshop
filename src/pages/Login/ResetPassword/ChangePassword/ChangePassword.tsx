import React, { useState, useLayoutEffect } from "react";
import "./ChangePassword.scss";
import { Header } from "../../../../Components/Header";
import { Footer } from "../../../../Components/Footer";
import { useLocation, NavLink } from "react-router-dom";
import { PageTitle } from "../../../../Components/PageTitle";
import { useTranslation } from "react-i18next";
import { getFirestoreAuth } from "../../../../Helpers/Firebase";
import { PasswordValidation } from "../../../../types/RegistrationTypes";
import qs from "qs";
import { Helmet } from "react-helmet";

export function ChangePassword() {
  const location = useLocation();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordValidation, setpasswordValidation] = useState(
    new PasswordValidation()
  );
  const [userEmail, setUserEmail] = useState("");

  const [fatalError, setFatalError] = useState(null);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      const parsedQS = qs.parse(location.search);
      try {
        const userEmail = await getFirestoreAuth().verifyPasswordResetCode(
          parsedQS.oobCode.toString()
        );
        setUserEmail(userEmail);
      } catch (err) {
        setSucces(false);
        setFatalError(parseError(err.code));
      }
    })();
  }, [location.search]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const parsedQS = qs.parse(location.search);
        await getFirestoreAuth().confirmPasswordReset(
          parsedQS.oobCode.toString(),
          password
        );
        setSucces(true);
      } catch (err) {
        setSucces(false);
        setError(parseError(err.code));
      }
    }
  };

  const parseError = (errorCode: string): string => {
    const regex = /(\/).*/g;
    return regex.exec(errorCode)[0];
  };

  const isFormValid = (): boolean => {
    return passwordValidation.passwordHasValidLenght &&
      passwordValidation.passwordHasLowerCase &&
      passwordValidation.passwordHasUpperCase &&
      passwordValidation.passwordHasValidLenght &&
      passwordValidation.passwordsAreIdentical
      ? true
      : false;
  };

  const validatePassword = (password: string) => {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var length = password.length;

    password.match(lowerCaseLetters)
      ? (passwordValidation.passwordHasLowerCase = true)
      : (passwordValidation.passwordHasLowerCase = false);
    password.match(upperCaseLetters)
      ? (passwordValidation.passwordHasUpperCase = true)
      : (passwordValidation.passwordHasUpperCase = false);
    password.match(numbers)
      ? (passwordValidation.passwordHasNumber = true)
      : (passwordValidation.passwordHasNumber = false);
    length > 8
      ? (passwordValidation.passwordHasValidLenght = true)
      : (passwordValidation.passwordHasValidLenght = false);

    setpasswordValidation(passwordValidation);
    setPassword(password);
  };

  const validatePasswordConfirmation = (passwordConfirmation: string) => {
    passwordConfirmation === password
      ? (passwordValidation.passwordsAreIdentical = true)
      : (passwordValidation.passwordsAreIdentical = false);

    setpasswordValidation(passwordValidation);
    setPasswordConfirmation(passwordConfirmation);
  };

  return (
    <>
    <Helmet>
      <title>Change password</title>
    </Helmet>
      <Header />
      <div className="content">
        <PageTitle title={t("change-password.title")} subtitle={userEmail} />
        <div className={`change-password-entry-done ${succes.valueOf()}`}>
          <div>{t("change-password.success")}</div>
          <div>
            <NavLink to="/signin">
              {t("change-password.click to login")}
            </NavLink>
          </div>
        </div>
        <div className={`change-password-fatal-error ${fatalError}`}>
          {t(`change-password.${fatalError}`)}
        </div>
        <div
          className={`change-password ${succes.valueOf()} ${
            fatalError ? "invalid" : ""
          }`}
        >
          <div className={`error ${error}`}>
            {t(`change-password.${error}`)}
          </div>
          <form className="change-password-form" onSubmit={handleSubmit}>
            <label htmlFor="password">{t("change-password.password")}</label>
            <input
              className="password-input"
              id="password"
              name="password"
              type="password"
              placeholder={t(`change-password.password`)}
              onChange={(e) => validatePassword(e.target.value)}
            />
            <div className="password-rules">
              {t("register.password must contain")}
              <div
                className={`lowercase-valid ${passwordValidation.passwordHasLowerCase}`}
              >
                • {t("register.a lowercase character")}
              </div>
              <div
                className={`uppercase-valid ${passwordValidation.passwordHasUpperCase}`}
              >
                • {t("register.an uppercase character")}
              </div>
              <div
                className={`number-valid ${passwordValidation.passwordHasNumber}`}
              >
                • {t("register.a number")}
              </div>
              <div
                className={`lenght-valid ${passwordValidation.passwordHasValidLenght}`}
              >
                • {t("register.8 character minimum")}
              </div>
            </div>
            <label htmlFor="confirm-password">
              {t("change-password.confirm password")}
            </label>
            <input
              className="confirm-password-input"
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder={t(`change-password.confirm password`)}
              onChange={(e) => validatePasswordConfirmation(e.target.value)}
            />
            <button
              type="submit"
              className="change-password-button"
              disabled={!isFormValid()}
            >
              {t("change-password.submit")}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
