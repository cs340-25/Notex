import React from "react";
import CanvasItem from "../CanvasItem/CanvasItem";
import styles from "./Canvas.module.scss";

const Canvas = ({ canvasItems, setCanvasItems }) => {
  const addItem = () => {
    const newItem = { id: canvasItems.length + 1, text: "New Item" };
    setCanvasItems([...canvasItems, newItem]);
  };

  return (
    <div className={styles.canvas}>
      <button onClick={addItem} className="add-item-btn">
        Add Item
      </button>
      {canvasItems.map((item) => (
        <CanvasItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Canvas;
