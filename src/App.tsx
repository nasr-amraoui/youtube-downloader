import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import VideoCard from './components/VideoCard';
import DownloadOptions from './components/DownloadOptions';
import DownloadHistory from './components/DownloadHistory';
import Footer from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import { useDownloadHistory } from './hooks/useDownloadHistory';
import { fetchVideoDetails, fetchDownloadFormats, extractVideoId } from './api/youtube';
import { VideoDetails, DownloadFormat } from './types';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { history, addToHistory, removeFromHistory, clearHistory } = useDownloadHistory();
  
  const [isLoading, setIsLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [downloadFormats, setDownloadFormats] = useState<DownloadFormat[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch video details
      const details = await fetchVideoDetails(url);
      setVideoDetails(details);
      
      // Fetch available download formats
      const videoId = extractVideoId(url) || '';
      const formats = await fetchDownloadFormats(videoId);
      setDownloadFormats(formats);
    } catch (err) {
      console.error('Error fetching video:', err);
      setError('Failed to fetch video details. Please try again.');
      setVideoDetails(null);
      setDownloadFormats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: string) => {
    if (videoDetails) {
      addToHistory(videoDetails, format);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200`}>
      <Toaster position="top-right" />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Download YouTube Videos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter a YouTube URL to download videos in various formats and quality options.
            Our tool makes it easy to save your favorite content for offline viewing.
          </p>
        </div>
        
        <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="w-full max-w-3xl mx-auto mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <p className="text-red-700 dark:text-red-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </p>
          </div>
        )}
        
        {videoDetails && (
          <>
            <VideoCard video={videoDetails} />
            <DownloadOptions 
              videoId={videoDetails.id} 
              formats={downloadFormats} 
            />
          </>
        )}
        
        <DownloadHistory 
          history={history}
          onClearHistory={clearHistory}
          onRemoveItem={removeFromHistory}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;