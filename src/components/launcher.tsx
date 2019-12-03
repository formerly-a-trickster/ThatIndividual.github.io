import * as React from "react";

interface LauncherProps {
  title: string;
  icon: string;
  linkTo: Function;
  shortcut?: boolean;
}

class Launcher extends React.Component<LauncherProps, {}> {
  shouldComponentUpdate(nextProps: LauncherProps) {
    return false;
  }

  render() {
    const iconShortcut = (this.props.shortcut === true) ?
      <img
        className="shortcut"
        src="img/icons/shortcut.png"
      />
      : null;

    return (
      <div
        className="launcher unselectable"
        onClick={() => this.props.linkTo()}
      >
        <img
          className="icon"
          src={`img/icons/${this.props.icon}`}
        />
        {iconShortcut}
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Launcher;