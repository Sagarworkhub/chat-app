import { type Option } from '@/components/ui/multiple-selector';

import { type MESSAGE_TYPES } from '@/utils/constants';

import { type User } from './user';

export interface LoginAPIResponse {
  user: User;
}

export interface SignUpAPIResponse {
  user: NewUser;
}

export interface NewUser {
  email: string;
  id: string;
  profileSetup: boolean;
}
export interface ContactSearchAPIResponse {
  contacts: Array<Contact>;
}

export interface Contact {
  _id: string;
  email: string;
  password: string;
  profileSetup: boolean;
  __v: number;
  image?: string;
  color?: number;
  firstName?: string;
  lastName?: string;
}

export interface AddProfileImageAPIResponse {
  image: string;
}
export interface GetContactsForListAPIResponse {
  contacts: Array<ListContact>;
}

export interface ListContact {
  _id: string;
  lastMessageTime: Date;
  email: string;
  firstName: string;
  lastName: string;
  color: number;
}
export interface GetUserChannelsAPIResponse {
  channels: Array<Channel>;
}

export interface Channel {
  _id: string;
  name: string;
  members: Array<string>;
  admin: string;
  messages: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface GetAllContactsAPIResponse {
  contacts: Array<Option>;
}

export interface ContactOptions {
  label: string;
  value: string;
}
export interface CreateChannelAPIResponse {
  channel: Channel;
}

export interface UploadFileAPIResponse {
  filePath: string;
}

export interface GetAllMessagesAPIResponse {
  messages: Array<Message>;
}

export interface Message {
  _id: string;
  sender: string;
  recipient: string;
  messageType: MESSAGE_TYPES;
  content?: string;
  audioUrl?: null;
  fileUrl: null | string;
  timestamp: Date;
  __v: number;
}
export interface GetChannelMessagesAPIResponse {
  messages: Array<ChannelMessage>;
}

export interface ChannelMessage {
  _id: string;
  sender: Sender;
  recipient: null;
  messageType: MESSAGE_TYPES;
  content?: string;
  fileUrl: null | string;
  timestamp: Date;
  __v: number;
}

export interface Sender {
  _id: string;
  email: string;
  color: number;
  firstName: string;
  lastName: string;
  image?: string;
}
