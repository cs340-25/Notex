import React from "react";
import { Rnd } from "react-rnd";
import styles from "./CanvasItem.module.scss";

const CanvasItem = ({ id, content, onMouseDown, onDelete, position, scale }) => { // scale isn't used yet but may be for different item types
  return (
    <Rnd
      default={{
        x: position?.x || 100, // not always going to give position but might have to with different item types
        y: position?.y || 100,
        width: 200,
        height: 100,
      }}
      className={styles.canvasItem}
      onDragStart={(e) => onMouseDown(e, id)}
      bounds="parent"
    >
      <div className={styles.canvasItemContent}>
        {/* Delete button */}
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the canvas panning when deleting
            onDelete(id);
          }}
        >
          ✕
        </button>
        {content}
        
      </div>
    </Rnd>
  );
};

export default CanvasItem;
