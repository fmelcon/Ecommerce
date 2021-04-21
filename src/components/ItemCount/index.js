import React, { useState } from "react";
import "./styles.scss";
import { PlusIcon, MinusIcon } from "../Icons";
import PropTypes from "prop-types";

export function ItemCount({ stock, initial, onAdd }) {
  const [count, setCount] = useState(parseInt(initial));
  const addHandle = () => {
    setCount(count + 1);
  };

  const removeHandle = () => {
    setCount(count - 1);
  };

  const agregar = () => {
    onAdd(count);
  };

  return (
    <div className="counter">
      <div className="">
        <button
          disabled={count <= 1}
          className="counter__button"
          type="button"
          onClick={removeHandle}
        >
          <MinusIcon />
        </button>
        <span className="counter__display">{count}</span>
        <button
          disabled={count >= stock}
          className="counter__button"
          type="button"
          onClick={addHandle}
        >
          <PlusIcon />
        </button>
      </div>
      <p>
        <button className="counter__buttonadd" type="button" onClick={agregar}>
          Agregar carrito
        </button>
      </p>
    </div>
  );
}

ItemCount.propTypes = {
  stock: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ItemCount;
