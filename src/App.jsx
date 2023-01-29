import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '@/pages/Main'
// import Room from '@/pages/Room'
// import VideoChat from '@/pages/VideoChat'
import NotFound404 from '@/pages/NotFound404'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/video-chat" element={<VideoChat />} /> */}
          {/* <Route path="/room/:id" element={<Room />} /> */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
