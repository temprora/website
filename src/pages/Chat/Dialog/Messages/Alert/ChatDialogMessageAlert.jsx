import './ChatDialogMessageAlert.css'

export default function ChatDialogMessageAlert({ message }) {
  return (
    <>
      <div className="message_con d_f_ce">
        <div className="chat_message_alert">{message.message}</div>
      </div>
    </>
  )
}
