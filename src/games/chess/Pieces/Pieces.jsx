import Piece from '../Piece/Piece'
import { useMemo, useRef, useState } from 'react'
import { axisX, axisY } from '../Board/Board'
import { initPieces } from './initState'
import './pieces.styles.css'

export default function Pieces() {
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const [pieces, setPieces] = useState(() => initPieces)
  const [activePiece, setActivePiece] = useState(null)
  const piecesRef = useRef()

  const draw = useMemo(() => {
    const result = []

    for (let y = axisY.length - 1; y >= 0; y--) {
      for (let x = 0; x < axisX.length; x++) {
        let img = undefined

        pieces.forEach((piece) => {
          if (piece.x === x && piece.y === y) {
            img = piece.img
          }
        })

        result.push(<Piece key={`${x}${y}`} img={img} />)
      }
    }

    return result
  }, [pieces])

  const grab = (e) => {
    const element = e.target
    const nodePieces = piecesRef.current

    if (element.classList.contains('chess-piece') && nodePieces) {
      const rect = nodePieces.getBoundingClientRect()
      setGridX(Math.floor((e.clientX - rect.x) / 100))
      setGridY(Math.abs(Math.ceil((e.clientY - rect.y - 800) / 100)))
      const x = e.clientX - rect.x - 50
      const y = e.clientY - rect.y - 50

      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      setActivePiece(element)
    }
  }

  const move = (e) => {
    const nodePieces = piecesRef.current

    if (nodePieces && activePiece) {
      const rect = nodePieces.getBoundingClientRect()
      const x = e.clientX - rect.x - 50
      const y = e.clientY - rect.y - 50

      if (x < -25) activePiece.style.left = `-25px`
      else if (x > 725) activePiece.style.left = `725px`
      else activePiece.style.left = `${x}px`

      if (y < -25) activePiece.style.top = `-25px`
      else if (y > 725) activePiece.style.top = `725px`
      else activePiece.style.top = `${y}px`
    }
  }

  const drop = (e) => {
    const nodePieces = piecesRef.current

    if (activePiece && nodePieces) {
      const rect = nodePieces.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.x) / 100)
      const y = Math.abs(Math.ceil((e.clientY - rect.y - 800) / 100))

      setPieces((value) => {
        return value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x
            p.y = y
          }
          return p
        })
      })

      setActivePiece(null)
    }
  }

  return (
    <div
      ref={piecesRef}
      id="pieces"
      className="pieces"
      onMouseDown={(e) => grab(e)}
      onMouseMove={(e) => move(e)}
      onMouseUp={(e) => drop(e)}
    >
      {draw}
    </div>
  )
}
