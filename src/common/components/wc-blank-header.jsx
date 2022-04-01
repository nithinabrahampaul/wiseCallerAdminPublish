import React from "react";
import { Image, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ReactHero from "../../assets/images/img/technologies/react-hero-logo.svg";

export const WCBlankHeader = () => {
  return (
    <React.Fragment>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4"
      >
        <Navbar.Brand className="me-lg-5" as={NavLink} to={"/"}>
          <Image
            src={ReactHero}
            className="navbar-brand-light"
            style={{ marginRight: 14 }}
          />
          <span className="sidebar-text">Wise Caller</span>
        </Navbar.Brand>
      </Navbar>
    </React.Fragment>
  );
};
