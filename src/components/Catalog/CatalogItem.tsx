import { Link } from "react-router-dom";
import { TCatalogItem } from "../../models";

const CatalogItem = ({item}: {item: TCatalogItem}) => {
  const {id, title, price, images} = item;

  return (
    <div className="col-4">
      <div id={String(id)} className="card h-100 catalog-item-card">
        <img src={images[0]}
          className="card-img-top img-fluid catalog-item-card-img" alt={title} />
          <div className="card-body d-flex flex-column justify-content-end">
            <p className="card-text">{title}</p>
            <p className="card-text">{`${price} руб.`}</p>
            <Link to={`/catalog/${id}`} className="btn btn-outline-primary align-self-start">Заказать</Link>
          </div>
      </div>
    </div>
  );
}

export default CatalogItem;