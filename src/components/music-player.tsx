import * as React from "react";

function displayTime(sec: number): string {
  const dsec = sec % 60,
        dmin = Math.floor(sec / 60);
  let result = dmin + ":";

  if (dsec >= 10)
    result += dsec;
  else
    result += "0" + dsec;

  return result;
}

interface MusicPlayerState {
  tickerID: number;
  playerState: "loading" | "playing" | "paused";
  songArtist: string;
  songTitle: string;
  songDuration: number;
  songPosition: number;
}

export default class MusicPlayer extends React.Component<{}, MusicPlayerState> {
  private audio: HTMLAudioElement;
  private canvas: HTMLCanvasElement;

  constructor() {
    super();

    this.state = {
      tickerID: NaN,
      playerState: "loading",
      songArtist: "Loading...",
      songTitle: "Loading...",
      songDuration: 0,
      songPosition: 0
    }

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.ticker = this.ticker.bind(this);
  }

  handlePlay() {
    this.audio.play();
    this.setState({
      playerState: "playing",
      tickerID: window.setInterval(this.ticker, 500)
    });
  }

  handlePause() {
    window.clearInterval(this.state.tickerID);
    this.audio.pause();
    this.setState({
      playerState: "paused",
      tickerID: NaN
    });
  }

  ticker() {
    this.setState({
      songPosition: Math.floor(this.audio.currentTime)
    });
  }

  shouldComponentUpdate(nextProps: {}, nextState: MusicPlayerState) {
    return this.state.playerState !== nextState.playerState ||
           this.state.songPosition !== nextState.songPosition ||
           this.state.songTitle !== nextState.songTitle;
  }

  componentDidMount() {
    this.audio.src="music/lisa frank 420.mp4";
    this.audio.oncanplay = () =>
      this.setState({
        playerState: "paused",
        songArtist: "Macintosh Plus",
        songTitle: "Lisa Frank 420/Modern Computing",
        songDuration: this.audio.duration,
        songPosition: 0
      });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.tickerID);
  }

  render() {
    //<div className="depressed visualizer">
    //  <canvas ref={ref => this.canvas = ref}></canvas>
    //</div>

    return (
      <div className="prg-wrapper">
        <div className="program music-player">
          <audio ref={ref => this.audio = ref}></audio>
          <div className="depressed music-timer">
            <p>{displayTime(this.state.songPosition)}</p>
          </div>
          <div className="music-controls">
            {(this.state.playerState === "paused") ?
              <button
                className="embossed btn-large"
                onClick={this.handlePlay}
              >
                <img src="img/UI/btn play.png" />
              </button>
            :
              <div className="embossed btn-large">
                <img src="img/UI/btn play disabled.png" />
              </div>
            }
            {(this.state.playerState === "playing") ?
              <button
                className="embossed btn-small"
                onClick={this.handlePause}
              >
                <img src="img/UI/btn pause.png" />
              </button>              
            :
              <div className="embossed btn-small">
                <img src="img/UI/btn pause disabled.png" />
              </div>
            }
            <div className="embossed btn-small">
              <img src="img/UI/btn stop disabled.png" />
            </div>
            <div className="embossed btn-small">
              <img src="img/UI/btn prev disabled.png" />
            </div>
            <div className="embossed btn-small">
              <img src="img/UI/btn back disabled.png" />
            </div>
            <div className="embossed btn-small">
              <img src="img/UI/btn forw disabled.png" />
            </div>
            <div className="embossed btn-small">
              <img src="img/UI/btn next disabled.png" />
            </div>
            <div className="embossed btn-small">
              <img src="img/UI/btn eject disabled.png" />
            </div>
          </div>
          <div className="music-info">
            <p className="label">Artist:</p>
            <p className="data depressed">{this.state.songArtist}</p>
            <p className="label">Title:</p>
            <p className="data depressed">{this.state.songTitle}</p>
          </div>
        </div>
      </div>
    );
  }
}