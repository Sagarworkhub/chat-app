import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import ChatContainer from './chat-container';
import ContactsContainer from './contacts-container';
import EmptyChatContainer from './empty-chat-container';

function Chat() {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast('Please setup your profile first');
      // navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-screen overflow-hidden text-white'>
      <ContactsContainer />
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
}

export default Chat;
