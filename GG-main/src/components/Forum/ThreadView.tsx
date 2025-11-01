import { Thread, Post } from '../../types';
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, Reply, Flag, Share2 } from 'lucide-react';
import { useState } from 'react';
import PollComponent from './PollComponent';
import PostItem from './PostItem';

interface ThreadViewProps {
  thread: Thread;
  posts: Post[];
  onLikePost: (postId: string) => void;
  onDislikePost: (postId: string) => void;
  onReply: (content: string) => void;
}

export default function ThreadView({ thread, posts, onLikePost, onDislikePost, onReply }: ThreadViewProps) {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(replyContent);
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gray-800 rounded-lg border border-purple-500/20 mb-6">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{thread.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="text-purple-400">{thread.categoryName}</span>
                <span>•</span>
                <span>Started by <span className="text-white font-semibold">{thread.author.username}</span></span>
                <span>•</span>
                <span>{formatDate(thread.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{thread.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MessageSquare className="w-4 h-4" />
              <span>{thread.replies.toLocaleString()} replies</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <ThumbsUp className="w-4 h-4" />
              <span>{thread.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-red-400">
              <ThumbsDown className="w-4 h-4" />
              <span>{thread.dislikes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between">
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Reply className="w-4 h-4" />
            <span>Reply to Thread</span>
          </button>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Flag className="w-4 h-4" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>

      {thread.poll && (
        <div className="mb-6">
          <PollComponent poll={thread.poll} />
        </div>
      )}

      {showReplyBox && (
        <div className="bg-gray-800 rounded-lg border border-purple-500/20 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Write a Reply</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Enter your reply..."
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 mb-4"
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReply}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Post Reply
            </button>
            <button
              onClick={() => {
                setShowReplyBox(false);
                setReplyContent('');
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onLike={() => onLikePost(post.id)}
            onDislike={() => onDislikePost(post.id)}
          />
        ))}
      </div>
    </div>
  );
}
