import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { createChat } from '../../../module/chat'
import { saveToSessionStorage } from '../../../script/sessionStorage'

export default function Create() {
  const [joined, setJoined] = useState(false)
  const navigation = useNavigate()

  useEffect(() => {
    async function join() {
      const chatId = await createChat()

      setJoined(chatId)
      saveToSessionStorage('chatId', chatId)

      if (chatId) navigation('/chat')
    }
    join()
  }, [])

  return (
    <>
      <div className="d_f_ce">
        {!joined && <LoadingSpinner />}
      </div>
    </>
  )
}
