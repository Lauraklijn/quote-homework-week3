import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    error: false,
    likesCounter: 0,
    disLikeCounter: 0
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(json => {
        this.setState({
          quotes: json.results,
          loading: false
        });
      })
      .catch(console.error);
  }

  // Sum likes(lifting state) by id to get it in the likeCounter
  getLikes = id => {
    const addLikes = this.state.quotes.map(quote => {
      if (quote.id === id) {
      }
      return quote;
    });
    this.setState({
      quotes: addLikes,
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
      disLikeCounter: this.state.disLikeCounter + 1
    });
  };

  render() {
    console.log("See quotes?", this.state.quotes);
    if (this.state.loading) {
      return <div> One moment please, loading...</div>;
    } else if (this.state.error) {
      return <div> Oops, something went wrong!</div>;
    } else
      return (
        <div>
          <h1>Quotes</h1>
          <h2>
            liked: {this.state.likesCounter} / disliked:{" "}
            {this.state.disLikeCounter}
          </h2>
          <h3>
            <form onSubmit={this.onSubmit}>
              <label>
                Search for a quote:{" "}
                <input type="text" placeholder="Search for a quote" />
              </label>
              <input type="submit" value="Search" />
            </form>
          </h3>
          {!this.state.fetching &&
            this.state.quotes
              .sort((quote1, quote2) => quote2.likes - quote1.likes)
              .map(quote => (
                <Quote
                  //key={Math.random()} --> als ik dit doe, dan is m'n waarschuwing weg in Dev console, maar dan doen m'n kleuren het niet meer
                  text={quote.quoteText}
                  author={quote.quoteAuthor}
                  likes={quote.likes}
                  disLikes={quote.disLikes}
                  getLikes={this.getLikes}
                  getDisLikes={this.getDisLikes}
                  id={quote.id}
                />
              ))}
        </div>
      );
  }
}
