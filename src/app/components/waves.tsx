import { useState } from "react";

function createSmoothPath(points: Array<[number, number]>): string {
  if (points.length < 2) return '';

  // Start path at first point
  let path = `M ${points[0][0]} ${points[0][1]}`;

  // First curve needs explicit control points
  const first = points[0];
  const second = points[1];
  const cp1x = Math.round((first[0] + (second[0] - first[0]) / 3) * 100) / 100;
  const cp1y = first[1];
  const cp2x = Math.round((second[0] - (second[0] - first[0]) / 3) * 100) / 100;
  const cp2y = second[1];
  path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${second[0]} ${second[1]}`;

  // Subsequent curves can use S command
  for (let i = 2; i < points.length; i++) {
    const point = points[i];
    // Only need one control point for S command
    // Second control point is automatically mirrored from previous curve
    const cpx = Math.round((point[0] - (point[0] - points[i - 1][0]) / 3) * 100) / 100;
    const cpy = point[1];
    path += ` S ${cpx} ${cpy}, ${point[0]} ${point[1]}`;
  }

  path += ' V 100 H 0'

  return path;
}

function createWave(ripples: number, delta: number, offset: number): string[] {
  const gap = 100 / ripples
  const points = [];
  for (let i = 0; i <= ripples * 1.5; i++) {
    let n = 1 - (i % 2 * 2);
    points.push([i * gap, offset + delta * n]);
  }

  const frames = [points];
  for (let i = 0; i < 2; i++) {
    frames.push(points.map(([x, y]) => [x - gap * (i + 1), y + (1 - i) * delta]));
  }

  return frames.map((pts) => createSmoothPath(pts));
}


export default function Waves({ className, color = '#808080' }: { className?: string, color?: string }) {
  const waves: string[][] = [
    createWave(4, 1, 51),
    createWave(5, 2, 53),
    createWave(6, 1, 57),
    createWave(10, .5, 63),
    createWave(7, 1, 75),
  ];
  const stars: { x: number, y: number }[] = [];
  for (let i = 0; i < 100; i++) {
    stars.push({ x: Math.random() * 100, y: Math.random() * 45 });
  }


  return (
    <svg className={className} preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <desc>This is a generated SVG from https://jaycsantos.com</desc>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="0.1" />
        </filter>
      </defs>
      <g>
        {waves.map((wave, i) => (
          <path key={i} opacity={1 / (waves.length - i)} fill={color} d={wave[0]}>
            <animate
              attributeName="d"
              dur={(5 + (waves.length - i) * 4) + 's'}
              repeatCount="indefinite"
              values={wave.join('; ')}
            />
          </path>
        ))}
      </g>
      <g className="hidden dark:block">
        {stars.map((star, i) => (
          <circle key={i} filter="url(#blur)" cx={star.x} cy={star.y} r="0.05px" fill="white" />
        ))}
      </g>
    </svg>
  );
}

