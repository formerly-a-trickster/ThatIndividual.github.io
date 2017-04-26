import * as React from "react";

import TitleBarButton from "./title-bar-button";


function TitleBar({ title }: { title: string}) {
  return (
    <div className="title-bar">
      <p>{title}</p>
      <TitleBarButton />
      <TitleBarButton />
      <TitleBarButton />
    </div>
  );
};

export default TitleBar;