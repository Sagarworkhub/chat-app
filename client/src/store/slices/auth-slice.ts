import { type StateCreator } from 'zustand';

import { type User } from '@/types/user';

export interface AuthState {
  userInfo: User | null;
  setUserInfo: (userInfo: User | null) => void;
  clearUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo: User | null) => {
    set({ userInfo });
  },
  clearUser: () => {
    set({ userInfo: null });
  },
});
