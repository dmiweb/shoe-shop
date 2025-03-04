import { TProduct } from "../../models";
import { ProductSize, ProductCount, AddToCartBtn } from "../../components";

const Product = ({ product }: { product: TProduct }) => {
  return (
    <section id={String(product.id)} className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={product.images[0]} className="img-fluid" alt={product.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku || ""}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer || ""}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color || ""}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material || ""}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season || ""}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason || ""}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <ProductSize sizes={product.sizes} />
            {product.sizes.length ? <ProductCount /> : null}
          </div>
          {product.sizes.length ? <AddToCartBtn product={product} /> : null}
        </div>
      </div>
    </section>
  );
}

export default Product;