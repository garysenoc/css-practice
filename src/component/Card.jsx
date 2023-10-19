import "./Card.css";

const Card = ({ data, isStacked, index }) => {
  const {
    title = "",
    time = "",
    description = "",
    reads = "",
    views = "",
    comments = "",
    color = "",
    imageLink = "",
  } = data;
  return (
    <div
      className={`card-container ${isStacked ? "cards-stacked" : ""}`}
      style={{
        transform: isStacked
          ? `translateX(${index * 40}px) translateY(-${index * 40}px)`
          : "",
        zIndex: index,
      }}
    >
      <img src={imageLink} alt="mountain" className="card-image" />
      <div className="card-content">
        <div className="card-info-container">
          <div style={{ color: color }} className={`card-time`}>
            {time}
          </div>
          <div className="card-title">{title}</div>
          <div className="card-description">{description}</div>
        </div>
        <div style={{ backgroundColor: color }} className="card-stats">
          <span className="flex-col">
            <span className="font-bold">{reads}</span>
            <span className="font-light">Reads</span>
          </span>
          <span className="flex-col">
            <span className="font-bold">{views}</span>
            <span className="font-light">Views</span>
          </span>
          <span className="flex-col">
            <span className="font-bold">{comments}</span>
            <span className="font-light">Comments</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
