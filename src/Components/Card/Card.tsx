import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CardTemplate } from "./CardTemplate";

export function Card({ result }: any) {
  const compressName = (name: string) => {
    if (name.length > 100) name = name.substr(0, 100) + "...";
    return name;
  };

  result.name = compressName(result.name);

  const history = useHistory();
  function navToProductPage(product: any) {
    incrementCounter(product);

    const query = window.location.search;
    history.push({
      pathname: `/product/${product.id}${query}`,
      state: { product },
    });
  }

  function incrementCounter(product: any) {
    (async () => {
      await axios.post(`${process.env.API_ENDPOINT}/products/`, {
        product,
      });
    })();
  }

  return (
    <CardTemplate
      img={result.imageURLs ? result.imageURLs[0] : ""}
      brand={result.brand || ""}
      name={result.name || ""}
      size={result.sizes && result.sizes[0] ? result.sizes[0] : ""}
      color={result.colors && result.colors[0] ? result.colors[0] : ""}
      key={result}
      onClickHandler={() => navToProductPage(result)}
      hasStores={result.hasStores}
    />
  );
}
