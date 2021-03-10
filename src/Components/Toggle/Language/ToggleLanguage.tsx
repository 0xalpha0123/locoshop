import React, { useContext } from "react";
import "./ToggleLanguage.scss";
import { getI18n } from "react-i18next";
import { LangContext } from "../../../Contexts/LangContext";

const ToggleLanguage = React.memo(() => {
  const french = "fr";
  const english = "en";
  const { lang, setLang } = useContext(LangContext);
  function switchLanguage(lang: string) {
    setLang(lang);
    getI18n().changeLanguage(lang);
  }

  function Button(props: { lang: string }) {
    let activeClass = lang == props.lang ? "active" : "";

    return (
      <div
        role="button"
        className={`button button-${props.lang} ${activeClass}`}
        onClick={(e) => switchLanguage(props.lang)}
      >
        {props.lang}
      </div>
    );
  }

  return (
    <div className={`toggle-lang lang-${lang}`}>
      <Button lang="en" />
      <span className="divisor">|</span>
      <Button lang="fr" />
    </div>
  );
});

export default ToggleLanguage;
