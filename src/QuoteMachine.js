import React, { Component } from "react";

class QuoteMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        content: "",
        image: ""
      },
      hasQuote: false
    };

    this.END_POINT = "https://api.chucknorris.io/jokes/random";
  }

  getRandomQuote = e => {
    fetch(this.END_POINT)
      .then(res => res.json())
      .then(data => {
        if (data.value && data.icon_url) {
          let { quote } = this.state;
          quote.content = data.value;
          quote.image = data.icon_url;
          this.setState({ quote }, () => {
            this.setState({ hasQuote: true });
          });
        } else {
          console.error("no quotes has been found");
        }
      });
  };

  renderQuote = () => {
    return (
      <>
        <img src={this.state.quote.image} alt="quote" />
        <br />
        <p>{this.state.quote.content}</p>
      </>
    );
  };

  render() {
    const { hasQuote } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>quote machine</h1>
        <button onClick={this.getRandomQuote}> get quotes </button>
        <br />
        {hasQuote === true ? this.renderQuote() : "loading"}
      </div>
    );
  }
}

export default QuoteMachine;
