import { useAppDispatch, useAppSelector } from "../../hooks";
import { increment, decrement } from "../../slices/productSlice";

const ProductCount = () => {
  const count = useAppSelector(state => state.product.count);
  const dispatch = useAppDispatch();

  const handleDecrementButton = () => {
    if (count > 1) dispatch(decrement());
  }

  const handleIncrementButton = () => {
    if(count < 10) dispatch(increment());
  }

  return (
    <p>Количество:&nbsp;
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={handleDecrementButton}>-</button>
        <span className="btn btn-outline-primary">{count}</span>
        <button className="btn btn-secondary" onClick={handleIncrementButton}>+</button>
      </span>
    </p>
  );
}

export default ProductCount;