import * as React from "react";


interface StartButtonState {
  clicked: boolean;
}

class StartButton extends React.Component<{}, StartButtonState> {
  constructor() {
    super();

    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  shouldComponentUpdate(nextProps:{}, nextState: StartButtonState) {
    return this.state.clicked !== nextState.clicked;
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleMouseOut() {
    this.setState({
      clicked: false
    });
  }

  render() {
    let classes = "unselectable embossed";
    if (this.state.clicked)
      classes += " pressed";

    return (
      <button
        className={classes}
        id="start-button"
        onClick={() => this.handleClick()}
        onMouseOut={() => this.handleMouseOut()}
      >
        Start
      </button>
    )
  }
}

export default StartButton;