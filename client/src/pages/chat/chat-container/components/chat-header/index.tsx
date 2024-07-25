import { useAppStore } from '@/store';
import { RiCloseFill } from 'react-icons/ri';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { getColor } from '@/lib/utils';

import { HOST } from '@/utils/constants';

const ChatHeader = () => {
  const { selectedChatData, closeChat, selectedChatType } = useAppStore();

  return (
    <div className='flex h-[10vh] items-center justify-between border-b-2 border-[#2f303b] px-20'>
      <div className='flex items-center gap-5'>
        <div className='flex items-center justify-center gap-3'>
          <div className='relative flex size-12 items-center justify-center'>
            {selectedChatType === 'contact' ? (
              <Avatar className='size-12 overflow-hidden rounded-full'>
                {selectedChatData?.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt='profile'
                    className='size-full rounded-full bg-black object-cover'
                  />
                ) : (
                  <div
                    className={`size-12 border text-lg uppercase ${getColor(
                      selectedChatData?.color ?? 0,
                    )} flex items-center justify-center rounded-full`}
                  >
                    {selectedChatData?.firstName
                      ? selectedChatData.firstName.split('').shift()
                      : selectedChatData?.email.split('').shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div
                className={`flex items-center justify-center rounded-full bg-[#ffffff22] px-5 py-3`}
              >
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === 'channel' && selectedChatData?.name}
            {selectedChatType === 'contact' &&
            selectedChatData?.firstName &&
            selectedChatData.lastName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : ''}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <button
          className='text-neutral-300 transition-all duration-300 focus:border-none focus:text-white focus:outline-none'
          onClick={closeChat}
        >
          <RiCloseFill className='text-3xl' />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
