import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashCard from "./DashCard";
import "./dashboard.css";

import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faUsers,
  faUserGraduate,
  faChalkboardTeacher,
  faUserCircle,
  faThList,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Calendar";

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

    const dashcardclass = "card shadow-sm h-100 py-2";

    return (
      <div>
        <button
          id="btnSideNavToggle"
          className="btn btn-primary px-1 rounded-0 mt-1"
          onClick={handleMenuToggle}
        >
          <FontAwesomeIcon icon={this.state.sidenavtoggleicon} />
        </button>

        <div className="container-fluid maxw-90">
          <div className="row">
            <div
              className="col-sm"
              onClick={() => this.props.pageSelect("users")}
            >
              <DashCard
                title="Total Users"
                stats="4357"
                icon={faUsers}
                dashcardclass={dashcardclass + " border-left-grey"}
              />
            </div>
            <div className="col-sm">
              <DashCard
                title="Students"
                stats="4121"
                icon={faUserGraduate}
                dashcardclass={dashcardclass + " border-left-blue"}
              />
            </div>
            <div className="col-sm">
              <DashCard
                title="Teachers"
                stats="181"
                icon={faChalkboardTeacher}
                dashcardclass={dashcardclass + " border-left-red"}
              />
            </div>
            <div className="col-sm">
              <DashCard
                title="Others"
                stats="55"
                icon={faUserCircle}
                dashcardclass={dashcardclass + " border-left-orange"}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-9">
              <Calendar />
            </div>
            <div className="col-md-3">
              <div className="row">
                <div className="col">
                  <DashCard
                    title="Standards"
                    stats="10"
                    icon={faThList}
                    dashcardclass={dashcardclass}
                  />
                </div>
              </div>
              <div className="row py-3">
                <div className="col">
                  <DashCard
                    title="Sections"
                    stats="40"
                    icon={faHashtag}
                    dashcardclass={dashcardclass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
