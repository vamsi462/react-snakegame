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
    snakeDots:[
      [0,0],
      [2,0] 
    ],
  }

  componentDidMount(){
    document.onkeydown= this.onKeyDown
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
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <SnakeFood dot={this.state.food}/>
      </div>
    );
  }
}
