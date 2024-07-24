import ChatHeader from './components/chat-header';
import MessageBar from './components/message-bar';
import MessageContainer from './components/message-container';

function ChatContainer() {
  return (
    <div className='fixed top-0 flex h-screen w-screen flex-col bg-[#1c1d25] md:static md:flex-1'>
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
}

export default ChatContainer;
