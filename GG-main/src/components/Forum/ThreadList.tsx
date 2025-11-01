import { Thread } from '../../types';
import { Pin, Lock, Eye, MessageSquare, ThumbsUp, ThumbsDown, PlusCircle } from 'lucide-react';

interface ThreadListProps {
  threads: Thread[];
  categoryName: string;
  onThreadClick: (threadId: string) => void;
  onCreateThread: () => void;
}

export default function ThreadList({ threads, categoryName, onThreadClick, onCreateThread }: ThreadListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const sortedThreads = [...threads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{categoryName}</h1>
          <p className="text-gray-400">{threads.length} threads</p>
        </div>
        <button
          onClick={onCreateThread}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Thread</span>
        </button>
      </div>

      <div className="space-y-2">
        {sortedThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => onThreadClick(thread.id)}
            className="bg-gray-800 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={thread.author.avatar}
                  alt={thread.author.username}
                  className="w-12 h-12 rounded-full"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {thread.isPinned && (
                      <Pin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                    {thread.isLocked && (
                      <Lock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                      {thread.title}
                    </h3>
                    {thread.poll && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex-shrink-0">
                        POLL
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span>
                      by <span className="text-purple-400 font-semibold">{thread.author.username}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">
                        {thread.author.rank}
                      </span>
                    </span>
                    <span>{formatDate(thread.createdAt)}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{thread.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>{thread.replies.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{thread.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-red-400">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{thread.dislikes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {thread.lastReply && (
                  <div className="hidden md:block ml-4 min-w-[200px] bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <p className="text-xs text-gray-400 mb-1">Last Reply</p>
                    <p className="text-sm text-purple-400 font-semibold">{thread.lastReply.author}</p>
                    <p className="text-xs text-gray-400">{formatDate(thread.lastReply.timestamp)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
