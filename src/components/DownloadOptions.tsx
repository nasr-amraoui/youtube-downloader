import React, { useState } from 'react';
import { Download, FileVideo, Music, Check, Info } from 'lucide-react';
import { DownloadFormat } from '../types';
import { downloadVideo } from '../api/youtube';
import toast from 'react-hot-toast';

interface DownloadOptionsProps {
  videoId: string;
  formats: DownloadFormat[];
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ videoId, formats }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'video' | 'audio'>('video');

  const handleDownload = async (format: DownloadFormat) => {
    try {
      setDownloading(format.id);
      const downloadUrl = await downloadVideo(videoId, format.id);
      
      // In a real app, this would trigger the actual download
      // For demo purposes, we'll just show a success message
      toast.success(`Download started for ${format.label}`, {
        icon: <Check className="h-5 w-5 text-green-500" />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      
      // Simulate download by opening a new tab
      window.open(downloadUrl, '_blank');
    } catch (error) {
      toast.error('Failed to start download', {
        icon: <Info className="h-5 w-5 text-red-500" />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.error('Download error:', error);
    } finally {
      setDownloading(null);
    }
  };

  // Separate formats by type
  const videoFormats = formats.filter(format => format.format === 'mp4');
  const audioFormats = formats.filter(format => format.format === 'mp3');

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 card border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-6 dark:text-white">Download Options</h3>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setSelectedTab('video')}
            className={`flex items-center py-3 px-5 font-medium transition-colors ${
              selectedTab === 'video'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <FileVideo className={`h-5 w-5 mr-2 ${selectedTab === 'video' ? 'text-blue-600' : ''}`} />
            Video Formats
          </button>
          <button
            onClick={() => setSelectedTab('audio')}
            className={`flex items-center py-3 px-5 font-medium transition-colors ${
              selectedTab === 'audio'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Music className={`h-5 w-5 mr-2 ${selectedTab === 'audio' ? 'text-green-600' : ''}`} />
            Audio Formats
          </button>
        </div>
        
        {selectedTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoFormats.map(format => (
              <button
                key={format.id}
                onClick={() => handleDownload(format)}
                disabled={downloading === format.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                    <FileVideo className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium dark:text-white block">{format.quality}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">{format.size}</span>
                  </div>
                </div>
                <div className="flex items-center text-blue-600">
                  {downloading === format.id ? (
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                      <Download className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
        
        {selectedTab === 'audio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioFormats.map(format => (
              <button
                key={format.id}
                onClick={() => handleDownload(format)}
                disabled={downloading === format.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors">
                    <Music className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium dark:text-white block">{format.quality}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">{format.size}</span>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  {downloading === format.id ? (
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors">
                      <Download className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
            <Info className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
            <span>
              This is a demo application. In a real-world scenario, downloads would be processed through a backend service.
              For educational purposes only.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadOptions;