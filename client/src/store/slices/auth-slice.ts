import { User } from '@/types/user';
import { StateCreator } from 'zustand';

// type SetUserInfo = (userInfo: { userInfo: User | null }) => void;

export interface AuthState {
  userInfo: User | null;
  setUserInfo: (userInfo: User | null) => void;
  clearUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo: User | null) => set({ userInfo }),
  clearUser: () => set({ userInfo: null }),
});
