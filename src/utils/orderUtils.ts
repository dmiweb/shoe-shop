import { TOrder } from "../models"

export const processOrders = (orders: TOrder[] | null, newOrder: TOrder) => {
  if (orders) {
    const isRepeatOrder = orders.some(order =>
      order.id === newOrder.id && order.size === newOrder.size);

    if (isRepeatOrder) {
      orders.map(order => {
        order.count += newOrder.count;
        order.totalPrice += newOrder.totalPrice;
      });

      return orders;
    } else {
      orders = [...orders, newOrder];

      return orders;
    }
  } else {
    return [newOrder];
  }
}

export const removeOrderById = (orders: TOrder[], id: number): TOrder[] | null => {
  const filteredOrders = orders.filter(order => order.id !== id);
  if(!filteredOrders.length){
    return null;
  }
  return filteredOrders;
}