import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import ChatContainer from './chat-container';
import ContactsContainer from './contacts-container';
import EmptyChatContainer from './empty-chat-container';

function Chat() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    fileUploadProgress,
    isDownloading,
    downloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast('Please setup your profile first');
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-screen overflow-hidden text-white'>
      {isUploading && (
        <div className='fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-5 bg-black/80'>
          <h5 className='animate-pulse text-5xl'>Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className='fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-5 bg-black/80'>
          <h5 className='animate-pulse text-5xl'>Downloading File</h5>
          {downloadProgress}%
        </div>
      )}
      <ContactsContainer />
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
}

export default Chat;
