import { type StateCreator } from 'zustand';

import { type Contact } from '@/types/apiResponses';

export interface ChatState {
  selectedChatType: 'contact' | 'channel' | null;
  selectedChatData: Contact | null;
  selectedChatMessages: Array<any>;
  setSelectedChatType: (selectedChatType: 'contact' | 'channel' | null) => void;
  setSelectedChatData: (selectedChatData: Contact | null) => void;
  setSelectedChatMessages: (selectedChatMessages: Array<any>) => void;
  closeChat: () => void;
}

export const createChatSlice: StateCreator<ChatState> = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => {
    set({ selectedChatType });
  },
  setSelectedChatData: (selectedChatData) => {
    set({ selectedChatData });
  },
  setSelectedChatMessages: (selectedChatMessages: Array<any>) => {
    set({ selectedChatMessages });
  },
  closeChat: () => {
    set({
      selectedChatData: null,
      selectedChatType: null,
      selectedChatMessages: [],
    });
  },
});
