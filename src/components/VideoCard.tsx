import React from 'react';
import { Clock, User, Calendar, Eye } from 'lucide-react';
import { VideoDetails } from '../types';

interface VideoCardProps {
  video: VideoDetails;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 card overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="relative pb-[56.25%] w-full group">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
          {video.duration}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {video.title}
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
            <User className="h-4 w-4 mr-1 text-blue-500" />
            <span>{video.author}</span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
            <Clock className="h-4 w-4 mr-1 text-green-500" />
            <span>{video.duration}</span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
            <Calendar className="h-4 w-4 mr-1 text-purple-500" />
            <span>Added today</span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
            <Eye className="h-4 w-4 mr-1 text-amber-500" />
            <span>10K+ views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;