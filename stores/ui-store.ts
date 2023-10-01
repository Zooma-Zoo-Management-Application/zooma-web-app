import {create} from 'zustand';

interface UIState {
    isOpenSidebar: boolean,
    setIsOpenSidebar: () => void,
    isVideoMuted: boolean,
    setIsVideoMuted: () => void,
}
const useUIState = create<UIState>()((set) => ({
  isOpenSidebar: true,
  setIsOpenSidebar: () => set((state) => ({
    isOpenSidebar: !state.isOpenSidebar
  })),
  isVideoMuted: true,
  setIsVideoMuted: () => set((state) => ({
    isVideoMuted: !state.isVideoMuted
  })),
}))

export default useUIState;