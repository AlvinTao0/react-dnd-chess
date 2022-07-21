import React from "react";
import Square from "./Square";
import { canMoveKnight, moveKnight } from "./Game";
import { ItemTypes } from "./Constants";
import { useDrop } from "react-dnd";

function Overlay({ color }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }}
    />
  );
}

export default function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1;
  const [{ isOver, canDrop2 }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(x, y),
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop2: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop2 && <Overlay color="red" />}
      {!isOver && canDrop2 && <Overlay color="yellow" />}
      {isOver && canDrop2 && <Overlay color="green" />}
    </div>
  );
}
