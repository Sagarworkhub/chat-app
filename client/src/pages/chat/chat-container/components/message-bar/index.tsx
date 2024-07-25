import { useSocket } from '@/context/SocketContext';
import { useAppStore } from '@/store';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

import { MESSAGE_TYPES } from '@/utils/constants';

function MessageBar() {
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { selectedChatData, userInfo, selectedChatType } = useAppStore();

  const [message, setMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socketContext = useSocket();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiRef]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    console.log('message', message);

    if (!socketContext?.socket) {
      console.error('Socket is not available');
      return;
    }

    console.log(selectedChatData);

    if (selectedChatType === 'contact') {
      socketContext.socket.emit('sendMessage', {
        sender: userInfo?.id,
        content: message,
        recipient: selectedChatData?._id,
        messageType: MESSAGE_TYPES.TEXT,
        audioUrl: null,
        fileUrl: null,
      });
    } else if (selectedChatType === 'channel') {
      socketContext.socket.emit('send-channel-message', {
        sender: userInfo?.id,
        content: message,
        messageType: MESSAGE_TYPES.TEXT,
        audioUrl: null,
        fileUrl: null,
        channelId: selectedChatData?.id,
      });
    }
    setMessage('');
  };

  const handleAddEmoji = (emoji: { emoji: string }) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  return (
    <div className='mb-5 flex h-[10vh] items-center justify-center gap-6 bg-[#1c1d25] px-8'>
      <div className='flex flex-1 items-center gap-5 rounded-md bg-[#2a2b33] pr-5'>
        <input
          type='text'
          className='flex-1 rounded-md bg-transparent p-5 focus:border-none focus:outline-none'
          placeholder='Enter message'
          value={message}
          onChange={handleMessageChange}
        />
        <button className='text-neutral-300 transition-all duration-300 focus:border-none focus:text-white focus:outline-none'>
          <GrAttachment className='text-2xl' />
        </button>
        <input type='file' className='hidden' ref={fileInputRef} />
        <div className='relative'>
          <button
            className='text-neutral-300 transition-all duration-300 focus:border-none focus:text-white focus:outline-none'
            onClick={() => {
              setEmojiPickerOpen(true);
            }}
          >
            <RiEmojiStickerLine className='text-2xl' />
          </button>
          <div className='absolute bottom-16 right-0' ref={emojiRef}>
            <EmojiPicker
              theme='dark'
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className='flex items-center justify-center gap-2 rounded-md bg-[#8417ff] p-5 transition-all duration-300 hover:bg-[#741bda] focus:border-none focus:bg-[#741bda] focus:outline-none'
        onClick={handleSendMessage}
      >
        <IoSend className='text-2xl' />
      </button>
    </div>
  );
}

export default MessageBar;
