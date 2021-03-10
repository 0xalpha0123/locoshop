import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { ResultItems } from "../../Components/List/ResultItems";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState(null);

  async function getPopularProducts() {
    return await axios(`${process.env.API_ENDPOINT}/products/`);
  }

  useLayoutEffect(() => {
    let isMounted = false;

    (async () => {
      const results = await getPopularProducts();
      if (!isMounted) {
        await setPopularProducts(results.data);
      }
    })();

    return () => (isMounted = true);
  }, []);

  return (
    <section className="popular-products">
      <ResultItems title="popular" results={popularProducts} />
    </section>
  );
};

export default React.memo(PopularProducts);
