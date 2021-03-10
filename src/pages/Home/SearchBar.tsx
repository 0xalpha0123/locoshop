import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.scss";
import i18n from "../../i18n";
import { useHistory, useLocation } from "react-router-dom";

function SearchBar({ callback, refProductSearch, refBrandSearch }: any) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [searchType, setSearchType] = useState("name");
  const [codeType, setCodeType] = useState("Code");

  const history = useHistory();

  const requiredTag = React.useRef<HTMLDivElement>();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  function vw(v: number) {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    return (v * w) / 1000;
  }

  useEffect(() => {
    let innerHeight = window.innerHeight - vw(8);
    let innerWidth = window.innerWidth;
    setHeight(innerHeight);
    setWidth(innerWidth);

    function handleResize() {
      setHeight(innerHeight);
      setWidth(innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // We put back the value to keep it for the user
    const brand = query.get("brand");
    const product = query.get("product");
    if (brand && refBrandSearch.current) {
      refBrandSearch.current.value = brand;
    }
    if (product && refProductSearch.current) {
      refProductSearch.current.value = product;
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [query, refBrandSearch, refProductSearch]);

  const getProducts = (event: any) => {
    event.preventDefault();

    if (!refProductSearch.current.value) {
      //adding class to show required tag
      let classToToggle = "active";
      requiredTag.current.classList.add(classToToggle);

      //return the focus to the input field
      refProductSearch.current.focus();

      //removing class to hide tag
      setTimeout(() => {
        requiredTag.current.classList.remove(classToToggle);
      }, 3000);

      //cancel request
      return false;
    }

    (async () => {
      let result;

      //TODO: check if theres a way to insert this DOM management into react lifecycle
      let loadingInterval = setInterval(() => {
        const buttonDiv = document.querySelector(".search-button-icon");
        if (buttonDiv && !buttonDiv.classList.contains("loading"))
          buttonDiv.classList.add("loading");
      }, 100);

      history.push({
        pathname: "",
        search:
          "?brand=" +
          (refBrandSearch && refBrandSearch.current
            ? refBrandSearch.current.value
            : "") +
          "&product=" +
          (refProductSearch && refProductSearch.current
            ? refProductSearch.current.value
            : ""),
      });
      if (searchType === "name") {
        result = await axios.post(
          `${process.env.API_ENDPOINT}/products/search`,
          {
            product: refProductSearch.current.value,
            brand: refBrandSearch.current.value,
          }
        );
      } else if (searchType === "code") {
        result = await axios.get(
          `${
            process.env.API_ENDPOINT
          }/products/searchByCode?${codeType.toLowerCase()}=${
            refProductSearch.current.value
          }`
        );
      }
      await callback(result.data.records);
      clearInterval(loadingInterval);
      window.scrollTo(
        0,
        document.getElementById("title-search-product-items").offsetTop
      );
    })();
  };

  function selectCode(code: string) {
    setSearchType("code");
    setCodeType(code);
  }

  //change le type de la recherche
  function searchTypeChangeHandler(value: string) {
    if (value === "product") {
      setSearchType("name");
      setCodeType("Code");
    } else {
      selectCode(value);
    }
  }

  return (
    <section className="search-bar" style={{ minHeight: height * 0.7 }}>
      <div className="search-text">
        <h1 className="search-title featured-title">
          {i18n.t("search.title")}
        </h1>
        <h2 className="search-subtitle">{i18n.t("search.subtitle")}</h2>
      </div>
      <form
        className="search-form"
        onSubmit={(event) => {
          getProducts(event);
        }}
      >
        <div className="container-search-input">
          <div className="search-type">
            <SearchTypeSelect onChangeHandler={searchTypeChangeHandler} />
          </div>

          <div className="search-bars">
            {searchType === "name" ? (
              <div className="brand-search-bar">
                <SearchBrandInput ref={refBrandSearch} />
              </div>
            ) : (
              <></>
            )}
            <div className="product-search-bar">
              <SearchProductInput
                placeholder={
                  searchType === "name"
                    ? i18n.t("search.product-search")
                    : i18n.t("search.code-search")
                }
                ref={refProductSearch}
              />
              <div ref={requiredTag} className="required-tag">
                <div className="required-tag-arrow">
                  <FontAwesomeIcon icon={faCaretUp} />
                </div>
                {i18n.t("search.required-field")}
              </div>
            </div>
          </div>
          <div className="search-button">
            <button type="submit">
              <span className="search-button-icon">
                <FontAwesomeIcon className="default-icon" icon={faSearch} />
                <FontAwesomeIcon
                  className="loading-icon"
                  icon={faCircleNotch}
                  spin
                />
              </span>
            </button>
          </div>
        </div>
      </form>

      {width >= 720 ? (
        <video className="bg-video" autoPlay loop muted>
          <source src={`./videos/home720p.mp4`} type="video/mp4" />
        </video>
      ) : (
        ""
      )}

      <div className="overlay"></div>
    </section>
  );
}

const SearchTypeSelect = React.forwardRef(
  (props: { onChangeHandler: Function }, ref: any) => {
    const [active, setActive] = useState(false);

    return (
      <div className="search-input-type-wrapper">
        <span className={`search-type-icon ${active ? "active" : ""}`}>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
        <select
          onClick={() => setActive(!active)}
          onBlur={() => setActive(false)}
          onChange={(e) => props.onChangeHandler(e.currentTarget.value)}
          ref={ref}
          name="search-type"
          aria-label="Select search type"
          className="search-input"
        >
          <option value="product">{i18n.t("search.product-type")}</option>
          <option value="UPC">{i18n.t("search.upc-type")}</option>
          <option value="EAN">{i18n.t("search.ean-type")}</option>
          <option value="ASIN">{i18n.t("search.asin-type")}</option>
        </select>
      </div>
    );
  }
);

const SearchProductInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      ref={ref}
      type="search"
      name="search-input"
      aria-label="Search through products"
      placeholder={props.placeholder}
      className="search-input"
      // required
    />
  );
});

const SearchBrandInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      ref={ref}
      type="search"
      name="search-brand-input"
      aria-label="Search brand"
      placeholder={i18n.t("search.brand-search")}
      className="search-input"
    />
  );
});

export default React.memo(SearchBar);
