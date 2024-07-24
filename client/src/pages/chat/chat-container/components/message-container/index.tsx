import { useRef, useState } from 'react';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

import { HOST } from '@/utils/constants';

function MessageContainer() {
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const messageEndRef = useRef(null);
  return (
    <div className='no-scrollbar w-full flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]'>
      <div ref={messageEndRef} />
      {showImage && (
        <div className='fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center backdrop-blur-lg'>
          <div>
            <img
              src={`${HOST}/${imageURL}`}
              className='h-[80vh] w-full bg-cover'
              alt=''
            />
          </div>
          <div className='fixed top-0 mt-5 flex gap-5'>
            <button className='cursor-pointer rounded-full bg-black/20 p-3 text-2xl transition-all duration-300 hover:bg-black/50'>
              <IoMdArrowRoundDown />
            </button>
            <button
              className='cursor-pointer rounded-full bg-black/20 p-3 text-2xl transition-all duration-300 hover:bg-black/50'
              onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
