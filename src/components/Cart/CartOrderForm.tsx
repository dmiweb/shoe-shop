import { useState, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { submitOrder } from "../../slices/cartSlice";
import { TOrder, TCompletedOrder } from "../../models";

const CartOrderForm = ({ orders }: { orders: TOrder[] | null }) => {
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const agreementCheckboxRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { currentTarget } = event;

    if (
      !currentTarget.phone.value ||
      !currentTarget.address.value ||
      !agreementCheckboxRef?.current?.checked
    ) {
      setIsValidForm(false);
      return;
    } else {
      setIsValidForm(true);
    }

    const completedOrder = {
      owner: {
        phone: currentTarget.phone.value,
        address: currentTarget.address.value,
      },
      items: orders?.map(order => ({
        id: order.id,
        price: order.price,
        count: order.count
      }))
    } as TCompletedOrder;

    dispatch(submitOrder(completedOrder));
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" ref={agreementCheckboxRef} />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">Оформить</button>
        </form>
      </div>
      {!isValidForm &&
        <div className="position-absolute start-50 translate-middle-x text-danger">
          Заполните все поля формы!
        </div>
      }
    </section>
  );
}

export default CartOrderForm;