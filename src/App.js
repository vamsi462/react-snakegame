import React, {Component} from "react";
import { Snake } from "./Snake";




export default class App extends Component {
  state ={
    snakeDots:[
      [0,0],
      [2,0] 
    ]
  }
  render() {
    return (
      <div className="game-area">
        <Snake/>
      </div>
    );
  }
}
