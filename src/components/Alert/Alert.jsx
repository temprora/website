import './Alert.css'

export default function Alert({ onClose, children }) {
  return (
    <>
      <div className="alert_win d_f_ce">
        <div className="alert_bg" onClick={onClose}></div>
        <div className="alert_con">{children}</div>
      </div>
    </>
  )
}
