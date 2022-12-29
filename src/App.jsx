import Durak from './games/durak'
import { DurakProvider } from './games/durak/durak.context'

function App() {
  return (
    <div className="app">
      <DurakProvider>
        <Durak />
      </DurakProvider>
    </div>
  )
}

export default App
