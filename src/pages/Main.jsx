import ACTIONS from '../models/socket-actions.js'
import { useEffect, useRef, useState } from 'react'
import socket from '../client'
import { useNavigate } from 'react-router'
import { v4 } from 'uuid'

export default function Main() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const rootNode = useRef()

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] }) => {
      if (rootNode.current) setRooms(rooms)
    })
  }, [])

  return (
    <div ref={rootNode}>
      <h1>Available rooms:</h1>

      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`room/${roomID}`)
              }}
            >
              Join the room
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          navigate(`room/${v4()}`)
        }}
      >
        Create new room
      </button>
    </div>
  )
}
