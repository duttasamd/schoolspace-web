import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DashCard(props) {
  return (
    <div className={props.dashcardclass}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col-9">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              {props.title}
            </div>
            <div className="h5 mb-0 font-weight-bold darkslategrey f-800">
              {props.stats}
            </div>
          </div>
          <div className="col-3">
            <FontAwesomeIcon icon={props.icon} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
}
