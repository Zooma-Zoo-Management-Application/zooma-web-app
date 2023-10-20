export interface Order {
  id: number,
  orderDate: string,
  totalPrice: number,
  paymentMethod: string,
  status: number,
  user: any,
  orderDetails: any,
  transactions: any
}
