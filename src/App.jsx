import { useEffect, useState } from "react"
import Card from "./components/card"
import Scoreboard from "./components/ScoreCard"

function App() {
  const [cards, setCards] = useState([])
  const [clickedCards, setClickedCards] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [message, setMessage] = useState("Click a card to start the game!")


  function shuffleCards(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

  function handleCardClick(id) {
  if (clickedCards.includes(id)) {
    // Game over
    setScore(0)
    setClickedCards([])
    setMessage("Game Over! You clicked the same card. Try again 😄")
  } else {
    const newScore = score + 1
    setScore(newScore)
    setClickedCards([...clickedCards, id])
    setBestScore(Math.max(bestScore, newScore))
    setMessage("Good choice! Keep going 🚀")
  }

  setCards(shuffleCards(cards))
}


  useEffect(() => {
  async function fetchPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await res.json()

    const pokemonData = data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }))

    setCards(shuffleCards(pokemonData))
  }

  fetchPokemon()
}, [])


  return (
    <div>
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <p className="message">{message}</p>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}

export default App
