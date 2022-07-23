import { Link } from "react-router-dom";

const Card = ({ card, deleteCard, editCard, _id }) => {
  return (
    <div className="container">
      <div className="card" style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top"
          src={card.bizImage}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <p className="card-text">
            {card.bizDescription}({card.bizPhone}), Address: {card.bizAddress}
          </p>
          <button onClick={deleteCard} className="btn btn-primary">
            Delete Card
          </button>
          <Link to={`editcard/${_id}`} className="btn btn-primary">
            Edit Card
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
