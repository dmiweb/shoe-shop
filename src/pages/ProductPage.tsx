import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { requestProduct } from "../slices/productSlice";
import { Loader, Error, Banner, Product } from "../components";

const ProductPage = () => {
  const { product, loading, error } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(requestProduct(Number(params.id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProductError = () => {
    dispatch(requestProduct(Number(params.id)));
  }

  const handleProductNotFound = () => {
    navigate("/catalog", { replace: true });
  }

  return (
    <>
      <Banner />

      <div className="mt-5 mb-5">
        {loading && <Loader />}
        {
          error && !loading &&
          <Error
            message={error}
            handler={error === "Не удалось найти товар!" ? handleProductNotFound : handleProductError}
          />
        }
        {product && <Product product={product} />}
      </div>
    </>
  );
}

export default ProductPage;