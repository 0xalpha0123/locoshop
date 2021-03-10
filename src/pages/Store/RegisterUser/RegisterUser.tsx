import React, { useState, useEffect } from "react";
import axios from "axios";
import i18n from "../../../i18n";
import ReCAPTCHA from "react-google-recaptcha";
import { Header } from "../../../Components/Header";
import { Footer } from "../../../Components/Footer";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { FormValidation } from "../../../types/RegistrationTypes";
import { geocodeByPlaceId } from "react-places-autocomplete";
import { PageTitle } from "../../../Components/PageTitle";
import { PageLoading } from "../../../Components/PageLoading/PageLoading";
import "./RegisterUser.scss";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../Components/Button";
import { Helmet } from "react-helmet";

export function RegisterUser() {
  // const { placeid } = useParams();
  const location = useLocation();
  const [storeNameAndAddress, setStoreNameAndAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [reCaptcha, setReCaptcha] = useState(false);
  const [formValidation, setFormValidation] = useState(new FormValidation());
  const [placeIdGeodata, setPlaceIdGeoData] = useState<
    google.maps.GeocoderResult
  >(null);
  const [placeIdValidity, setPlaceIdValidity] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const parsedQS = qs.parse(location.search.slice(1));
      setStoreNameAndAddress(parsedQS.address.toString());
      try {
        const geodata: google.maps.GeocoderResult[] = await geocodeByPlaceId(
          parsedQS.placeId.toString()
        );
        setPlaceIdGeoData(geodata[0]);
        setPlaceIdValidity(true);
      } catch {
        setPlaceIdValidity(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function used when user clicks on submit button
  const handleSubmit = (evt: any = null) => {
    evt ? evt.preventDefault() : null;

    if (formValid()) {
      registerUser(email, password);
      formValidation.submitFormValidity = "valid";
    } else {
      formValidation.submitFormValidity = "invalid";
    }
    setFormValidation(formValidation);
  };

  // Calls the backend to add the new user to the database
  async function registerUser(email: string, password: string) {
    try {
      const databaseUser: any = await axios.post(
        `${process.env.API_ENDPOINT}/register/`,
        {
          email,
          password,
        }
      );

      formValidation.emailExisting = "valid";
      setFormValidation({ ...formValidation });
      try {
        await axios.post(`${process.env.API_ENDPOINT}/store/add`, {
          name: storeNameAndAddress.substr(0, storeNameAndAddress.indexOf(",")),
          owner_uid: databaseUser.data.uid,
          plan: "basic",
          ...placeIdGeodata,
        });
      } catch (err) {
        console.error("error message = ", err.message);
      }

      history.push(`/register/validation/${databaseUser.data.uid}`);
    } catch (err) {
      console.error("error message = ", err.message);
      formValidation.emailExisting = "invalid";
      setFormValidation({ ...formValidation });
    }
  }

  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(email);
    formValidation.emailValidity = re.test(String(email).toLowerCase());
    setFormValidation(formValidation);
  };

  const validatePassword = (password: string) => {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var length = password.length;

    password.match(lowerCaseLetters)
      ? (formValidation.passwordValidation.passwordHasLowerCase = true)
      : (formValidation.passwordValidation.passwordHasLowerCase = false);
    password.match(upperCaseLetters)
      ? (formValidation.passwordValidation.passwordHasUpperCase = true)
      : (formValidation.passwordValidation.passwordHasUpperCase = false);
    password.match(numbers)
      ? (formValidation.passwordValidation.passwordHasNumber = true)
      : (formValidation.passwordValidation.passwordHasNumber = false);
    length > 8
      ? (formValidation.passwordValidation.passwordHasValidLenght = true)
      : (formValidation.passwordValidation.passwordHasValidLenght = false);

    setFormValidation(formValidation);
    setPassword(password);
  };

  const validatePasswordConfirmation = (passwordConfirmation: string) => {
    passwordConfirmation === password
      ? (formValidation.passwordValidation.passwordsAreIdentical = true)
      : (formValidation.passwordValidation.passwordsAreIdentical = false);

    setFormValidation(formValidation);
    setPasswordConfirmation(passwordConfirmation);
  };

  const formValid = () => {
    return (
      formValidation.passwordValidation.passwordHasValidLenght &&
      formValidation.passwordValidation.passwordHasLowerCase &&
      formValidation.passwordValidation.passwordHasUpperCase &&
      formValidation.passwordValidation.passwordHasValidLenght &&
      formValidation.passwordValidation.passwordsAreIdentical &&
      reCaptcha &&
      formValidation.emailValidity &&
      formValidation.termsAndConditionsAgreed
    );
  };

  const getValidationIcon = (valid: boolean) => {
    return valid ? (
      <FontAwesomeIcon icon={faCheck} />
    ) : (
      <FontAwesomeIcon icon={faExclamationCircle} />
    );
  };

  const form = () => {
    return (
      <div className="register">
        <h1 className="store-title"> {storeNameAndAddress} </h1>

        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="email">{i18n.t("register.email address")}</label>
          <input
            className={
              email !== ""
                ? formValidation.emailValidity
                  ? "validEmail"
                  : "invalidEmail"
                : ""
            }
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => validateEmail(e.target.value)}
          />
          <label htmlFor="password">{i18n.t("register.password")}</label>
          <input
            className={
              password !== ""
                ? formValidation.passwordValidation.passwordHasUpperCase &&
                  formValidation.passwordValidation.passwordHasLowerCase &&
                  formValidation.passwordValidation.passwordHasNumber &&
                  formValidation.passwordValidation.passwordHasValidLenght
                  ? "validPassword"
                  : "invalidPassword"
                : ""
            }
            id="password"
            name="password"
            type="password"
            placeholder={i18n.t("register.password")}
            onChange={(e) => validatePassword(e.target.value)}
          />
          <label htmlFor="confirm-password">
            {i18n.t("register.confirm password")}
          </label>
          <input
            className={
              passwordConfirmation !== ""
                ? formValidation.passwordValidation.passwordsAreIdentical
                  ? "validPasswordConfirmation"
                  : "invalidPasswordConfirmation"
                : ""
            }
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder={i18n.t("register.confirm password")}
            onChange={(e) => validatePasswordConfirmation(e.target.value)}
          />

          <div className="password-rules">
            <span className="password-rules-description">
              {" "}
              *{i18n.t("register.password must contain")}{" "}
            </span>
            <div
              className={`password-rules-item lowercase-valid ${formValidation.passwordValidation.passwordHasLowerCase}`}
            >
              {getValidationIcon(
                formValidation.passwordValidation.passwordHasLowerCase
              )}{" "}
              {i18n.t("register.a lowercase character")}
            </div>
            <div
              className={`password-rules-item uppercase-valid ${formValidation.passwordValidation.passwordHasUpperCase}`}
            >
              {getValidationIcon(
                formValidation.passwordValidation.passwordHasUpperCase
              )}{" "}
              {i18n.t("register.an uppercase character")}
            </div>
            <div
              className={`password-rules-item number-valid ${formValidation.passwordValidation.passwordHasNumber}`}
            >
              {getValidationIcon(
                formValidation.passwordValidation.passwordHasNumber
              )}{" "}
              {i18n.t("register.a number")}
            </div>
            <div
              className={`password-rules-item lenght-valid ${formValidation.passwordValidation.passwordHasValidLenght}`}
            >
              {getValidationIcon(
                formValidation.passwordValidation.passwordHasValidLenght
              )}{" "}
              {i18n.t("register.8 character minimum")}
            </div>
            <div
              className={`password-rules-item lenght-valid ${formValidation.passwordValidation.passwordsAreIdentical}`}
            >
              {getValidationIcon(
                formValidation.passwordValidation.passwordsAreIdentical
              )}{" "}
              {i18n.t("register.identical password")}
            </div>
          </div>

          <div className="terms-checkbox">
            <label className="container">
              <input
                name="isGoing"
                type="checkbox"
                checked={formValidation.termsAndConditionsAgreed}
                onChange={() => {
                  formValidation.termsAndConditionsAgreed = !formValidation.termsAndConditionsAgreed;
                  setFormValidation({ ...formValidation });
                }}
              />
              {i18n.t("register.agree terms")} (
              <NavLink className="link-footer" to="/terms-agreement">
                {i18n.t("register.read here")})
              </NavLink>
            </label>
          </div>

          <div className="recaptcha">
            <ReCAPTCHA
              sitekey="6LfI1EwaAAAAADZsSlRO-O0mgdX1-_5TkMbxz0EQ"
              onChange={() => {
                setReCaptcha(!reCaptcha);
              }}
              hl={i18n.language}
            />
          </div>

          <div className={`invalid-form ${formValidation.submitFormValidity}`}>
            {i18n.t("register.invalid form")}
          </div>
          <div className={`email-already-used ${formValidation.emailExisting}`}>
            {i18n.t("register.email used")}
          </div>

          <Button
            text={i18n.t("register.submit")}
            icon={faArrowRight}
            onClickHandler={() => {
              handleSubmit();
            }}
            disabled={!formValid()}
          />
        </form>
      </div>
    );
  };

  const invalidPlaceId = () => {
    return (
      <div className="placeid-invalid">
        Sorry an error occured, the Google Place Id is not valid
      </div>
    );
  };

  return (
    <>
    <Helmet>
      <title>Create Account</title>
    </Helmet>
    <div>
      <Header />
      <div className="content">
        {placeIdGeodata !== null ? (
          placeIdValidity ? (
            <>
              <PageTitle
                title={i18n.t("register.create account address")}
                subtitle={placeIdGeodata.formatted_address}
                imgSource=""
              ></PageTitle>
              {form()}
            </>
          ) : (
            invalidPlaceId()
          )
        ) : (
          <PageLoading />
        )}
      </div>
      <Footer />
    </div>
    </>
  );
}
