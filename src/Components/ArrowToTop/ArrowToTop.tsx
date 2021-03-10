/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import "./ArrowToTop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";


export function ArrowToTop() {

  const [currentPos, setCurrentPos] = useState(0);
  const [isOverFooter, setIsOverFooter] = useState(false);

  //scroll position to start showing the arrow
  const minPos = 250;

  useEffect(() => {
    //footer sizes
    const footer:HTMLElement = document.querySelector("footer");
    const footerHeigth:number = footer ? footer.offsetHeight : 0;

    //host sizes
    const windowHeight:number = document.body.offsetHeight;
    const documentHeigth:number = document.body.scrollHeight;

    //point to change css class
    const footerScrollLimit:number = documentHeigth - windowHeight - footerHeigth;

    document.addEventListener("scroll", ()=>{
      setCurrentPos(window.scrollY);
      setIsOverFooter(window.scrollY > footerScrollLimit);
    });

  })

  return (
    <div
      className={ `arrow-to-top ${currentPos > minPos ? 'show' : 'hide'} ${isOverFooter ? 'is-over-footer' : ''}` }
      onClick={ () => window.scrollTo(0,0) }
    >
      <FontAwesomeIcon icon={faCaretUp}/>
    </div>
  );
}
