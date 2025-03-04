import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOrders } from "../../slices/cartSlice";
import { TProduct, TOrder } from "../../models";

const AddToCartBtn = ({ product }: { product: TProduct }) => {
  const productSize = useAppSelector(state => state.product.size);
  const productCount = useAppSelector(state => state.product.count);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const newOrder: TOrder = {
    id: product.id,
    title: product.title,
    size: productSize,
    count: productCount,
    price: product.price,
    totalPrice: product.price * productCount
  }

  const handleClickButton = () => {
    dispatch(setOrders(newOrder));

    navigate("/cart");
  }

  return (
    <button
      className="btn btn-danger btn-block btn-lg w-100"
      onClick={handleClickButton}
      disabled={productSize ? false : true}
    >
      В корзину
    </button>
  );
}

export default AddToCartBtn;