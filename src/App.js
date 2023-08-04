import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      color: "red",
    };
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({
      color: color,
    });
  }

  render() {
    return (
      <div id="app" className={this.state.color}>
        <QuoteBox
          onChangeAppColor={this.handleColorChange}
          color={this.state.color}
        />
      </div>
    );
  }
}

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: "",
      quoteAuthor: "",
      curColor: this.props.color,
      tweetUrl: "htpps://twitter.com/intent/tweet/?text=",
    };
    this.getNewQuote();
    this.getNewQuote = this.getNewQuote.bind(this);
    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  getNewQuote() {
    const app = this;
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const index = Math.floor(Math.random() * data.length);
        app.setState({
          quoteText: data[index].text,
          quoteAuthor: data[index].author,
          tweetUrl:
            "htpps://twitter.com/intent/tweet/?text=" +
            data[index].text.replace(/ /g, "+"),
        });
      });
  }

  handleNewQuote() {
    const colors = ["gray", "blue", "purple", "red", "orange", "green"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    while (color === this.state.color) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    this.props.onChangeAppColor(color);
    this.getNewQuote();
  }

  render() {
    return (
      <main id="quote-box">
        <div id="quote-content">
          <div id="text">{this.state.quoteText}</div>
          <div id="author">{this.state.quoteAuthor}</div>
        </div>
        <button id="new-quote" onClick={this.handleNewQuote}>
          Get New Quote
        </button>
        <a href={this.state.tweetUrl} id="tweet-quote" target="_blank">
          <i class="fab fa-twitter"></i> Tweet Quote
        </a>
      </main>
    );
  }
}

export default App;
