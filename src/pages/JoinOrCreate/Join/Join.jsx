import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import ErrorText from '../../../components/ErrorText/ErrorText'
import { joinChat } from '../../../module/chat'
import { validChatId } from '../../../script/validator'
import { saveToSessionStorage } from '../../../script/sessionStorage'
import './Join.css'

export default function Join() {
  const [chatId, setChatId] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigate()

  async function handleClick(e) {
    e.preventDefault()
    if (!validChatId(chatId)) return setError('Invalid chat id')

    const joinedChatId = await joinChat(chatId)

    saveToSessionStorage('chatId', joinedChatId)

    if (joinedChatId) navigation('/chat')
  }

  return (
    <>
      <form onSubmit={handleClick} className="join_or_create_con list_y">
        <Input
          autoFocus
          label="Chat id"
          name="first-name"
          placeholder="Paste id here"
          onChange={(e) => {
            setChatId(e.target.value)
            setError('')
          }}
        />
        {error && <ErrorText className="d_f_ce">{error}</ErrorText>}
        <Button onClick={handleClick} disabled={!chatId}>
          Join
        </Button>
        <Link to="/join-or-create" className="join_back_link d_f_ce">
          Back to join-or-create
        </Link>
      </form>
    </>
  )
}
