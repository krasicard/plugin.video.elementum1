import React, { useMemo } from 'react';
import useResizeObserver from 'use-resize-observer';

interface IPieceMapProps {
  pieces: string;
}

const PieceSize = 8;
const Margin = 1;
const FullSize = PieceSize + Margin;

const d3Graph = (pieces: string) => {
  const parentDiv = document.getElementById('pieces') as HTMLDivElement | null;
  if (!parentDiv) return;

  const parentWidth = parentDiv.clientWidth;
  const piecesPerLine = Math.floor(parentWidth / FullSize);
  const height = Math.ceil(pieces.length / piecesPerLine) * FullSize;

  const canvas = document.getElementById('pieces-graph') as HTMLCanvasElement;
  canvas.width = parentWidth;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return;

  for (let i = 0; i < pieces.length; i += 1) {
    const value = pieces[i] === '+' ? '#4CAF50' : '#ECEFF1';
    context.fillStyle = value;
    context.fillRect(FullSize * (i % piecesPerLine), Math.floor(i / piecesPerLine) * FullSize, PieceSize, PieceSize);
  }
};

const PieceMap = ({ pieces }: IPieceMapProps): JSX.Element => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  useMemo(() => d3Graph(pieces), [pieces, width, height]);

  return (
    <div id="pieces" ref={ref}>
      <canvas id="pieces-graph" />
    </div>
  );
};

export default PieceMap;
