import React, { useCallback, useEffect, useRef, useState } from "react";
import robotSrc from "../assets/robot.png";

type RobotProperties = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};

type Props = {
  gridSize?: number;
};

const Canvas: React.FC<Props> = ({ gridSize = 500 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRobotProps, setCurrentRobotProps] = useState<RobotProperties>();

  const createGrid = useCallback(
    (ctx: CanvasRenderingContext2D, boxSize: number) => {
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
    },
    [gridSize]
  );

  const drawRobot = useCallback(
    (ctx: CanvasRenderingContext2D, newRobotProps: RobotProperties) => {
      const robot = new Image();
      robot.src = robotSrc;
      const { x, y, width, height, angle } = newRobotProps;
      robot.onload = () => {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(degreesToRadians(angle));
        ctx.drawImage(robot, -width / 2, -height / 2, width, height);
        ctx.restore();
      };
    },
    []
  );

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
      setCurrentRobotProps(robotProps);
    }
  }, [drawRobot, gridSize, createGrid]);

  const moveRobot = (key: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!currentRobotProps || !ctx) return;

    const boxSize = gridSize / 5;
    const robotSize = boxSize - 20;
    const robotProps = { ...currentRobotProps };
    const {
      x: currX,
      y: currY,
      width: currWidth,
      height: currHeight,
    } = currentRobotProps;

    if (key === "ArrowUp") {
      const newY = robotProps.y - boxSize;
      robotProps.angle = 0;
      robotProps.y = newY < (boxSize - robotSize) / 2 ? robotProps.y : newY;
    } else if (key === "ArrowRight") {
      const newX = robotProps.x + boxSize;
      robotProps.angle = 90;
      robotProps.x =
        newX >= gridSize + (boxSize - robotSize) / 2 ? robotProps.x : newX;
    } else if (key === "ArrowDown") {
      const newY = robotProps.y + boxSize;
      robotProps.angle = 180;
      robotProps.y =
        newY >= gridSize + (boxSize - robotSize) / 2 ? robotProps.y : newY;
    } else if (key === "ArrowLeft") {
      const newX = robotProps.x - boxSize;
      robotProps.angle = 270;
      robotProps.x = newX < (boxSize - robotSize) / 2 ? robotProps.x : newX;
    } else {
      return;
    }
    ctx.clearRect(currX, currY, currWidth, currHeight);
    drawRobot(ctx, robotProps);
    setCurrentRobotProps(robotProps);
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
          onKeyDown={(e) => moveRobot(e.key)}
          className="border-2 border-black rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Canvas;
