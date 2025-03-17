import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { createChat } from '../../../module/chat'
import { saveToSessionStorage } from '../../../script/sessionStorage'

export default function Create() {
  const navigation = useNavigate()

  useEffect(() => {
    async function create() {
      const chatId = await createChat()
      saveToSessionStorage('chatId', chatId)

      if (chatId) navigation('/chat')
    }
    create()
  }, [])

  return (
    <>
      <div className="d_f_ce">
        <LoadingSpinner text="Creating chat" />
      </div>
    </>
  )
}
