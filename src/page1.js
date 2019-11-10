import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

class Page1 extends Component {
  render() {
    return (
      <div style={{ fontFamily: "Jua", fontSize: 30 }}>
        <p>
          안녕하세요.
          <br />
          CXO의 AI 가위바위보 Application입니다.
          <br />
          윤희정 교수님 사랑합니다.
        </p>
        <br />
        <p> 도전하는 인간이여, 그대는 누구인가? </p>
        <Input
          focus
          icon="user circle"
          iconPosition="left"
          placeholder="이름"
          size="mini"
          onChange={e => this.props.challenger("name", e.target.value)}
        />
        {"    "}
        <Input
          focus
          icon="mail"
          iconPosition="left"
          placeholder="E-mail"
          size="mini"
            onChange={e => this.props.challenger("email", e.target.value)}
        />
        <br />
        <br />
        <br />
        <p>
          AI 알고리즘을 선택하세요. <br />
          <p>
            <Button
              size="massive"
              onClick={() => this.props.page2("Simple Single")}
            >
              {" "}
              Simple Single{" "}
            </Button>
            <Button
              size="massive"
              onClick={() => this.props.page2("Simple Rotation")}
            >
              {" "}
              Simple Rotation{" "}
            </Button>
            <Button
              size="massive"
              onClick={() => this.props.page2("Simple Frequency")}
            >
              {" "}
              Simple Frequency{" "}
            </Button>
            <Button
              size="massive"
              onClick={() => this.props.page2("Recent Frequency")}
            >
              {" "}
              Recent Frequency{" "}
            </Button>
            <Button
              positive
              size="massive"
              onClick={() => this.props.page2("Pattern Matching")}
            >
              {" "}
              Pattern Matching{" "}
            </Button>
            <Button
              primary
              size="massive"
              onClick={() => this.props.page2("CXO Algorithm")}
            >
              {" "}
              CXO Algorithm{" "}
            </Button>
          </p>
        </p>
        <p>
          {" "}
          리더보드
          <br />
          <Button
            size="huge"
            color="yellow"
            content="LeaderBoard"
            icon="chess king"
            onClick ={()=>this.props.home(3)}
          />
        </p>
      </div>
    );
  }
}

export default Page1;
