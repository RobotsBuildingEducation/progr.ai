import React, { useEffect, useRef, useState } from "react";
import { FadeInComponent } from "./RandomCharacter";

export const hexToHSL = (hex) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  // Then convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { hue: h, saturation: s, lightness: l };
};

export const SunsetCanvas = (alternativeSpeed = null) => {
  const canvasRef = useRef(null);
  let requestId;

  const draw = (ctx, frameCount) => {
    const oscillationSpeed = 0.0025;
    const time = Date.now() * oscillationSpeed;

    const colors = [
      "#E6E6FA", // Lavender
      "#FFC0CB", // Pink
      "#ADD8E6", // Light Blue
      "#DDA0DD", // Plum
      "#F0E6FA", // Lavender Blush
    ];

    ctx.beginPath();
    const numPoints = 16;
    const angleStep = (Math.PI * 2) / numPoints;
    const minRadius = 50;
    const maxRadius = 200;
    const smoothingFactor = 0.05;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i <= numPoints; i++) {
      const angle = i * angleStep;
      const radius =
        minRadius +
        (maxRadius - minRadius) *
          (0.5 + 0.5 * Math.sin(time + i * 0.3)) *
          Math.sin(time * 0.5);
      const x = ctx.canvas.width / 2 + radius * Math.cos(angle);
      const y = ctx.canvas.height / 2 + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
        prevX = x;
        prevY = y;
      } else {
        const midX = (prevX + x) / 2;
        const midY = (prevY + y) / 2;
        const controlX = prevX + (midX - prevX) * smoothingFactor;
        const controlY = prevY + (midY - y) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, controlY, midX, midY);
        prevX = x;
        prevY = y;
      }
    }
    ctx.closePath();

    const gradient = ctx.createLinearGradient(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    for (let i = 0; i < colors.length; i++) {
      const colorHSL = hexToHSL(colors[i]);
      const stopPosition = i / (colors.length - 1);
      gradient.addColorStop(
        stopPosition,
        `hsl(${colorHSL.hue}, ${colorHSL.saturation}%, ${
          colorHSL.lightness + Math.sin(time + i * 2) * 10
        }%)`
      );
    }

    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const animate = (ctx) => {
    requestId = requestAnimationFrame(() => animate(ctx));
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    draw(ctx, requestId * 0.08);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 75;
    canvas.height = 75;
    animate(context);
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <FadeInComponent speed={"1s"}>
      <canvas
        style={{
          borderRadius: "45%",
        }}
        ref={canvasRef}
      ></canvas>
    </FadeInComponent>
  );
};

export const BigSunset = () => {
  const canvasRef = useRef(null);
  let requestId;

  const draw = (ctx, frameCount) => {
    const oscillationSpeed = 0.0025;
    const time = Date.now() * oscillationSpeed;

    const colors = [
      "#E6E6FA", // Lavender
      "#FFC0CB", // Pink
      "#ADD8E6", // Light Blue
      "#DDA0DD", // Plum
      "#F0E6FA", // Lavender Blush
    ];

    ctx.beginPath();
    const numPoints = 16;
    const angleStep = (Math.PI * 2) / numPoints;
    const minRadius = 50;
    const maxRadius = 200;
    const smoothingFactor = 0.05;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i <= numPoints; i++) {
      const angle = i * angleStep;
      const radius =
        minRadius +
        (maxRadius - minRadius) *
          (0.5 + 0.5 * Math.sin(time + i * 0.3)) *
          Math.sin(time * 0.5);
      const x = ctx.canvas.width / 2 + radius * Math.cos(angle);
      const y = ctx.canvas.height / 2 + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
        prevX = x;
        prevY = y;
      } else {
        const midX = (prevX + x) / 2;
        const midY = (prevY + y) / 2;
        const controlX = prevX + (midX - prevX) * smoothingFactor;
        const controlY = prevY + (midY - y) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, controlY, midX, midY);
        prevX = x;
        prevY = y;
      }
    }
    ctx.closePath();

    const gradient = ctx.createLinearGradient(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    for (let i = 0; i < colors.length; i++) {
      const colorHSL = hexToHSL(colors[i]);
      const stopPosition = i / (colors.length - 1);
      gradient.addColorStop(
        stopPosition,
        `hsl(${colorHSL.hue}, ${colorHSL.saturation}%, ${
          colorHSL.lightness + Math.sin(time + i * 2) * 10
        }%)`
      );
    }

    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const animate = (ctx) => {
    requestId = requestAnimationFrame(() => animate(ctx));
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    draw(ctx, requestId * 0.08);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    animate(context);
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas
      style={{
        borderRadius: "45%",
        zoom: "0.25",
      }}
      ref={canvasRef}
    ></canvas>
  );
};
