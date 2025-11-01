import { useState, useRef, useEffect } from 'react';
import { ShoutboxMessage } from '../../types';
import { Send, MessageCircle } from 'lucide-react';

interface ShoutboxProps {
  messages: ShoutboxMessage[];
  onSendMessage: (message: string) => void;
}

export default function Shoutbox({ messages, onSendMessage }: ShoutboxProps) {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const rankColors = {
    Member: 'text-gray-400',
    VIP: 'text-green-400',
    Premium: 'text-blue-400',
    Moderator: 'text-yellow-400',
    Admin: 'text-red-400',
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-purple-500/20 overflow-hidden">
      <div
        className="bg-gray-700/50 px-6 py-4 border-b border-gray-700 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Shoutbox</h3>
          <span className="text-xs text-gray-400">({messages.length} messages)</span>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3 group">
                <img
                  src={msg.user.avatar}
                  alt={msg.user.username}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <span className={`font-semibold ${rankColors[msg.user.rank]}`}>
                      {msg.user.username}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 text-sm break-words">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-gray-700/50 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                maxLength={200}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {message.length}/200 characters
            </p>
          </form>
        </>
      )}
    </div>
  );
}
