import React, { useState } from 'react';
import Button from '../ui/Button';
import { Code, Send } from 'lucide-react';


const CommentEditor = ({
  onSubmit,
  placeholder = 'Add your thoughts...',
  buttonText = 'Post',
  isReply = false,
}) => {
  const [content, setContent] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (content.trim() === '' && (!showCodeEditor || code.trim() === '')) {
      return;
    }

    onSubmit(
      content, 
      showCodeEditor && code.trim() !== '' 
        ? { language, code } 
        : undefined
    );
    
    setContent('');
    setCode('');
    setShowCodeEditor(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-lg ${isReply ? 'pl-12' : ''}`}>
      <div className="mb-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder={placeholder}
          rows={isReply ? 2 : 3}
        />
      </div>

      {showCodeEditor && (
        <div className="mb-3 bg-gray-50 p-3 rounded-md border border-gray-300">
          <div className="flex gap-2 mb-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-gray-800 text-gray-200 rounded-md focus:outline-none resize-none"
            placeholder="// Add your code here"
            rows={5}
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowCodeEditor(!showCodeEditor)}
          icon={<Code size={16} />}
        >
          {showCodeEditor ? 'Hide Code' : 'Add Code'}
        </Button>
        
        <Button 
          type="submit" 
          variant={isReply ? 'outline' : 'primary'} 
          size="sm" 
          icon={<Send size={16} />}
          disabled={content.trim() === '' && (!showCodeEditor || code.trim() === '')}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommentEditor;