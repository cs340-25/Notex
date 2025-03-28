import React, { useState, useRef, useEffect } from "react";
import CanvasItem from "../CanvasItem/CanvasItem";
import styles from "./Canvas.module.scss";

const Canvas = ({ onToggleFullscreen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const [scale, setScale] = useState(1); //   Zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); //   Panning position
  const [draggingItemId, setDraggingItemId] = useState(null);
  const canvasRef = useRef(null);

  // Toggle fullscreen (collapses other grid items)
  const toggleFullscreen = () => {
    console.log("Toggling fullscreen...");
    setIsExpanded((prev) => !prev);
    if (onToggleFullscreen) onToggleFullscreen(!isExpanded);
  };

  // Add new CanvasItem
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      content: `Item ${items.length + 1}`,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  //   Handle Zooming with Mouse Wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = Math.min(Math.max(scale - e.deltaY * zoomSpeed * 0.01, 0.5), 2); // Limits zoom between 50% and 200%
    setScale(newScale);
  };

  // this function is written with the help of ChatGPT
  // meant to add panning and dragging functionality to Canvas
  const handleMouseDown = (e) => {
    console.log(draggingItemId)
    if (!draggingItemId) return; // Prevent panning if dragging an item

    const startX = e.clientX;
    const startY = e.clientY;

    let lastX = startX;
    let lastY = startY;

    let velocityX = 0; // Initial velocity for x-axis
    let velocityY = 0; // Initial velocity for y-axis

    // Smooth factor for easing
    const friction = 0.8;  // Deceleration factor, adjust for slower/fast panning
    const speedFactor = 0.5; // Overall speed of movement, adjust as needed

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - lastX;
      const deltaY = moveEvent.clientY - lastY;

      // Calculate velocity (the speed at which the mouse is moving)
      velocityX = deltaX * speedFactor;
      velocityY = deltaY * speedFactor;

      // Update the position
      setPosition((prev) => ({
        x: prev.x + velocityX,
        y: prev.y + velocityY,
      }));

      // Apply friction to the velocity for smoother stopping
      velocityX *= friction;
      velocityY *= friction;

      // Update the last known positions for the next move
      lastX = moveEvent.clientX;
      lastY = moveEvent.clientY;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleItemMouseDown = (e, itemId) => {
    e.stopPropagation(); // Prevent the canvas panning
    setDraggingItemId(itemId);
  };

  const handleItemMouseUp = () => {
    setDraggingItemId(null);
  };

  // Add the wheel event listener with passive: false
  useEffect(() => {
    const canvasElement = canvasRef.current;

    const wheelHandler = (e) => {
      handleWheel(e);
    };

    // Set wheel event listener to non-passive
    if (canvasElement) {
      canvasElement.addEventListener("wheel", wheelHandler, { passive: false });
    }

    // Cleanup the event listener when the component is unmounted or re-renders
    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener("wheel", wheelHandler);
      }
    };
  }, [scale]);
  
  // handle item deletion for now (without database integration)
  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div
      ref={canvasRef}
      className={styles.canvasContainer}
      onMouseDown={handleMouseDown}
    >
      <button className={styles.fullscreenBtn} onClick={toggleFullscreen}>
        {isExpanded ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      <button className={styles.addItemBtn} onClick={addItem}>+ Add Item</button>
      
      <div
        className={styles.canvasContent}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0"
        }}
      >
        {items.map((item) => (
          <CanvasItem
            key={item.id}
            id={item.id}
            content={item.content}
            onMouseDown={(e) => handleItemMouseDown(e, item.id)} // Pass onMouseDown to CanvasItem
            onMouseUp={handleItemMouseUp} // Stop dragging when mouse is released
            scale={scale} // Pass scale to CanvasItem for any scaling needed
            onDelete={handleDeleteItem} // Pass delete function
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
