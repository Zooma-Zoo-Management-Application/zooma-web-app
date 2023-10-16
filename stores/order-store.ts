import {create} from 'zustand';
import useUserState from './user-store';

interface Ticket {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface OrderState {
    order: {
      currentUser: any,
      date: Date,
      tickets: Ticket[],
    },
    setOrder: (order: any) => void,
    setCurrentUser: (user: any) => void,
    increaseTicketById: (id: number) => void,
    decreaseTicketById: (id: number) => void,
    setDate: (date: Date) => void,
    setTickets: (tickets: Ticket[]) => void,
    getTotalPrice: () => number,
}
const useOrder = create<OrderState>((set) => {
  return {
    order: {
      currentUser: null,
      date: new Date(),
      tickets: [{
        id: 1,
        name: "Child",
        description: "Child Ticket",
        quantity: 0,
        price: 100000
      },{
        id: 2,
        name: "Adult",
        description: "Adult Ticket",
        quantity: 0,
        price: 100000
      }, {
        id: 3,
        name: "Senior",
        description: "Senior Ticket",
        quantity: 0,
        price: 100000
      }],
    },
    setOrder: (order: any) => set(() => ({order: order})),
    setCurrentUser: (user: any) => set((state) => ({order: {...state.order, currentUser: user}})),
    increaseTicketById: (id: number) => set((state) => {
      const tickets = state.order.tickets.map((ticket: Ticket) => {
        if (ticket.id === id) {
          ticket.quantity += 1;
        }
        return ticket;
      });
      return {order: {...state.order, tickets: tickets}};
    }),
    decreaseTicketById: (id: number) => set((state) => {
      const tickets = state.order.tickets.map((ticket: Ticket) => {
        if (ticket.id === id) {
          if(ticket.quantity > 0) {
            ticket.quantity -= 1;
          }
        }
        return ticket;
      });
      return {order: {...state.order, tickets: tickets}};
    }),
    setDate: (date: Date) => set((state) => ({order: {...state.order, date: date}})),
    setTickets: (tickets: Ticket[]) => set((state) => ({order: {...state.order, tickets: tickets}})),
    getTotalPrice: () => {
      let totalPrice = 0;
      useOrder.getState().order.tickets.forEach((ticket: Ticket) => {
        totalPrice += ticket.quantity * ticket.price;
      });
      return totalPrice;
    }
  };
});

export default useOrder;