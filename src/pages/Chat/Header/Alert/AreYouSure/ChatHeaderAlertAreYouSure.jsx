import { useContext } from 'react'
import Alert from '../../../../../components/Alert/Alert'
import Button from '../../../../../components/Button/Button'
import { ChatContext } from '../../../ChatContext'
import { leaveChat } from '../../../../../module/chat'
import './ChatHeaderAlertAreYouSure.css'

export default function ChatHeaderAlertAreYouSure({ onClose }) {
  const { chat } = useContext(ChatContext)

  async function leave() {
    await leaveChat()
  }

  return (
    <>
      <Alert onClose={onClose}>
        <div className="list_y">
          <div className="chat_alert_are_you_sure_text">
            Are you sure to leave the room <b>{chat?.id}</b>
          </div>
          <div className="list_x">
            <Button className="chat_alert_are_you_sure_btn">Close</Button>
            <Button
              className="chat_alert_are_you_sure_btn leave_btn"
              onClick={leave}
            >
              Leave
            </Button>
          </div>
        </div>
      </Alert>
    </>
  )
}
