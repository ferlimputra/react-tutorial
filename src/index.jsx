import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./board";

const PLAYER_1_SYMBOL = "X";
const PLAYER_2_SYMBOL = "O";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          cell: null,
        },
      ],
      stepNumber: 0,
      player1IsNext: true,
      ascending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentBoard = history[history.length - 1];
    const squares = [...currentBoard.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.player1IsNext ? PLAYER_1_SYMBOL : PLAYER_2_SYMBOL;
    this.setState({
      history: [...history, ...[{ squares, cell: i }]],
      stepNumber: history.length,
      player1IsNext: !this.state.player1IsNext,
    });
  }

  toggleSort() {
    this.setState({
      ascending: !this.state.ascending,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      player1IsNext: step % 2 === 0,
    });
  }

  renderHistory() {
    const history = this.state.history;
    console.log(history);
    const renderedHistory = history.map((step, move) => {
      const col = (step.cell % 3) + 1;
      const row = parseInt(step.cell / 3) + 1;
      const coordinate = "(" + col + ", " + row + ")";
      const description = move
        ? "Go to move #" + move + " " + coordinate
        : "Go to game start";
      const style =
        move === this.state.stepNumber ? { fontWeight: "bold" } : {};
      return (
        <li key={move}>
          <button type="button" style={style} onClick={() => this.jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    });
    return this.state.ascending ? renderedHistory : renderedHistory.reverse();
  }

  render() {
    const history = this.state.history;
    const currentBoard = history[this.state.stepNumber];
    const currentPlayer = this.state.player1IsNext
      ? PLAYER_1_SYMBOL
      : PLAYER_2_SYMBOL;
    const winner = calculateWinner(currentBoard.squares);
    const sort = "Sort " + (this.state.ascending ? "^" : "v");
    const moves = this.renderHistory();
    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + currentPlayer;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentBoard.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button type="button" onClick={() => this.toggleSort()}>
            {sort}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
