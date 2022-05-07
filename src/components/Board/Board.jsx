import { useState } from 'react'
import Pieces from '../Pieces/Pieces'
import Tile from '../Tile/Tile'
import './board.styles.css'

export const axisX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const axisY = ['1', '2', '3', '4', '5', '6', '7', '8']

const draw = () => {
  const result = []

  for (let y = axisY.length - 1; y >= 0; y--) {
    for (let x = 0; x < axisX.length; x++) {
      const color = (x + y + 1) % 2 === 0 ? 'white-tile' : 'black-tile'

      result.push(<Tile key={`${axisX[x]}${axisY[y]}`} color={color} />)
    }
  }

  return result
}

export default function Board() {
  const [board] = useState(() => draw())

  return (
    <>
      <div className="board">
        {board}
        <Pieces />
      </div>
    </>
  )
}
