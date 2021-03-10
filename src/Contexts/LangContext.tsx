import i18n from "../i18n";
import React from "react";

interface ILang {
  lang: string;
  setLang: (lang: string) => void;
}

const defaultValue: ILang = {
  lang: i18n.language,
  setLang: (lang: string) => {},
};

export const LangContext = React.createContext<ILang>(defaultValue);
