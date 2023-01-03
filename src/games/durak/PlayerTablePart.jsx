import { useRef, useMemo, useContext, useEffect, forwardRef } from 'react'
import { DurakContext } from './durak.context'
import Cards from './Cards'
import { cardWidth, maxStep } from './durak.models'

const PlayerTablePart = forwardRef((props, ref) => {
  const width = useRef(0)
  const { cards } = useContext(DurakContext)

  useEffect(() => {
    width.current = ref.current.clientWidth
  }, [ref])

  const step = useMemo(() => {
    const temp = (width.current - cardWidth) / cards.player.size
    return temp > maxStep ? maxStep : temp
  }, [cards.player])

  return <Cards list={cards.player} step={step} clickable />
})

PlayerTablePart.displayName = 'PlayerTablePart'

export default PlayerTablePart
