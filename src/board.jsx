import React from "react";
import Square from "./square";

const BOARD_ROW_COUNT = 3;
const SQUARE_COUNT_PER_ROW = 3;

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRows(row) {
    const squares = Array(SQUARE_COUNT_PER_ROW).fill(null);
    return squares.map((square, i) => {
      return this.renderSquare(row * SQUARE_COUNT_PER_ROW + i);
    });
  }

  render() {
    const rows = Array(BOARD_ROW_COUNT).fill(null);
    const board = rows.map((row, i) => {
      return (
        <div key={i} className="board-row">
          {this.renderRows(i)}
        </div>
      );
    });

    return <div>{board}</div>;
  }
}
