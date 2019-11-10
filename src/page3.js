import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import _ from "lodash";
import moment from 'moment'

class Page3 extends Component {
  constructor(){
    super()
    this.state = {leaderBoard : []}
  }
  render() {
  console.log(this.props.type)
    return (
      <div style={{ fontFamily: "Jua", fontSize: 30 }}>
        <p style={{ fontFamily: "Jua", fontSize: 50 }}>LeaderBoard</p>
        <div>
          {" "}
          <Button
            icon="clock"
            size="massive"
            content="시간 정렬"
            color="green"
            onClick={() => this.props.sorting("rank")}
          />{" "}
          <Button
            icon="chess king"
            size="massive"
            content="순위 정렬"
            color="yellow"
            onClick={() => this.props.sorting("time")}
          />{" "}
          <Button
            negative
            size="Large"
            circular
            icon="home"
            onClick={() => this.props.home(1)}
          />{" "}
        </div>

        <Table inverted>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>순위</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>시간</Table.HeaderCell>
              <Table.HeaderCell>승수</Table.HeaderCell>
              <Table.HeaderCell>판수</Table.HeaderCell>
              <Table.HeaderCell>승률</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.leaderBoard.map(
              (val, index) => (
                <Table.Row>
                 {this.props.type == "rank" ? <Table.Cell>{`${index + 1}위`}</Table.Cell> : <Table.Cell> </Table.Cell> }
                  <Table.Cell>{val.name}</Table.Cell>
                  <Table.Cell>{val.email}</Table.Cell>
                  <Table.Cell>{moment.unix(val.time).format("YY년MM월DD일 hh:mm:ss a")}</Table.Cell>
                  <Table.Cell>{val.wins}</Table.Cell>
                  <Table.Cell>{val.total}</Table.Cell>
                  <Table.Cell>{(val.wins/val.total).toFixed(5)}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Page3;
