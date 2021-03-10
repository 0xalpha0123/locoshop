import React from "react";
import "./PageTitle.scss";
import { PageTitleType } from "../../types/pageTitle";

export function PageTitle(props: PageTitleType) {
  return (
    <div
      className={`page-title ${props.noarrow ? 'no-arrow' : ''}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,0.72919590199361) 0%, rgba(9,9,121,0.7432015042345064) 48%, rgba(0,212,255,0.7460026246826856) 100%), url('" +
          props.imgSource +
          "') no-repeat fixed",
      }}
    >
      <div className="page-title-text">
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>
        {props.content ? <div className="content">{props.content}</div> : <></>}
        {props.button ? props.button : <></>}
      </div>
    </div>
  );
}
