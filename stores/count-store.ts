import {create} from 'zustand';

interface CounterState {
    counter: number,
    increaseCounter: () => void
}
const useCounter = create<CounterState>((set) => {
  return {
      counter: 0,
      increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
  };
});

export default useCounter;