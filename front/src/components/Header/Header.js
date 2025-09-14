import headerBackground from "../../assets/headerBackground.png"
import './Header.css';
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom"


export default function Header() {
  const navigate = useNavigate();

  const navToPage = (url) => {
    navigate(url)
  }
  return (
    <div className="header">
      <div className="headerLeftContent">
        <div className="logoDiv">
          <img src={logo} onClick={() => navToPage('/')} className="logo" />
        </div>
        <div className="headerNavDiv">
          <p className="headerNavButtons" onClick={() => navToPage('/')}>Início</p>
          <p className="headerNavButtons">Pedidos</p>
          <p className="headerNavButtons">Sobre</p>
        </div>
      </div>
      <div className="headerRightContent">

        <div className="signUpDiv">
          <p className="headerNavButtons" onClick={() => navToPage('/cadastro')}>Cadastre-se</p>
          <p className="headerNavButtons">Entrar</p>
        </div>
      </div>

    </div>
  )
}