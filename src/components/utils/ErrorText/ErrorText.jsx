import './ErrorText.css'

export default function ErrorText({ children, className, ...props }) {
  return (
    <div className={`error_text ${className}`} {...props}>
      {children}
    </div>
  )
}
