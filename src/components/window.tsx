import * as React from "react";

import TitleBar from "./title-bar";


function Window(
  { title, x, y, z }: { title: string, x: number, y: number, z: number }
) {
  return (
    <div
      className="window"
      style={{
        position: "absolute",
        top: y,
        left: x,
        zIndex: z
      }}
    >
      <TitleBar title={title} />
    </div>
  );
};

export default Window;