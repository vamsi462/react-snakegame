import React, {Component} from "react";
import { Snake } from "./Snake";
import { SnakeFood } from "./SnakeFood";




export default class App extends Component {
  state ={
    food:[6,8],
    snakeDots:[
      [0,0],
      [2,0] 
    ]
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
