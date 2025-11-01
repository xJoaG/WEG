export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  rank: 'Member' | 'VIP' | 'Premium' | 'Moderator' | 'Admin';
  badges: Badge[];
  postCount: number;
  reputation: number;
  joinDate: string;
  lastSeen: string;
  bio?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  threadCount: number;
  postCount: number;
  lastPost?: {
    threadId: string;
    threadTitle: string;
    author: string;
    timestamp: string;
  };
}

export interface Thread {
  id: string;
  title: string;
  author: User;
  categoryId: string;
  categoryName: string;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  replies: number;
  likes: number;
  dislikes: number;
  createdAt: string;
  lastReply?: {
    author: string;
    timestamp: string;
  };
  poll?: Poll;
}

export interface Post {
  id: string;
  threadId: string;
  author: User;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  editedAt?: string;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsAt?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface PrivateMessage {
  id: string;
  sender: User;
  recipient: User;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ShoutboxMessage {
  id: string;
  user: User;
  message: string;
  timestamp: string;
}
