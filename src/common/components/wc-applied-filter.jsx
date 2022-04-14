import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import { filtersData } from "../contants";

export const WCAppliedFilter = ({ filters, onUpdateFilter }) => {
  const onRemoveFilter = (value) => {
    let temp = filters;
    delete temp[value];
    onUpdateFilter({ ...filters, ...temp });
  };

  return Object.keys(filters).length ? (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        {Object.keys(filters).map((item, index) => (
          <Badge className="badge-lg me-1" key={index}>
            {filtersData.find((filter) => filter.value === item).label}
            <Badge role={"button"}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"lg"}
                onClick={onRemoveFilter.bind(this, item)}
              />
            </Badge>
          </Badge>
        ))}
      </div>
    </div>
  ) : null;
};
