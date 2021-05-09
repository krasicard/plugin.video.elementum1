import React, { useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce/lib';
import useResizeObserver from 'use-resize-observer';

interface IPieceMapProps {
  pieces: string;
}

const PieceSize = 8;
const Margin = 1;
const FullSize = PieceSize + Margin;

const draw = (parentDiv: HTMLDivElement, context: CanvasRenderingContext2D, pieces: string) => {
  const parentWidth = parentDiv.clientWidth;
  const piecesPerLine = Math.floor(parentWidth / FullSize);
  const height = Math.ceil(pieces.length / piecesPerLine) * FullSize;

  const { canvas } = context;
  canvas.width = parentWidth;
  canvas.height = height;

  for (let i = 0; i < pieces.length; i += 1) {
    const pieceColor = pieces[i] === '+' ? '#4CAF50' : '#ECEFF1';
    context.fillStyle = pieceColor;
    context.fillRect(FullSize * (i % piecesPerLine), Math.floor(i / piecesPerLine) * FullSize, PieceSize, PieceSize);
  }
};

const PieceMap = ({ pieces }: IPieceMapProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentDivRef = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver<HTMLDivElement>({ ref: parentDivRef });
  const [debouncedWidth] = useDebounce(width, 100, { trailing: true });

  useEffect(() => {
    if (!debouncedWidth) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const parentDiv = parentDivRef.current;
    if (!parentDiv) return;

    draw(parentDiv, context, pieces);
  }, [pieces, debouncedWidth]);

  return (
    <div ref={parentDivRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PieceMap;
