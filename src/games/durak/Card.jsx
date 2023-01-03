import { memo, useContext } from 'react'
import { DurakContext } from './durak.context'
import { backCard, fullDeck } from '@/api'

const Card = memo(
  ({
    item = null,
    className = '',
    styles = {},
    flipped = false,
    clickable = false,
  }) => {
    const { dispatch } = useContext(DurakContext)

    if (!item && !flipped) return null

    const src = flipped ? backCard.src : fullDeck.get(item.value).src
    const style = { ...styles, cursor: clickable ? 'pointer' : 'unset' }

    const handleClick = () => {
      if (!clickable) return

      console.log('handleClick')
      dispatch({ type: 'addToRoundFromPlayer', payload: [item] })
    }

    return (
      <img
        src={src}
        className={'card ' + className}
        style={style}
        alt=""
        onClick={handleClick}
      />
    )
  },
)

Card.displayName = 'Card'

export default Card
