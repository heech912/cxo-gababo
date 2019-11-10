import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "semantic-ui-react";
import _ from "lodash";

import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import db from "./firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      algorithm: "",
      name: "unknown",
      email: "unknown",
      leaderBoard: {},
      type : "rank"
    };
  }
  page2 = algorithm => {
    this.setState({ page: 2, algorithm: algorithm });
  };

  challenger = (type, value) => {
    this.setState({ [type]: value });
  };

  sorting = type => {
    console.log(type);
    type == "time"
      ? this.setState(state => ({
          leaderBoard: _.sortBy(state.leaderBoard, o => (o.wins / o.total) * -1),
          type : "rank"
        }))
      : this.setState(state => ({
          leaderBoard: _.sortBy(state.leaderBoard, o => o.time),
          type : "time"
        }));
  };

  home = num => {
    db.collection("games")
      .get()
      .then(snapshot => {
        let arr = [];
        snapshot.forEach(doc => arr.push(doc.data()));
        return Promise.all(arr);
      })
      .then(res =>
        this.setState({
          page: num,
          leaderBoard: _.sortBy(res, o => (o.wins / o.total) * -1)
        })
      );
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.page == 1 ? (
            <Page1
              page2={this.page2}
              challenger={this.challenger}
              home={this.home}
            />
          ) : this.state.page == 2 ? (
            <Page2
              algorithm={this.state.algorithm}
              home={this.home}
              name={this.state.name}
              email={this.state.email}
              mode={this.state.algorithm}
            />
          ) : (
            <Page3
              leaderBoard={this.state.leaderBoard}
              home={this.home}
              sorting={this.sorting}
              type = {this.state.type}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
