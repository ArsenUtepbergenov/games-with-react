import Card from './Card'
import { fullDeck } from '@/api'

export default function Cards({ list, step = 0, className = '' }) {
  const cardImages = list.map(c => fullDeck.get(c.value))

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
