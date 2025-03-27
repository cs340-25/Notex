import React from "react";
import { Rnd } from "react-rnd";
import "./CanvasItem.module.scss";

const CanvasItem = ({ id, content, onDelete }) => {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 200,
        height: 100,
      }}
      className="canvas-item"
    >
      <div className="canvas-item-content">
        <button className="delete-btn" onClick={() => onDelete(id)}>
          ✕
        </button>
        {content}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
