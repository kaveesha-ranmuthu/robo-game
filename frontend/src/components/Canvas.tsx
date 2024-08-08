import { useEffect, useRef } from "react";
import robotSrc from "../assets/robot.png";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 500;

  const createGrid = (ctx: CanvasRenderingContext2D, boxSize: number) => {
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

  const drawRobot = (ctx: CanvasRenderingContext2D, boxSize: number) => {
    const robot = new Image();
    robot.src = robotSrc;
    const robotSize = boxSize - 20;
    robot.onload = () => {
      ctx.drawImage(
        robot,
        (boxSize - robotSize) / 2,
        boxSize * 4 + (boxSize - robotSize) / 2,
        robotSize,
        robotSize
      );
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      const boxSize = gridSize / 5;
      createGrid(ctx, boxSize);
      drawRobot(ctx, boxSize);
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <canvas
          ref={canvasRef}
          width={gridSize}
          height={gridSize}
          className="border-2 border-black rounded-md"
        />
      </div>
    </div>
  );
};

export default Canvas;
