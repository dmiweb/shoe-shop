import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getOrders } from "../../slices/cartSlice";

const CartWidget = () => {
  const orders = useAppSelector(state => state.cart.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClickCart = () => {
    navigate("/cart");
  }

  return (
    <div className="header-controls-pic header-controls-cart" onClick={handleClickCart}>
      {orders && <div className="header-controls-cart-full">{orders.length}</div>}
      <div className="header-controls-cart-menu"></div>
    </div>
  );
}

export default CartWidget;