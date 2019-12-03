import * as React from "react";

interface TrayTaskProps {
  pid: number;
  title: string;
  pressed: boolean;
  handleClick: (e: React.MouseEvent<any>) => void;
}

export default class TrayTask extends React.Component<TrayTaskProps, {}> {
  shouldComponentUpdate(nextProps: TrayTaskProps) {
    return this.props.pid !== nextProps.pid ||
           this.props.title !== nextProps.title ||
           this.props.pressed !== nextProps.pressed;
  }

  render() {
    const classes = this.props.pressed ? "task embossed pressed" : "task embossed";

    return (
      <div
        key={this.props.pid}
        className={classes}
        onMouseDown={(e: React.MouseEvent<any>) => {
          e.stopPropagation();
          this.props.handleClick(e)
        }}
      >
        <p className="unselectable">{this.props.title}</p>
      </div>
    );
  }
};