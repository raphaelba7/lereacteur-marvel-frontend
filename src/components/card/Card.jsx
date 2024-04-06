import "./Card.css";
const Card = ({ name, description, pathImg }) => {
  return (
    <div className="full-card">
      <div className="card-thumb">
        <figure>
          <img src={pathImg} alt={name} />
        </figure>
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
