import './tile.styles.css'

export default function Tile({ color }) {
  return <span className={`tile ${color}`} />
}
