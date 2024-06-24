import React from 'react';
import './Card.css';

const Card = ({ card, onClick, isFlipped, isDisabled }) => (
  <div
    className={`card ${isFlipped ? 'flipped' : ''}`}
    onClick={() => !isFlipped && !isDisabled && onClick(card)}
  >
    <div className="card-front">?</div>
    <div className="card-back">{card.content}</div>
  </div>
);

export default Card;
