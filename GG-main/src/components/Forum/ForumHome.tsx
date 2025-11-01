import { Category } from '../../types';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ForumHomeProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

export default function ForumHome({ categories, onCategoryClick }: ForumHomeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Zethon Forums</h1>
        <p className="text-gray-400">Welcome to the community - discuss, share, and connect</p>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => {
          const IconComponent = (Icons as any)[category.icon];
          return (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="bg-gray-800 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-purple-600 p-3 rounded-lg group-hover:bg-purple-700 transition-colors">
                      {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{category.description}</p>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-gray-400">
                          <span className="text-white font-semibold">{category.threadCount.toLocaleString()}</span> Threads
                        </div>
                        <div className="text-gray-400">
                          <span className="text-white font-semibold">{category.postCount.toLocaleString()}</span> Posts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block ml-6 min-w-[250px]">
                    {category.lastPost ? (
                      <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                        <p className="text-xs text-gray-400 mb-1">Latest Post</p>
                        <p className="text-sm text-white font-semibold truncate mb-1">
                          {category.lastPost.threadTitle}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-purple-400">{category.lastPost.author}</span>
                          <span className="text-gray-400">{formatDate(category.lastPost.timestamp)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                        <p className="text-sm text-gray-400">No posts yet</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4">Forum Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Threads</span>
              <span className="text-white font-semibold">
                {categories.reduce((sum, cat) => sum + cat.threadCount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Posts</span>
              <span className="text-white font-semibold">
                {categories.reduce((sum, cat) => sum + cat.postCount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Users</span>
              <span className="text-white font-semibold">1,234</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4">Online Now</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white font-semibold">89</span>
              <span className="text-gray-400">members</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-white font-semibold">234</span>
              <span className="text-gray-400">guests</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4">Newest Member</h3>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Newest member"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white font-semibold">NewUser123</p>
              <p className="text-xs text-gray-400">Joined 5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
