import { useSocket } from '@/context/SocketContext';
import { useAppStore } from '@/store';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multiple-selector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { apiClient } from '@/lib/api.client';

import { CREATE_CHANNEL, GET_ALL_CONTACTS } from '@/utils/constants';

const CreateChannel = () => {
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState('');
  const socketContext = useSocket();
  const { addChannel } = useAppStore();

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS, {
        withCredentials: true,
      });
      console.log(response.data.contacts);

      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {
    if (!socketContext?.socket) {
      console.error('Socket is not available');
      return;
    }

    const response = await apiClient.post(
      CREATE_CHANNEL,
      {
        name: channelName,
        members: selectedContacts.map((contact) => contact.value),
      },
      { withCredentials: true },
    );
    if (response.status === 201) {
      setChannelName('');
      setSelectedContacts([]);
      setNewChannelModal(false);
      addChannel(response.data.channel);
      socketContext.socket.emit('add-channel-notify', response.data.channel);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className='cursor-pointer text-sm font-light text-neutral-400 text-opacity-90 transition-all duration-300 hover:text-neutral-100'
              onClick={() => {
                setNewChannelModal(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent className='mb-2 border-none bg-[#1c1b1e] p-3'>
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogDescription className='hidden'>
          Please insert details
        </DialogDescription>
        <DialogContent className='flex h-max w-[400px] flex-col border-none bg-[#181920] text-white'>
          <DialogHeader>
            <DialogTitle>Create a new Channel</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder='Channel Name'
              className='rounded-lg border-none bg-[#2c2e3b] px-4 py-6'
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />
          </div>
          <div>
            <MultipleSelector
              className='rounded-lg border-none bg-[#2c2e3b] py-2 text-white'
              defaultOptions={allContacts}
              placeholder='Search Contacts'
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                  No results found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              onClick={createChannel}
              className='w-full bg-purple-700 transition-all duration-300 hover:bg-purple-900'
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
