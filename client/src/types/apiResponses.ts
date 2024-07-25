import { type Option } from '@/components/ui/multiple-selector';

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
  id: string;
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
