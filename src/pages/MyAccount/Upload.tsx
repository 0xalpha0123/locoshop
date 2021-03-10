import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { format, isValid } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faExclamationCircle,
  faQuestionCircle,
  faFolder,
  faFileCsv,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { StoreType } from "../../types/store";

import "./Upload.scss";
import { Button } from "../../Components/Button";
import { Helmet } from "react-helmet";

export function Upload(ownerUid: string) {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [store, setStore] = useState<StoreType>(null);
  const [uploadHistory, setUploadHistory] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [info, setInfo] = useState({
    level: "",
    message: "",
  });
  const toastId = React.useRef(null);

  const EXTENTION = "csv";

  const getUploadsHistory = useCallback(async () => {
    if (store) {
      const req = await axios(
        `${process.env.API_ENDPOINT}/upload/history/${store.place_id}`
      );
      return req.data;
    }
    return null;
  }, [store]);

  useEffect(() => {
    (async () => {
      const store: StoreType = (
        await axios(`${process.env.API_ENDPOINT}/store/user/${ownerUid}`)
      ).data;
      setStore(store);
    })();
  }, [ownerUid]);

  useEffect(() => {
    if (uploadHistory === null) {
      (async () => {
        const uploadsHistory = await getUploadsHistory();
        setUploadHistory(uploadsHistory);
      })();
    }
  }, [getUploadsHistory, uploadHistory]);

  const notify = (type: string, message: string) => {
    const config: ToastOptions = {
      position: "bottom-center",
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: 1,
    };
    if (type === "error") {
      toastId.current = toast.error(t(message), config);
    } else if (type === "success") {
      toastId.current = toast.success(t(message), {
        ...config,
        progress: undefined,
        autoClose: 2000,
      });
    }
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const onChange = (e: any) => {
    const file = e.target.files[0];
    if (file.name.split(".").pop() !== EXTENTION) {
      setSelectedFile(null);
      notify("error", "csv.wrong_format");
      return;
    }
    setSelectedFile(file);
    dismiss();
  };

  /**
   * send upload file
   * remove the selected file
   * get the upload history by store
   * notify the user with toast
   */
  async function sendUpload() {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("storeId", store.place_id);

    //reseting upload state
    setUploadProgress(1);
    setIsUploadDone(false);

    setInfo({
      level: "",
      message: "",
    });

    try {
      await axios.post(`${process.env.API_ENDPOINT}/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        //getting real time progress
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setTimeout(function () {
        setIsUploadDone(true);
        document
          .querySelector(".container-upload-progress-wrapper.finished")
          .scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 1000);

      setSelectedFile(null);
      setUploadHistory(await getUploadsHistory());
      // notify("success", "csv.success_upload");
    } catch (err) {
      setUploadProgress(0);
      setIsUploadDone(false);

      if (err.response) {
        setInfo({
          level: "error",
          message: err.response.data.name,
        });
      }
    }
  }

  const onSubmit = async (e: any) => {
    if (e) {
      e.preventDefault();
    }
    await sendUpload();
  };

  return (
    <>
    <Helmet>
      <title>Product upload</title>
    </Helmet>
    <div className="upload">
      {info.message ? (
        <>
          <div className={`message-info ${info.level}`}>
            <FontAwesomeIcon
              icon={
                info.level === "warning"
                  ? faQuestionCircle
                  : faExclamationCircle
              }
            />
            <span>{t(info.message)}</span>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="upload-header">
        <h1 className="upload-header-title">
          {t("my-account.update-file-title")}
        </h1>
        <p className="upload-header-description">
          {t("my-account.update-file-descripton")}
        </p>
      </div>

      {!uploadProgress || uploadProgress === 100 ? (
        <form onSubmit={onSubmit}>
          <label htmlFor="upload-img">
            <Button
              text={selectedFile ? selectedFile.name : t("csv.select_file")}
              icon={selectedFile ? faFileCsv : null}
            />
          </label>
          <input
            type="file"
            name="file"
            className="inputfile"
            id="upload-img"
            onChange={onChange}
          />

          {selectedFile ? (
            <Button
              text={t("csv.upload").toString()}
              icon={selectedFile ? faUpload : null}
              additionalClass="send-button"
              onClickHandler={onSubmit}
            />
          ) : (
            <></>
          )}
        </form>
      ) : (
        <></>
      )}

      {uploadProgress ? (
        <div
          className={`container-upload-progress-wrapper ${
            uploadProgress === 100 ? "finished" : ""
          }`}
        >
          <div className="container-upload-text">
            {uploadProgress === 100
              ? isUploadDone
                ? t("csv.success_upload")
                : t("csv.processing_upload")
              : `${uploadProgress}%`}
          </div>

          <div
            className="container-upload-bar"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress === 100 && !isUploadDone ? (
              <div className="container-server-handling-bar">
                <div className="handling-bar"></div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {uploadProgress === 100 && isUploadDone ? (
            <div className="container-upload-sucess">
              {store ? (
                <Button
                  text={t("my-account.see-store-page")}
                  route={"store/" + store.place_id}
                  icon={faArrowRight}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      <div className="container-upload">
        <div className="upload-pos">
          <h2 className="section-title">{t("history.pos-supported")}</h2>
          <div className="upload-brands">
            <div className="upload-brands-item lightspeed">
              <div className="upload-brands-item-logo">
                <img
                  className="png-lightspeed"
                  src="images/upload/lightspeed.svg"
                  alt="Lightspeed"
                ></img>
              </div>
              <a
                className="upload-brands-item-link lightspeed-link"
                href="https://ecom-support.lightspeedhq.com/hc/en-us/articles/220320608-Exporting-data#toexport"
              >
                {t("history.link-export")}
              </a>
            </div>
            <div className="upload-brands-item shopify">
              <div className="upload-brands-item-logo">
                <img
                  className="png-shopify"
                  src="images/upload/shopify.svg"
                  alt="Shopify"
                ></img>
              </div>
              <a
                className="upload-brands-item-link"
                href="https://help.shopify.com/en/manual/products/import-export/export-products"
              >
                {t("history.link-export")}
              </a>
            </div>
          </div>
        </div>
        {uploadHistory && uploadHistory.length > 0 && (
          <div className="container-upload-history">
            <h3 className="section-title">{t("history.title")}</h3>

            {uploadHistory.map((history: any, index: number) => (
              <div className="upload-history" key={index}>
                <FontAwesomeIcon icon={faFolder} size="lg" />
                <span className="filename">{history.filename}</span>
                <span className="date">
                  {isValid(new Date(Number(history.date)))
                    ? format(
                        new Date(Number(history.date)),
                        "dd/MM/yyyy kk:mm:ss"
                      )
                    : "-"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
