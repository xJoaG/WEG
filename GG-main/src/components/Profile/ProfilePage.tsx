import { User } from '../../types';
import { Calendar, MessageSquare, TrendingUp, Clock, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ProfilePageProps {
  user: User;
  isOwnProfile?: boolean;
  onSendMessage?: () => void;
}

export default function ProfilePage({ user, isOwnProfile = false, onSendMessage }: ProfilePageProps) {
  const rankColors = {
    Member: 'bg-gray-600',
    VIP: 'bg-green-600',
    Premium: 'bg-blue-600',
    Moderator: 'bg-yellow-600',
    Admin: 'bg-red-600',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gray-800 rounded-lg border border-purple-500/20 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-purple-900 to-purple-700"></div>

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 mb-6">
            <div className="flex items-end space-x-6">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-xl"
              />
              <div className="pb-2">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${rankColors[user.rank]}`}>
                    {user.rank}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => {
                    const IconComponent = (Icons as any)[badge.icon];
                    return (
                      <div
                        key={badge.id}
                        className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full"
                      >
                        {IconComponent && <IconComponent className={`w-4 h-4 ${badge.color}`} />}
                        <span className="text-xs text-gray-300">{badge.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {!isOwnProfile && (
              <button
                onClick={onSendMessage}
                className="mt-4 md:mt-0 flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400 text-sm">Total Posts</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.postCount.toLocaleString()}</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-gray-400 text-sm">Reputation</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.reputation.toLocaleString()}</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">Member Since</span>
              </div>
              <p className="text-lg font-semibold text-white">{formatDate(user.joinDate)}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-300">
                {user.bio || 'This user has not added a bio yet.'}
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">Activity</h2>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>Last seen: {getRelativeTime(user.lastSeen)}</span>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-4 border-b border-gray-600">
                  <div className="bg-purple-600 p-2 rounded">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      Posted in <span className="text-purple-400 font-semibold">General Discussion</span>
                    </p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 pb-4 border-b border-gray-600">
                  <div className="bg-green-600 p-2 rounded">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">Received 15 reputation points</p>
                    <p className="text-sm text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 p-2 rounded">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      Created thread: <span className="text-purple-400 font-semibold">Looking for teammates</span>
                    </p>
                    <p className="text-sm text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
