import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { removeOrder } from "../../slices/cartSlice";
import { TOrder } from "../../models";

const CartOrderList = ({ orders }: { orders: TOrder[] | null }) => {
  const dispatch = useAppDispatch();
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, index) => {
            return (
              <tr key={order.id}>
                <td scope="row">{index + 1}</td>
                <td><Link to={`/catalog/${order.id}`}>{order.title}</Link></td>
                <td>{order.size}</td>
                <td>{order.count}</td>
                <td>{order.price}</td>
                <td>{order.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch(removeOrder(order.id))}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
        <tr className="border-bottom-0">
          <td colSpan={5} className="text-end border-bottom">Общая стоимость</td>
          <td className="border-bottom">
            {orders && orders.reduce((acc, order) => acc + order.totalPrice, 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CartOrderList;