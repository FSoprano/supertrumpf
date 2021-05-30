import * as React from 'react';
import Card from './Card';
import Animal from './Animal';
import './Game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersTurn:true,
      player: [new Animal('Elefant', 'placeholder.png', 3.3, 6000, 70, 1, 40)],
      computer: [new Animal('Nashorn', 'placeholder.png', 1, 9, 2300, 50, 1, 50)],
      }
    }
  render() {
    const { playersTurn, player, computer } = this.state;
    return (
      <div>
        <div className="info">
          {playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe.
        </div>
        <div className="cards">
          <Card animal={player[0]} uncovered={playersTurn} />
          <Card animal={computer[0]} uncovered={!playersTurn} />
        </div>
      </div>
    );
  }
}
