/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";

import "./Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface buttonType {
  text?: string,
  icon?: any,
  route?: string,
  isExternalLink?: boolean,
  target?:string,
  onClickHandler?: Function,
  additionalClass?: string,
  disabled?: boolean
}

export function Button(
  { text = '',
    icon = null,
    route = null,
    isExternalLink = false,
    target = '',
    onClickHandler = null,
    additionalClass = '',
    disabled = false
  }: buttonType) {

  const renderContent = () => {
    return (
      <>
        {text}
        {icon ? (<FontAwesomeIcon className='icon' icon={icon} />) : (<></>)}
      </>
    )
  }

  //checking if the function call be called
  const onClickHandlerFacade = () => {
    if(!disabled && onClickHandler) onClickHandler();
  }

  return (
    <div
      className={`custom-button ${additionalClass} ${disabled ? 'disabled' : 'enabled'}`}
      onClick={onClickHandlerFacade}>

      {route ? (
        isExternalLink ? (
          <a href={route} target={`${target ? target : '_blank'}`}>
            {renderContent()}
          </a>
        ) : (
            <NavLink to={route}>
              {renderContent()}
            </NavLink>
          )
      ) : (
            renderContent()
        )}
    </div>
  );
}
