import React from 'react';
import Snake from './Snake';


export default class SnakeRender extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      snakeDots: [
        [0,0],
        [2,0]
      ]
    }
  }


  render() {
    return (
      <div className="SnakeRender">
      
        <h1>Snake Game</h1>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
        </div>
  
        
      </div>
    );

  }
}

