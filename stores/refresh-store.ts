import {create} from 'zustand';

interface RefreshState {
    refresh: () => void,
    setRefresh: (refreshFunction: () => void) => void,
}
const useRefresh = create<RefreshState>((set) => {
  return {
      refresh: () => {},
      setRefresh: (refreshFunction) => {
          set(() => ({
              refresh: refreshFunction
          }));
      }
  };
});

export default useRefresh;