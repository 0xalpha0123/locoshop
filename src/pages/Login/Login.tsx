import React, { useState, useContext } from "react";
import "./Login.scss";
import i18n from "../../i18n";
import { toast, ToastOptions } from "react-toastify";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { NavLink, useHistory } from "react-router-dom";
import { PageTitle } from "../../Components/PageTitle";
import { useTranslation } from "react-i18next";
import { getFirestoreAuth } from "../../Helpers/Firebase";
import { UserContext } from "../../Contexts/UserContext";
import { Button } from "../../Components/Button";
import { faArrowRight, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

export function Login() {
  const { user, setUser } = useContext(UserContext);

  const { t } = useTranslation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toastId = React.useRef(null);

  const handleSubmit = async (event: any) => {
    event ? event.preventDefault() : null;
    await signInUser();
  };

  async function signInUser(): Promise<void> {
    try {
      const userRes = await getFirestoreAuth().signInWithEmailAndPassword(
        email,
        password
      );

      localStorage.setItem("token", await userRes.user.getIdToken());
      localStorage.setItem("user", JSON.stringify(userRes.user));
      setUser((await userRes).user);
      notify("success", "Login Successful!");
      history.push("/my-account");

      //check if user has verified his email
      if (!userRes.user.emailVerified) {
        notify("warning", `${t("login.please verify email")}`);
      }
    } catch (err) {
      console.log(err);
      const regex = /(\/).*/g;
      setError(regex.exec(err.code)[0]);
      notify("error", `${t("login." + regex.exec(err.code)[0])}`);
    }
  }

  const notify = (type: string, message: string) => {
    const config: ToastOptions = {
      position: "bottom-center",
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: 1,
    };
    if (type === "error") {
      toastId.current = toast.error(t(message), config);
    } else if (type === "success") {
      toastId.current = toast.success(t(message), {
        ...config,
        progress: undefined,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Helmet><title>{i18n.t("login.title")}</title></Helmet>
      <Header />
      <div className="content">
        <PageTitle title={i18n.t("login.title")} />
        <div className="login">
          <div className={`error ${error}`}>{t(`login.${error}`)}</div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className={`input-wrapper ${email ? "active" : ""}`}>
              <FontAwesomeIcon className="input-icon" icon={faUser} />
              <label className="input-label" htmlFor="email">
                {t("login.email")}
              </label>
              <input
                className="email-input"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={`input-wrapper ${password ? "active" : ""}`}>
              <FontAwesomeIcon className="input-icon" icon={faKey} />
              <label className="input-label" htmlFor="password">
                {t("login.password")}
              </label>
              <input
                className="password-input"
                id="password"
                name="password"
                type="password"
                placeholder={t("login.password")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              text={t("login.submit")}
              onClickHandler={handleSubmit}
              icon={faArrowRight}
            />
          </form>
          <NavLink
            activeClassName="active"
            className="password-recovery"
            to="/resetpassword"
          >
            {t("login.forgot password")}
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
}
