export const size = 10
export const MINE = -1
export const MINES = 10
export const getRandomPosition = () => Math.floor(Math.random() * size)
export const cellStyles = {
  display: 'flex',
  margin: 1,
  width: 44,
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '1.6rem',
  fontFamily: 'cursive',
}

export const directions = [
  { r: -1, c: 0 },
  { r: 1, c: 0 },
  { r: 0, c: -1 },
  { r: 0, c: 1 },
  { r: 1, c: 1 },
  { r: -1, c: 1 },
  { r: 1, c: -1 },
  { r: -1, c: -1 },
]

export const Cell = {
  transparent: '',
  fill: 'fill',
  flag: 'flag',
  question: 'question',
}

export const ViewCell = {
  transparent: null,
  fill: '🌱',
  flag: '🚩',
  question: '❓',
}

export const State = {
  play: 'play',
  lost: 'lost',
}
