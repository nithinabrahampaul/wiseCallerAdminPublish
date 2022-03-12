import React, { useEffect, useState } from "react";
import {
  faBarcode,
  faBiking,
  faStopwatch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { WCCounter } from "../../../common/components/wc-counter";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { useLoader, useOrganization } from "../../../common/hooks";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { WCGraph } from "../../../common/components/wc-graph";
import { useCookies } from "react-cookie";

const overviews = [
  {
    title: "Total Employees",
    count: 0,
    icon: faUsers,
    key: "totalEmployees",
  },
  {
    title: "Total Coupons",
    count: 0,
    icon: faBarcode,
    key: "totalCoupons",
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
  },
  {
    title: "Road Safety",
    count: 0,
    icon: faBiking,
    key: "totalRoadSafety",
  },
  {
    title: "Calendar Sync",
    count: 0,
    icon: faCalendarAlt,
    key: "totalCalendarSync",
  },
  {
    title: "Custom Status",
    count: 0,
    icon: faPhoenixSquadron,
    key: "totalCustomStatus",
  },
];

const OrganizationDashboard = () => {
  const [summary, setSummary] = useState([]);
  const [cookies] = useCookies();
  const { getOrganizationOverview, overview } = useOrganization();
  const { loading } = useLoader();

  useEffect(() => {
    getOrganizationOverview({ role: cookies.role });
  }, [getOrganizationOverview, cookies]);

  useEffect(() => {
    if (overview) {
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
  }, [overview]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{"Dashboard"}</h4>
        </div>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <WCGraph
            title={"Employees"}
            totalCount={overview?.totalEmployees}
            graphData={overview?.monthlyUsers}
          />
        </Col>
      </Row>

      <Row>
        {summary.map((item, index) => (
          <Col xs={12} sm={6} xl={4} className="mb-4" key={index}>
            <WCCounter title={item.title} count={item.count} icon={item.icon} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default OrganizationDashboard;
