export interface ChannelChatReceiveMessage {
  _id: string;
  sender: Sender;
  recipient: null;
  messageType: string;
  content: string;
  fileUrl: null;
  timestamp: Date;
  __v: number;
  channelId: string;
}

export interface Sender {
  _id: string;
  email: string;
  color: number;
  firstName: string;
  lastName: string;
}

export interface ChatReceiveMessage {
  _id: string;
  sender: Recipient;
  recipient: Recipient;
  messageType: string;
  content: string;
  audioUrl: null;
  fileUrl: null;
  timestamp: Date;
  __v: number;
}

export interface Recipient {
  _id: string;
  email: string;
  color: number;
  firstName: string;
  lastName: string;
}
