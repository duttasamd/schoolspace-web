import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashCard from "./DashCard";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faUsers,
  faUserGraduate,
  faChalkboardTeacher,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      sidenavtoggleicon: faAngleDoubleLeft,
    };
  }
  render() {
    const handleMenuToggle = () => {
      this.props.toggleSidenav((isopen) => {
        if (isopen) {
          this.setState({
            sidenavtoggleicon: faAngleDoubleRight,
          });
        } else {
          this.setState({
            sidenavtoggleicon: faAngleDoubleLeft,
          });
        }
      });
    };

    return (
      <div>
        <button
          id="btnSideNavToggle"
          className="btn btn-primary px-1 rounded-0 mt-1"
          onClick={handleMenuToggle}
        >
          <FontAwesomeIcon icon={this.state.sidenavtoggleicon} />
        </button>

        <div class="container-fluid maxw-90">
          <div className="row">
            <div className="col-sm">
              <DashCard title="Total Users" stats="4357" icon={faUsers} />
            </div>
            <div className="col-sm">
              <DashCard title="Students" stats="4121" icon={faUserGraduate} />
            </div>
            <div className="col-sm">
              <DashCard
                title="Teachers"
                stats="181"
                icon={faChalkboardTeacher}
              />
            </div>
            <div className="col-sm">
              <DashCard title="Others" stats="55" icon={faUserCircle} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
