import { useEffect, useRef, useState } from "react";
import robotSrc from "../assets/robot.png";

type RobotProperties = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 500;
  const [currentRobotProps, setCurrentRobotProps] = useState<RobotProperties>();

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

  const drawRobot = (
    ctx: CanvasRenderingContext2D,
    robotProps: RobotProperties
  ) => {
    if (currentRobotProps) {
      const {
        x: currX,
        y: currY,
        width: currWidth,
        height: currHeight,
      } = currentRobotProps;
      ctx.clearRect(currX, currY, currWidth, currHeight);
    }
    const robot = new Image();
    robot.src = robotSrc;
    const { x, y, width, height, angle } = robotProps;
    robot.onload = () => {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(degreesToRadians(angle));
      ctx.drawImage(robot, -width / 2, -height / 2, width, height);
      ctx.restore();
    };
    setCurrentRobotProps(robotProps);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    canvas?.focus();
    if (ctx) {
      const boxSize = gridSize / 5;
      createGrid(ctx, boxSize);

      const robotSize = boxSize - 20;
      const robotProps = {
        x: (boxSize - robotSize) / 2,
        y: boxSize * 4 + (boxSize - robotSize) / 2,
        width: robotSize,
        height: robotSize,
        angle: 0,
      };
      drawRobot(ctx, robotProps);
    }
  }, []);

  const controlRobot = (key: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!currentRobotProps || !ctx) return;

    const boxSize = gridSize / 5;
    const robotSize = boxSize - 20;
    let robotProps = currentRobotProps;

    if (key === "ArrowUp") {
      const newY = robotProps.y - boxSize;
      robotProps = {
        ...currentRobotProps,
        angle: 0,
        y: newY < (boxSize - robotSize) / 2 ? robotProps.y : newY,
      };
    } else if (key === "ArrowRight") {
      const newX = robotProps.x + boxSize;
      robotProps = {
        ...currentRobotProps,
        angle: 90,
        x: newX >= gridSize + (boxSize - robotSize) / 2 ? robotProps.x : newX,
      };
    } else if (key === "ArrowLeft") {
      const newX = robotProps.x - boxSize;
      robotProps = {
        ...currentRobotProps,
        angle: 270,
        x: newX < (boxSize - robotSize) / 2 ? robotProps.x : newX,
      };
    } else if (key === "ArrowDown") {
      const newY = robotProps.y + boxSize;

      robotProps = {
        ...currentRobotProps,
        angle: 180,
        y: newY >= gridSize + (boxSize - robotSize) / 2 ? robotProps.y : newY,
      };
    } else {
      return;
    }
    drawRobot(ctx, robotProps);
  };

  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <canvas
          ref={canvasRef}
          width={gridSize}
          height={gridSize}
          tabIndex={0}
          onKeyDown={(e) => controlRobot(e.key)}
          className="border-2 border-black rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Canvas;
