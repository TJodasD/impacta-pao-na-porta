import Header from "../../components/Header/Header";
import './home.css'
import breadBackground from "../../assets/breadBanner3.png"
import Card from "../../components/Card/Card"
import pao1 from "../../assets/pao1.png"
import pao2 from "../../assets/pao2.png"
import pao3 from "../../assets/pao3.png"
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom"




export default function Home() {
    const navigate = useNavigate();

    const navToPage = (url) => {
        navigate(url)
    }
    console.log("teste")
    return (
        <div className="mainContainer">
            <Header />
            <div className="bodyContainer">
                <div className="bannerContainer">
                    <img src={breadBackground} className="banner"></img>
                    <div>
                        <button className="bannerButton" onClick={() => navToPage('/newOrder')}>Peça agora</button>
                    </div>
                </div>
                <div className="specialtiesContainer">
                    <p className="specialtiesTitle"> Nossas especialidades</p>

                    <div className="carouselContainer">
                        <img className="arrow" src={leftArrow} />
                        <div className="cardContainer">
                            <Card text={"Sourdough"} img={pao1} />
                            <Card text={"Pão de Gergelim"} img={pao2} />
                            <Card text={"Baguete Integral"} img={pao3} />
                        </div>
                        <img className="arrow" src={rightArrow} />
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}