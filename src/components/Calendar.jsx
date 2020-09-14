import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ClipLoader } from "react-spinners";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="spinner">
          <ClipLoader
            size={100}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
    );
  }
}

export default Calendar;
