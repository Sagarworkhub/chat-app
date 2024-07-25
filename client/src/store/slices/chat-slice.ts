import { type StateCreator } from 'zustand';

import { type Contact } from '@/types/apiResponses';
import {
  type ChannelChatReceiveMessage,
  type ChatReceiveMessage,
} from '@/types/message';

export interface ChatState {
  selectedChatType: 'contact' | 'channel' | null;
  selectedChatData: Contact | null;
  selectedChatMessages: Array<ChatReceiveMessage | ChannelChatReceiveMessage>;
  directMessagesContacts: Array<any>;
  isUploading: boolean;
  fileUploadProgress: number;
  isDownloading: boolean;
  downloadProgress: number;
  channels: Array<any>;
  setIsUploading: (isUploading: boolean) => void;
  setFileUploadProgress: (fileUploadProgress: number) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setDownloadProgress: (downloadProgress: number) => void;
  setSelectedChatType: (selectedChatType: 'contact' | 'channel' | null) => void;
  setSelectedChatData: (selectedChatData: Contact | null) => void;
  setSelectedChatMessages: (selectedChatMessages: Array<any>) => void;
  setDirectMessagesContacts: (directMessagesContacts: Array<any>) => void;
  setChannels: (channels: Array<any>) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
  addChannel: (channel: any) => void;
  addChannelInChannelLists: (message: any) => void;
  addContactInDMContacts: (message: any) => void;
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
  channels: [],
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
  setChannels: (channels) => {
    set({ channels });
  },
  closeChat: () => {
    set({
      selectedChatData: null,
      selectedChatType: null,
      selectedChatMessages: [],
    });
  },
  addMessage: (message: ChatReceiveMessage | ChannelChatReceiveMessage) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === 'channel'
              ? message.recipient
              : message.recipient?._id,
          sender:
            selectedChatType === 'channel'
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },
  addChannelInChannelLists: (message) => {
    const channels = get().channels;
    const data = channels.find((channel) => channel._id === message.channelId);
    const index = channels.findIndex(
      (channel) => channel._id === message.channelId,
    );
    if (index !== -1 && index !== undefined) {
      channels.splice(index, 1);
      channels.unshift(data);
    }
  },
  addContactInDMContacts: (message) => {
    // console.log({ message });
    const userId = get().userInfo.id;
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id;
    const fromData =
      message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === fromId);
    const index = dmContacts.findIndex((contact) => contact._id === fromId);
    // console.log({ data, index, dmContacts, userId, message, fromData });
    if (index !== -1 && index !== undefined) {
      console.log('in if condition');
      dmContacts.splice(index, 1);
      dmContacts.unshift(data);
    } else {
      console.log('in else condition');
      dmContacts.unshift(fromData);
    }
    set({ directMessagesContacts: dmContacts });
  },
});
