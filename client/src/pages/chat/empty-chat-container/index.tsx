function EmptyChatContainer() {
  return (
    <div className='hidden flex-1 flex-col items-center justify-center transition-all duration-1000 md:flex md:bg-[#1c1d25]'>
      <div className='mt-10 flex flex-col items-center gap-5 text-center text-3xl text-white text-opacity-80 transition-all duration-1000 lg:text-4xl'>
        <h3 className='poppins-medium'>
          Hi
          <span className='text-purple-500'>!</span> Welcome to Chat App
          <span className='text-purple-500'>.</span>
        </h3>
      </div>
    </div>
  );
}

export default EmptyChatContainer;
