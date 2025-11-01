import { Post } from '../../types';
import { ThumbsUp, ThumbsDown, MessageSquare, Edit, Trash } from 'lucide-react';
import * as Icons from 'lucide-react';

interface PostItemProps {
  post: Post;
  onLike: () => void;
  onDislike: () => void;
}

export default function PostItem({ post, onLike, onDislike }: PostItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const rankColors = {
    Member: 'bg-gray-600',
    VIP: 'bg-green-600',
    Premium: 'bg-blue-600',
    Moderator: 'bg-yellow-600',
    Admin: 'bg-red-600',
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-purple-500/20">
      <div className="p-6">
        <div className="flex space-x-6">
          <div className="flex-shrink-0 w-48 text-center">
            <img
              src={post.author.avatar}
              alt={post.author.username}
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h3 className="text-white font-bold mb-1">{post.author.username}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${
                rankColors[post.author.rank]
              }`}
            >
              {post.author.rank}
            </span>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <MessageSquare className="w-4 h-4" />
                <span>{post.author.postCount.toLocaleString()} posts</span>
              </div>
              <div className="text-gray-400">
                <span className="text-green-400 font-semibold">{post.author.reputation.toLocaleString()}</span> rep
              </div>
            </div>

            {post.author.badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {post.author.badges.map((badge) => {
                  const IconComponent = (Icons as any)[badge.icon];
                  return (
                    <div
                      key={badge.id}
                      className="bg-gray-700 p-1.5 rounded"
                      title={badge.name}
                    >
                      {IconComponent && <IconComponent className={`w-4 h-4 ${badge.color}`} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex-1 border-l border-gray-700 pl-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{formatDate(post.createdAt)}</span>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-400 transition-colors">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-gray-300 mb-6 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {post.editedAt && (
              <p className="text-xs text-gray-500 italic mb-4">
                Last edited: {formatDate(post.editedAt)}
              </p>
            )}

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              <button
                onClick={onLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  post.isLiked
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={onDislike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  post.isDisliked
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{post.dislikes}</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
