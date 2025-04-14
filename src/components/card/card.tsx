import "./card.css";

interface CardProps {
    price: number,
    title: string,
    image: string,
    description: string
}

export function Card({ price, image, title, description } : CardProps){
    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p>{description}</p>
            <p><b>Valor:</b>{price}</p>
        </div>
    )
}