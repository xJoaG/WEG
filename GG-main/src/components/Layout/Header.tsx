import { User } from '../../types';
import { Home, MessageSquare, Mail, User as UserIcon, LogOut, Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  unreadMessages?: number;
}

export default function Header({ user, onNavigate, onLogout, unreadMessages = 0 }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:from-purple-300 hover:to-purple-500 transition-all"
          >
            ZETHON.VIP
          </button>

          {user && (
            <nav className="hidden md:flex items-center justify-center space-x-1 flex-1">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => onNavigate('forum')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Forums</span>
              </button>
              <button
                onClick={() => onNavigate('messages')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors relative"
              >
                <Mail className="w-4 h-4" />
                <span>Messages</span>
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </button>
            </nav>
          )}

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gray-700/50 rounded-lg">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-32"
                  />
                </div>

                <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full border-2 border-gray-700"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-white font-semibold text-sm">{user.username}</p>
                      <p className="text-xs text-gray-400">{user.rank}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg border border-gray-700 shadow-xl py-2">
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <div className="my-1 border-t border-gray-700"></div>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-white hover:text-purple-400 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <div className="md:hidden border-t border-gray-700">
          <nav className="flex items-center justify-around py-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => onNavigate('forum')}
              className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Forums</span>
            </button>
            <button
              onClick={() => onNavigate('messages')}
              className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-300 hover:text-white transition-colors relative"
            >
              <Mail className="w-5 h-5" />
              <span className="text-xs">Messages</span>
              {unreadMessages > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <UserIcon className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
