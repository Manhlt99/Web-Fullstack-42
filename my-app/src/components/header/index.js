import React, { Component } from "react";
import logo from "../../logoGIPHY.svg";

export default class index extends Component {
  render() {
    return (
      <div className="d-flex align-items-center mt-4 flex-column">
        <img src={logo} alt="logo" />
        <h3 className="mt-2">Let's Search</h3>
      </div>
    );
  }
}
