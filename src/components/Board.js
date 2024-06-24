import React from 'react';
import Card from './Card';
import './Board.css';

const Board = ({ cards, onCardClick, disabled }) => (
  <div className="board">
    {cards.map(card => (
      <Card
        key={card.id}
        card={card}
        onClick={onCardClick}
        isFlipped={card.isFlipped}
        isDisabled={disabled}
      />
    ))}
  </div>
);

export default Board;
