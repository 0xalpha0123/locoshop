/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "./TemplateSection.scss";
import { Section } from "../../types/section";


export function TemplateSection({ title = '', subtitle = '', paragraphs = [], aditionalClass = {}, image = null }: Section) {

  return (
    <div className={`section ${aditionalClass.section ?? ''}`}>

      {/* title */}
      {title ? <h1 className="title">{title}</h1> : ''}

      {/* subtitle */}
      {subtitle ? <h2 className="sub-title">{subtitle}</h2> : ''}

      {/* image */}
      {image ? <img src={image.src} alt={image.alt ?? ''} width={image.width ? `${image.width}px` : 'auto'} /> : ''}

      {/* paragraphs */}
      {paragraphs.map((p: string, index: number) => {
        return <p key={index} className={`paragraph ${aditionalClass.paragraphs ?? ''}`}> {p} </p>
      })}
    </div>
  );
}
