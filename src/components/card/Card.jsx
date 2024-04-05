const Card = ({ name, description, pathImg }) => {
  return (
    <div className="full-card">
      <div className="card-thumb">
        <figure>
          <img src={pathImg} alt={name} />
        </figure>
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
