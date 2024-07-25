import { useAppStore } from '@/store';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { io, type Socket } from 'socket.io-client';

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

      const handleReceiveMessage = (message: any) => {
        // Access the latest state values
        const {
          selectedChatData: currentChatData,
          selectedChatType: currentChatType,
          addMessage,
        } = useAppStore.getState();

        console.log(message);

        if (
          currentChatType &&
          (currentChatData?.id === message.sender._id ||
            currentChatData?.id === message.recipient._id)
        ) {
          addMessage(message);
        }
      };

      socket.current.on('receiveMessage', handleReceiveMessage);
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
