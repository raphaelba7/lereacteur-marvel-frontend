import { Link } from "react-router-dom";
import "./Card.css";
const Card = ({ name, description, pathImg, characters }) => {
  return (
    <div className="full-card">
      <div className="card-thumb">
        {characters ? (
          <Link to={`/character/${characters}`}>
            <figure>
              <img src={pathImg} alt={name} />
            </figure>
          </Link>
        ) : (
          <figure>
            <img src={pathImg} alt={name} />
          </figure>
        )}
      </div>
      <div className="card-body">
        <div className="title-card">
          <h3>{name}</h3>
        </div>
        <div className="description-card">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
