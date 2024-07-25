import { type StateCreator } from 'zustand';

import { type Contact } from '@/types/apiResponses';

export interface ChatState {
  selectedChatType: 'contact' | 'channel' | null;
  selectedChatData: Contact | null;
  selectedChatMessages: Array<any>;
  directMessagesContacts: Array<any>;
  isUploading: boolean;
  fileUploadProgress: number;
  isDownloading: boolean;
  downloadProgress: number;
  setIsUploading: (isUploading: boolean) => void;
  setFileUploadProgress: (fileUploadProgress: number) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setDownloadProgress: (downloadProgress: number) => void;
  setSelectedChatType: (selectedChatType: 'contact' | 'channel' | null) => void;
  setSelectedChatData: (selectedChatData: Contact | null) => void;
  setSelectedChatMessages: (selectedChatMessages: Array<any>) => void;
  setDirectMessagesContacts: (directMessagesContacts: Array<any>) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
}

export const createChatSlice: StateCreator<ChatState> = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
  directMessagesContacts: [],
  isUploading: false,
  fileUploadProgress: 0,
  isDownloading: false,
  downloadProgress: 0,
  setIsUploading: (isUploading) => {
    set({ isUploading });
  },
  setFileUploadProgress: (fileUploadProgress) => {
    set({ fileUploadProgress });
  },
  setIsDownloading: (isDownloading) => {
    set({ isDownloading });
  },
  setDownloadProgress: (downloadProgress) => {
    set({ downloadProgress });
  },
  setSelectedChatType: (selectedChatType) => {
    set({ selectedChatType });
  },
  setSelectedChatData: (selectedChatData) => {
    set({ selectedChatData });
  },
  setSelectedChatMessages: (selectedChatMessages: Array<any>) => {
    set({ selectedChatMessages });
  },
  setDirectMessagesContacts: (directMessagesContacts) => {
    set({ directMessagesContacts });
  },
  closeChat: () => {
    set({
      selectedChatData: null,
      selectedChatType: null,
      selectedChatMessages: [],
    });
  },
  addMessage: (message: any) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === 'channel'
              ? message.recipent
              : message.recipient._id,
          sender:
            selectedChatType === 'channel'
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
