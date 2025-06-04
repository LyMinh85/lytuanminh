"use client";
import { useTheme } from "next-themes";
import React, { useRef, useEffect, useState } from "react";

const GridCanvas = () => {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    if (!canvasRef.current) return;

    let numberOfColumns = 15; // số cột
    let gridSize = canvasRef.current.clientWidth / numberOfColumns; // chỉnh kích thước ô vuông ở đây
    if (gridSize < 80) {
      // Tính toán kích thước ô vuông tối thiểu
      numberOfColumns = 5;
      gridSize = canvasRef.current.clientWidth / numberOfColumns;
    }

    const resizeCanvas = () => {
      // get kich thước của tag canvas
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      // set kích thước của canvas
      canvas.width = width;
      canvas.height = height;

      drawGrid();
    };

    const drawGrid = () => {
      const strokeColor =
        resolvedTheme === "dark"
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(0, 0, 0, 0.5)"; // màu đường kẻ

      // Adjust line width based on device type
      const gridLineWidth = isMobile ? 0.05 : 0.1;
      const diagonalLineWidth = isMobile ? 1 : 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = gridLineWidth;
      let columnsPerRow = Math.floor(canvas.width / gridSize);
      let rowsPerColumn = Math.floor(canvas.height / gridSize);

      if (columnsPerRow % 2 !== 0) {
        columnsPerRow -= 1; // đảm bảo số cột là số chẵn
      }

      if (rowsPerColumn % 2 !== 0) {
        rowsPerColumn -= 0; // đảm bảo số hàng là số chẵn
      }

      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Vẽ khung ô vuông
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = gridLineWidth;
          ctx.strokeRect(x, y, gridSize, gridSize);

          // Vẽ đường chéo ở 4 ô góc trên và 4 ô góc dưới
          const isSpecialCell =
            // 4 ô góc trên
            (x === gridSize * 1 && y === 0) ||
            (x === 0 && y === gridSize * 1) ||
            (x === gridSize * (columnsPerRow - 1) && y === 0) ||
            (x === gridSize * columnsPerRow && y === gridSize * 1) ||
            // 4 ô góc dưới
            (x === gridSize * 1 && y === gridSize * (rowsPerColumn - 1)) ||
            (x === 0 && y === gridSize * (rowsPerColumn - 2)) ||
            (x === gridSize * (columnsPerRow - 1) &&
              y === gridSize * (rowsPerColumn - 1)) ||
            (x === gridSize * columnsPerRow &&
              y === gridSize * (rowsPerColumn - 2));

          if (isSpecialCell) {
            const numberOfDiagonalLines = 5;
            for (let z = 1; z <= numberOfDiagonalLines; z++) {
              if (z === numberOfDiagonalLines) continue; // bỏ qua đường chéo cuối cùng

              ctx.beginPath();
              // Vẽ từ góc dưới trái đến gốc trên trái
              ctx.moveTo(
                x,
                y +
                  (gridSize / numberOfDiagonalLines) *
                    (numberOfDiagonalLines - z)
              );
              ctx.lineTo(
                x + (gridSize / numberOfDiagonalLines) * z,
                y + gridSize
              );
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = diagonalLineWidth;
              ctx.stroke();
            }

            for (let z = 1; z <= numberOfDiagonalLines; z++) {
              ctx.beginPath();
              // Vẽ từ góc dưới trái đến gốc trên trái
              ctx.moveTo(
                x +
                  (gridSize / numberOfDiagonalLines) *
                    (numberOfDiagonalLines - z),
                y
              );
              ctx.lineTo(
                x + gridSize,
                y + (gridSize / numberOfDiagonalLines) * z
              );
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = diagonalLineWidth;
              ctx.stroke();
            }
          }
        }
      }

      // Vẽ đường viền ngoài cùng
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = gridLineWidth;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resolvedTheme, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: isMobile ? 0.5 : 1, // giảm độ mờ cho thiết bị di động
        backgroundColor: resolvedTheme === "dark" ? "#111827" : "#F9FAFB", // màu nền canvas
      }}
    />
  );
};

export default GridCanvas;
