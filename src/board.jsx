import React from "react";
import PropTypes from "prop-types";
import Square from "./square";

const BOARD_ROW_COUNT = 3;
const SQUARE_COUNT_PER_ROW = 3;

export default class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
  }

  renderRows(row) {
    const newSquares = Array(SQUARE_COUNT_PER_ROW).fill(null);
    const squareIndex = i => row * SQUARE_COUNT_PER_ROW + i;
    return newSquares.map((square, i) => this.renderSquare(squareIndex(i)));
  }

  render() {
    const rows = Array(BOARD_ROW_COUNT).fill(null);
    const board = rows.map((row, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className="board-row">
        {this.renderRows(i)}
      </div>
    ));
    return <div>{board}</div>;
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};
