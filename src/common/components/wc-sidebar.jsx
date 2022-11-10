import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Navbar } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactHero from "../../assets/images/img/technologies/react-hero-logo.svg";
import { organizationMenu, adminMenu } from "../contants/sidebar-menu";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { componentRoutes } from "../contants";

export const WCSidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const [cookies] = useCookies();
  const role = cookies?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      let tokenExpired = isExpired(cookies.token);
      if (tokenExpired) {
        navigate(componentRoutes.login);
      }
    } else {
      navigate(componentRoutes.login);
    }
  }, [cookies, navigate]);

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: NavLink, to: link };

    return (
      <Nav.Item className={navItemClassName} key={"sss"}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <React.Fragment>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5" as={NavLink} to={"/"}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={setCollapse.bind(this, !collapse)}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition
        timeout={300}
        in={collapse}
        classNames="sidebar-transition"
      >
        <SimpleBar
          className={`collapse ${
            collapse ? "show" : ""
          } sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={setCollapse.bind(this, !collapse)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Wise Caller" link={"/"} image={ReactHero} />
              {role === "ADMIN"
                ? adminMenu.map((item, index) => (
                    <NavItem
                      key={index}
                      title={item.title}
                      link={item.link}
                      icon={item.icon}
                    />
                  ))
                : organizationMenu.map((item, index) => (
                    <NavItem
                      key={index}
                      title={item.title}
                      link={item.link}
                      icon={item.icon}
                    />
                  ))}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </React.Fragment>
  );
};
