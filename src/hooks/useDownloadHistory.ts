import { useState, useEffect } from 'react';
import { VideoDetails } from '../types';

interface HistoryItem {
  id: string;
  video: VideoDetails;
  timestamp: Date;
  format: string;
}

export const useDownloadHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('downloadHistory');
    if (savedHistory) {
      try {
        // Parse the JSON and convert string timestamps back to Date objects
        const parsed = JSON.parse(savedHistory);
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      } catch (error) {
        console.error('Failed to parse download history:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    // Save history to localStorage whenever it changes
    localStorage.setItem('downloadHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (video: VideoDetails, format: string) => {
    const newItem: HistoryItem = {
      id: `${video.id}-${Date.now()}`,
      video,
      timestamp: new Date(),
      format
    };
    
    setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep only the 10 most recent items
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};