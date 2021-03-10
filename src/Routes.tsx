import React from "react";
import {
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { AddingStore } from "./pages/Store/AddingStore";
import { Brand } from "./pages/Brand";
import { AddingBrand } from "./pages/Brand/AddingBrand";
import { MyAccount } from "./pages/MyAccount";
import { Product } from "./pages/Product";
import { EmailConfirmation } from "./pages/EmailConfirmation/EmailConfirmation";
import { RegisterUser } from "./pages/Store/RegisterUser/RegisterUser";
import { RegistrationDone } from "./pages/Store/RegistrationDone/RegistrationDone";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { ResetPassword } from "./pages/Login/ResetPassword/ResetPassword";
import { ChangePassword } from "./pages/Login/ResetPassword/ChangePassword/ChangePassword";
import { Stores } from "./pages/Stores";
import { Privacy } from "./pages/Privacy";
import { TermsAgreement } from "./pages/TermsAgreement";
import ReactGA from "react-ga";

//Google analytics
ReactGA.initialize('G-WRWK40TSKZ');
const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.pageview(location.pathname);
});

export default function Routes() {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/store/:storeid" component={Store} />
        <Route exact path="/store-registration" component={AddingStore} />
        <Route exact path="/brand" component={Brand} />
        <Route exact path="/brand-registration" component={AddingBrand} />
        <Route exact path="/my-account" component={MyAccount} />
        <Route path="/product/:productid" component={Product} />
        <Route path="/brand/:name" component={Brand} />
        <Route path="/register/validation/:uid" component={EmailConfirmation} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/registration/:state" component={RegistrationDone} />
        <Route path="/signin" component={Login} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/changepassword/action" component={ChangePassword} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms-agreement" component={TermsAgreement} />
        <Redirect to="/home" from="/" />
        <Route path="*" component={Home} />
      </Switch>
    </Router>
  );
}
