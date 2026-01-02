function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  )
}

export default Card
