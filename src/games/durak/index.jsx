import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { backCard, fullDeck } from '@/api'
import { Move, Powers } from './durak.models'
import Card from './Card'
import Cards from './Cards'
import { shuffle } from '@/utils'
import './durak.styles.css'

const deck = shuffle(Array.from(fullDeck.keys())).map(c => parseCard(c))
const cardWidth = 124
const maxStep = 140
const maxCards = 6

function parseCard(value) {
  const [kind, suit] = value.split('-')
  const power = Powers[kind]
  return { value, kind, suit, power }
}

function getCards(number) {
  const result = []
  if (deck.length < 0 || number < 1) return result
  if (number > deck.length) number = deck.length

  for (let i = 0; i < number; i++) {
    result.push(deck.shift())
  }

  return result
}

function minPower(cards) {
  return Math.min(...cards.map(item => item.power))
}

function findLessCardBySuit(cards, suit) {
  cards.sort((a, b) => (a.power === b.power ? 0 : a.power > b.power ? 1 : -1))

  const temp = cards.filter(c => c.suit === suit)
  return temp.filter(item => item.power === minPower(temp))
}

function Durak() {
  const tableRef = useRef(null)
  const tableWidth = useRef(0)
  const whoMove = useRef('')
  const [playerCards, setPlayerCards] = useState([])
  const [opponentCards, setOpponentCards] = useState([])
  const [trumpCard, setTrumpCard] = useState(null)
  const [deckSize, setDeckSize] = useState(deck.length)

  const playerStep = useMemo(() => {
    const temp = (tableWidth.current - cardWidth) / playerCards.length
    return temp > maxStep ? maxStep : temp
  }, [playerCards])

  const opponentStep = useMemo(() => {
    const temp = (tableWidth.current - cardWidth) / opponentCards.length
    return temp > maxStep ? maxStep : temp
  }, [opponentCards])

  useEffect(() => {
    tableWidth.current = tableRef.current.clientWidth
  })

  const lessPlayerTrump = useMemo(
    () => findLessCardBySuit(playerCards, trumpCard?.suit),
    [trumpCard, playerCards],
  )

  const lessOpponentTrump = useMemo(
    () => findLessCardBySuit(opponentCards, trumpCard?.suit),
    [trumpCard, opponentCards],
  )

  const whoFirstMove = useCallback(() => {
    let result = ''
    const p = lessPlayerTrump
    const o = lessOpponentTrump
    if (!p.length && !o.length)
      result = Math.random() < 0.5 ? Move.opponent : Move.player
    if (!p.length) result = Move.opponent
    if (!o.length) result = Move.player

    result = p[0]?.power < o[0]?.power ? Move.player : Move.opponent
    whoMove.current = result
  }, [lessPlayerTrump, lessOpponentTrump])

  const handleStart = useCallback(() => {
    setPlayerCards(prev => [...prev, ...getCards(maxCards - 3)])
    setOpponentCards(prev => [...prev, ...getCards(maxCards)])
    setTrumpCard(getCards(1)[0])
    decreaseDeckSize(maxCards + maxCards + 1)
  }, [])

  useEffect(() => {
    whoFirstMove()
  }, [whoFirstMove])

  useEffect(() => {
    handleStart()
  }, [handleStart])

  const handleEndRound = () => {}

  const handleMove = () => {
    console.log(whoMove.current)
  }

  const getTrump = () => {
    if (deckSize > 1) return
    decreaseDeckSize(1)
  }

  const giveCardsToOpponent = (number = 1) => {
    const numberCards = maxCards - opponentCards.length
    if (numberCards <= 0) return

    setOpponentCards(prev => [...prev, ...getCards(number)])
    decreaseDeckSize(number)
  }

  const giveCardsToPlayer = (number = 1) => {
    const numberCards = maxCards - playerCards.length
    if (numberCards <= 0) return

    setPlayerCards(prev => [...prev, ...getCards(number)])
    decreaseDeckSize(number)
  }

  const decreaseDeckSize = value => {
    setDeckSize(prev => (prev -= value))
  }

  return (
    <section ref={tableRef} className="table">
      <div className="opponent-side">
        <Cards list={opponentCards} step={opponentStep} />
      </div>
      <div className="common">
        {deckSize >= 1 ? (
          <Card
            key="trump"
            src={fullDeck.get(trumpCard?.value)?.src}
            className="trump"
            onClick={getTrump}
          />
        ) : (
          <></>
        )}
        {deckSize > 1 ? (
          <Card
            key="back"
            src={backCard.src}
            className="back"
            onClick={() => giveCardsToPlayer()}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="player-side">
        <Cards list={playerCards} step={playerStep} />
      </div>
    </section>
  )
}

export default Durak
