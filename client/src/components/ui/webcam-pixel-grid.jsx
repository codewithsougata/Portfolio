import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export const WebcamPixelGrid = ({
  gridCols = 64,
  gridRows = 48,
  maxElevation = 15,
  motionSensitivity = 0.4,
  elevationSmoothing = 0.1,
  colorMode = "webcam",
  monochromeColor = "#00ff88",
  backgroundColor = "#0a0a0a",
  mirror = true,
  gapRatio = 0.1,
  invertColors = false,
  darken = 0,
  borderColor = "#ffffff",
  borderOpacity = 0.08,
  className = "",
  onWebcamError,
  onWebcamReady,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const requestRef = useRef();
  const previousFrameRef = useRef();
  const elevationRef = useRef(new Float32Array(gridCols * gridRows));

  const setupWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: gridCols * 8, height: gridRows * 8 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsReady(true);
          onWebcamReady?.();
        };
      }
    } catch (err) {
      console.error("Webcam error:", err);
      onWebcamError?.(err);
    }
  }, [gridCols, gridRows, onWebcamReady, onWebcamError]);

  useEffect(() => {
    setupWebcam();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setupWebcam]);

  const draw = useCallback(() => {
    if (!isReady || !videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const offscreenCtx = offscreenCanvasRef.current.getContext("2d", { willReadFrequently: true });
    
    const { width, height } = canvasRef.current;
    const cellW = width / gridCols;
    const cellH = height / gridRows;

    // Draw video to offscreen canvas
    offscreenCtx.save();
    if (mirror) {
      offscreenCtx.translate(gridCols, 0);
      offscreenCtx.scale(-1, 1);
    }
    offscreenCtx.drawImage(videoRef.current, 0, 0, gridCols, gridRows);
    offscreenCtx.restore();

    const imageData = offscreenCtx.getImageData(0, 0, gridCols, gridRows);
    const data = imageData.data;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const i = (y * gridCols + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3 / 255;

        // Motion detection
        let motionValue = 0;
        if (previousFrameRef.current) {
          const pr = previousFrameRef.current[i];
          const pg = previousFrameRef.current[i + 1];
          const pb = previousFrameRef.current[i + 2];
          motionValue = (Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb)) / 3 / 255;
        }

        const targetElevation = brightness * maxElevation + motionValue * motionSensitivity * maxElevation;
        elevationRef.current[y * gridCols + x] += (targetElevation - elevationRef.current[y * gridCols + x]) * elevationSmoothing;

        const currentElevation = elevationRef.current[y * gridCols + x];
        const scale = 1 - gapRatio;
        
        ctx.save();
        ctx.translate(x * cellW + cellW / 2, y * cellH + cellH / 2);
        
        // Draw cell
        let color;
        if (colorMode === "webcam") {
          color = `rgba(${invertColors ? 255 - r : r}, ${invertColors ? 255 - g : g}, ${invertColors ? 255 - b : b}, ${1 - darken})`;
        } else {
          color = monochromeColor;
        }

        ctx.fillStyle = color;
        const drawW = cellW * scale * (1 + currentElevation / maxElevation);
        const drawH = cellH * scale * (1 + currentElevation / maxElevation);
        
        ctx.fillRect(-drawW / 2, -drawH / 2, drawW, drawH);
        
        if (borderOpacity > 0) {
          ctx.strokeStyle = borderColor;
          ctx.globalAlpha = borderOpacity;
          ctx.strokeRect(-drawW / 2, -drawH / 2, drawW, drawH);
          ctx.globalAlpha = 1;
        }
        
        ctx.restore();
      }
    }

    previousFrameRef.current = new Uint8Array(data);
    requestRef.current = requestAnimationFrame(draw);
  }, [
    isReady, gridCols, gridRows, maxElevation, motionSensitivity, elevationSmoothing,
    colorMode, monochromeColor, backgroundColor, mirror, gapRatio, invertColors, darken,
    borderColor, borderOpacity
  ]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [draw]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <video ref={videoRef} className="hidden" playsInline muted />
      <canvas ref={offscreenCanvasRef} width={gridCols} height={gridRows} className="hidden" />
      <canvas
        ref={canvasRef}
        width={gridCols * 10}
        height={gridRows * 10}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};
