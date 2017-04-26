import * as React from "react";

import Window from "./window";


function Desktop({ windows }: { windows: any }) {
  const winElems = windows.map((win: any, i: number) =>
    <Window title={win.title} x={win.x} y={win.y} z={i} />
  );

  return (
    <div id="desktop">{winElems}</div>
  );
};

export default Desktop;