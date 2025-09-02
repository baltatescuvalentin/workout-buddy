import type React from "react";

interface ICard {
  children: React.ReactNode;
  styles?: string;
  handleClick?: () => void;
}

function Card({ children, styles, handleClick }: ICard) {
  return (
    <div
      className={`flex flex-col items-center gap-4 p-7 rounded-md shadow-md hover:shadow-lg bg-white ${styles}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default Card;
