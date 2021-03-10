import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./PageLoading.scss";

export function PageLoading() {
  return (
    <div className="content-loading">
      <FontAwesomeIcon icon={faCircleNotch} spin />
    </div>
  );
}
