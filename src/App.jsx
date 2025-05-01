import React, { useState } from 'react';
import ProblemList from './components/problem/ProblemList';
import { problems } from './data/problems';
import { Sword } from 'lucide-react';

function App() {
  const [solvedCount, setSolvedCount] = useState(1);
  const totalProblems = problems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sword className="h-8 w-8 text-white" />
              <h1 className="ml-3 text-2xl font-bold text-white">CodeArena</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-indigo-100">
                {solvedCount}/{totalProblems} Problems Solved
              </span>
              <div className="h-6 w-48 bg-indigo-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${(solvedCount / totalProblems) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Data Structures & Algorithms</h2>
            <p className="mt-1 text-sm text-gray-600">Complete these problems to master DSA concepts</p>
          </div>
          
          <ProblemList problems={problems} />
        </div>
      </main>
    </div>
  );
}

export default App;