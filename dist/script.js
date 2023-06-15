function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Timer extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" },
      this.props.timerName), /*#__PURE__*/

      React.createElement("div", { id: "time-left" },
      this.props.displayTime), /*#__PURE__*/

      React.createElement("div", { id: "timer-controls" }, /*#__PURE__*/
      React.createElement("div", { id: "start_stop", className: "button", onClick: this.props.useTimer },
      this.props.startStop), /*#__PURE__*/

      React.createElement("div", { id: "reset", className: "button", onClick: this.props.reset }, "Reset"))));





  }}


class Parameters extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "parameters" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length", /*#__PURE__*/


      React.createElement("div", { id: "session-controls" }, /*#__PURE__*/
      React.createElement("div", { id: "session-decrement", className: "button", onClick: this.props.decreaseSession }, "-"), /*#__PURE__*/


      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("div", { id: "session-length" },
      this.props.sessionLength), /*#__PURE__*/

      React.createElement("div", null, "min")), /*#__PURE__*/

      React.createElement("div", { id: "session-increment", className: "button", onClick: this.props.increaseSession }, "+"))), /*#__PURE__*/




      React.createElement("div", { id: "break-label" }, "Break Length", /*#__PURE__*/


      React.createElement("div", { id: "break-controls" }, /*#__PURE__*/
      React.createElement("div", { id: "break-decrement", className: "button", onClick: this.props.decreaseBreak }, "-"), /*#__PURE__*/


      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("div", { id: "break-length" },
      this.props.breakLength), /*#__PURE__*/

      React.createElement("div", null, "min")), /*#__PURE__*/

      React.createElement("div", { id: "break-increment", className: "button", onClick: this.props.increaseBreak }, "+")))));






  }}


class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "clock",









    null);_defineProperty(this, "state",
    {
      timerName: "Session",
      breakLength: 5,
      sessionLength: 25,
      breakCount: 5 * 60,
      sessionCount: 25 * 60,
      count: 25 * 60,
      displayTime: "25:00",
      startStop: "Start",
      timerOngoing: false });this.decreaseBreak = this.decreaseBreak.bind(this);this.decreaseSession = this.decreaseSession.bind(this);this.increaseBreak = this.increaseBreak.bind(this);this.increaseSession = this.increaseSession.bind(this);this.reset = this.reset.bind(this);this.displayTime = this.displayTime.bind(this);this.useTimer = this.useTimer.bind(this);}

  reset() {
    clearInterval(this.clock);
    this.setState({
      timerName: "Session",
      breakLength: 5,
      sessionLength: 25,
      breakCount: 5 * 60,
      sessionCount: 25 * 60,
      count: 25 * 60,
      displayTime: "25:00",
      startStop: "Start",
      timerOngoing: false });

    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }
  decreaseBreak() {
    let breakLength = this.state.breakLength;
    if (breakLength > 1) {
      this.setState({ breakLength: breakLength - 1, breakCount: (breakLength - 1) * 60 });
    }
  }
  decreaseSession() {
    let sessionLength = this.state.sessionLength;
    if (sessionLength > 1) {
      this.setState({ sessionLength: sessionLength - 1, sessionCount: (sessionLength - 1) * 60 });
      this.displayTime((sessionLength - 1) * 60);
    }
  }
  increaseBreak() {
    let breakLength = this.state.breakLength;
    if (breakLength < 60) {
      this.setState({ breakLength: breakLength + 1, breakCount: (breakLength + 1) * 60 });
    }
  }
  increaseSession() {
    let sessionLength = this.state.sessionLength;
    if (sessionLength < 60) {
      this.setState({ sessionLength: sessionLength + 1, sessionCount: (sessionLength + 1) * 60 });
      this.displayTime((sessionLength + 1) * 60);
    }
  }
  displayTime(count) {
    let min = Math.floor(count / 60);
    let sec = count % 60;
    let minString = String(min);
    let secString = String(sec);
    if (min < 10) {
      minString = "0" + minString;
    }
    if (sec < 10) {
      secString = "0" + secString;
    }
    this.setState({ displayTime: minString + ":" + secString });
  }
  useTimer() {
    this.setState({ timerOngoing: !this.state.timerOngoing });
    if (!this.state.timerOngoing) {
      this.setState({ startStop: "Stop" });
      this.clock = setInterval(() => {
        if (this.state.timerName == "Session" ? this.setState({ count: this.state.sessionCount }) : this.setState({ count: this.state.breakCount })) ;

        if (this.state.count == 0) {
          document.getElementById("beep").play();
          this.setState({ breakCount: this.state.breakLength * 60 + 1, sessionCount: this.state.sessionLength * 60 + 1 });
          if (this.state.timerName == "Session" ? this.setState({ timerName: "Break" }) : this.setState({ timerName: "Session" })) ;
        } else
        {
          this.displayTime(this.state.count - 1);
          if (this.state.timerName == "Session" ? this.setState({ sessionCount: this.state.count - 1 }) : this.setState({ breakCount: this.state.count - 1 })) ;
        }
      },
      1000);

    } else
    {
      clearInterval(this.clock);
      this.setState({ startStop: "Start" });
    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(Timer, {
        timerName: this.state.timerName,
        startStop: this.state.startStop,
        reset: this.reset,
        displayTime: this.state.displayTime,
        useTimer: this.useTimer }), /*#__PURE__*/
      React.createElement(Parameters, {
        sessionLength: this.state.sessionLength,
        breakLength: this.state.breakLength,
        decreaseBreak: this.decreaseBreak,
        decreaseSession: this.decreaseSession,
        increaseBreak: this.increaseBreak,
        increaseSession: this.increaseSession }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_b1e725b098.mp3?filename=beep-6-96243.mp3" })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));