import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(json => {
        this.setState({ quotes: json.results, loading: false });
      });
  }

  render() {
    console.log("See quotes?", this.state.quotes);
    if (this.state.loading) {
      return <div> One moment please, loading...</div>;
    }

    return (
      <div>
        <h1>Quotes</h1>
        {this.state.quotes.map(quote => (
          <Quote
            text={quote.quoteText}
            author={quote.quoteAuthor}
            key={quote.id}
          />
        ))}
      </div>
    );
  }
}
