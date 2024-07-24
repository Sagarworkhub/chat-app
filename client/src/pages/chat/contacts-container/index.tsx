import NewDM from './components/new-dm';
import ProfileInfo from './components/profile-info';

function ContactsContainer() {
  return (
    <div className='relative w-full border-r-2 border-[#2f303b] bg-[#1b1c24] md:w-[35vw] lg:w-[30vw] xl:w-[20vw]'>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text='Direct Messages' />
          <NewDM />
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
