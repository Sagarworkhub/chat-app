import { useAppStore } from '@/store';

import { getColor } from '@/lib/utils';

import { HOST } from '@/utils/constants';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();
  console.log(contacts);

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType('channel');
    else setSelectedChatType('contact');
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className='mt-5'>
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`cursor-pointer py-2 pl-10 transition-all duration-300 ${
            selectedChatData && selectedChatData._id === contact._id
              ? 'bg-[#8417ff] hover:bg-[#8417ff]'
              : 'hover:bg-[#f1f1f111]'
          }`}
          onClick={() => {
            handleClick(contact);
          }}
        >
          <div className='flex items-center justify-start gap-5 text-neutral-300'>
            {!isChannel && (
              <Avatar className='size-10'>
                {contact.image && (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt='profile'
                    className='size-full rounded-full bg-cover'
                  />
                )}

                <AvatarFallback
                  className={`uppercase ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? 'border border-white/50 bg-[#ffffff22]'
                      : getColor(contact.color)
                  } flex size-10 items-center justify-center rounded-full`}
                >
                  {contact.firstName.split('').shift()}
                </AvatarFallback>
              </Avatar>
            )}
            {isChannel && (
              <div
                className={`flex size-10 items-center justify-center rounded-full bg-[#ffffff22]`}
              >
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
