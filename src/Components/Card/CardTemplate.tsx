import React from "react";
import i18n from "../../i18n";
import { Button } from "../Button";
import "./CardTemplate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { formatURL } from "../../pages/Store/Store";

interface CardTemplateType {
  img?: string;
  brand?: string;
  name?: string;
  size?: string;
  color?: string;
  website?: string;
  key: any;
  onClickHandler?: Function;
  hasStores?: boolean;
  additionalClass?: string;
}

export function CardTemplate({
  img,
  brand,
  website,
  name,
  size,
  color,
  key,
  onClickHandler,
  hasStores,
  additionalClass = "",
}: CardTemplateType) {
  const isFeaturedInStore: boolean = additionalClass === "featured-in-store";

  return (
    <div
      className={`card result-item ${onClickHandler ? "" : "active"} ${
        onClickHandler && !hasStores ? "no-stores" : ""
      } ${additionalClass}`}
      key={name + key}
      onClick={onClickHandler ? () => onClickHandler() : null}
    >
      {/* tag to sign the searched product inside stores */}
      {isFeaturedInStore ? (
        <div className="search-result-tag">
          {" "}
          <FontAwesomeIcon icon={faShoppingBag} />
          {i18n.t("store.searched_product")}
        </div>
      ) : (
        <></>
      )}

      {/* product image */}
      <div className="item-img">
        <img
          src={img ? img : "../images/Locoshop_icon.svg"}
          className={img ? "" : "no-image"}
          alt={name}
        />
      </div>

      {/* product details */}
      <div className="item-data">
        {brand ? <div className="item-detail item-brand">{brand}</div> : ""}
        {name ? <div className="item-detail item-name">{name}</div> : ""}
        {size ? (
          <div className="item-detail item-size">
            {" "}
            <span className="item-detail-topic"> {i18n.t("size")} </span> :{" "}
            {size}{" "}
          </div>
        ) : (
          ""
        )}
        {color ? (
          <div className="item-detail item-color">
            {" "}
            <span className="item-detail-topic">
              {" "}
              {i18n.t("color")}{" "}
            </span> : {color}{" "}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* action button */}
      <div role="button" className="item-button">
        {onClickHandler || (website && isFeaturedInStore) ? (
          <Button
            text={
              hasStores
                ? isFeaturedInStore
                  ? formatURL(website)
                  : i18n.t("see-stores")
                : i18n.t("see-details")
            }
            isExternalLink={
              hasStores ? (isFeaturedInStore ? true : false) : false
            }
            icon={
              hasStores
                ? isFeaturedInStore
                  ? faExternalLinkAlt
                  : false
                : false
            }
            route={hasStores ? (isFeaturedInStore ? website : "") : ""}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
