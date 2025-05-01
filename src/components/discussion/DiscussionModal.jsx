import React, { useState, useMemo } from 'react';
import Modal from '../ui/Modal';
import CommentItem from './CommentItem';
import CommentEditor from './CommentEditor';
import { SortAsc, SortDesc, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';


const DiscussionModal = ({
  isOpen,
  onClose,
  problem,
  discussionData,
}) => {
  const [comments, setComments] = useState(discussionData);
  const [sortNewest, setSortNewest] = useState(true);
  
  // Generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Current user - in a real app, this would come from authentication
  const currentUser = {
    id: 'current-user',
    name: 'Your Name',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (sortNewest) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.upvotes - a.upvotes;
      }
    });
  }, [comments, sortNewest]);

  const handleAddComment = (content, codeSnippet) => {
    const newComment = {
      id: generateId(),
      content,
      createdAt: new Date().toISOString(),
      author: currentUser,
      upvotes: 0,
      replies: [],
      ...(codeSnippet && { codeSnippet }),
    };

    setComments((prevComments) => [newComment, ...prevComments]);
  };

  // Recursive function to add a reply to a comment
  const addReply = (commentsList, parentId, newReply) => {
    return commentsList.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, newReply),
        };
      }
      
      return comment;
    });
  };

  const handleReply = (parentId, content, codeSnippet) => {
    const newReply = {
      id: generateId(),
      content,
      createdAt: new Date().toISOString(),
      author: currentUser,
      upvotes: 0,
      replies: [],
      ...(codeSnippet && { codeSnippet }),
    };

    setComments((prevComments) => addReply(prevComments, parentId, newReply));
  };

  // Recursive function to upvote a comment
  const upvoteComment = (commentsList, commentId) => {
    return commentsList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          upvotes: comment.hasUserUpvoted ? comment.upvotes - 1 : comment.upvotes + 1,
          hasUserUpvoted: !comment.hasUserUpvoted,
        };
      }
      
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: upvoteComment(comment.replies, commentId),
        };
      }
      
      return comment;
    });
  };

  const handleUpvote = (commentId) => {
    setComments((prevComments) => upvoteComment(prevComments, commentId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Discussion: ${problem.title}`} size="lg">
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-xl font-medium text-gray-900 mb-2">{problem.title}</h3>
          <div className="flex space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium
              ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'}`}>
              {problem.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
              {problem.category}
            </span>
          </div>
          <p className="text-gray-600">{problem.description}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageSquare size={18} className="text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortNewest(!sortNewest)}
              icon={sortNewest ? <SortDesc size={16} /> : <SortAsc size={16} />}
            >
              {sortNewest ? 'Newest First' : 'Most Upvoted'}
            </Button>
          </div>
          
          <CommentEditor onSubmit={handleAddComment} placeholder="Share your thoughts or solution..." />
        </div>
        
        <div className="space-y-4">
          {sortedComments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Be the first to start the discussion!</p>
            </div>
          ) : (
            sortedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onUpvote={handleUpvote}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DiscussionModal;