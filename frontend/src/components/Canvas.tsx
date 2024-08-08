import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 500;
  const createGrid = (ctx: CanvasRenderingContext2D, gridSize: number) => {
    const boxSize = gridSize / 5;
    ctx.lineWidth = 1;

    for (let i = boxSize; i < gridSize; i += boxSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, gridSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(gridSize, i);
      ctx.stroke();
      ctx.closePath();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      createGrid(context, gridSize);
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <canvas
          ref={canvasRef}
          width={gridSize}
          height={gridSize}
          className="border-2 border-black"
        />
      </div>
    </div>
  );
};

export default Canvas;
