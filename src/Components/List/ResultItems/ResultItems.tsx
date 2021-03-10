import "./ResultItems.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../../Card";
import { PageTitle } from "../../PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const ResultItems = React.memo(({ title, input, brandInput, results }: any) => {
  const { t } = useTranslation();

  const isInput = input && input.current && input.current.value !== "";
  const isInputBrand = brandInput && brandInput.current && brandInput.current.value !== "";

  function AnchorTitle() {

    let subtitle = isInput ? input.current.value : "";
    if(isInputBrand) subtitle = brandInput.current.value + " - " + subtitle;

    return (
      <>
        {title ? (
          <div className="result-title" id={`title-${title}-product-items`}>
            <PageTitle
              title={t(`title-${title}`)}
              subtitle={subtitle}
              imgSource={isInput ? "img/search-icon.png" : null}
            ></PageTitle>
          </div>
        ) : null}
      </>
    );
  }

  function Tags() {
    return (
      <>
        {isInput ? (
          <div className="tag-list">
            <span className="tag">{input.current.value}</span>
          </div>
        ) : null}
      </>
    );
  }

  function EmptyList() {
    if (isInput) {
      return <div className="product-list-empty"><FontAwesomeIcon icon={faExclamationCircle} />{t("list-empty")}</div>;
    } else {
      return null;
    }
  }

  return (
    <>
      {results && results.length > 0 ? (
        <>
          <AnchorTitle />
          <div className="product-items">
            <div className="container-product-list">
              <div className="result-items">
                {results.map((r: any, i: number) => (
                  <Card key={i} result={r} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </>
  );
});
