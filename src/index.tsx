import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import "../public/fonts/Cairo-Regular.ttf";

ReactDOM.render(
  <Suspense fallback={<div> Loading </div>}>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVrWLdQVaQ8kfrfr1hzD29T9VzQbMx81Y&libraries=places" />
    <App />
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
