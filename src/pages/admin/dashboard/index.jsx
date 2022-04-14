import React, { useEffect, useState } from "react";
import {
  faBarcode,
  faBiking,
  faCalendarAlt,
  faStopwatch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import { useLoader, useOrganization } from "../../../common/hooks";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { WCGraph } from "../../../common/components/wc-graph";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { WCCounter } from "../../../common/components/wc-counter";
import { WCPieGraph } from "../../../common/components/wc-pie-graph";
import { DashboardFilter } from "./filter";
import moment from "moment";
import { WCAppliedFilter } from "../../../common/components/wc-applied-filter";

const overviews = [
  {
    title: "Total Employees",
    count: 0,
    icon: faUsers,
    key: "totalEmployees",
    url: "/admin/users",
  },
  {
    title: "Total Coupons",
    count: 0,
    icon: faBarcode,
    key: "totalCoupons",
    url: "/admin/coupon",
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
    url: "/admin/users?work_life_balance=true",
  },
  {
    title: "Road Safety",
    count: 0,
    icon: faBiking,
    key: "totalRoadSafety",
    url: "/admin/users?road_safety=true",
  },
  {
    title: "Calendar Sync",
    count: 0,
    icon: faCalendarAlt,
    key: "totalCalendarSync",
    url: "/admin/users?calender_sync=true",
  },
  {
    title: "Custom Status",
    count: 0,
    icon: faPhoenixSquadron,
    key: "totalCustomStatus",
    url: "/admin/users?custom_status=true",
  },
];

const AdminDashboard = () => {
  const [summary, setSummary] = useState([]);
  const [filters, setFilters] = useState({
    start_date: moment().startOf("year").startOf("day").utc(true).toDate(),
    end_date: moment().utc(true).toDate(),
  });
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const {
    getOrganizationOverview,
    overview,
    getAllOrganizations,
    allOrganizations,
  } = useOrganization();
  const { loading } = useLoader();

  useEffect(() => {
    getOrganizationOverview(filters);
  }, [getOrganizationOverview, filters]);

  useEffect(() => {
    getAllOrganizations();
  }, [getAllOrganizations]);

  useEffect(() => {
    if (allOrganizations?.length) {
      setOrganizations(
        allOrganizations.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    }
  }, [allOrganizations]);

  const onHandleFilters = (value) => {
    setFilters(value);
    setFilterVisible(false);
  };

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

      <WCAppliedFilter filters={filters} onUpdateFilter={setFilters} />

      <Row className="justify-content-md-center">
        <Col xs={12} xl={6} className="mb-4 d-none d-sm-block">
          <WCGraph
            title={"Employees"}
            totalCount={overview?.totalEmployees}
            graphData={overview?.monthlyUsers}
            filters={filters}
          />
        </Col>
        <Col xs={12} xl={6} className="mb-4 d-none d-sm-block">
          <WCGraph
            title={"Organization"}
            totalCount={overview?.totalOrganization}
            graphData={overview?.monthlyOrganization}
            filters={filters}
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
          filters={filters}
          organizations={organizations}
        />
      )}
    </React.Fragment>
  );
};

export default AdminDashboard;
