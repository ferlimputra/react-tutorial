import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./board";

const PLAYER_1_SYMBOL = "X";
const PLAYER_2_SYMBOL = "O";

const calculateWinner = (squares) => {
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), cell: null }],
      stepNumber: 0,
      player1IsNext: true,
      ascending: true,
    };
  }

  handleClick(i) {
    const { stepNumber, history, player1IsNext } = this.state;
    const slicedHistory = history.slice(0, stepNumber + 1);
    const currentBoard = slicedHistory[slicedHistory.length - 1];
    const squares = [...currentBoard.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = player1IsNext ? PLAYER_1_SYMBOL : PLAYER_2_SYMBOL;
    this.setState({
      history: [...slicedHistory, ...[{ squares, cell: i }]],
      stepNumber: slicedHistory.length,
      player1IsNext: !player1IsNext,
    });
  }

  toggleSort() {
    this.setState(prevState => ({
      ascending: !prevState.ascending,
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      player1IsNext: step % 2 === 0,
    });
  }

  renderHistory() {
    const { history, stepNumber, ascending } = this.state;
    const renderedHistory = history.map((step, move) => {
      const col = (step.cell % 3) + 1;
      const row = parseInt(step.cell / 3, 10) + 1;
      const coordinate = `(${col}, ${row})`;
      const description = move ? `Go to move #${move} ${coordinate}` : "Go to game start";
      const style = move === stepNumber ? { fontWeight: "bold" } : {};

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={move}>
          <button type="button" style={style} onClick={() => this.jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    });
    return ascending ? renderedHistory : renderedHistory.reverse();
  }

  render() {
    const {
      history, stepNumber, ascending, player1IsNext,
    } = this.state;
    const currentBoard = history[stepNumber];
    const currentPlayer = player1IsNext ? PLAYER_1_SYMBOL : PLAYER_2_SYMBOL;
    const winner = calculateWinner(currentBoard.squares);
    const sort = `Sort ${ascending ? "^" : "v"}`;
    const moves = this.renderHistory();
    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${currentPlayer}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard.squares} onClick={i => this.handleClick(i)} />
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

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
