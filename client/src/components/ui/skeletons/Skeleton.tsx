import type React from "react";
import "./style.css";
interface ISkeleton {
  children?: React.ReactNode;
  type: "circle" | "line" | "rect";
  styles?: string;
}

function Skeleton({ type, styles }: ISkeleton) {
  return (
    <div className={`skeleton w-full`}>
      <div className={`${type} ${styles}`}></div>
    </div>
  );
}

export default Skeleton;
