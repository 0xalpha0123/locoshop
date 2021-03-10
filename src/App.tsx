import React, { useState } from "react";
import Routes from "./Routes";
import "./App.scss";
import i18n from "./i18n";
import { LangContext } from "./Contexts/LangContext";
import { UserContext } from "./Contexts/UserContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ArrowToTop } from "./Components/ArrowToTop";

function App() {
  const [lang, setLang] = useState(i18n.language);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  axios.defaults.headers.common["Authorization"] = token;

  return (
    <div className="App">
      <ToastContainer />
      <LangContext.Provider value={{ lang, setLang }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ArrowToTop/>
          <Routes />
        </UserContext.Provider>
      </LangContext.Provider>
    </div>
  );
}

export default App;
