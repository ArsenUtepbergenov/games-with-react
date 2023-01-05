import { useParams } from 'react-router'
import useWebRTC, { LOCAL_VIDEO } from '../hooks/web/useWebRTC'

function layout(numberClients) {
  const pairs = Array.from({ length: numberClients }).reduce((a, next, i, array) => {
    if (i % 2 === 0) a.push(array.slice(i, i + 2))

    return a
  }, [])

  const height = `${100 / pairs.length}%`

  return pairs
    .map((row, i, array) => {
      if (i === array.length - 1 && row.length === 1) {
        return [{ width: '100%', height }]
      }

      return row.map(() => ({
        width: '50%',
        height,
      }))
    })
    .flat()
}

export default function Room() {
  const { id: roomID } = useParams()
  const { clients, provideMediaRef } = useWebRTC(roomID)
  const videoLayout = layout(clients.length)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '100vh',
      }}
    >
      {clients.map((clientID, i) => {
        return (
          <div key={clientID} style={videoLayout[i]}>
            <video
              width="100%"
              height="100%"
              ref={instance => provideMediaRef(clientID, instance)}
              autoPlay
              playsInline
              muted={clientID === LOCAL_VIDEO}
            />
          </div>
        )
      })}
    </div>
  )
}
