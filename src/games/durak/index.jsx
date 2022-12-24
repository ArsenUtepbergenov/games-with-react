import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadDeck, backCard } from '@/api'
import { shuffle } from '@/utils'
import './durak.styles.css'

const fullDeck = loadDeck()
const deck = shuffle(Array.from(fullDeck.keys()))
const cardWidth = 124
const maxStep = 140

function Card({ src, className = '', styles = {}, onClick }) {
  return (
    <img
      src={src}
      className={'card ' + className}
      style={styles}
      alt=""
      onClick={onClick}
    />
  )
}

function Cards({ list, step = 0, className = '' }) {
  const cardImages = list.map(c => fullDeck.get(c))

  return (
    <>
      {cardImages.map(({ src }, i) => {
        return (
          <Card
            key={src}
            src={src}
            className={className}
            styles={{ left: `${i * step}px` }}
          />
        )
      })}
    </>
  )
}

function getRandomCard() {
  const index = Math.floor(Math.random() * deck.length)
  const card = deck[index]

  return {
    card,
    index,
  }
}

function getRandomCards(number) {
  const names = []

  if (deck.length < 0 || number < 1) return names
  if (number > deck.length) number = deck.length

  for (let i = 0; i < number; ) {
    const { card, index } = getRandomCard()

    if (names[card]) continue

    names.push(card)
    deck.splice(index, 1)

    i++
  }

  return names
}

function getCards(number) {
  const cards = []
  if (deck.length < 0 || number < 1) return cards
  if (number > deck.length) number = deck.length

  for (let i = 0; i < number; i++) {
    cards.push(deck.shift())
  }

  return cards
}

function Durak() {
  const tableRef = useRef(null)
  const tableWidth = useRef(0)
  const whoseMove = useRef('')
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

  const findLessTrump = useMemo(() => {}, [trumpCard])

  const handleStart = useCallback(() => {
    setPlayerCards(prev => [...prev, ...getRandomCards(6)])
    setOpponentCards(prev => [...prev, ...getRandomCards(6)])
    setTrumpCard(getRandomCards(1)[0])
    decreaseDeckSize(6 + 6 + 1)
  }, [])

  useEffect(() => {
    handleStart()
  }, [handleStart])

  const handleEndRound = () => {}

  const decreaseDeckSize = value => {
    setDeckSize(prev => (prev -= value))
  }

  const getCardFromDeck = () => {
    setPlayerCards(prev => [...prev, ...getCards(1)])
    decreaseDeckSize(1)
  }

  const getTrump = () => {
    if (deckSize > 1) return
    getCardFromDeck()
  }

  const giveCardsToOpponent = number => {
    setOpponentCards(prev => [...prev, ...getCards(number)])
    decreaseDeckSize(number)
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
            src={fullDeck.get(trumpCard)?.src}
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
            onClick={getCardFromDeck}
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
