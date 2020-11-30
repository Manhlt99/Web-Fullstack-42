import React, { Component } from "react";

import axios from 'axios';

export default class index extends Component {
    constructor(props){
        super(props)

        this.state = {
            keyword: "Web Fullstack"
        }
    }
    handleClick = async (event) => { 
        console.log('click', event.target);
        const { keyword } = this.state;

        const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi`
        
        const res  = await axios({
            url: urlApi,
            method: 'GET',
        });

        const newImages = res.data.data.map(img => {
            return ({
                src: img.images.downsized.url,
                alt: img.title,
                title: img.title,
            })
        });
        this.props.changDataImage(newImages);
    }
    handleChange = (e) => {
        this.setState({
            keyword: e.target.value,
            change: true,
        });
        console.log(this.state.keyword);
    }
  render() {
    return (
      <div className="d-flex mb-3">
        <input className="form-control mr-2 py-4" onChange={this.handleChange}></input>
        <button className="btn btn-primary px-4" onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
