import React, { useLayoutEffect } from "react";

import { Header } from "../Header";
import { Footer } from "../Footer";

import "./TemplatePage.scss";

export function TemplatePage({ content: Content }: any) {
  return (
    <div className="container_page">
      <Header />
      <main className="container_page_wrapper">
        <Content />
      </main>
      <Footer />
    </div>
  );
}
