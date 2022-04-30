import Piece from '@/components/Piece/Piece'
import { useRef, useState } from 'react'
import { axisX, axisY } from '../Board/Board'
import './pieces.styles.css'

const TypePiece = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king',
}

const ColorPiece = {
  WHITE: 'w',
  BLACK: 'b',
}

const pieces = []

function init() {
  setPiece(TypePiece.PAWN, ColorPiece.WHITE)
  setPiece(TypePiece.PAWN, ColorPiece.BLACK)
  setPiece(TypePiece.ROOK, ColorPiece.WHITE)
  setPiece(TypePiece.ROOK, ColorPiece.BLACK)
  setPiece(TypePiece.KNIGHT, ColorPiece.WHITE)
  setPiece(TypePiece.KNIGHT, ColorPiece.BLACK)
  setPiece(TypePiece.BISHOP, ColorPiece.WHITE)
  setPiece(TypePiece.BISHOP, ColorPiece.BLACK)
  setPiece(TypePiece.QUEEN, ColorPiece.WHITE)
  setPiece(TypePiece.QUEEN, ColorPiece.BLACK)
  setPiece(TypePiece.KING, ColorPiece.WHITE)
  setPiece(TypePiece.KING, ColorPiece.BLACK)
}

function setPiece(type, color) {
  let startY = color === ColorPiece.BLACK ? 7 : 0

  switch (type) {
    case TypePiece.PAWN:
      startY = color === ColorPiece.BLACK ? 6 : 1
      setPawns(startY, `pawn_${color}`)
      break;
    case TypePiece.ROOK:
      setRooks(startY, `rook_${color}`)
      break;
    case TypePiece.KNIGHT:
      setKnights(startY, `knight_${color}`)
      break;
    case TypePiece.BISHOP:
      setBishops(startY, `bishop_${color}`)
      break;
    case TypePiece.QUEEN:
      setQueen(startY, `queen_${color}`)
      break;
    case TypePiece.KING:
      setKing(startY, `king_${color}`)
      break;
    default:
      break;
  }
}

function setKing(startY, img) {
  pieces.push({ x: 4, y: startY, img })
}

function setQueen(startY, img) {
  pieces.push({ x: 3, y: startY, img })
}

function setBishops(startY, img) {
  pieces.push({ x: 2, y: startY, img })
  pieces.push({ x: 5, y: startY, img })
}

function setKnights(startY, img) {
  pieces.push({ x: 1, y: startY, img })
  pieces.push({ x: 6, y: startY, img })
}

function setRooks(startY, img) {
  pieces.push({ x: 0, y: startY, img })
  pieces.push({ x: 7, y: startY, img })
}

function setPawns(startY, img) {
  for (let i = 0; i < 8; i++)
    pieces.push({ x: i, y: startY, img })
}

init()

export default function Pieces() {
  const [activePiece, setActivePiece] = useState(null)
  const piecesRef = useRef()

  const draw = () => {
    const result = []

    for (let y = axisY.length - 1; y >= 0; y--) {
      for (let x = 0; x < axisX.length; x++) {
        let img = undefined

        pieces.forEach(piece => {
          if (piece.x === x && piece.y === y) {
            img = piece.img
          }
        })

        result.push(<Piece key={`${x}${y}`} img={img} />)
      }
    }

    return result
  }

  const grab = (e) => {
    const element = e.target
    const current = piecesRef.current

    if (element.classList.contains('chess-piece') && current) {
      const x = e.clientX - (window.innerWidth - current.clientWidth) / 2 - 50
      const y = e.clientY - (window.innerHeight - current.clientHeight) / 2 - 50
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      setActivePiece(element)
    }
  }

  const move = (e) => {
    const element = e.target
    const current = piecesRef.current

    if (current && activePiece) {
      const minX = current.offsetLeft - 25
      const minY = current.offsetTop - 25
      const maxX = current.offsetLeft + current.clientWidth - 75
      const maxY = current.offsetTop + current.clientHeight - 75
      const x = e.clientX - (window.innerWidth - current.clientWidth) / 2 - 50
      const y = e.clientY - (window.innerHeight - current.clientHeight) / 2 - 50
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      element.style.position = 'absolute'

      if (x < minX)
        activePiece.style.left = `${minX}px`;
      else if (x > maxX)
        activePiece.style.left = `${maxX}px`;
      else
        activePiece.style.left = `${x}px`;

      if (y < minY)
        activePiece.style.top = `${minY}px`;
      else if (y > maxY)
        activePiece.style.top = `${maxY}px`;
      else
        activePiece.style.top = `${y}px`;
    }
  }

  const drop = (e) => {
    if (activePiece)
      setActivePiece(null)
  }

  return (
    <div
      ref={piecesRef}
      className='pieces'
      onMouseDown={e => grab(e)}
      onMouseMove={e => move(e)}
      onMouseUp={e => drop(e)}
    >
      {draw()}
    </div>
  )
}
