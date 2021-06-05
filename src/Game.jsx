import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';

import './Game.css';
import Card from './Card';
import Animal from './Animal';

export default class Game extends React.Component {
  static defaultProps = {
    title: 'Supertrumpf',
  };

  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    computerUncovered: false,
    selectedProperty: '',
    playersTurn: true,
    // Karten von Spieler und Computer:
    player: [
    // Karten kommen jetzt über Server aus JSON Datei.
    ],
    computer: [
    // Karten kommen jetzt über json-server aus JSON Datei.
    ],
  };
  
  async componentDidMount() {
    const {data} = await axios.get('http://localhost:3001/card');
    /* Überflüssig geworden durch Axios:
     * const request = await fetch('http://localhost:3001/card');
     * const data = await request.json(); */
    const computer = [];
    const player = [];
    data.forEach((card, index) => {
      const animal = new Animal(card.name, card.image, card.size, 
        card.weight, card.age, card.offspring, card.speed);
      if (index % 2 === 0) {
        computer.push(animal);
      } else {
        player.push(animal);
      }
    });
      this.setState(state => 
        update(state, {
          player: {$set: player},
          computer: {$set: computer},
        }),
      );
  }


  getSelectPropertyHandler() {
    return property => this.play(property);
  }

  compare(property) {
    let playersTurn = this.state.playersTurn;

    const firstPlayer = this.state.player[0]; // erste Karte Spieler
    let player = update(this.state.player, { $splice: [[0, 1]] }); // erste Karte aus Array löschen, zweite Karte rückt nach.
    const firstComputer = this.state.computer[0]; // erste Karte Computer
    let computer = update(this.state.computer, { $splice: [[0, 1]] }); // erste Karte aus Array löschen, zweite Karte rückt nach.
  // Gewählter Property-Wert des Spielers höher als der des Computers:
    if (firstPlayer[property] > firstComputer[property]) {
      // Spieler ist nochmal dran:
      playersTurn = true;
      // Spieler erhält seine und die gewonnene Karte des Computers:
      player = update(player, { $push: [firstPlayer, firstComputer] });
      // Wenn der Computer keine Karten mehr hat, gewinnt der Spieler:
      if (computer.length === 0) {
        alert('Player wins');
        return;
      }
      // Umgekehrter Fall: Computer hat höheren Wert:
    } else if (firstPlayer[property] < firstComputer[property]) {
      playersTurn = false;
      computer = update(computer, { $push: [firstPlayer, firstComputer] });

      if (player.length === 0) {
        alert('Computer wins');
        return;
      }
    } 
    // Gleichstand: Die Spieler erhalten ihre Karten zurück. Es geht 
    // mit der nächsten Karte weiter.
    else {
      player = update(player, { $push: [firstPlayer] });
      computer = update(computer, { $push: [firstComputer] });
    }
    // der State wird für den nächsten Zug gesetzt:
    this.setState(
      state =>
        update(state, {
          $set: {
            computerUncovered: false,
            selectedProperty: '',
            playersTurn,
            player,
            computer,
          },
        }),
      () => {
        if (!playersTurn) {
          setTimeout(() => {
            const property = this.selectRandomProperty();
            this.play(property);
          }, 2000);
        }
      },
    );
  }

  play(property) {
    this.setState(
      () =>
        update(this.state, {
          selectedProperty: { $set: property },
          computerUncovered: { $set: true },
        }),
      // Verzögerung bis Compare aufgerufen wird: 2s
      () => {
        setTimeout(() => {
          this.compare(property);
        }, 2000);
      },
    );
  }
  
  // Computer wählt Eigenschaft auf Karte nach Zufallsprinzig aus
  selectRandomProperty() {
    const properties = Object.keys(Animal.properties);
    const index = Math.floor(Math.random() * properties.length);
    return properties[index];
  }

  render() {
    const {
      playersTurn,
      player,
      computer,
      selectedProperty,
      computerUncovered,
    } = this.state;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="info">
          {playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe
        </div>
        <div className="cards">
          {player[0] && (
            <Card
              animal={player[0]}
              uncovered={true}
              selectedProperty={selectedProperty}
              onSelectProperty={this.getSelectPropertyHandler()}
            />
          )}
          {/* Hinweis: Wird die Komponente ohne Daten gerendert, gibt es 
            * einen Fehler. player[0] && bzw computer[0] && stellen als 
            * Bedingungen sicher, dass tatsächlich jeweils eine Karte 
            * vorliegt*/}
          {computer[0] && (
            <Card
              animal={computer[0]}
              uncovered={computerUncovered}
              selectedProperty={selectedProperty}
            />
          )}
        </div>
      </div>
    );
  }
}

