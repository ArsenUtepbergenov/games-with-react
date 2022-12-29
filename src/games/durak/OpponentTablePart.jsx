import { useRef, useMemo, useContext, useEffect, forwardRef } from 'react'
import { DurakContext } from './durak.context'
import Cards from './Cards'
import { cardWidth, maxStep } from './durak.models'

const OpponentTablePart = forwardRef((props, ref) => {
  const width = useRef(0)
  const { cards } = useContext(DurakContext)

  useEffect(() => {
    width.current = ref.current.clientWidth
  }, [ref])

  const step = useMemo(() => {
    const temp = (width.current - cardWidth) / cards.opponent.size
    return temp > maxStep ? maxStep : temp
  }, [cards.opponent])

  return <Cards list={cards.opponent} step={step} />
})

OpponentTablePart.displayName = 'OpponentTablePart'

export default OpponentTablePart
