import React from "react";
import GoogleMapReact from "google-map-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import "./Map.scss";

const AnyReactComponent = ({ text }: any) => (
  <div className="pointer">
    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
    {text}
  </div>
);

//get lat and lng from the first address or return montreals lat lng
function getFirstAdressLatLng(addresses: any) {
  let montrealLatLng = {
    lat: 45.5048679,
    lng: -73.6495159,
  };

  let latLgnObj;

  if (addresses[0]) {
    const { lat, lng } = addresses[0].geometry.location;
    latLgnObj = { lat, lng };
  }

  return latLgnObj ?? montrealLatLng;
}

export function Map({ addresses }: any) {
  const zoom = 14;

  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCVrWLdQVaQ8kfrfr1hzD29T9VzQbMx81Y" }}
        defaultCenter={getFirstAdressLatLng(addresses)}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {addresses.map((address: any, index: number) => {
          const { lat, lng } = address.geometry.location;
          return (
            <AnyReactComponent
              key={index}
              lat={lat}
              lng={lng}
              text={address.name}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
