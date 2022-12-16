import { useMemo, useState } from 'react'
import {
  size,
  MINE,
  MINES,
  getRandomPosition,
  cellStyles,
  directions,
  Cell,
  ViewCell,
  State,
} from './config'

function createField() {
  try {
    if (MINES > size * size) throw new Error('Too many mines!')

    const grid = new Array(size * size).fill(0)

    function increaseAroundCell(x, y) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (grid[y * size + x] === MINE) return

        grid[y * size + x] += 1
      }
    }

    for (let i = 0; i < MINES; ) {
      const x = getRandomPosition()
      const y = getRandomPosition()

      if (grid[y * size + x] === MINE) continue
      grid[y * size + x] = MINE

      directions.forEach(d => increaseAroundCell(x + d.r, y + d.c))

      i++
    }

    return grid
  } catch (error) {
    console.error(error)
    return []
  }
}

const Minesweeper = () => {
  const dimensions = new Array(size).fill(null)
  const [state, setState] = useState(State.play)
  const [field, _] = useState(() => createField())
  const [mask, setMask] = useState(() => new Array(size * size).fill(Cell.fill))

  const win = useMemo(
    () =>
      !field.some(
        (f, i) =>
          f === MINE && mask[i] !== Cell.flag && mask[i] !== Cell.transparent,
      ),
    [mask, field],
  )

  const handleClick = (x, y) => {
    if (state !== State.play) return
    if (mask[y * size + x] === Cell.transparent) return
    if (field[y * size + x] === MINE) {
      mask.forEach((_, i) => (mask[i] = Cell.transparent))
      setMask(prev => [...prev, ...mask])
      setState(State.lost)
      return
    }

    const emptyCells = []

    function clear(x, y) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (mask[y * size + x] !== Cell.transparent) emptyCells.push([x, y])
      }
    }

    clear(x, y)

    while (emptyCells.length > 0) {
      const [x, y] = emptyCells.pop()

      mask[y * size + x] = Cell.transparent

      if (field[y * size + x] !== 0) continue

      clear(x + 1, y)
      clear(x - 1, y)
      clear(x, y + 1)
      clear(x, y - 1)
    }

    setMask(prev => [...prev, ...mask])
  }

  const handleContextMenu = (event, cell) => {
    event.preventDefault()
    event.stopPropagation()

    if (state !== State.play || mask[cell] === Cell.transparent) return

    if (mask[cell] === Cell.fill) mask[cell] = Cell.flag
    else if (mask[cell] === Cell.flag) mask[cell] = Cell.question
    else mask[cell] = Cell.fill

    setMask(prev => [...prev, ...mask])
  }

  return (
    <div>
      {dimensions.map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {dimensions.map((_, x) => (
            <div
              key={x}
              style={{
                ...cellStyles,
                backgroundColor:
                  state === State.lost
                    ? '#ec9696'
                    : win
                    ? '#ffeb3b'
                    : '#cef69f',
              }}
              onClick={() => handleClick(x, y)}
              onContextMenu={event => handleContextMenu(event, y * size + x)}
            >
              {mask[y * size + x] !== Cell.transparent
                ? ViewCell[mask[y * size + x]]
                : field[y * size + x] === MINE
                ? '💣'
                : field[y * size + x]}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Minesweeper
