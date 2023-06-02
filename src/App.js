import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card';

const cardImages = [
  {"src": "/img/helmet-1.png" , matched: false, flip: false}, 
  {"src": "/img/potion-1.png", matched: false, flip: false}, 
  {"src": "/img/ring-1.png", matched: false, flip: false}, 
  {"src": "/img/scroll-1.png", matched: false, flip: false}, 
  {"src": "/img/shield-1.png", matched: false, flip: false}, 
  {"src": "/img/sword-1.png", matched: false, flip: false}, 
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () =>{
    const suffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random()}))
    setCards(suffleCards)
    console.log(suffleCards)
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns(0)
  };
  const handleChoice = (card) => {
    if (!card.matched){
      if (choiceOne && choiceOne !== card) {
        setchoiceTwo(card)
      }
      else {
        setchoiceOne(card)
      }
    }
  };

  const resetTurn = () => {
    console.log("resetting"); 
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns(turns => turns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        console.log("those cards match"); 

      }
      else {
        console.log("those cards dont match"); 
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo]); 

  useEffect(() => {
    shuffleCards()
  }, []);


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <Card  
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>

    </div>
  );
}

export default App