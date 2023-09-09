import {create} from 'zustand';

interface ThemeState {
    mode: "light" | "dark",
    changeMode: () => void
}

const useThemeState = create<ThemeState>()((set) => ({
    mode: "light",
    changeMode: () => set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light'
    })),
}))

export default useThemeState;