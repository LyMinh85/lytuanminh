'use client';
import React, { useRef, useEffect } from "react";

const CanvasDots = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spacing = 20;

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Tính góc
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const angle = Math.atan2(dy, dx);

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.scale(1 + Math.min(1, Math.sqrt(dx * dx + dy * dy) / 200), 1);


          // Vẽ chấm
          ctx.beginPath();
          ctx.arc(0, 0, 1, 0, Math.PI * 2);
          ctx.fillStyle = "#000000";
          ctx.fill();

          // Vẽ hướng (anten chỉ hướng)
          // ctx.beginPath();
          // ctx.moveTo(0, 0);
          // ctx.lineTo(10, 0); // chiều dài anten
          // ctx.strokeStyle = "#ff00ff";
          // ctx.lineWidth = 1.5;
          // ctx.stroke();

          ctx.restore();
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "white", // cho đẹp
      }}
    />
  );
};

export default CanvasDots;
