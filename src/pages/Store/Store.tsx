import React, { useEffect, useState } from "react";
import axios from "axios";
import i18n from "../../i18n";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { useParams, useLocation } from "react-router-dom";

import "./Store.scss";
import { PageTitle } from "../../Components/PageTitle";
import { PageLoading } from "../../Components/PageLoading";
import { ProductBaseType } from "../../types/product";
import { StoreType } from "../../types/store";
import {
  faLocationArrow,
  faCaretDown,
  faCircleNotch,
  faPhone,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Map } from "../../Components/Map";

import { VisitedStores } from "../../Helpers/VisitedStores";
import { CardTemplate } from "../../Components/Card";
import { StoreDetailsType } from "../../types/storeDetails";
import { UploadStoreType } from "../../types/upload";
import { Button } from "../../Components/Button";
import { BreadCrumb } from "../../Components/BreadCrumb";
import { BreadCrumbType } from "../../types/breadCrumb";
import { eventTracking } from "../../useTracking";

import { Helmet } from "react-helmet";

/**
 * Fonction qui permet de formatter URL dans un format sans protocole, query et/ou extension
 * @param website {string} URL du site internet
 */
export function formatURL(website: string): string {
  //removing prefix
  let compressedUrl = website
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");

  //removing query url
  compressedUrl = compressedUrl.split("?")[0];

  //removing last slash
  if (compressedUrl.charAt(compressedUrl.length - 1) === "/") {
    compressedUrl = compressedUrl.substring(0, compressedUrl.length - 1);
  }

  return compressedUrl;
}

export function Store() {
  const [productsByStore, setProductsByStore] = useState<
    Array<ProductBaseType>
  >(null);
  const [store, setStore] = useState<StoreType>();
  const [lastUploadHistoryStore, setLastUploadHistoryStore] = useState<UploadStoreType>();
  const [storeDetails, setStoreDetails] = useState<StoreDetailsType>();
  const { storeid } = useParams() as {
    storeid: string;
  };
  const [brands, setBrands] = useState(new Array<String>());
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("");

  const searchedProductId = new URLSearchParams(useLocation().search).get(
    "productId"
  );
  const searchedBrand = new URLSearchParams(useLocation().search).get("brand");
  const searchedProductName = new URLSearchParams(useLocation().search).get(
    "product"
  );

  useEffect(() => {
    const getProductsByStore = async () => {
      const result = await axios(
        `${process.env.API_ENDPOINT}/products/store/${storeid}`
      );
      let brandSet = new Set<String>();
      result.data.map((product: ProductBaseType) => {
        if (
          product &&
          product.datafinitiMatchedProduct &&
          product.datafinitiMatchedProduct.brand
        ) {
          brandSet.add(product.datafinitiMatchedProduct.brand);
        } else if (product.vendor) {
          brandSet.add(product.vendor);
        }
      });
      await setBrands(
        Array.from(brandSet).sort((one, two) => (one < two ? -1 : 1))
      );
      //sorting by searched product
      await setProductsByStore(
        result.data.sort((one: ProductBaseType, two: ProductBaseType) =>
          one.datafinitiMatchedProduct &&
          one.datafinitiMatchedProduct.id === searchedProductId
            ? -1
            : 1
        )
      );
    };
    const getStore = async () => {
      const result = await axios(
        `${process.env.API_ENDPOINT}/store/get/${storeid}`
      );
      await VisitedStores.add(result.data);
      await setStore(result.data);
    };

    const getUploadHistoryStore = async () => {
      const result = await axios(
        `${process.env.API_ENDPOINT}/upload/history/${storeid}`
      );
      console.log('result:', result);
      if (result.data && result.data.length >= 1) {
        let lastUpload = Object.assign({}, result.data[0]);
        console.log('lastUpload.date:', lastUpload.date);
        lastUpload.date = new Date(parseInt(lastUpload.date));
        await setLastUploadHistoryStore(lastUpload);
      }
    };

    const getStoreDetails = async () => {
      const result = await axios(
        `${process.env.API_ENDPOINT}/store/getDetails/${storeid}`
      );
      await setStoreDetails(result.data);
    };
    if (!store) {
      getStore();
      getStoreDetails();
      getProductsByStore();
      getUploadHistoryStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBrandFilterChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedBrandFilter(e.target.value);
  };

  const brandFilter = (product: ProductBaseType) => {
    if (selectedBrandFilter) {
      return product.datafinitiMatchedProduct
        ? product.datafinitiMatchedProduct.brand === selectedBrandFilter
        : product.vendor === selectedBrandFilter;
    }
    return true;
  };

  const pageTitleButton = () => {
    //removing prefix
    let compressedUrl = formatURL(storeDetails.website);

    return (
      <div className="actions-group">
        <Button
          text={storeDetails.formatted_phone_number}
          route={`tel:${storeDetails.formatted_phone_number}`}
          isExternalLink={true}
          target="_self"
          icon={faPhone}
          onClickHandler={()=> {eventTracking({category:'phone', action:'click', label: storeDetails.formatted_phone_number})}}
        />
        <Button
          text={compressedUrl}
          route={storeDetails.website}
          isExternalLink={true}
          icon={faExternalLinkAlt}
          onClickHandler={()=> {eventTracking({category:'website', action:'click', label: compressedUrl})}}
        />
      </div>
    );
  };

  const renderStore = (store: StoreType) => {
    let breadCrumbItens: BreadCrumbType[] = [];

    // is there a query 'productID'?
    // is there the product list?
    // is there the searched product? this will avoid unknow IDs
    if (searchedProductId &&
    productsByStore &&
    productsByStore.find((p: ProductBaseType) => p.datafinitiMatchedProduct && p.datafinitiMatchedProduct.id === searchedProductId)) {
      breadCrumbItens.push({
        label: i18n.t("store.list"),
        route: `../product/${searchedProductId}?brand=${searchedBrand}&product=${searchedProductName}`,
      })
    }

    breadCrumbItens.push({
      label: store.name,
      isActive: true,
    });

    return (
      <div>
        <PageTitle
          title={store.name}
          subtitle={store.formatted_address}
          imgSource=""
          noarrow={true}
          button={
            storeDetails && storeDetails.website ? pageTitleButton() : <></>
          }
        ></PageTitle>

        <div className="store-content">
          <div className="arrow-container">
            <div className="arrow-wrapper">
              <div className="arrow"></div>
              <div className="arrow-background"></div>
            </div>
          </div>

          <div className="store-details">
            <div className="map-container">
              <Map addresses={[store]} id="map-store" />
            </div>

            {breadCrumbItens ? <BreadCrumb itens={breadCrumbItens} /> : <></>}

            <div className="store-details-content">
              {store.ride && store.ride.distance.text ? (
                <>
                  <FontAwesomeIcon icon={faLocationArrow} />
                  <span className="distance">
                    {store.ride && store.ride.distance.text}
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="store-tags">
              {store.types &&
                store.types.map((cat: string, key: any) => {
                  return (
                    <span className="cat-tag" key={key}>
                      {cat}{" "}
                    </span>
                  );
                })}
            </div> */}
          </div>

          {productsByStore ? (
            <div className="products-head">
              <h2 className="product-head-qty">
                {productsByStore.filter(brandFilter).length}{" "}
                {productsByStore.filter(brandFilter).length > 1
                  ? i18n.t("store.avaiable_products")
                  : i18n.t("store.avaiable_product")}
              </h2>
              <div className="last-upload-store">
                  {lastUploadHistoryStore && lastUploadHistoryStore.date && (
                      <span>{ i18n.t("store.last-upload", {
                        day: lastUploadHistoryStore.date.getDate(),
                        month: lastUploadHistoryStore.date.getMonth()+1 >= 10 ? lastUploadHistoryStore.date.getMonth()+1 : `0${lastUploadHistoryStore.date.getMonth()+1}`,
                        year:lastUploadHistoryStore.date.getFullYear()
                      })}</span>
                    )
                  }
              </div>
              <div className="product-head-marque-filter-wrapper">
                <FontAwesomeIcon
                  className="product-head-marque-filter-arrow"
                  icon={faCaretDown}
                />
                <select
                  value={selectedBrandFilter}
                  onChange={handleBrandFilterChange}
                  className="product-head-marque-filter"
                >
                  <option value="">{i18n.t("store.filter_by_brand")}</option>
                  {brands.map((brand, key) => {
                    return (
                      <option key={key} value={brand.toString()}>
                        {brand}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="product">
            {productsByStore ? (
              productsByStore.length > 0 ? (
                renderProducts(productsByStore)
              ) : (
                <div className="no-product">
                  <h2>{i18n.t("no_product")}</h2>
                </div>
              )
            ) : (
              <FontAwesomeIcon icon={faCircleNotch} spin />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = (productsByStore: Array<ProductBaseType>) => {
    return (
      <div className="product-items">
        <div className="container-product-list">
          <div className="result-items">
            {productsByStore
              .filter(brandFilter)
              .map((product: ProductBaseType, index: number) =>
                product.datafinitiMatchedProduct ? (
                  <CardTemplate
                    img={
                      product.datafinitiMatchedProduct.imageURLs &&
                      product.datafinitiMatchedProduct.imageURLs.length > 0
                        ? product.datafinitiMatchedProduct.imageURLs[0] ?? ""
                        : ""
                    }
                    website={storeDetails?.website}
                    brand={product.datafinitiMatchedProduct.brand || ""}
                    name={product.datafinitiMatchedProduct.name || ""}
                    size={
                      product.datafinitiMatchedProduct.sizes
                        ? product.datafinitiMatchedProduct.sizes[0]
                        : "" || ""
                    }
                    color={
                      product.datafinitiMatchedProduct.colors
                        ? product.datafinitiMatchedProduct.colors[0]
                        : "" || ""
                    }
                    key={index}
                    hasStores={true}
                    additionalClass={
                      product.datafinitiMatchedProduct.id === searchedProductId
                        ? "featured-in-store"
                        : ""
                    }
                  />
                ) : (
                  <CardTemplate
                    img={product.imgsSrc ? product.imgsSrc[0] : ""}
                    brand={product.vendor}
                    name={product.id.split("-").join(" ")}
                    size={
                      product.variants[0]
                        ? product.variants[0].size
                        : product.variants.size || ""
                    }
                    color={
                      product.variants[0]
                        ? product.variants[0].color
                        : product.variants.color || ""
                    }
                    hasStores={true}
                    key={index}
                  />
                )
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <Helmet><title>{!store ? "Loading..." : store.name+" - "+store.formatted_address}</title></Helmet>
    <Header />
    <div className="store-page">
      {!store ? <PageLoading /> : renderStore(store)}
    </div>
    <Footer />
    </>
  );
}

// export default React.memo(PopularProductsByBrand);
