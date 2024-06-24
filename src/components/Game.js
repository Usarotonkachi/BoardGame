import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const generateCards = () => {
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const cards = symbols.concat(symbols).map((symbol, index) => ({
    id: index,
    content: symbol,
    isFlipped: false,
  }));
  return cards.sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.content === secondCard.content) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: true }
              : card
          )
        );
        setFlippedCards([]);
        if (cards.every(card => card.isFlipped)) {
          setGameOver(true);
        }
      } else {
        setDisabled(true);
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards, cards, moves]);

  const handleCardClick = card => {
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedCards([...flippedCards, card]);
  };

  const handleRestart = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="game">
      <h1>Memory Game</h1>
      <p>Moves: {moves}</p>
      <Board cards={cards} onCardClick={handleCardClick} disabled={disabled} />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;
