import headerBackground from "../../assets/headerBackground.png"
import './Footer.css';
import bluesky from "../../assets/bluesky.png"
import facebook from "../../assets/facebook.png"
import instagram from "../../assets/instagram.png"
import tiktok from "../../assets/tiktok.png"


export default function Header() {
    return (
        <div className="footer">
            <div className="footerLeftContent">
                <p className="infoTitle"> Sobre nós</p>
                <p className="infoText">(11) 99999-9999</p>
                <p className="infoText">info@paonaporta.com</p>
                <p className="infoText">R. Haddock Lobo, 499</p>
                <p className="infoText">São Paulo - SP</p>
            </div>
            <div className="footerRightContent">
                <p className="infoTitle">Siga a gente</p>
                <div className="socialIconsContainer">
                    <img className="socialIcons" src={facebook} />
                    <img className="socialIcons" src={instagram} />
                    <img className="socialIcons" src={tiktok} />
                    <img className="socialIcons" src={bluesky} />
                </div>

            </div>

        </div>
    )
}