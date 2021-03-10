import React, { useEffect, useState } from "react";
import axios from "axios";
import i18n from "../../i18n";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";

import "./Stores.scss";
import { PageTitle } from "../../Components/PageTitle";
import { PageLoading } from "../../Components/PageLoading";
import { StoreType } from "../../types/store";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { VisitedStores } from "../../Helpers/VisitedStores";
import { Helmet } from "react-helmet";

export function Stores() {
  const [stores, setStores] = useState();
  const [storesExemples, setStoresExemples] = useState(new Array<StoreType>());
  const [isVisitedStores, setIsVisitedStores] = useState(false);
  const [value, setValue] = useState("");

  const history = useHistory();

  const changeUrl = function (item: StoreType) {
    history.push("/store/" + item.place_id);
  };

  const createVisitedStores = (stores: StoreType[]) => {
    //if there are visited stores, show it
    if (VisitedStores.get().length > 0) {
      setStoresExemples(VisitedStores.get());
      setIsVisitedStores(true);
      return false;
    }

    //if dont, create 4 suggestions
    let exemples: StoreType[] = [];

    while (exemples.length < 4) {
      let randomNumber = Math.floor(Math.random() * stores.length);
      !exemples.includes(stores[randomNumber])
        ? exemples.push(stores[randomNumber])
        : null;
    }
    setStoresExemples(exemples);
  };

  const matchStoreToTerm = function (store: StoreType, value: string) {
    return (
      store.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      store.formatted_address.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  };

  useEffect(() => {
    const getStores = async () => {
      const result = await axios(`${process.env.API_ENDPOINT}/store/get`);
      await setStores(result.data);
      await createVisitedStores(result.data);
    };
    getStores();
  }, []);

  const renderStores = (stores: Array<StoreType>) => {
    return (
      <div className="store-content">
        <div className="store-search">
          <div className="store-message">{i18n.t("stores.message")}</div>
          <Autocomplete
            getItemValue={(item) => item.name}
            items={stores}
            inputProps={{
              id: "store-autocomplete",
              placeholder: i18n.t("stores.search"),
            }}
            wrapperStyle={{ display: "block" }}
            renderItem={(item, isHighlighted) => (
              <div
                key={item.place_id}
                className="menu-autocomplete"
                style={{
                  background: isHighlighted ? "lightgray" : "whitesmoke",
                }}
              >
                <span className="store-name">{item.name}</span>
                {" - " + item.formatted_address}
              </div>
            )}
            shouldItemRender={matchStoreToTerm}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSelect={(val, item) => changeUrl(item)}
          />
        </div>
        <div className="store-search-examples">
          <div className="store-search-examples-title-wrapper">
            <h1 className="store-search-examples-title">
              {isVisitedStores
                ? i18n.t("stores.recently-visited")
                : i18n.t("stores.search-suggestions")}
            </h1>
          </div>
          {storesExemples.map((store: StoreType, key: number) => {
            return (
              <div
                key={key}
                className="store-search-examples-item"
                onClick={() => changeUrl(store)}
              >
                <span className="store-item-detail name">{store.name}</span>
                <span className="store-item-detail address">
                  {store.formatted_address}
                </span>
                {store.ride && store.ride.distance.text ? (
                  <span className="store-item-detail distance">
                    <FontAwesomeIcon icon={faLocationArrow} />
                    {store.ride && store.ride.distance.text}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
    <Helmet><title>{i18n.t("stores.title")}</title></Helmet>
      <Header />
      <div className="content">
        <PageTitle
          title={i18n.t("stores.title")}
          subtitle={i18n.t("stores.subtitle")}
          imgSource=""
        ></PageTitle>
        {!stores ? <PageLoading /> : renderStores(stores)}
      </div>
      <Footer />
    </>
  );
}

// export default React.memo(PopularProductsByBrand);
