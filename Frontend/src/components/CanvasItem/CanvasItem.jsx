import React from "react";
import "./CanvasItem.module.scss";

const CanvasItem = ({ item }) => {
  return (
    <div className="canvas-item">
      <p>{item.text}</p>
    </div>
  );
};

export default CanvasItem;