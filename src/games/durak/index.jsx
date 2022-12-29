import { useContext, useEffect, useRef } from 'react'
import Deck from './Deck'
import { Move } from './durak.models'
import './durak.styles.css'
import RoundTablePart from './RoundTablePart'
import PlayerTablePart from './PlayerTablePart'
import OpponentTablePart from './OpponentTablePart'
import { DurakContext } from './durak.context'
import { deck, getCards, maxCards, findLessCardBySuit } from './durak.models'

function getWhoMove(cards, suit) {
  const p = findLessCardBySuit(Array.from(cards.player), suit)
  const o = findLessCardBySuit(Array.from(cards.opponent), suit)
  if (!p.length && !o.length)
    return Math.random() < 0.5 ? Move.opponent : Move.player
  if (!p.length) return Move.opponent
  if (!o.length) return Move.player

  return p[0]?.power < o[0]?.power ? Move.player : Move.opponent
}

function Durak() {
  const tableRef = useRef(null)
  const whoMove = useRef('')
  const trumpCard = useRef(null)
  const size = useRef(deck.length)
  const { cards, dispatch } = useContext(DurakContext)

  useEffect(() => {
    dispatch({ type: 'addToPlayer', payload: getCards(maxCards - 3) })
    dispatch({ type: 'addToOpponent', payload: getCards(maxCards) })
    trumpCard.current = getCards(1)[0]
    size.current = maxCards + maxCards - 3 + 1
  }, [dispatch])

  whoMove.current = getWhoMove(cards, trumpCard.current?.suit)
  console.log(whoMove.current)

  // const giveCardsToOpponent = (number = 1) => {
  //   const numberCards = maxCards - opponentCards.length
  //   if (numberCards <= 0) return

  //   setOpponentCards(prev => [...prev, ...getCards(number)])
  //   decreaseDeckSize(number)
  // }

  return (
    <section ref={tableRef} className="table">
      <div className="opponent-table-part">
        <OpponentTablePart ref={tableRef} />
      </div>
      <div className="common">
        <RoundTablePart />
        <Deck trump={trumpCard.current} size={size.current} />
      </div>
      <div className="player-table-part">
        <PlayerTablePart ref={tableRef} />
      </div>
    </section>
  )
}

export default Durak
