import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Loading from '../../pages/Loading/Loading'
import MarkdownImg from './MarkdownImg/MarkdownImg'
import './Markdown.css'

export default function Markdown({ markdown }) {
  if (!markdown) return <Loading />

  return (
    <div className="markdown_parse_con">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ img: MarkdownImg }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
