import './piece.styles.css'

export default function Piece({ img }) {
  if (!img) return <div className='piece' />

  const imgUrl = new URL(`../../assets/${img}.png`, import.meta.url)

  return (
    <div className='piece' >
      <img src={imgUrl} />
    </div>
  )
}
