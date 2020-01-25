import React, { Component } from "react";
import Quote from "./Quote";
import { queryByTitle } from "@testing-library/react";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    likesCounter: 0,
    disLikeCounter: 0
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(json => {
        this.setState({ quotes: json.results, loading: false });
      });
  }

  // Sum likes(lifting state) by id to get it in the likeCounter
  getLikes = id => {
    const addLikes = this.state.quotes.map(quote => {
      if (quote.id === id) {
        return { ...quote, likes: quote.likes + 1 };
      }
      return quote;
    });
    this.setState({
      quotes: addLikes,
      likes: true,
      disLikes: false,
      likesCounter: this.state.likesCounter + 1
    });
  };

  // Sum dislikes(lifting state) by id to get it in the disLikeCounter
  getDisLikes = id => {
    const addDisLikes = this.state.quotes.map(quote => {
      if (quote.id === id) {
        return { ...quote, disLikes: quote.disLikes + 1 };
      }
      return quote;
    });
    this.setState({
      quotes: addDisLikes,
      likes: false,
      disLikes: true,
      disLikeCounter: this.state.disLikeCounter + 1
    });
  };

  render() {
    console.log("See quotes?", this.state.quotes);
    if (this.state.loading) {
      return <div> One moment please, loading...</div>;
    }

    return (
      <div>
        <h1>Quotes</h1>
        <h2>
          liked: {this.state.likesCounter} / disliked:{" "}
          {this.state.disLikeCounter}
        </h2>
        <button>Search for Quotes!</button>
        {!this.state.fetching &&
          this.state.quotes
            .sort((quote1, quote2) => quote2.likes - quote1.likes)
            .map(quote => (
              <Quote
                key={Math.random()}
                id={quote.id}
                text={quote.quoteText}
                author={quote.quoteAuthor}
                likes={quote.likes}
                disLikes={quote.disLikes}
                getLikes={this.getLikes}
                getDisLikes={this.getDisLikes}
              />
            ))}
      </div>
    );
  }
}
