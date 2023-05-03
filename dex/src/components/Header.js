import React from 'react'
import Logo from '../fastMaticLogo.svg'
import Matic from '../matic.svg'
import Tg from '../tg1.svg'
import { Link } from 'react-router-dom'

function Header(props) {
  const { address, isConnected, connect } = props

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">FastMatic</div>
        </Link>
        <Link to="/dashboard" className="link">
          <div className="headerItem">Dashboard</div>
        </Link>
        <div className="headerItem">
          <a
            href="https://drive.google.com/file/d/1FmI7KYkMZ-WraCga9SxE7-Uh1U1Z_WDS/view?usp=share_link"
            target="_blank"
            rel="noreferrer">
            How Does It Work
          </a>
        </div>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <a href="https://t.me/fastmaticdaily" target="_blanck">
            <img src={Tg} alt="tg" />
          </a>
        </div>
        <div className="headerItem">
          <img src={Matic} alt="matic" className="eth" />
          Polygon
        </div>

        <div
          className="connectButton"
          onClick={() => {
            connect()
          }}>
          {isConnected
            ? address.slice(0, 4) + '...' + address.slice(38)
            : 'Connect'}
        </div>
      </div>
    </header>
  )
}

export default Header
