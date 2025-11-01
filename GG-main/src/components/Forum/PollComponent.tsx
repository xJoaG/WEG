import { Poll } from '../../types';
import { BarChart3, Clock } from 'lucide-react';
import { useState } from 'react';

interface PollComponentProps {
  poll: Poll;
}

export default function PollComponent({ poll }: PollComponentProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-purple-500/20 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Poll</h3>
      </div>

      <h4 className="text-lg text-white mb-4">{poll.question}</h4>

      <div className="space-y-3 mb-4">
        {poll.options.map((option) => (
          <div key={option.id} className="relative">
            {!hasVoted ? (
              <label className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="poll"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-3"
                />
                <span className="text-white">{option.text}</span>
              </label>
            ) : (
              <div className="p-4 bg-gray-700 rounded-lg relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-purple-600/30 transition-all duration-500"
                  style={{ width: `${option.percentage}%` }}
                ></div>
                <div className="relative flex items-center justify-between">
                  <span className="text-white">{option.text}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">{option.votes.toLocaleString()} votes</span>
                    <span className="text-purple-400 font-bold">{option.percentage}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasVoted ? (
        <button
          onClick={handleVote}
          disabled={!selectedOption}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
        >
          Vote
        </button>
      ) : (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <BarChart3 className="w-4 h-4" />
            <span>{poll.totalVotes.toLocaleString()} total votes</span>
          </div>
          {poll.endsAt && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Ends {new Date(poll.endsAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
