const Card = ({ title, value, subtitle }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p className="card-value">{value}</p>
            {subtitle && <span className="card-subtitle">{subtitle}</span>}
        </div>
    );
};
export default Card;
