import { useAppStore } from '@/store';
import { useEffect } from 'react';

import ContactList from '@/components/contact-list';

import { apiClient } from '@/lib/api.client';

import { GET_CONTACTS_WITH_MESSAGES_ROUTE } from '@/utils/constants';

import NewDM from './components/new-dm';
import ProfileInfo from './components/profile-info';

function ContactsContainer() {
  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

  useEffect(() => {
    const getContactsWithMessages = async () => {
      const response = await apiClient.get(GET_CONTACTS_WITH_MESSAGES_ROUTE, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContactsWithMessages();
  }, [setDirectMessagesContacts]);

  return (
    <div className='relative w-full border-r-2 border-[#2f303b] bg-[#1b1c24] md:w-[35vw] lg:w-[30vw] xl:w-[20vw]'>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text='Direct Messages' />
          <NewDM />
        </div>
        <div className='no-scrollbar max-h-[38vh] overflow-y-auto'>
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text='Channels' />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

export default ContactsContainer;

const Title = ({ text }: { text: string }) => {
  return (
    <h6 className='pl-10 text-sm font-light uppercase tracking-widest text-neutral-400 text-opacity-90'>
      {text}
    </h6>
  );
};
