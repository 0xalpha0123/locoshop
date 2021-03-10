import React, { useState, useRef, useEffect, useContext } from "react";

import "./Home.scss";
import { TemplatePage } from "../../Components/TemplatePage";
import { Carousel } from "../../Components/Carousel";
import SearchBar from "./SearchBar";
import { ResultItems } from "../../Components/List/ResultItems";
import { LangContext } from "../../Contexts/LangContext";
import { Helmet } from "react-helmet";

export function Home() {
  const [products, setProducts] = useState<[]>(null);
  const searchProductInput: any = useRef();
  const searchBrandInput: any = useRef();
  const langContext = useContext(LangContext);

  useEffect(() => {
    (async () => {
      // window.history.replaceState(null, null, " ");
      if (searchProductInput) {
        //if is a desktop version, focus at the search field
        if(document.documentElement.clientWidth > 1024) searchProductInput.current.focus();
      }
    })();
  }, []);

  function HomePage() {
    return (
      <>
        <article className="search">
          <SearchBar
            callback={setProducts}
            refProductSearch={searchProductInput}
            refBrandSearch={searchBrandInput}
          />
          {products ? 
            <ResultItems
              title="search"
              input={searchProductInput}
              brandInput={searchBrandInput}
              results={products}
            />
            :
            <></>
          }
          <Carousel />
        </article>
      </>
    );
  }

  return (
    <div className="home" id={langContext.lang}>
      <Helmet>
      <title>LocoShop</title>
      <meta name="description" content="Locoshop.io is the first global product geolocation platform designed to help shoppers locate brand name products in the closest nearby store, anywhere in the world." />
      </Helmet>
      <TemplatePage content={HomePage} />
    </div>
  );
}
