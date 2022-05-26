import { Card, Col, Row } from "react-bootstrap";
import Chartist from "react-chartist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import chartistPluginTooltip from "chartist-plugin-tooltips-updated";

export const WCPieGraph = ({ title, totalCount = [], graphData = [] }) => {
  let prepare_data = [
    {
      id: 1,
      label: "ANDROID",
      count: 0,
      color: "tertiary",
      icon: faMobileAlt,
    },
    {
      id: 2,
      label: "IOS",
      count: 0,
      color: "secondary",
      icon: faMobileAlt,
    },
    {
      id: 3,
      label: "OTHERS",
      count: 0,
      color: "primary",
      icon: faMobileAlt,
    },
  ];

  let total_devices = 0;
  graphData.map((item) => (total_devices += item.count));

  graphData.map((graph) => {
    if (graph._id === "ANDROID") {
      return (prepare_data[0].count = graph.count);
    } else if (graph._id === "IOS") {
      return (prepare_data[1].count = graph.count);
    } else {
      return (prepare_data[2].count += graph.count);
    }
  });

  const temp_series = prepare_data.map((d) => d.count);

  const { series = temp_series, donutWidth = 20 } = prepare_data;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: (value) =>
      `${Math.round((value / series.reduce(sum)) * 100)}%`,
  };

  const plugins = [chartistPluginTooltip()];

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <Chartist
              data={{ series }}
              options={{ ...options, plugins }}
              type="Pie"
              className="ct-golden-section"
            />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {prepare_data.map((d) => (
              <h6
                key={`circle-element-${d.id}`}
                className="fw-normal text-gray"
              >
                <FontAwesomeIcon
                  icon={d.icon}
                  className={`icon icon-xs text-${d.color} w-20 me-1`}
                />
                {` ${d.label} `}
                {`${
                  total_devices
                    ? Number(((d.count * 100) / total_devices).toFixed(2))
                    : 0
                }%(${d.count})`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
