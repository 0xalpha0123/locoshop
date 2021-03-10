import React, { useLayoutEffect, useContext, useState } from "react";
import { TemplatePage } from "../../Components/TemplatePage";
import { Upload } from "./Upload";
import "./MyAccount.scss";
import { testToken } from "../../Helpers/Token";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { PageLoading } from "../../Components/PageLoading";
import { StoreType } from "../../types/store";
import axios from "axios";
import i18n from "../../i18n";
import { PageTitle } from "../../Components/PageTitle";
import { Button } from "../../Components/Button";
import { Helmet } from "react-helmet";

export function MyAccount() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [store, setStore] = useState(null);

  // test in useEffect if the user is logged
  useLayoutEffect(() => {
    (async () => {
      if (!(await testToken(localStorage.getItem("token")))) {
        setUser(null);
        history.push("/signin");
      }

      const store: StoreType = (
        await axios(`${process.env.API_ENDPOINT}/store/user/${user.uid}`)
      ).data;
      setStore(store);
    })();
  }, [history, setUser, user]);

  return (
    <>
    <Helmet><title>My account</title></Helmet>
    <TemplatePage
      content={() => {
        if (user && store)
          return (
            <div>
              <PageTitle
                title={`${i18n.t("my-account.hello")} ${store.name} !`}
                subtitle={store.formatted_address}
                imgSource=""
                button={
                  <Button
                    text={i18n.t("my-account.see-store-page")}
                    route={"store/" + store.place_id}
                  ></Button>
                }
              ></PageTitle>
              <div className="my-account">
                {/* <div className="store-presentation">
                  <div>
                    {i18n.t("my-account.go-to-text")}
                    <Link to={"store/" + store.place_id}>
                      <button className="go-to-button" type="button">
                        {i18n.t("my-account.go-my-store")}
                      </button>
                    </Link>
                  </div>
                  <div className="store-name">
                    {i18n.t("my-account.store info")} {store.name}
                  </div>
                  <div className="store-address">
                    {i18n.t("my-account.located at")} {store.formatted_address}
                  </div>
                </div> */}
                {Upload(user.uid)}
              </div>
            </div>
          );
        else return <PageLoading />;
      }}
    />
    </>
  );
}
