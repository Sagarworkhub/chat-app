import { useAppStore } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { apiClient } from '@/lib/api.client';
import { colors } from '@/lib/utils';

import { type User } from '@/types/user';

import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from '@/utils/constants';

function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo.firstName ?? '');
      setLastName(userInfo.lastName ?? '');
      setSelectedColor(userInfo.color ?? 0);
    }
    if (userInfo?.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error('First Name is Required.');
      return false;
    }
    if (!lastName) {
      toast.error('Last Name is Required.');
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          {
            firstName,
            lastName,
            color: selectedColor,
          },
          { withCredentials: true },
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data } as User);
          toast.success('Profile Updated Successfully.');
          navigate('/chat');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (file: File) => {
    const formData = new FormData();
    formData.append('profile-image', file);
    const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
      withCredentials: true,
    });
    if (response.status === 200 && response.data?.image) {
      setUserInfo({
        ...userInfo,
        image: response.data?.image as string,
      } as User);
      toast.success('Image updated successfully.');
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: '' } as User);
        toast.success('Image Removed Successfully.');
        setImage(null);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFileInputClick = () => {
    console.log('handle file input click');

    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleImageChange(file);
    }
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) {
      navigate('/chat');
    } else {
      toast.error('Please setup profile.');
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10 bg-[#1b1c24]'>
      <div className='flex w-[80vw] flex-col gap-10 md:w-max'>
        <div onClick={handleNavigate}>
          <IoArrowBack className='cursor-pointer text-4xl text-white text-opacity-90 lg:text-6xl' />
        </div>
        <div className='grid grid-cols-2'>
          <div
            className='relative flex h-full w-32 items-center justify-center md:size-48'
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <Avatar className='size-32 overflow-hidden rounded-full md:size-48'>
              {image ? (
                <AvatarImage
                  src={image}
                  alt='profile'
                  className='size-full bg-black object-cover'
                />
              ) : (
                <div
                  className={`flex size-32 items-center justify-center rounded-full border border-[#ff006faa] bg-[#712c4a57] text-5xl uppercase text-[#ff006e] md:size-48`}
                >
                  {firstName
                    ? firstName.split('').shift()
                    : userInfo?.email.split('').shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50'
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className='cursor-pointer text-3xl text-white' />
                ) : (
                  <FaPlus className='cursor-pointer text-3xl text-white' />
                )}
              </div>
            )}
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              onChange={handleFileChange}
              accept='.png, .jpg, .jpeg, .svg, .webp'
              name='profile-image'
            />
          </div>
          <div className='flex min-w-32 flex-col items-center justify-center gap-5 text-white md:min-w-64'>
            <div className='w-full'>
              <Input
                placeholder='Email'
                type='email'
                className='rounded-lg border-none bg-[#2c2e3b] p-6'
                disabled
                value={userInfo?.email}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='First Name'
                type='text'
                className='rounded-lg border-none bg-[#2c2e3b] p-6'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='Last Name'
                type='text'
                className='rounded-lg border-none bg-[#2c2e3b] p-6'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className='flex w-full gap-5'>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(index);
                  }}
                  className={`${color} size-8 cursor-pointer rounded-full transition-all duration-300 ${
                    selectedColor === index ? 'outline outline-white/50' : ''
                  }`}
                >
                  {' '}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full'>
          <Button
            className='h-16 w-full bg-purple-700 transition-all duration-300 hover:bg-purple-900'
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
