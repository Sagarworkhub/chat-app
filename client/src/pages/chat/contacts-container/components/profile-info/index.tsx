import { useAppStore } from '@/store';
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { apiClient } from '@/lib/api.client';
import { getColor } from '@/lib/utils';

import { HOST, LOGOUT_ROUTE } from '@/utils/constants';

function ProfileInfo() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        navigate('/auth');
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='absolute bottom-0 flex h-16 w-full items-center justify-between bg-[#2a2b33] px-10'>
      <div className='flex items-center justify-center gap-3'>
        <div className='relative size-12'>
          <Avatar className='size-12 overflow-hidden rounded-full'>
            {userInfo?.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt='profile'
                className='size-full rounded-full bg-black object-cover'
              />
            ) : (
              <div
                className={`size-12 border text-lg uppercase ${getColor(
                  userInfo?.color ?? 0,
                )} flex items-center justify-center rounded-full`}
              >
                {userInfo?.firstName
                  ? userInfo.firstName.split('').shift()
                  : userInfo?.email.split('').shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ''}
        </div>
      </div>
      <div className='flex gap-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className='text-xl font-medium text-purple-500'
                onClick={() => {
                  navigate('/profile');
                }}
              />
            </TooltipTrigger>
            <TooltipContent className='mb-2 border-none bg-[#1c1b1e] p-3'>
              <p className='text-white'>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className='text-xl font-medium text-red-500'
                onClick={() => {
                  logout().catch((error: unknown) => {
                    console.error(error);
                  });
                }}
              />
            </TooltipTrigger>
            <TooltipContent className='mb-2 border-none bg-[#1c1b1e] p-3'>
              <p className='text-white'>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
