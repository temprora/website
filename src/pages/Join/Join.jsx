import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ErrorText from '../../components/ErrorText/ErrorText'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { joinChat } from '../../module/chat'
import { validChatId } from '../../script/validator'
import { saveToSessionStorage } from '../../script/sessionStorage'
import './Join.css'

export default function Join() {
  const [error, setError] = useState('')
  const [url] = useSearchParams()
  const roomId = useRef(url.get('room')).current
  const navigator = useNavigate()
  const hasJoined = useRef(false)

  useEffect(() => {
    if (!validChatId(roomId)) return setError('Invalid chat id')
    if (hasJoined.current) return

    hasJoined.current = true

    async function join() {
      await joinChat(roomId)
      saveToSessionStorage('chatId', roomId)

      navigator('/chat')
    }

    join()
  }, [roomId])

  return (
    <div className="container container_content d_f_ce">
      {error && <JoinError error={error} />}
      {!error && <JoinJoining roomId={roomId} />}
    </div>
  )
}

function JoinError({ error }) {
  return (
    <div className="d_f_ce list_y">
      <ErrorText>{error}</ErrorText>
      <Link to="/" className="join_error_btn">
        <Button>
          Go <b>Home</b>
        </Button>
      </Link>
    </div>
  )
}

function JoinJoining({ roomId }) {
  return (
    <>
      <LoadingSpinner text={`Joining to ${roomId}`} />
    </>
  )
}
