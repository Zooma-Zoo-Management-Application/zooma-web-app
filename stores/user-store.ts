import { User } from '@/types/User';
import axios from 'axios';
import {create} from 'zustand';

interface UserState {
    currentUser: User | any,
    setCurrentUser: (user: any) => void
}

export const useUserState = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user: any) => set(() => ({currentUser: user})),
}));

export default useUserState;