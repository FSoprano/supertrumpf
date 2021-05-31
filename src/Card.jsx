import * as React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Animal from './Animal';

export default function Card({ animal, uncovered }) {
  Card.propTypes = {
    uncovered: PropTypes.bool.isRequired,
    animal: PropTypes.instanceOf(Animal).isRequired,
  };
  function handleClick(event, prop) {
    console.log(`${prop} clicked, ${event}`);
    }
  const front = (
    <div className="card">
      <h1>{animal.name ? animal.name : 'Unbekannt'}</h1>
      {/* Der gute alte Ternär-Operator. */}
      {animal.image && (
      <img
        alt={animal.name}
        height="200"
        width="200"
        src={`${process.env.PUBLIC_URL}/${animal.image}`}
      />
      )}
      {/* Zusätzliches Sicherheitsgedödel. Die beiden Zeilen
              oben sind nichts weiter als eine verkürzte if-Bedingung
              Nur wenn für elephant.image ein Wert zurückgegeben kann,
              wird das Bild angezeigt. */}
      <table>
        <tbody>
          {Object.keys(Animal.properties).map((property) => {
            const animalProperty = Animal.properties[property];
            return (
              <tr key={property}
               onClick={evnt => handleClick(evnt, property)} >
                <td>{animalProperty.label}</td>
                <td>
                  {animal[property]} &nbsp;
                  {animalProperty.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  const back = <div className="card back" />;
  if (uncovered) {
    return front;
  }
  return back;
}
