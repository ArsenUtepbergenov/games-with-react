export function loadImage(url) {
  const image = new Image()
  image.onload = image.src = url
  return image
}

const kinds = ['6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
const suits = ['spades', 'clubs', 'hearts', 'diamonds']
const CARDS_URL = 'src/assets/cards/'

export const backCard = loadImage(`${CARDS_URL}back.png`)

export function loadDeck() {
  const cardFileNames = new Set()
  const cardImages = new Map()

  suits.forEach(s => kinds.forEach(k => cardFileNames.add(`${k}-${s}`)))

  cardFileNames.forEach(cn =>
    cardImages.set(cn, loadImage(`${CARDS_URL}${cn}.png`)),
  )

  return cardImages
}
