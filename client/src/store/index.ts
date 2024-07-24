import { create } from 'zustand';

import { type AuthState, createAuthSlice } from './slices/auth-slice';
import { type ChatState, createChatSlice } from './slices/chat-slice';

export const useAppStore = create<AuthState & ChatState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
