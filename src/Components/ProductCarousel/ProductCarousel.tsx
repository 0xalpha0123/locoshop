import React, { useState } from "react";
import "./ProductCarousel.scss";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import displaySliderSettingsJSON from "./CarouselConfig/display-carousel.settings.json";
import navSliderSettingsJSON from "./CarouselConfig/nav-carousel.settings.json";
import Slider from "react-slick";

export function ProductCarousel(props: any) {
  var displaySliderSettings = displaySliderSettingsJSON;
  var navSliderSettings = navSliderSettingsJSON;

  const [navSlider, setNavSlider] = useState(null);
  const [displaySlider, setDisplaySlider] = useState(null);
  return (
    <div className="product-carousel">
      <Slider
        {...displaySliderSettings}
        asNavFor={navSlider}
        className="slider-product-display"
        ref={(slider) => setDisplaySlider(slider)}
      >
        {props.imageURLs && props.imageURLs.length === 0 ? (
          <div>Loading...</div>
        ) : props.imageURLs ? (
          props.imageURLs.map((val: any, key: any) => {
            return (
              <div key={key} className="display-div">
                <img src={val} alt={key} className="diplay-image" />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </Slider>
      <Slider
        {...navSliderSettings}
        asNavFor={displaySlider}
        className="slider-product-nav"
        ref={(slider) => setNavSlider(slider)}
      >
        {props.imageURLs && props.imageURLs.length === 0 ? (
          <div>Loading...</div>
        ) : props.imageURLs && props.imageURLs.length > 1 ? (
          props.imageURLs.map((val: any, key: any) => {
            return (
              <div key={key} className="nav-div">
                <img src={val} alt={key} className="nav-image" />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </Slider>
    </div>
  );
}
