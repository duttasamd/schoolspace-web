import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DashCard(props) {
  return (
    <div class="card border-left-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col-9">
            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
              {props.title}
            </div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">
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
