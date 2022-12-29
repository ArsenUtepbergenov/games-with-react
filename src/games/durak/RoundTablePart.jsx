import { useContext } from 'react'
import { DurakContext } from './durak.context'
import Cards from './Cards'

export default function RoundTablePart() {
  const { cards } = useContext(DurakContext)

  return (
    <div className="roundTablePart">
      <Cards list={cards.round} />
    </div>
  )
}
