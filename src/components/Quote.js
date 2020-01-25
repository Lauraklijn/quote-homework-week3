import React, { Component } from "react";
import "./ColorQuotes.css";

export default class Quote extends Component {
  state = {
    likes: false,
    disLikes: false
  };

  // Likes (Step 4 --> Get like):
  addLikes = () => {
    console.log("Likes?", this.state.likes);
    this.setState({
      likes: this.state.likes + 1
    });
  };

  // Likes total (Step 5 --> (updating likes))
  handleClickLike = () => {
    this.setState({
      likes: true,
      disLikes: false
    });
    return this.props.getLikes(this.props.id);
  };

  // Dislikes (step 4 --> Get disLike):
  adddisLikes = () => {
    console.log("dislikes?", this.state.disLikes);
    this.setState({
      disLikes: this.state.disLikes + 1
    });
  };

  //Dislikes (step 5 --> (updating dislikes)
  handleClickDisLike = () => {
    this.setState({
      like: false,
      disLikes: true
    });
    return this.props.getDisLikes(this.props.id);
  };

  render() {
    return (
      <div>
        {this.state.likes ? (
          <p className="getGreen"> {this.props.text}</p>
        ) : this.state.disLikes ? (
          <p className="getRed">{this.props.text}</p>
        ) : (
          <p> {this.props.text}</p>
        )}

        <p className="author">By: {this.props.author} </p>
        <div>
          <button onClick={this.handleClickLike}>Like</button>
        </div>
        <div>
          <button onClick={this.handleClickDisLike}>Dislike</button>
        </div>
      </div>
    );
  }
}
