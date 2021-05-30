import React from "react";
import swal from "sweetalert";
import Snake from "./Snake";
import Food from "./Food";
import "../assets/app.scss";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export default class SnakeRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: getRandomCoordinates(),
      direction: "RIGHT",
      currentDirection: "right",
      speed: 200,
      snakeDots: [
        [2, 10],
        [4, 10],
      ],
    };
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollides();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case 38:
        if (
          this.state.currentDirection === "down" ||
          this.state.currentDirection === "up"
        ) {
          break;
        } else {
          this.setState({ currentDirection: "up" });
          this.setState({ direction: "UP" });
          break;
        }
      case 40:
        if (
          this.state.currentDirection === "down" ||
          this.state.currentDirection === "up"
        ) {
          break;
        } else {
          this.setState({ currentDirection: "down" });
          this.setState({ direction: "DOWN" });
          break;
        }
      case 37:
        if (
          this.state.currentDirection === "right" ||
          this.state.currentDirection === "left"
        ) {
          break;
        } else {
          this.setState({ currentDirection: "left" });
          this.setState({ direction: "LEFT" });
          break;
        }
      case 39:
        if (
          this.state.currentDirection === "right" ||
          this.state.currentDirection === "left"
        ) {
          break;
        } else {
          this.setState({ currentDirection: "right" });
          this.setState({ direction: "RIGHT" });
          break;
        }
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };

  //  checkDirection({ keyCode }) {
  //     // if it's the same direction or simply reversing, ignore
  //     let changeDirection = true;
  //     [[38, 40], [37, 39]].forEach(dir => {
  //       if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
  //         changeDirection = false;
  //       }
  //     });

  //     if (changeDirection) this.setState({ direction: keyCode });
  //   }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollides() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  onGameOver(e) {
    // alert(`Your score is ${this.state.snakeDots.length - 2}`);
    swal({
      title: "Game Over",
      text: `Your score is ${this.state.snakeDots.length - 2}`,
      button: "Restart",
    });
    this.setState({
      food: getRandomCoordinates(),
      direction: "RIGHT",
      speed: 200,
      snakeDots: [
        [2, 10],
        [4, 10],
      ],
    });
  }

  render() {
    return (
      <div className="SnakeRender">
        <div className="container">
          <div className="header">
            <h1>Snake Game</h1>
            <h3>Use your keyboard arrows to move the snake.</h3>
          </div>
          <div className="game-area">
            <Snake snakeDots={this.state.snakeDots} />
            <Food dot={this.state.food} />
          </div>
          <h2>Score:{this.state.snakeDots.length - 2}</h2>
        </div>
      </div>
    );
  }
}
