import React, { useState } from 'react';
import { Clock, ExternalLink, Trash2, History, ChevronDown, ChevronUp } from 'lucide-react';
import { VideoDetails } from '../types';

interface HistoryItem {
  id: string;
  video: VideoDetails;
  timestamp: Date;
  format: string;
}

interface DownloadHistoryProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

const DownloadHistory: React.FC<DownloadHistoryProps> = ({ 
  history, 
  onClearHistory,
  onRemoveItem
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 card border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <History className="h-5 w-5 mr-2 text-purple-500" />
            <h3 className="text-lg font-semibold dark:text-white">Download History</h3>
            <span className="ml-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {history.length}
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearHistory();
              }}
              className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 mr-4"
            >
              Clear All
            </button>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="space-y-4">
            {history.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="relative group">
                    <img 
                      src={item.video.thumbnail} 
                      alt={item.video.title}
                      className="w-20 h-12 object-cover rounded-lg mr-4"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm dark:text-white truncate max-w-xs">{item.video.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{item.timestamp.toLocaleString()}</span>
                      <span className="mx-2">•</span>
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {item.format}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${item.video.id}`, '_blank')}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"
                    title="Open in YouTube"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadHistory;