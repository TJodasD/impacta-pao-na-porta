
import './Card.css';

export default function Card(props) {
    return (
        <div className="card">
            <div className="imageContainer">
                <img className='cardImage' src={props.img} />
            </div>
            <div className='textContainer'>
                <p className='cardText'> {props.text}</p>
            </div>
        </div>
    )
}