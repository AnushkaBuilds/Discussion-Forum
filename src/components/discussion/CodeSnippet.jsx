import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';


const CodeSnippet = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Create a simple syntax highlighting by just changing the background color
  // In a real application, you might want to use a library like prism.js or highlight.js
  const languageColors = {
    javascript: 'bg-[#2d2d2d]',
    python: 'bg-[#2d2d2d]',
    java: 'bg-[#2d2d2d]',
    cpp: 'bg-[#2d2d2d]',
    typescript: 'bg-[#2d2d2d]',
  };

  return (
    <div className="relative rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300">
        <span className="text-xs font-medium">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className={`${languageColors[language] || 'bg-gray-800'} text-gray-200 p-4 overflow-x-auto`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;