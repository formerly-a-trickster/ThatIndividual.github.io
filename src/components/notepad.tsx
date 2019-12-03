import * as React from "react";

export default function Notepad() {
  return (
    <div className="prg-wrapper depressed">
      <div className="program notepad">
        <p contentEditable={true}></p>
      </div>
    </div>
  );
}