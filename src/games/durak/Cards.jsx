import Card from './Card'

export default function Cards({
  list,
  step = 0,
  flipped = false,
  clickable = false,
  className = '',
}) {
  return (
    <>
      {Array.from(list).map((item, i) => {
        return (
          <Card
            key={item.value}
            item={item}
            className={className}
            flipped={flipped}
            clickable={clickable}
            styles={{ left: `${i * step}px` }}
          />
        )
      })}
    </>
  )
}
