import { Card } from "react-bootstrap";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import moment from "moment";

export const WCBarGraph = ({
  title,
  totalCount = [],
  graphData = [],
  filters,
  type = "monthly",
}) => {
  let months = [];
  let statuses = [];

  let unique_status = Array.from(
    new Set(graphData.map((item) => item._id.status))
  );

  unique_status.map((item) => {
    let payload = {
      status: item,
      data: [],
    };
    return statuses.push(payload);
  });

  let diff =
    type === "daily"
      ? moment(filters?.end_date).diff(
          moment().startOf("month").utc(true).toDate(),
          "days"
        )
      : moment(filters?.end_date).diff(filters?.start_date, "months");

  for (let i = 0; i < diff + 1; i++) {
    if (type === "daily") {
      let month = moment().startOf("month").add(i, "day").format("DD-MMM");
      months.push({ name: month, index: i + 1, count: 0 });
    } else {
      let month = moment(filters?.start_date)
        .add(i, "month")
        .format("MMMM-YYYY");
      months.push({ name: month, index: i + 1, count: 0 });
    }
  }

  const options = {
    seriesBarDistance: 12,
    axisX: {
      offset: 60,
    },
    axisY: {
      offset: 80,
      labelInterpolationFnc: (value) => `${value / 1}`,
      scaleMinSpace: 30,
    },
  };

  statuses.map((status) => {
    let data = months.map((month) => {
      let value = graphData.find((graph) => {
        if (graph._id.status === status.status) {
          if (graph._id.called_on.toString().length > 1) {
            if (
              moment(month.name, "DD-MMM").format("DD") ===
              `${graph._id.called_on.toString()}`
            ) {
              return graph;
            }
          } else {
            if (
              moment(month.name, "DD-MMM").format("D") ===
              `${graph._id.called_on.toString()}`
            ) {
              return graph;
            }
          }
        }
      });
      return (month.count = value ? value.count : month.count);
    });
    return (status.data = data);
  });

  const data =
    type === "daily"
      ? {
          labels: months.map((item) => item.name),
          series: statuses.map((item) => item.data),
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
          type="Bar"
          className="ct-series-g ct-double-octave"
        />
      </Card.Body>
    </Card>
  );
};
