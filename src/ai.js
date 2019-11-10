import _ from "lodash";

export default function ai(type, randnum, comArr, userArr) {
  let answer;
  switch (type) {
    case "Simple Single": {
      randnum > 0.66666
        ? (answer = "R")
        : randnum > 0.33333
        ? (answer = "S")
        : (answer = "P");
      break;
    }
    case "Simple Rotation": {
      randnum > 0.5
        ? comArr[comArr.length - 1] == "R"
          ? (answer = "S")
          : comArr[comArr.length - 1] == "S"
          ? (answer = "P")
          : (answer = "R")
        : comArr[comArr.length - 1] == "R"
        ? (answer = "P")
        : comArr[comArr.length - 1] == "S"
        ? (answer = "R")
        : (answer = "S");
      break;
    }
    case "Simple Frequency": {
      let cnt = _.countBy(userArr, o => o);
      let cntR = 0 + cnt["R"];
      let cntP = 0 + cnt["P"];
      let cntS = 0 + cnt["S"];
      let cntArr = _.sortBy(
        [
          { cnt: cntR, name: "R" },
          { cnt: cntP, name: "P" },
          { cnt: cntS, name: "S" }
        ],
        o => -o.cnt
      );
      console.log(cntArr);
      answer = winningAns(cntArr[0].name);
      break;
    }
    case "Recent Frequency": {
      let cnt = _.countBy(
        userArr.length >= 10 ? _.drop(userArr, userArr.length - 10) : userArr,
        o => o
      );
      let cntR = 0 + cnt["R"];
      let cntP = 0 + cnt["P"];
      let cntS = 0 + cnt["S"];
      let cntArr = _.sortBy(
        [
          { cnt: cntR, name: "R" },
          { cnt: cntP, name: "P" },
          { cnt: cntS, name: "S" }
        ],
        o => -o.cnt
      );
      console.log(cntArr);
      answer = winningAns(cntArr[0].name);
      break;
    }
    case "Pattern Matching": {
      let patternArr = userArr.map((val, i) =>
        i != userArr.length - 1
          ? {
              first: val,
              next: userArr[i + 1]
            }
          : null
      );
      let cntPat = _.countBy(patternArr, o =>
        o != null && o.first == userArr[userArr.length - 1] ? o.next : null
      );
      delete cntPat.null;
      let cntR = cntPat["R"] || 0;
      let cntP = cntPat["P"] || 0;
      let cntS = cntPat["S"] || 0;
      let cntArr = _.sortBy(
        [
          { cnt: cntR, name: "R" },
          { cnt: cntP, name: "P" },
          { cnt: cntS, name: "S" }
        ],
        o => -o.cnt
      );
      answer = winningAns(cntArr[0].name);
      break;
    }
    case "CXO Algorithm": {
      let patternArr = userArr.map((val, i) =>
        i != userArr.length - 1
          ? {
              first: val,
              next: userArr[i + 1]
            }
          : null
      );
      let cntPat = _.countBy(patternArr, o =>
        o != null && o.first == userArr[userArr.length - 1] ? o.next : null
      );
      delete cntPat.null;
      let cntR = cntPat["R"] || 0;
      let cntP = cntPat["P"] || 0;
      let cntS = cntPat["S"] || 0;
      let cntRprb = cntR / (cntP + cntR + cntS);
      let cntPprb = cntP / (cntP + cntR + cntS);
      let cntSprb = cntS / (cntP + cntR + cntS);
      let ran = Math.random();
      answer =
        ran < cntRprb
          ? winningAns("R")
          : ran < 1 - cntSprb
          ? winningAns("P")
          : winningAns("S");

      break;
    }
    default: {
      answer = justRand();
    }
  }
  return answer;
}

function justRand() {
  let ra = Math.random();
  return ra > 0.66666 ? "R" : ra > 0.33333 ? "S" : "P";
}

function winningAns(input) {
  return input == "R" ? "P" : input == "P" ? "S" : "R";
}
