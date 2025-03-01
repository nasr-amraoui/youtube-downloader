import React, { useState } from 'react';
import { Search, Clipboard, X, Youtube } from 'lucide-react';
import { isValidYoutubeUrl } from '../api/youtube';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    if (!isValidYoutubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError('');
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    setUrl('');
    setError('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="card p-6 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center mb-4">
          <Youtube className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold dark:text-white">Enter Video URL</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Paste YouTube video URL here..."
              className={`input-field ${
                error ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              disabled={isLoading}
            />
            
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-20 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
                disabled={isLoading}
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
              disabled={isLoading}
              title="Paste from clipboard"
            >
              <Clipboard className="h-5 w-5" />
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-red-500 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Get Download Links
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrlInput;