import { useAppStore } from '@/store';

import { getColor } from '@/lib/utils';

import { type Channel, type Contact } from '@/types/apiResponses';

import { HOST } from '@/utils/constants';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ContactListProps {
  contacts: Array<Contact> | Array<Channel>;
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact: Contact | Channel) => {
    if (isChannel(contact)) setSelectedChatType('channel');
    else setSelectedChatType('contact');
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  function isChannel(value: unknown): value is Channel {
    return (
      typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      typeof value.name === 'string' &&
      'members' in value &&
      Array.isArray(value.members) &&
      value.members.every((member) => typeof member === 'string')
    );
  }

  function isContact(value: unknown): value is Contact {
    return (
      typeof value === 'object' &&
      value !== null &&
      'id' in value &&
      typeof value.id === 'string' &&
      'email' in value &&
      typeof value.email === 'string' &&
      'profileSetup' in value &&
      typeof value.profileSetup === 'boolean'
    );
  }

  return (
    <div className='mt-5'>
      {contacts.map((contact, index) => (
        <div
          key={index}
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
            {isContact(contact) && (
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
                      : getColor(contact.color ?? 0)
                  } flex size-10 items-center justify-center rounded-full`}
                >
                  {contact.firstName
                    ? contact.firstName.split('').shift()
                    : contact.email.split('').shift()}
                </AvatarFallback>
              </Avatar>
            )}
            {isChannel(contact) && (
              <div
                className={`flex size-10 items-center justify-center rounded-full bg-[#ffffff22]`}
              >
                #
              </div>
            )}
            {isChannel(contact) ? (
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
