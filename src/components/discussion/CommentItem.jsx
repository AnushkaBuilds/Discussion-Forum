import React, { useState } from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import Avatar from '../ui/Avatar';
import CommentEditor from './CommentEditor';
import { MessageSquare, ThumbsUp, CornerDownRight } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const CommentItem = ({
  comment,
  indentLevel = 0,
  onReply,
  onUpvote,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxIndentLevel = 5;
  const currentIndentLevel = Math.min(indentLevel, maxIndentLevel);
  
  const handleReplySubmit = (content, codeSnippet) => {
    onReply(comment.id, content, codeSnippet);
    setIsReplying(false);
  };

  return (
    <div className={`mb-4 ${indentLevel > 0 ? 'mt-3' : ''}`}>
      <div className="flex relative">
        {/* Vertical connecting line for replies */}
        {indentLevel > 0 && (
          <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
        )}
        
        {/* Thread indentation and avatar */}
        <div className={`flex-shrink-0 ${indentLevel > 0 ? 'ml-8' : ''}`}>
          <Avatar src={comment.author.avatar} alt={comment.author.name} size="md" />
        </div>
        
        {/* Comment content */}
        <div className="ml-3 flex-grow">
          <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <span className="font-medium text-gray-900">{comment.author.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt))}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <button 
                  onClick={() => onUpvote(comment.id)} 
                  className={`flex items-center text-xs hover:text-indigo-600 transition-colors ${comment.hasUserUpvoted ? 'text-indigo-600' : ''}`}
                >
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{comment.upvotes}</span>
                </button>
              </div>
            </div>
            
            <div className="text-gray-800 mb-2 whitespace-pre-wrap">{comment.content}</div>
            
            {comment.codeSnippet && (
              <div className="my-2">
                <CodeSnippet code={comment.codeSnippet.code} language={comment.codeSnippet.language} />
              </div>
            )}
            
            <div className="flex items-center mt-2 space-x-2">
              <button 
                onClick={() => setIsReplying(!isReplying)} 
                className="text-xs text-gray-500 hover:text-indigo-600 transition-colors flex items-center"
              >
                <MessageSquare size={14} className="mr-1" />
                Reply
              </button>
            </div>
          </div>
          
          {isReplying && (
            <div className="mt-3">
              <CommentEditor 
                onSubmit={handleReplySubmit} 
                placeholder="Write a reply..." 
                buttonText="Reply"
                isReply
              />
            </div>
          )}
          
          {/* Nested replies */}
          {hasReplies && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  indentLevel={currentIndentLevel + 1}
                  onReply={onReply}
                  onUpvote={onUpvote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;