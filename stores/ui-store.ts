import {create} from 'zustand';

interface UIState {
    isOpenSidebar: boolean,
    setIsOpenSidebar: () => void
}
const useUIState = create<UIState>()((set) => ({
  isOpenSidebar: true,
  setIsOpenSidebar: () => set((state) => ({
    isOpenSidebar: !state.isOpenSidebar
  })),
}))

export default useUIState;