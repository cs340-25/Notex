import React from "react";
import { Rnd } from "react-rnd";
import styles from "./CanvasItem.module.scss";
import { useEffect, useState } from "react";

const CanvasItem = ({ id, type, content, onMouseDown, onDelete, position, scale }) => { // scale isn't used yet but may be for different item types
  const [imageData, setImageData] = useState(content || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    } else { alert("Please upload a valid image file."); }
  };

  const renderImage = () => {
    return imageData ? (
      <img src={imageData} alt="Canvas" className={styles.canvasImage} />
    ) : (
      <label className={styles.uploadBtn}>
        Upload Image
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      </label>
    );
  };
  
  const createNote = () => {
    return (
      <div className={styles.canvasNote}>
        
        <textarea defaultValue={content} />
      </div>
    );
  }

  const renderContent = () => {
    switch (type) {
      case "image":
        return renderImage();
      case "note":
        return createNote();
      case "sketch":
        return createNote(); // Placeholder
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
