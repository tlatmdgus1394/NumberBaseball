import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  onSubmitForm = (e) => {
    const { result, value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState({
        result: `홈런!`,
        tries: [...tries, { try: value, result: `홈런!` }],
      });
      alert("게임을 다시 시작합니다");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      let out = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 정답은 ${answer.join(",")}였습니다`,
        });
        alert("게임을 다시 시작합니다");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          } else {
            out += 1;
          }
          this.setState({
            tries: [
              ...tries,
              {
                try: value,
                result: `${strike}스트라이크, ${ball}볼`,
              },
            ],
          });
        }
      }
    }
  };

  render() {
    const { result, value, tries, answer } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도:`} value={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
