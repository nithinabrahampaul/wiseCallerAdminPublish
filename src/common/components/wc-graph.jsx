import { Card } from "react-bootstrap";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import moment from "moment";

export const WCGraph = ({
  title,
  totalCount = [],
  graphData = [],
  filters,
  type = "monthly",
}) => {
  let months = [];
  let diff =
    type === "daily"
      ? moment().diff(moment().subtract(15, "days").utc(true).toDate(), "days")
      : moment(filters?.end_date).diff(filters?.filtered_date?.[0], "months");

  for (let i = 0; i <= diff + 1; i++) {
    if (type === "daily") {
      let month = moment().subtract(15, "days").add(i, "day").format("DD-MMM");
      months.push({ name: month, index: i + 1, count: 0 });
    } else {
      let month = moment(filters?.filtered_date?.[0])
        .add(i, "month")
        .format("MMMM-YYYY");
      months.push({ name: month, index: i + 1, count: 0 });
    }
  }

  const data =
    type === "daily"
      ? {
          labels: months.map((item) => item.name),
          series: [
            months.map((item) => {
              let value = graphData.find(
                (graph) =>
                  moment(item.name, "DD-MMM").format("DD") === `${graph._id}`
              );
              return (item.count = value ? value.count : item.count);
            }),
          ],
        }
      : {
          labels: months.map((item) => item.name),
          series: [
            months.map((item) => {
              let value = graphData.find(
                (graph) =>
                  moment(item.name, "MMMM-YYYY").format("M-YYYY") ===
                  `${graph._id.month}-${graph._id.year}`
              );
              return (item.count = value ? value.count : item.count);
            }),
          ],
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
        </div>
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
