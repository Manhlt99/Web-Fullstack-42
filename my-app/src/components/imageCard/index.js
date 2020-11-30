import React, { Component } from "react";

export default class index extends Component {
  render() {
    const { src, title, alt = "logo" } = this.props;
    return (
      <div>
        <div className="container mt-3">
          <div className="image-card">
            <div className="row my-3">
              <div className="col-12 col-md-4">
                <img src={src} alt={alt}></img>
              </div>
              <div className="col-12 col-md-8">
                <h3>{title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
