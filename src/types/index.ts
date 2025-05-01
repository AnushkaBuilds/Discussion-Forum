export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  upvotes: number;
  replies: Comment[];
  hasUserUpvoted?: boolean;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  status?: 'Not Started' | 'In Progress' | 'Completed';
  description: string;
  likes: number;
  comments: Comment[];
}