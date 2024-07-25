import { useAppStore } from '@/store';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { io, type Socket } from 'socket.io-client';

import {
  type ChannelChatReceiveMessage,
  type ChatReceiveMessage,
} from '@/types/message';

import { HOST } from '@/utils/constants';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = (): SocketContextType | null => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      const handleReceiveMessage = (message: ChatReceiveMessage) => {
        const {
          selectedChatData: currentChatData,
          selectedChatType: currentChatType,
          addMessage,
          addContactInDMContacts,
        } = useAppStore.getState();

        if (
          currentChatType &&
          (currentChatData?._id === message.sender._id ||
            currentChatData?._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactInDMContacts(message);
      };

      const handleReceiveChannelMessage = (
        message: ChannelChatReceiveMessage,
      ) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelLists,
        } = useAppStore.getState();

        console.log('handle receive channel message', message);
        console.log(
          'handle receive channel message selected',
          selectedChatData,
        );

        if (selectedChatType && selectedChatData._id === message.channelId) {
          addMessage(message);
        }
        addChannelInChannelLists(message);
      };

      socket.current.on('receiveMessage', handleReceiveMessage);
      socket.current.on('receive-channel-message', handleReceiveChannelMessage);
      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
