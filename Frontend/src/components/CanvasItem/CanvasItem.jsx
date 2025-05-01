import React from "react";
import { Rnd } from "react-rnd";
import styles from "./CanvasItem.module.scss";

const CanvasItem = ({ id, type, content, onMouseDown, onDelete, position, scale }) => { // scale isn't used yet but may be for different item types
  const renderContent = () => {
    switch (type) {
      case "image":
        return <img src={content} alt="Canvas Item" style={{ maxWidth: "100%", maxHeight: "100%" }} />;
      case "note":
        return <textarea defaultValue={content} />;
      case "sketch":
        return <div>🖊 Sketch pad coming soon</div>; // Placeholder
      default:
        return content;
    }
  };

  return (
    <Rnd
      default={{
        x: position?.x || 100,
        y: position?.y || 100,
        width: 200,
        height: 100,
      }}
      className={styles.canvasItem}
      onDragStart={(e) => onMouseDown(e, id)}
      bounds="parent"
    >
      <div className={styles.canvasItemContent}>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          ✕
        </button>
        {renderContent()}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
