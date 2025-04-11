import Markdown from '../../../../../components/Markdown/Markdown'
import MarkdownImg from '../../../../../components/Markdown/MarkdownImg/MarkdownImg'
import FileInfoPreview from '../../../../../components/FilePreview/Info/FileInfoPreview'
import { decrypt } from '../../../../../script/hash'
import { timeToTime } from '../../../../../script/convert/time'
import './ChatDialogMessage.css'

export default function ChatDialogMessage({ message, showAuthor }) {
  const msgFile = {
    data: message?.file?.data,
    isImage: message?.file?.type?.includes('image'),
  }

  return (
    <div className="message_con" mine={message?.mine ? 'true' : 'false'}>
      <div className="message list_y" mine={message?.mine ? 'true' : 'false'}>
        {showAuthor && (
          <div>
            <b className="chat_message_author">{message?.author?.name}</b>
            <hr className="x" />
          </div>
        )}
        {msgFile.data && msgFile.isImage && (
          <MarkdownImg src={message?.file?.data} />
        )}
        {msgFile.data && !msgFile.isImage && (
          <FileInfoPreview file={message?.file} preview={true} />
        )}
        {message?.message && <Markdown markdown={decrypt(message?.message)} />}
        <div className="chat_message_date">{timeToTime(message?.date)}</div>
      </div>
    </div>
  )
}
