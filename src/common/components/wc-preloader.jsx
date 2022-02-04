import React from "react";
import { Image } from "react-bootstrap";
import Loader from "../../assets/images/img/technologies/react-logo-transparent.svg";

export const WCPreLoader = () => {
  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={Loader}
        height={40}
      />
    </div>
  );
};
