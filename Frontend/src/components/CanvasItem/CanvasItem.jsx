import React from "react";
import { Rnd } from "react-rnd";
import styles from "./CanvasItem.module.scss";

const CanvasItem = ({ id, content, onDelete }) => {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 200,
        height: 100,
      }}
      className={styles.canvasItem}
      bounds="parent"
    >
      <div className={styles.canvasItemContent}>
        <button className={styles.deleteBtn} onClick={() => onDelete(id)}>
          ✕
        </button>
        {content}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
