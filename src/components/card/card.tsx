import "./card.css";

interface CardProps {
    id: number,
    price: number,
    title: string,
    image: string,
    description: string,
    onEdit: (id: number) => void,
    onDelete: (id: number) => void
}

export function Card({ id, price, image, title, description, onEdit, onDelete }: CardProps){
    return(
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p><b>Valor:</b> R$ {price}</p>
            <div className="card-actions">
                <button className="edit-button" onClick={() => onEdit(id)}>Editar</button>
                <button className="delete-button" onClick={() => onDelete(id)}>Excluir</button>
            </div>
        </div>
    )
}