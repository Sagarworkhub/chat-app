import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api.client';
import { colors, getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UPDATE_PROFILE_ROUTE } from '@/utils/constants';

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
      setFirstName(userInfo?.firstName || '');
      setLastName(userInfo?.lastName || '');
      setSelectedColor(userInfo?.color || 0);
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
      console.log('save changes');

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
          setUserInfo({ ...response.data });
          toast.success('Profile Updated Successfully.');
          navigate('/chat');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('handle image change');

    const file = event.target?.files?.[0];
    console.log(file);
  };

  const handleDeleteImage = async () => {};

  const handleFileInputClick = () => {
    console.log('handle file input click');

    fileInputRef?.current?.click();
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) {
      navigate('/chat');
    } else {
      toast.error('Please setup profile.');
    }
  };

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flec-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div onClick={handleNavigate}>
          <IoArrowBack className='text-4xl lg:text-3xl text-white/90 cursor-pointer' />
        </div>
        <div className='grid grid-cols-2'>
          <div
            className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {image ? (
                <AvatarImage
                  src={image}
                  alt='profile'
                  className='object-cover w-full h-full bg-black'
                />
              ) : (
                <div
                  className={`uppercase w-32 h-32 md:h-48 text-5xl border flex items-center justify-center rounded-full ${getColor(
                    selectedColor,
                  )}`}
                >
                  {firstName
                    ? firstName.split('').shift()
                    : userInfo?.email.split('').shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className='text-3xl text-white cursor-pointer' />
                ) : (
                  <FaPlus className='text-3xl text-white cursor-pointer' />
                )}
                <input
                  type='file'
                  ref={fileInputRef}
                  className='hidden'
                  onChange={handleImageChange}
                  accept='.png, .jpg, .jpeg, .svg, .webp'
                  name='profile-image'
                />
              </div>
            )}
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input
                placeholder='Email'
                type='email'
                className='rounded-lg  p-6 bg-[#2c2e3b] border-none'
                disabled
                value={userInfo?.email}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='First Name'
                type='text'
                className='rounded-lg p-6 bg-[#2c2e3b] border-none'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='Last Name'
                type='text'
                className='rounded-lg p-6 bg-[#2c2e3b] border-none'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='w-full flex gap-5'>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`${color} w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index ? 'outline outline-white/50 ' : ''
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
            className='h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300'
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
