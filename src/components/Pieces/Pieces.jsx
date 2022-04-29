import Piece from '@/components/Piece/Piece'
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

        result.push(<Piece key={`${axisX[x]}${axisY[y]}${img}`} img={img} />)
      }
    }

    return result
  }

  return (
    <div className='pieces'>
      <div className='content'>
        {draw()}
      </div>
    </div>
  )
}
