import React, { Component } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import moment from "moment";

import db from "./firebase";

import ai from "./ai.js";

const randnum = Math.random();
const rps = {
  R: "#38c462",
  S: "#ee62f6",
  P: "#34cfd8"
};
const rpsName = {
  R: "바위",
  P: "보",
  S: "가위"
};
const rpsIcon = {
  R: "hand rock",
  P: "hand paper",
  S: "hand scissors"
};

function strToNum(str) {
  if (str == "R") {
    return 1;
  } else if (str == "P") {
    return 2;
  } else {
    return 3;
  }
}

function result(user, computer) {
  let minus = user - computer + 3;
  if (minus % 3 == 2) {
    return "L";
  } else if (minus % 3 == 1) {
    return "W";
  } else {
    return "D";
  }
}

class Page2 extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: "",
      currentAI: "",
      userList: [],
      aIList: [],
      record: [],
      userWin: 0
    };
  }

  fight = (mode, user) => {
    let com = ai(mode, randnum, this.state.aIList, this.state.userList);
    let res = result(strToNum(user), strToNum(com));
    this.setState(state => ({
      userList: [...state.userList, user],
      aIList: [...state.aIList, com],
      record: [...state.record, res],
      userWin: res == "W" ? state.userWin + 1 : state.userWin
    }));
  };

  render() {
    let revUList = this.state.userList.slice(0).reverse();
    let revAList = this.state.aIList.slice(0).reverse();
    let revRecord = this.state.record.slice(0).reverse();
    return (
      <div style={{ fontFamily: "Jua", fontSize: 30 }}>
        <p style={{ fontFamily: "Jua", fontSize: 50 }}>
          {this.props.algorithm + " "}알고리즘
        </p>
        <div>
          <Button
            icon="hand scissors"
            size="massive"
            content="가위"
            color="pink"
            onClick={() => this.fight(this.props.mode, "S")}
          />
          <Button
            color="olive"
            icon="hand rock"
            size="massive"
            content="바위"
            onClick={() => this.fight(this.props.mode, "R")}
          />
          <Button
            icon="hand paper"
            size="massive"
            content="보"
            color="teal"
            onClick={() => this.fight(this.props.mode, "P")}
          />{" "}
        </div>
        <br />
        <p>
          {`${this.props.name} 님의 승률 : ${(
            this.state.userWin / this.state.record.length
          ).toFixed(5)} ( ${this.state.userWin} / ${
            this.state.record.length
          } )`}
          {"  "}
          {this.props.mode == "CXO Algorithm" ? (
            <Button
              color="yellow"
              size="Large"
              circular
              icon="chess king"
              onClick={() => {
                this.state.record.length >= 30
                  ? db
                      .collection("games")
                      .add({
                        name: this.props.name,
                        email: this.props.email,
                        time: moment().format("X"),
                        total: this.state.record.length,
                        wins: this.state.userWin
                      })
                      .then(res => {
                        alert("저장완료! 리더보드에서 순위를 확인해볼까요?");
                        this.props.home(1);
                      })
                  : alert("30판 이상 해야 순위를 등록할 수 있어요!")
              }}
            />
          ) : (
            <Button
              negative
              size="Large"
              circular
              icon="x"
              onClick={() => this.props.home(1)}
            />
          )}
        </p>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">인간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">AI</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">결과</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {revUList.map((val, index) => (
              <Table.Row textAlign="center">
                <Table.Cell style={{ backgroundColor: rps[val] }}>
                  <Icon name={rpsIcon[val]} />
                  {rpsName[val]}
                </Table.Cell>
                <Table.Cell style={{ backgroundColor: rps[revAList[index]] }}>
                  {" "}
                  <Icon name={rpsIcon[revAList[index]]} />
                  {rpsName[revAList[index]]}
                </Table.Cell>
                {revRecord[index] == "W" ? (
                  <Table.Cell positive>승리</Table.Cell>
                ) : revRecord[index] == "L" ? (
                  <Table.Cell negative>패배</Table.Cell>
                ) : (
                  <Table.Cell> 비김</Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Page2;
