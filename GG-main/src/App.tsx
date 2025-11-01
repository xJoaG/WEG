import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ForumHome from './components/Forum/ForumHome';
import ThreadList from './components/Forum/ThreadList';
import ThreadView from './components/Forum/ThreadView';
import ProfilePage from './components/Profile/ProfilePage';
import MessageInbox from './components/Messages/MessageInbox';
import MessageCompose from './components/Messages/MessageCompose';
import Shoutbox from './components/Shoutbox/Shoutbox';
import {
  currentUser,
  categories,
  threads,
  posts,
  privateMessages,
  shoutboxMessages,
} from './data/mockData';

type Page = 'login' | 'register' | 'home' | 'forum' | 'category' | 'thread' | 'profile' | 'messages' | 'compose';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogin = (username: string, password: string) => {
    console.log('Login:', username, password);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleRegister = (username: string, email: string, password: string) => {
    console.log('Register:', username, email, password);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('category');
  };

  const handleThreadClick = (threadId: string) => {
    setSelectedThreadId(threadId);
    setCurrentPage('thread');
  };

  const handleCreateThread = () => {
    alert('Create thread functionality - ready for backend integration!');
  };

  const handleLikePost = (postId: string) => {
    console.log('Like post:', postId);
  };

  const handleDislikePost = (postId: string) => {
    console.log('Dislike post:', postId);
  };

  const handleReply = (content: string) => {
    console.log('Reply:', content);
    alert('Reply posted! (Mock functionality)');
  };

  const handleMessageClick = (messageId: string) => {
    console.log('Message clicked:', messageId);
  };

  const handleComposeNew = () => {
    setCurrentPage('compose');
  };

  const handleDeleteMessage = (messageId: string) => {
    console.log('Delete message:', messageId);
    alert('Message deleted! (Mock functionality)');
  };

  const handleSendMessage = (recipient: string, subject: string, content: string) => {
    console.log('Send message:', recipient, subject, content);
    alert('Message sent! (Mock functionality)');
    setCurrentPage('messages');
  };

  const handleSendShout = (message: string) => {
    console.log('Shout:', message);
  };

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)
    : null;

  const categoryThreads = selectedCategoryId
    ? threads.filter((t) => t.categoryId === selectedCategoryId)
    : [];

  const selectedThread = selectedThreadId
    ? threads.find((t) => t.id === selectedThreadId)
    : null;

  const threadPosts = selectedThreadId
    ? posts.filter((p) => p.threadId === selectedThreadId)
    : [];

  const unreadCount = privateMessages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {isLoggedIn && (
        <Header
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          unreadMessages={unreadCount}
        />
      )}

      <main className="flex-1 px-6 py-8">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            {authMode === 'login' ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToRegister={() => setAuthMode('register')}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </div>
        ) : (
          <>
            {currentPage === 'home' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg p-8 mb-8 border border-gray-700 shadow-lg">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Welcome to Zethon.vip
                  </h1>
                  <p className="text-purple-200 text-lg">
                    Your premier destination for gaming tools and community
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <ForumHome
                      categories={categories}
                      onCategoryClick={handleCategoryClick}
                    />
                  </div>
                  <div className="lg:sticky lg:top-24 self-start">
                    <Shoutbox
                      messages={shoutboxMessages}
                      onSendMessage={handleSendShout}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'forum' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                  <ForumHome
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                  />
                </div>
                <div className="lg:sticky lg:top-24 self-start">
                  <Shoutbox
                    messages={shoutboxMessages}
                    onSendMessage={handleSendShout}
                  />
                </div>
              </div>
            )}

            {currentPage === 'category' && selectedCategory && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                  <ThreadList
                    threads={categoryThreads}
                    categoryName={selectedCategory.name}
                    onThreadClick={handleThreadClick}
                    onCreateThread={handleCreateThread}
                  />
                </div>
                <div className="lg:sticky lg:top-24 self-start">
                  <Shoutbox
                    messages={shoutboxMessages}
                    onSendMessage={handleSendShout}
                  />
                </div>
              </div>
            )}

            {currentPage === 'thread' && selectedThread && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                  <ThreadView
                    thread={selectedThread}
                    posts={threadPosts}
                    onLikePost={handleLikePost}
                    onDislikePost={handleDislikePost}
                    onReply={handleReply}
                  />
                </div>
                <div className="lg:sticky lg:top-24 self-start">
                  <Shoutbox
                    messages={shoutboxMessages}
                    onSendMessage={handleSendShout}
                  />
                </div>
              </div>
            )}

            {currentPage === 'profile' && (
              <ProfilePage user={currentUser} isOwnProfile={true} />
            )}

            {currentPage === 'messages' && (
              <MessageInbox
                messages={privateMessages}
                onMessageClick={handleMessageClick}
                onComposeNew={handleComposeNew}
                onDelete={handleDeleteMessage}
              />
            )}

            {currentPage === 'compose' && (
              <MessageCompose
                onSend={handleSendMessage}
                onCancel={() => setCurrentPage('messages')}
              />
            )}
          </>
        )}
      </main>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
