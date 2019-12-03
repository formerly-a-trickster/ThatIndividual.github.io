import * as React from "react";

function zeroPad(num: number): string {
  if (num < 10)
    return "0" + num;
  else
    return num.toString();
}

interface TrayTimerState {
  minutes: string;
  hours: string;
}

export default class TrayTimer extends React.Component<{}, TrayTimerState> {
  constructor() {
    super();
    this.state = {
      minutes: "00",
      hours: "00"
    };

    this.updateTime = this.updateTime.bind(this);
  }

  shouldComponentUpdate(nextProps: {}, nextState: TrayTimerState) {
    return this.state.hours !== nextState.hours ||
           this.state.minutes !== nextState.minutes;
  }

  componentWillMount() {
    window.setInterval(this.updateTime, 1000);
  }

  updateTime() {
    let time = new Date();

    this.setState({
      minutes: zeroPad(time.getMinutes()),
      hours: time.getHours().toString()
    });
  }

  render() {
    return (
      <div id="tray-timer">
        <p className="unselectable">{`${this.state.hours}:${this.state.minutes}`}</p>
      </div>
    );
  }
}