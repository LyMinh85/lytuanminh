"use client";
import React, { useEffect, useState } from "react";

const Dot = ({
  x,
  y,
  mouse,
}: {
  x: number;
  y: number;
  mouse: { x: number; y: number };
}) => {
  const dx = mouse.x - x;
  const dy = mouse.y - y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // độ

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 8,
        height: 8,
        background: "#fff",
        borderRadius: "50%",
        transform: `rotate(${angle+90}deg) scale(${1 + Math.min(1, Math.sqrt(dx * dx + dy * dy) / 200)})`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          width: 1,
          height: 1,
          background: "black",
          transform: "translate(3px, 0)",
        }}
      />
    </div>
  );
};

const DotGrid = () => {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const spacing = 20;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dots = [];
  for (let x = 0; x < window.innerWidth; x += spacing) {
    for (let y = 0; y < window.innerHeight; y += spacing) {
      dots.push(<Dot key={`${x}-${y}`} x={x} y={y} mouse={mouse} />);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {dots}
    </div>
  );
};

export default DotGrid;
