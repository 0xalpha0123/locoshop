import React, { useState } from "react";
import "./ResetPassword.scss";
import i18n from "../../../i18n";
import { toast, ToastOptions } from "react-toastify";
import { Header } from "../../../Components/Header";
import { Footer } from "../../../Components/Footer";
import { PageTitle } from "../../../Components/PageTitle";
import { useTranslation } from "react-i18next";
import { getFirestoreAuth } from "../../../Helpers/Firebase";
import { Button } from "../../../Components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

export function ResetPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);

  // qs.parse(props);

  const toastId = React.useRef(null);

  const handleSubmit = async (event: any) => {
    event ? event.preventDefault() : null;
    try {
      await getFirestoreAuth().sendPasswordResetEmail(email);
      notify("sucess", `${t("reset-password.done")}`);
      setSucces(true);
    } catch (err) {
      console.error(err);
      const regex = /(\/).*/g;
      setError(regex.exec(err.code)[0]);
      setSucces(false);
      notify("error", `${t("reset-password." + regex.exec(err.code)[0])}`);
    }
  };

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
      <Helmet><title>Reset password</title></Helmet>
      <Header />
      <div className="content">
        <PageTitle title={i18n.t("reset-password.title")} />
        <div className={`email-entry-done ${succes.valueOf()}`}>
          {i18n.t("reset-password.success")}
        </div>
        <div className={`reset-password ${succes.valueOf()}`}>
          <div className={`error ${error}`}>{t(`reset-password.${error}`)}</div>
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <label className="reset-password-form-label" htmlFor="email">
              {t("reset-password.email")}
            </label>
            <input
              className="email-input"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              text={t("reset-password.submit")}
              onClickHandler={handleSubmit}
              icon={faArrowRight}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
