import './piece.styles.css'

export default function Piece({ img }) {
  if (!img) return <div className='piece' />

  const imgUrl = `src/assets/${img}.png`

  return (
    <div className='piece' >
      <div style={{ backgroundImage: `url(${imgUrl})` }} className="chess-piece" />
    </div>
  )
}
