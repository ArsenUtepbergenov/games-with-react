import { useEffect, useMemo, useRef, useState } from 'react'
import { loadDeck, backCard } from '@/api'
import './durak.styles.css'

const fullDeck = loadDeck()
const deck = Array.from(fullDeck.keys())
const cardWidth = 124

function Card({ src, className = '', styles = {} }) {
  return <img src={src} className={'card ' + className} style={styles} alt="" />
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

function Durak() {
  const tableRef = useRef(null)
  const tableWidth = useRef(0)
  const [playerCards, setPlayerCards] = useState([])
  const [opponentCards, setOpponentCards] = useState([])
  const [trumpCard, setTrumpCard] = useState([])
  const [deckSize, setDeckSize] = useState(deck.length)

  const playerStep = useMemo(
    () => (tableWidth.current - cardWidth) / playerCards.length,
    [tableWidth, playerCards],
  )

  const opponentStep = useMemo(
    () => (tableWidth.current - cardWidth) / opponentCards.length,
    [tableWidth, opponentCards],
  )

  useEffect(() => {
    tableWidth.current = tableRef.current.clientWidth
  })

  const handleStart = () => {
    setPlayerCards(prev => [...prev, ...getRandomCards(6)])
    setOpponentCards(prev => [...prev, ...getRandomCards(6)])
    setTrumpCard(prev => [...prev, ...getRandomCards(1)])
    setDeckSize(prev => (prev -= 6 + 6 + 1))
  }

  useEffect(() => {
    handleStart()
  }, [])

  return (
    <section ref={tableRef} className="table">
      <div className="opponent-side">
        <Cards list={opponentCards} step={opponentStep} />
      </div>
      <div className="common">
        {deckSize >= 1 ? (
          <Card
            key="trump"
            src={fullDeck.get(trumpCard[0])?.src}
            className="trump"
          />
        ) : (
          <></>
        )}
        {deckSize > 1 ? (
          <Card key="back" src={backCard.src} className="back" />
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
