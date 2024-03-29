import { Nav, Image, Navbar, Dropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Profile4 from "../../assets/images/img/team/profile-picture-4.jpg";
import { useNavigate } from "react-router-dom";
import { componentRoutes } from "../contants";
import { useLoader, useOrganization } from "../hooks";
import { useEffect } from "react";
import { WCPreLoader } from "./wc-preloader";
import { useCookies } from "react-cookie";

export const WCHeader = () => {
  const navigate = useNavigate();
  const { organization, getOrganizationDetails } = useOrganization();
  const [cookies, , removeCookie] = useCookies();
  const { loading } = useLoader();
  const onLogout = async () => {
    removeCookie("email");
    removeCookie("role");
    removeCookie("token");
    navigate(componentRoutes.login);
  };

  useEffect(() => {
    if (cookies?.token && !organization) {
      getOrganizationDetails();
    }
  }, [getOrganizationDetails, cookies, organization]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center"></div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src={organization?.profile || Profile4}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">
                      {organization?.name}
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item
                  className="fw-bold"
                  onClick={navigate.bind(
                    this,
                    cookies?.role === "ADMIN"
                      ? componentRoutes.adminAccountProfile
                      : componentRoutes.organizationAccountProfile
                  )}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My
                  Profile
                </Dropdown.Item>

                {cookies?.role !== "ADMIN" && (
                  <Dropdown.Item
                    className="fw-bold"
                    onClick={navigate.bind(
                      this,
                      componentRoutes.organizationAccountSubscription
                    )}
                  >
                    <FontAwesomeIcon icon={faRocket} className="me-2" /> My
                    Subscription
                  </Dropdown.Item>
                )}
                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold" onClick={onLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
