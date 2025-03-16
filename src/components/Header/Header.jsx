import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <>
      <div className="container container_header">
        <header className="header d_f_ai_ce">
          <div className="header_content d_f_jc_sb">
            <div className="logo">
              <Link to="/">Temprora</Link>
            </div>
            <div className="header_links list_x">
              <Link to="https://akbarswe.uz">About me</Link>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
