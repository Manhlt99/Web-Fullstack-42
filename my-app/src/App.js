import React, { Component } from "react";
import Header from "./components/header";
import SearchForm from "./components/formSearch";
import ImageCard from "./components/imageCard";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          src:
            "https://media0.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif?cid=3c8e86844hypjd2606je1fbg5vb7jswjj7ukhf9di1tl2fmv&rid=giphy.gif",
          alt: "gift-cat",
          title: "THOR",
        },
        {
          src:
            "https://media0.giphy.com/media/ES4Vcv8zWfIt2/giphy.gif?cid=3c8e86844hypjd2606je1fbg5vb7jswjj7ukhf9di1tl2fmv&rid=giphy.gif",
          alt: "gift-cat-2",
          title: "CAT",
        },
        {
          src:
            "https://media4.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif?cid=3c8e86844hypjd2606je1fbg5vb7jswjj7ukhf9di1tl2fmv&rid=giphy.gif",
          alt: "gift-cat-3",
          title: "CAT 2",
        },
      ],
    };
  }

  changeDataImage = (data) => {
    debugger
    this.setState({
      images: data
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <SearchForm changDataImage={this.changeDataImage}/>
        </div>
        
        {this.state.images.map((image, idx) => {
          {
            return <ImageCard key={idx} src={image.src} title={image.title} />;
          }
        })}
      </div>
    );
  }
}
