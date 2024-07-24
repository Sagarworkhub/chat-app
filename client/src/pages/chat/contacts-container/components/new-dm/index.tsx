import { useAppStore } from '@/store';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { apiClient } from '@/lib/api.client';
import { getColor } from '@/lib/utils';

import {
  type Contact,
  type ContactSearchAPIResponse,
} from '@/types/apiResponses';

import { HOST, SEARCH_CONTACTS_ROUTES } from '@/utils/constants';

function NewDM() {
  const [searchedContacts, setSearchedContacts] = useState<Array<Contact>>([]);
  const [openNewContactModal, setOpenNewContactModal] = useState(false);

  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post<ContactSearchAPIResponse>(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true },
        );
        if (response.status === 200) {
          setSearchedContacts(response.data.contacts);
        }
      } else setSearchedContacts([]);
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact: Contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType('contact');
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className='cursor-pointer text-sm font-light text-neutral-400 text-opacity-90 transition-all duration-300 hover:text-neutral-100'
              onClick={() => {
                setOpenNewContactModal(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent className='mb-2 border-none bg-[#1c1b1e] p-3'>
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className='flex size-[400px] flex-col border-none bg-[#181920] text-white'>
          <DialogDescription className='hidden'>
            Please select a contact
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Select a contact</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder='Search Contacts'
              className='rounded-lg border-none bg-[#2c2e3b] p-6'
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          <ScrollArea className='h-[250px]'>
            <div className='flex flex-col gap-5'>
              {searchedContacts.map((contact) => (
                <div
                  className='flex cursor-pointer items-center gap-3'
                  key={contact.id}
                  onClick={() => {
                    selectNewContact(contact);
                  }}
                >
                  <div className='relative size-12'>
                    <Avatar className='size-12 overflow-hidden rounded-full'>
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt='profile'
                          className='size-full rounded-full bg-black object-cover'
                        />
                      ) : (
                        <div
                          className={`size-12 border text-lg uppercase ${getColor(
                            contact.color ?? 0,
                          )} flex items-center justify-center rounded-full`}
                        >
                          {contact.firstName
                            ? contact.firstName.split('').shift()
                            : contact.email.split('').shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className='flex flex-col'>
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : ''}
                    </span>
                    <span className='text-xs'>{contact.email}</span>
                  </div>
                </div>
              ))}
              {searchedContacts.length <= 0 && (
                <div className='mt-5 hidden flex-1 flex-col items-center justify-center transition-all duration-1000 md:flex'>
                  <div className='mt-5 flex flex-col items-center gap-5 text-center text-xl text-white text-opacity-80 transition-all duration-1000 lg:text-2xl'>
                    <h3 className='poppins-medium'>
                      Hi
                      <span className='text-purple-500'>!</span> Search new
                      <span className='text-purple-500'> Contact. </span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDM;
