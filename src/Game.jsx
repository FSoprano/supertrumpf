import * as React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Card from './Card';
import Animal from './Animal';
import './Game.css';

export default class Game extends React.Component {
  static defaultProps = {
    title: 'Supertrumpf',
    };
  static propTypes = {
    title: PropTypes.string,
    };
  // Der State kann inzwischen auch außerhalb des contructors gesetzt 
  // werden.
  state = {
      computerUncovered: false,
      selectedProperty: '',
      playersTurn:true,
      player: [new Animal('Elefant', 'placeholder.png', 3.3, 6000, 70, 1, 40)],
      computer: [new Animal('Nashorn', 'placeholder.png', 1, 2300, 50, 1, 50)],
      };
  getSelectPropertyHandler() {
    return property => this.setState((state) => 
      update(state, { selectedProperty: { $set: property},
                      computerUncovered: { $set: true}
                    }),
      );
  }
  render() {
    const { playersTurn, player, computer, selectedProperty, 
             computerUncovered } = this.state;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="info">
          {playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe.
        </div>
        <div className="cards">
          <Card 
            animal={player[0]} 
            uncovered={true}
            selectedProperty={selectedProperty} 
            onSelectProperty={this.getSelectPropertyHandler() } />
          <Card 
            animal={computer[0]}
            uncovered={computerUncovered} 
            selectedProperty={selectedProperty}/>
        </div>
      </div>
    );
  }
}
