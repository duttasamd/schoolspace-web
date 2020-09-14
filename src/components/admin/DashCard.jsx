import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import FetchService from "../../services/FetchService";

class DashCard extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.state = {
      stats: <ClipLoader size={10} color={"#123abc"} loading />,
    };
  }

  componentDidMount() {
    FetchService.fetch(this.props.relendpoint, "GET", "text/plain", (data) => {
      this.loading = false;
      this.setState({ stats: data });
    });
  }

  render() {
    return (
      <div className={this.props.dashcardclass}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col-9">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {this.props.title}
              </div>
              <div className="h5 mb-0 font-weight-bold darkslategrey f-800">
                {this.state.stats}
              </div>
            </div>
            <div className="col-3">
              <FontAwesomeIcon icon={this.props.icon} size="2x" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashCard;
