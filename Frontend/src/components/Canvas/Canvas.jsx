import React, { useState, useRef } from "react";
import CanvasItem from "../CanvasItem/CanvasItem";
import styles from "./Canvas.module.scss";

const Canvas = ({ onToggleFullscreen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const canvasRef = useRef(null);

  const toggleFullscreen = () => {
    console.log("Toggling fullscreen...");
    setIsExpanded((prev) => !prev);
    if (onToggleFullscreen) {
      onToggleFullscreen(!isExpanded);
    }
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      content: `Item ${items.length + 1}`,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    console.log("Added item:", newItem);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div ref={canvasRef} className={styles.canvasContainer}>
      <button className={styles.fullscreenBtn} onClick={toggleFullscreen}>
        {isExpanded ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      <button className={styles.addItemBtn} onClick={addItem}>+ Add Item</button>
      <div className={styles.canvasContent}>
        {items.map((item) => (
          <CanvasItem key={item.id} id={item.id} content={item.content} onDelete={deleteItem} parentRef={canvasRef} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
