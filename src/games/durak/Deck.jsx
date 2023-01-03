import Card from './Card'

export default function Deck({ trump = null, size = 0 }) {
  return (
    <div className="deck">
      {size >= 1 ? <Card key="trump" item={trump} className="trump" /> : null}
      {size > 1 ? <Card key="back" className="back" flipped /> : null}
    </div>
  )
}
