import React, { useEffect, useState } from "react";
import { ProductType } from "../../types/product";
import { UserPositionType } from "../../types/users";
import { StoreType } from "../../types/store";

import i18n from "../../i18n";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "./Product.scss";

import { PageTitle } from "../../Components/PageTitle";
import { ProductCarousel } from "../../Components/ProductCarousel";
import { PageLoading } from "../../Components/PageLoading/PageLoading";
import { TemplatePage } from "../../Components/TemplatePage";
import { PopularBrand } from "../../types";
import { Map } from "../../Components/Map";
import { Button } from "../../Components/Button";
import { BreadCrumbType } from "../../types/breadCrumb";
import { BreadCrumb } from "../../Components/BreadCrumb";

export function Product() {
  const location = useLocation<any>();
  const [stores, setStores] = useState<StoreType[]>(null);
  const [coords, setCoords] = useState<UserPositionType>(null);
  const [product, setProduct] = useState<ProductType>(null);
  const [popularBrand, setPopularBrand] = useState(new Array<PopularBrand>());
  const { productid } = useParams() as {
    productid: string;
  };

  const storesDiv: any = React.useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!coords) {
          //avoid rerender if geolocation changes
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      });
    }
    const getProduct = async () => {
      if (location.state && location.state.hasOwnProperty("product")) {
        setProduct(location.state.product);
      } else {
        const productGet = await axios(
          `${process.env.API_ENDPOINT}/products/popularById/${productid}`
        );
        await setProduct(productGet.data);
      }
    };
    const getStores = async () => {
      const stores = await axios(
        `${process.env.API_ENDPOINT}/store/byProductId/${productid}`,
        {
          params: coords,
        }
      );
      await setStores(stores.data);
    };
    if (!product) {
      getProduct();
    }
    if (!stores) {
      getStores();
    }
    if (product && product.brand) {
      const getPopularBrand = async () => {
        const result = await axios(
          `${process.env.API_ENDPOINT}/brands/popular/${product.brand}`
        );
        await setPopularBrand(result.data);
      };
      getPopularBrand();
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seeStores = () => {
    storesDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  function Localisation() {
    const query = window.location.search.replace("?", "");

    return (
      <div ref={storesDiv} className="stores-location">
        {/* <div className="stores-location-qty">
          {i18n.t("product.locoshop-founded")} {stores.length} {stores.length > 1 ? i18n.t("product.stores-near-you") : i18n.t("product.store-near-you") }
        </div> */}
        <div className="stores-details">
          {stores.map((store: any, index: number) => (
            <div key={index} className="store-item store-details">
              <div className="content-wrapper">
                <span className="distance">
                  {/* <FontAwesomeIcon icon={faLocationArrow} /> */}
                  <img
                    className="distance-icon"
                    src="../../../images/Locoshop_icon.svg"
                  />
                  <span className="distance-text">
                    {store.ride &&
                    store.ride.distance &&
                    store.ride.distance.text
                      ? store.ride.distance.text
                      : "- km"}
                  </span>
                </span>

                <div className="name-address">
                  <span className="name">{store.name}</span>
                  <span className="address">{store.formatted_address}</span>
                </div>

                <Button
                  text={i18n.t("product.see-store")}
                  route={
                    "/store/" +
                    store.place_id +
                    "?productId=" +
                    product.id +
                    "&" +
                    query
                  }
                ></Button>

                {/* <a
                    title={i18n.t("product.name-link-title")}
                    href={"/store/" + store.place_id}
                    className="name-link"
                  >
                    <span className="name">
                      {" " + store.name}
                    </span>
                  </a>
                  <div className="address">{store.formatted_address}</div> */}
                {/* <div className="last-update">
                    <span>
                      ({i18n.t("product.last-update")} {store.lastImportDate || '-'})
                    </span>
                  </div> */}
              </div>
              <div className="map">
                <Map addresses={[store]} id="map-store" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function DetailsProduct() {
    let breadCrumbItens: BreadCrumbType[] = [];

    product
      ? breadCrumbItens.push({
          label: `${product.brand} - ${product.name} `,
          isActive: true,
        })
      : null;

    return (
      <div>
        {product ? (
          <div className="product">
            <PageTitle
              title={product.brand}
              subtitle={product.name}
              imgSource={
                product.imageURLs && product.imageURLs[0]
                  ? product.imageURLs[0]
                  : "img/search-icon.svg"
              }
              button={
                stores && stores.length > 0 ? (
                  <Button
                    text={`${i18n.t("see")} ${stores.length} ${
                      stores.length > 1
                        ? i18n.t("product.stores-near-you")
                        : i18n.t("product.store-near-you")
                    }`}
                    icon={faArrowDown}
                    onClickHandler={seeStores}
                  />
                ) : null
              }
            ></PageTitle>
            {/* {popularBrand.length > 0 && (
                popularBrand.map((brand: PopularBrand, index: number) => {
                  // Some logo are in local folder, some others an url link
                  const imageLink = brand.imgSrc.startsWith("http") ? brand.imgSrc : "../" + brand.imgSrc;
                  return (
                      <div className="brand">
                        <img
                          src={imageLink}
                          alt={brand.name + " logo"}
                          className="img-logo"
                        />
                      </div>
                  );
                })
              )} */}
            {/* <div className="thin-border"></div> */}

            {breadCrumbItens ? <BreadCrumb itens={breadCrumbItens} /> : <></>}

            <div className="product-details">
              <ProductCarousel imageURLs={product.imageURLs}></ProductCarousel>
              <div className="product-right">
                {/* <div className="brand-name">{product.brand}</div> */}
                {/* <div className="product-name">{product.name}</div> */}

                <div className="model-number"></div>
                <div className="upc-code"></div>
                {stores && stores.length !== 0 ? (
                  <Localisation />
                ) : (
                  <div className="error-message">
                    {i18n.t("product.error-no-available")}
                  </div>
                )}
                {product.primaryCategories &&
                product.primaryCategories.length > 0 ? (
                  <div className="product-tags">
                    {product.primaryCategories.map((cat: string, key: any) => {
                      return (
                        <span className="cat-tag" key={key}>
                          {cat}{" "}
                        </span>
                      );
                    })}
                    {product.categories &&
                      product.categories.map((cat: string, key: any) => {
                        return (
                          <span className="cat-tag" key={key}>
                            {cat}{" "}
                          </span>
                        );
                      })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <PageLoading />
        )}
      </div>
    );
  }

  return <TemplatePage content={DetailsProduct} />;
}
