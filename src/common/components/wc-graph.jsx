import { Card } from "react-bootstrap";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import moment from "moment";

export const WCGraph = ({ title, totalCount = [], graphData = [] }) => {
  let months = [];
  let diff = moment(moment().utc(true)).diff(
    moment().startOf("year").startOf("day").utc(true).toISOString(),
    "months"
  );

  for (let i = 0; i < diff + 1; i++) {
    let month = moment().month(i).format("MMMM");
    months.push(month);
  }

  const data = {
    labels: months,
    series: [graphData.map((item) => item.count)],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: (value) => `$${value / 1}k`,
    },
  };

  const plugins = [ChartistTooltip()];
  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>{totalCount}</h3>
          {/* <small className="fw-bold mt-2">
          <span className="me-2">Yesterday</span>
          <FontAwesomeIcon
            icon={percentageIcon}
            className={`${percentageColor} me-1`}
          />
          <span className={percentageColor}>{percentage}%</span>
        </small> */}
        </div>
        {/* <div className="d-flex ms-auto">
        <Button variant="secondary" size="sm" className="me-2">
          Month
        </Button>
        <Button variant="primary" size="sm" className="me-3">
          Week
        </Button>
      </div> */}
      </Card.Header>
      <Card.Body className="p-2">
        <Chartist
          data={data}
          options={{ ...options, plugins }}
          type="Line"
          className="ct-series-g ct-double-octave"
        />
      </Card.Body>
    </Card>
  );
};
