import React, { useState } from 'react';
import Button from '../ui/Button';
import DiscussionModal from '../discussion/DiscussionModal';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { discussionData } from '../../data/comments';


const ProblemList = ({ problems }) => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  const handleOpenDiscussion = (problem) => {
    setSelectedProblem(problem);
    setIsDiscussionOpen(true);
  };

  const handleCloseDiscussion = () => {
    setIsDiscussionOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.map((problem) => (
            <tr key={problem.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(problem.status)}`}></div>
                  <span className="ml-2 text-sm text-gray-600">{problem.status || 'Not Started'}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{problem.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {problem.difficulty}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {problem.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <ThumbsUp size={16} className="mr-1" />
                    <span>{problem.likes}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDiscussion(problem)}
                    icon={<MessageSquare size={16} />}
                  >
                    Discuss
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProblem && (
        <DiscussionModal
          isOpen={isDiscussionOpen}
          onClose={handleCloseDiscussion}
          problem={selectedProblem}
          discussionData={discussionData}
        />
      )}
    </div>
  );
};

export default ProblemList;