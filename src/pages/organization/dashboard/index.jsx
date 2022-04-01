import React, { useEffect, useState } from "react";
import {
  faBarcode,
  faBiking,
  faStopwatch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { WCCounter } from "../../../common/components/wc-counter";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { useLoader, useOrganization } from "../../../common/hooks";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { WCGraph } from "../../../common/components/wc-graph";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { componentRoutes } from "../../../common/contants";
import { WCPieGraph } from "../../../common/components/wc-pie-graph";
import { DashboardFilter } from "./filter";

const overviews = [
  {
    title: "Total Employees",
    count: 0,
    icon: faUsers,
    key: "totalEmployees",
    url: "/organization/employees",
  },
  {
    title: "Total Coupons",
    count: 0,
    icon: faBarcode,
    key: "totalCoupons",
    url: "/organization/coupons",
  },
  // {
  //   title: "Available Slots",
  //   count: 55,
  //   icon: faCheckCircle,
  // },
  {
    title: "Work Life Balance",
    count: 0,
    icon: faStopwatch,
    key: "totalWorkLifeBalance",
    url: "/organization/employees?work_life_balance=true",
  },
  {
    title: "Road Safety",
    count: 0,
    icon: faBiking,
    key: "totalRoadSafety",
    url: "/organization/employees?road_safety=true",
  },
  {
    title: "Calendar Sync",
    count: 0,
    icon: faCalendarAlt,
    key: "totalCalendarSync",
    url: "/organization/employees?calender_sync=true",
  },
  {
    title: "Custom Status",
    count: 0,
    icon: faPhoenixSquadron,
    key: "totalCustomStatus",
    url: "/organization/employees?custom_status=true",
  },
];

const OrganizationDashboard = () => {
  const [summary, setSummary] = useState([]);
  const [filters, setFilters] = useState({});
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [cookies] = useCookies();
  const { getOrganizationOverview, overview } = useOrganization();
  const { loading } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizationOverview({ role: cookies.role, ...filters });
  }, [getOrganizationOverview, cookies, filters]);

  useEffect(() => {
    if (overview) {
      if (!overview.totalCoupons) {
        navigate(componentRoutes.organizationAccountSubscription);
      }
      setSummary(
        overviews.map((item) => {
          return {
            ...item,
            count: Object.keys(overview).includes(item.key)
              ? overview[item.key]
              : 0,
          };
        })
      );
    }
  }, [overview, navigate]);

  const onHandleFilters = (value) => {
    setFilters(value);
    setFilterVisible(false);
  };

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{"Dashboard"}</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={setFilterVisible.bind(this, true)}
            >
              Filter
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Row className="justify-content-md-center">
        <Col sm={12} md={12} xs={12} className="mb-4 d-none d-sm-block">
          <WCGraph
            title={"Employees"}
            totalCount={overview?.totalEmployees}
            graphData={overview?.monthlyUsers}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={8}>
          <Row>
            {summary.map((item, index) => (
              <Col xs={12} sm={6} xl={6} className="mb-4" key={index}>
                <WCCounter
                  title={item.title}
                  count={item.count}
                  icon={item.icon}
                  url={item.url}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <WCPieGraph
            title={"Traffic Share"}
            graphData={overview?.deviceSummary}
          />
        </Col>
      </Row>
      {isFilterVisible && (
        <DashboardFilter
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          onHandleFilters={onHandleFilters}
        />
      )}
    </React.Fragment>
  );
};

export default OrganizationDashboard;
