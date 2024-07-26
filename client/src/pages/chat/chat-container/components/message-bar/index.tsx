import { useSocket } from '@/context/SocketContext';
import { useAppStore } from '@/store';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

import { apiClient } from '@/lib/api.client';

import { type UploadFileAPIResponse } from '@/types/apiResponses';

import { MESSAGE_TYPES, UPLOAD_FILE } from '@/utils/constants';

function MessageBar() {
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    selectedChatData,
    userInfo,
    selectedChatType,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();

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

  const handleSendMessage = () => {
    if (!socketContext?.socket) {
      console.error('Socket is not available');
      return;
    }

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
        channelId: selectedChatData?._id,
      });
    }
    setMessage('');
  };

  const handleAddEmoji = (emoji: { emoji: string }) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleAttachmentChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!socketContext?.socket) {
      console.error('Socket is not available');
      return;
    }

    try {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        setIsUploading(true);
        const response = await apiClient.post<UploadFileAPIResponse>(
          UPLOAD_FILE,
          formData,
          {
            withCredentials: true,
            onUploadProgress: ({ loaded, total }) => {
              setFileUploadProgress(Math.round((100 * loaded) / (total ?? 1)));
            },
          },
        );

        if (response.status === 200) {
          setIsUploading(false);
          if (selectedChatType === 'contact') {
            socketContext.socket.emit('sendMessage', {
              sender: userInfo?.id,
              content: undefined,
              recipient: selectedChatData?._id,
              messageType: MESSAGE_TYPES.FILE,
              audioUrl: undefined,
              fileUrl: response.data.filePath,
            });
          } else if (selectedChatType === 'channel') {
            socketContext.socket.emit('send-channel-message', {
              sender: userInfo?.id,
              content: undefined,
              messageType: MESSAGE_TYPES.FILE,
              audioUrl: undefined,
              fileUrl: response.data.filePath,
              channelId: selectedChatData?._id,
            });
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.log({ error });
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        <button
          className='text-neutral-300 transition-all duration-300 focus:border-none focus:text-white focus:outline-none'
          onClick={handleAttachmentClick}
        >
          <GrAttachment className='text-2xl' />
        </button>
        <input
          type='file'
          className='hidden'
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />
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
              theme={Theme.DARK}
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
