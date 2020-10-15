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


export default class App extends Component {
  state ={
    food:generateRandomCoordinates(),
    direction: "RIGHT",
    speed:200,
    snakeDots:[
      [0,0],
      [2,0] 
    ],
  }

  componentDidMount(){
    setInterval(this.snakeMove,this.state.speed)
    document.onkeydown= this.onKeyDown
  }
  componentDidUpdate(){
    this.checkIfOutOfBorders()
  }

  onKeyDown=(e)=>{
    e=e||window.event;
    switch (e.keyCode) {
        case 38:
        this.setState({direction:'UP'})
        break;
        case 40:
        this.setState({direction:'DOWN'})
        break;
        case 37:
        this.setState({direction:'LEFT'})
        break;
        case 39:
        this.setState({direction:'RIGHT'})
        break;
        default:
        break;
    }
  }

  snakeMove=()=>{
    let dots = [...this.state.snakeDots];
    //head of the snake
    let head = dots[dots.length-1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0]+2,head[1]]
        break;
      case 'LEFT':
        head = [head[0]- 2, head[1]]
         break;
      case 'DOWN':
        head = [head[0], head[1]+2]
          break;
      case 'UP':
        head = [head[0], head[1]-2]
           break;
      
      default:;
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots:dots
    })
  }
  //check the snake is crossed the border or not
  checkIfOutOfBorders(){
    let head = this.state.snakeDots[this.state.snakeDots.length-1];
    
    if(head[0]>=100||head[1]>=100||head[0]<0||head[1]<0){
      this.GameOver();
    }
    
  }
  GameOver(){
    alert(`Game is Over.Snake length is ${this.state.snakeDots.length}`);
  }
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <SnakeFood dot={this.state.food}/>
      </div>
    );
  }
}
