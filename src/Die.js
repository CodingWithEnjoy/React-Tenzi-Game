import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "tomato" : "white",
  };
  const dotStyle = {
    backgroundColor: props.isHeld ? "white" : "tomato",
  };
  const shape = () => {
    switch (props.value) {
      case 1:
        return (
          <div className="dice first-face" style={styles}>
            <span className="dot" style={dotStyle}></span>
          </div>
        );
      case 2:
        return (
          <div className="dice second-face" style={styles}>
            <span className="dot" style={dotStyle}>
              {" "}
            </span>
            <span className="dot" style={dotStyle}>
              {" "}
            </span>
          </div>
        );
      case 3:
        return (
          <div className="dice third-face" style={styles}>
            <span className="dot" style={dotStyle}></span>
            <span className="dot" style={dotStyle}></span>
            <span className="dot" style={dotStyle}></span>
          </div>
        );
      case 4:
        return (
          <div className="fourth-face dice" style={styles}>
            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>
            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="fourth-face dice" style={styles}>
            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>
            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="fifth-face dice" style={styles}>
            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>

            <div className="column">
              <span className="dot" style={dotStyle}></span>
            </div>

            <div className="column">
              <span className="dot" style={dotStyle}></span>
              <span className="dot" style={dotStyle}></span>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {shape()}
    </div>
  );
}
