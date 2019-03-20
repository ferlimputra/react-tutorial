import React from "react";

export default props => {
  return (
    <button type="button" className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
