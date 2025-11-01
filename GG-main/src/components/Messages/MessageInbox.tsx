import { PrivateMessage } from '../../types';
import { Mail, MailOpen, Trash, Reply, PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface MessageInboxProps {
  messages: PrivateMessage[];
  onMessageClick: (messageId: string) => void;
  onComposeNew: () => void;
  onDelete: (messageId: string) => void;
}

export default function MessageInbox({ messages, onMessageClick, onComposeNew, onDelete }: MessageInboxProps) {
  const [selectedTab, setSelectedTab] = useState<'inbox' | 'sent'>('inbox');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Private Messages</h1>
          <p className="text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}` : 'No unread messages'}
          </p>
        </div>
        <button
          onClick={onComposeNew}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Compose</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-purple-500/20 overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setSelectedTab('inbox')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              selectedTab === 'inbox'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Inbox ({messages.length})
          </button>
          <button
            onClick={() => setSelectedTab('sent')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              selectedTab === 'sent'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sent (0)
          </button>
        </div>

        <div className="divide-y divide-gray-700">
          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-700/50 cursor-pointer transition-colors ${
                  !message.isRead ? 'bg-gray-700/30' : ''
                }`}
                onClick={() => onMessageClick(message.id)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.username}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {!message.isRead ? (
                          <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        ) : (
                          <MailOpen className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                        <span className={`font-semibold ${!message.isRead ? 'text-white' : 'text-gray-300'}`}>
                          {message.sender.username}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-400">
                          {message.sender.rank}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{formatDate(message.createdAt)}</span>
                    </div>

                    <h3 className={`text-lg mb-2 ${!message.isRead ? 'text-white font-semibold' : 'text-gray-300'}`}>
                      {message.subject}
                    </h3>

                    <p className="text-gray-400 line-clamp-2">{message.content}</p>

                    <div className="flex items-center space-x-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMessageClick(message.id);
                        }}
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        <span className="text-sm">Reply</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(message.id);
                        }}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
