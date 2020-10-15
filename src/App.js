import React, {Component} from "react";
import { Snake } from "./Snake";
import { SnakeFood } from "./SnakeFood";

const  generateRandomCoordinates =()=>{
  let min = 1;
  let max= 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x,y]
}
const initialState = {
  food: generateRandomCoordinates(),
  direction: "RIGHT",
  speed: 200,
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
};

export default class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMove, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkSelfHit();
    this.checkIfEatFood()
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: "UP"});
        break;
      case 40:
        this.setState({direction: "DOWN"});
        break;
      case 37:
        this.setState({direction: "LEFT"});
        break;
      case 39:
        this.setState({direction: "RIGHT"});
        break;
      default:
        break;
    }
  };

  snakeMove = () => {
    let dots = [...this.state.snakeDots];
    //head of the snake
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
  //check the snake is crossed the border or not
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];

    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.GameOver();
    }
  }

  //check if head and tail colloid eachother.
  checkSelfHit() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.GameOver();
      }
    });
  }
  checkIfEatFood() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food:generateRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed()
    }
  }
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    //adding new part to the tail
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }
  increaseSpeed(){
    if(this.state.speed>10){
      this.setState({
        speed:this.state.speed-10
      })
    }
  }
  //Gameover alert
  GameOver() {
    alert(`Your Game is Over`);
    this.setState(initialState);
  }
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <SnakeFood dot={this.state.food} />
      </div>
    );
  }
}
