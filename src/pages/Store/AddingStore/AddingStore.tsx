import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import i18n from "../../../i18n";
import { Header } from "../../../Components/Header";
import { Footer } from "../../../Components/Footer";

import "./AddingStore.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PageLoading } from "../../../Components/PageLoading";
import { PageTitle } from "../../../Components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faStar,
  faAddressCard,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../Components/Button";
import { Helmet } from "react-helmet";

export function AddingStore() {
  const [placeId, setPlaceId] = useState("");
  const [geoplace, setGeoplace] = useState<google.maps.GeocoderResult>(null);
  const [geoplaceStatus, setGeoplaceStatus] = useState("not_found");
  const [plans, setPlans] = useState(Array<any>());
  const [selectedPlan, setSeletedPlan] = useState(null);

  const [placeIdExisting, setPlaceIdExisting] = useState(Object);

  const [address, setAddress] = useState("");

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.API_ENDPOINT}/register/plans`);
      setPlans(res.data);
      setSeletedPlan(res.data.find((p: any) => p.id === "basic"));
      // setPlans(await axios.get(`${process.env.API_ENDPOINT}/register/plans`));
    })();
  }, []);

  function routeToRegister() {
    history.push("/register?placeId=" + placeId + "&address=" + address);
  }

  async function setStoreAlreadyExisting(placeId: string) {
    if (placeId) {
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/store/get/${placeId}`
      );
      setPlaceIdExisting({ [placeId]: res.data });
    }
  }

  function ValidPlaceID() {
    return (
      <div className="place valid">
        <div className="content-wrapper">
          <div className="title">{i18n.t("add-store.name_store_entered")}</div>
          <div className="place-address">
            {address.substr(0, address.indexOf(","))}
          </div>
        </div>

        <div className="content-wrapper">
          <div className="title">{i18n.t("add-store.address entered")}</div>
          <div className="place-address">{geoplace.formatted_address}</div>
        </div>

        <div className="place-type-tags">
          {geoplace.types.map((value, key) => {
            let placetype: string[] = [];
            value
              .toLowerCase()
              .split("_")
              .forEach((place, index) => {
                placetype[index] = place[0].toUpperCase() + place.slice(1);
              });
            return (
              <span key={key} className="type-tag">
                {placetype.join(" ")}
              </span>
            );
          })}
        </div>
        {placeIdExisting[placeId] ? (
          <div className="already-exist-store">
            {i18n.t("add-store.already-exist-store")}
          </div>
        ) : (
          <Button
            text={i18n.t("add-store.continue with this address")}
            icon={faArrowRight}
            onClickHandler={routeToRegister}
          ></Button>
        )}
      </div>
    );
  }

  function InvalidPlaceID() {
    return (
      <div className="place invalid">
        {i18n.t("add-store.sorry wrong place id")}
      </div>
    );
  }

  const handleStoreSelect = async (input: string) => {
    setAddress(input);
    try {
      const resGeoplace = await geocodeByAddress(input);
      setGeoplace(await resGeoplace[0]);
      setGeoplaceStatus("found");
      setPlaceId(resGeoplace[0].place_id);
      setStoreAlreadyExisting(resGeoplace[0].place_id);
    } catch (err) {
      console.error("erreur =", err);
      setGeoplace(null);
      setGeoplaceStatus("not_found");
    }
  };

  const selectPlan = (plan: any) => {
    setSeletedPlan(plan);
    let inputElement: HTMLInputElement = document.querySelector(
      ".location-search-input"
    );
    inputElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    inputElement.focus();
  };

  const registerStore = () => {};

  return (
    <>
      <Helmet>
        <title>{i18n.t("add-store.title")}</title>
        <meta name="description" content={i18n.t("add-store.title")} />
      </Helmet>
      <Header />
      <div className="content">
        <PageTitle
          title={i18n.t("add-store.title")}
          subtitle={i18n.t("add-store.subtitle")}
        ></PageTitle>
        <div className="price-table-wrapper">
          <h1 className="section-title">
            {i18n.t("add-store.choose-subscription")}
          </h1>
          <p className="price-table-wrapper-description">
            {i18n.t("add-store.choose-description")}
          </p>

          {plans.length > 0 ? (
            plans.map((value, key) => {
              return (
                <div
                  className={`pricing-table
                    ${value.id === "basic" ? "featured-table" : ""}
                    ${value.id === "basic" ? "enabled" : "disabled"}
                    `}
                  key={key}
                  onClick={() =>
                    value.id === "basic" ? selectPlan(value) : null
                  }
                >
                  {value.monthlyPrice === 0 ? (
                    <div className="pricing-table__free-sign">
                      {i18n.t("add-store.free")}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="pricing-table__icon">
                    <FontAwesomeIcon
                      icon={value.id === "basic" ? faCheck : faStar}
                    ></FontAwesomeIcon>
                  </div>

                  <h2 className="pricing-table__header">{value.label} </h2>

                  {value.monthlyPriceDisplay ? (
                    <h3 className="pricing-table__price">
                      {value.monthlyPriceDisplay}
                    </h3>
                  ) : (
                    ""
                  )}

                  <ul className="pricing-table__list">
                    {/* check if string exists to avoid strange strings */}
                    {i18n.exists(`add-store.${value.id}-text-1`) ? (
                      <li className="princing-table-detail">
                        {/* {`${i18n.t("add-store." + value.numberOfProducts)} ${i18n.t("add-store.products listing")}`} */}
                        {`${i18n.t(`add-store.${value.id}-text-1`)} `}
                      </li>
                    ) : (
                      <></>
                    )}

                    {i18n.exists(`add-store.${value.id}-text-2`) ? (
                      <li className="princing-table-detail">
                        {/* {`${i18n.t("add-store." + value.storeProfilePage)} ${i18n.t("add-store.store display page")}`} */}
                        {`${i18n.t(`add-store.${value.id}-text-2`)}`}
                      </li>
                    ) : (
                      <></>
                    )}

                    {i18n.exists(`add-store.${value.id}-text-3`) ? (
                      <li className="princing-table-detail">
                        {/* {`${i18n.t("add-store." + value.productUpdates)} ${i18n.t("add-store.product updates")}`} */}
                        {`${i18n.t(`add-store.${value.id}-text-3`)}`}
                      </li>
                    ) : (
                      <></>
                    )}

                    {i18n.exists(`add-store.${value.id}-text-4`) ? (
                      <li className="princing-table-detail">
                        {/* {`${i18n.t("add-store." + value.productSearch)} ${i18n.t("add-store.product search")}`} */}
                        {`${i18n.t(`add-store.${value.id}-text-4`)}`}
                      </li>
                    ) : (
                      <></>
                    )}

                    {i18n.exists(`add-store.${value.id}-text-5`) ? (
                      <li className="princing-table-detail">
                        {/* {`${i18n.t("add-store." + value.rankByDistance)} ${i18n.t("add-store.distance ranking")}`} */}
                        {`${i18n.t(`add-store.${value.id}-text-5`)}`}
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>

                  {value.id === "basic" ? (
                    <Button
                      text={i18n.t("add-store.selected")}
                      icon={faCheck}
                      additionalClass="active"
                    ></Button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <PageLoading />
          )}
        </div>

        <div className="place-wrapper">
          <div className="place-wrapper-icon">
            <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
          </div>

          <div className="section-title">{i18n.t("add-store.join loco")}</div>

          <div className="placeid">
            <form onSubmit={registerStore} className="placeid-form">
              <label htmlFor="place-id">
                {i18n.t("add-store.enter store")}
              </label>
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleStoreSelect}
                searchOptions={{ types: ["establishment"] }}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: i18n.t("add-store.enter address"),
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>{i18n.t("add-store.loading")}</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </form>
            {geoplace && geoplaceStatus === "found" && <ValidPlaceID />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
