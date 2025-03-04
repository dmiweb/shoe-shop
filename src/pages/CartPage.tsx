import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getOrders } from "../slices/cartSlice";
import { Loader, CartOrderList, CartOrderForm, CartEmpty, OrderPlaced } from "../components";

const CartPage = () => {
  const { orders, loading, orderStatus } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <section className="cart">
      {!loading && orders && <h2 className="text-center">Корзина</h2>}
      {loading && <Loader />}
      {!loading && orders && <CartOrderList orders={orders} />}
      {!loading && orders && <CartOrderForm orders={orders} />}
      {!orders && !orderStatus && <CartEmpty />}
      {orderStatus && <OrderPlaced />}
    </section>
  );
}

export default CartPage;