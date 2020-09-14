import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import AdminHome from "../admin/AdminHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <div className="spinner">
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <AdminHome />
      </div>
    );
  }
}

export default Home;
