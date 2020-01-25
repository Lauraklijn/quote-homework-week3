import React, { Component } from "react";
import QuoteSearcher from "./QuoteSearcher";

export default class Quote extends Component {
  state = {
    likes: 0,
    disLikes: 0
  };

  // Likes (Step 4 --> Get like):
  incrementLikes = () => {
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

  // Dislikes (step 4 --> Lifting state):
  decrementLikes = () => {
    console.log("dislikes?", this.state.disLikes);
    this.setState({
      disLikes: this.state.disLikes + 1
    });
  };

  // Dislikes (step 5 --> (Lifting state)
  handleClickDisLike = () => {
    this.setState({
      likes: false,
      disLikes: true
    });
    return this.props.getDisLikes(this.props.id);
  };

  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <p>
          {"By:"} {this.props.author}
        </p>
        <p>
          <div>
            <button onClick={this.handleClickLike}>Like</button>
          </div>
          <div>
            <button onClick={this.handleClickDisLike}>Dislike</button>
          </div>
        </p>
      </div>
    );
  }
}
