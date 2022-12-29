import { fullDeck } from '@/api'
import { shuffle } from '@/utils'

export const Move = {
  player: 'player',
  opponent: 'opponent',
}

export const Powers = {
  6: 1,
  7: 2,
  8: 3,
  9: 4,
  10: 5,
  j: 6,
  q: 7,
  k: 8,
  a: 9,
}

export const cardWidth = 110
export const maxStep = 120
export const maxCards = 6

export const deck = shuffle(Array.from(fullDeck.keys())).map(c => parseCard(c))

function parseCard(value) {
  const [kind, suit] = value.split('-')
  const power = Powers[kind]
  return { value, kind, suit, power }
}

export function getCards(number) {
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

export function findLessCardBySuit(cards, suit) {
  const temp = cards.filter(c => c.suit === suit)
  return temp.filter(item => item.power === minPower(temp))
}
