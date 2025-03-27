// src/components/Canvas/Canvas.jsx
import React, { useState } from "react";
import CanvasItem from "../CanvasItem/CanvasItem";
import "./Canvas.module.scss";

const Canvas = ({ onToggleFullscreen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);

  const toggleFullscreen = () => {
    setIsExpanded(!isExpanded);
    onToggleFullscreen(!isExpanded);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      content: `Item ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={`canvas-container ${isExpanded ? "expanded" : ""}`}>
      <button className="fullscreen-btn" onClick={toggleFullscreen}>
        {isExpanded ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      <button className="add-item-btn" onClick={addItem}>+ Add Item</button>
      <div className="canvas-content">
        {items.map((item) => (
          <CanvasItem key={item.id} id={item.id} content={item.content} onDelete={deleteItem} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
