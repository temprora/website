import './ErrorText.css'

export default function ErrorText({ children: text, className, ...props }) {
  return (
    <>
      <div className={`error_text ${className}`} {...props}>
        {text}
      </div>
    </>
  )
}
