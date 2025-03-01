import axios from 'axios';
import { VideoDetails, DownloadFormat } from '../types';

// This is a mock API service since we can't implement a real backend
// In a real application, you would use a proper backend service or API

const API_BASE_URL = 'https://youtube-downloader-api.example.com/api';

// Mock data for video details
const mockVideoDetails = (videoId: string): VideoDetails => ({
  id: videoId,
  title: 'Sample YouTube Video',
  thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  duration: '10:30',
  author: 'Sample Channel'
});

// Mock data for download formats
const mockDownloadFormats = (): DownloadFormat[] => [
  { id: '1', label: 'MP4 - 1080p', quality: '1080p', format: 'mp4', size: '120MB' },
  { id: '2', label: 'MP4 - 720p', quality: '720p', format: 'mp4', size: '70MB' },
  { id: '3', label: 'MP4 - 480p', quality: '480p', format: 'mp4', size: '45MB' },
  { id: '4', label: 'MP4 - 360p', quality: '360p', format: 'mp4', size: '25MB' },
  { id: '5', label: 'MP3 - High Quality', quality: '320kbps', format: 'mp3', size: '15MB' },
  { id: '6', label: 'MP3 - Medium Quality', quality: '192kbps', format: 'mp3', size: '10MB' }
];

// Extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

// Validate YouTube URL
export const isValidYoutubeUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
};

// Fetch video details
export const fetchVideoDetails = async (url: string): Promise<VideoDetails> => {
  // In a real app, you would make an API call like:
  // const response = await axios.get(`${API_BASE_URL}/video-info?url=${encodeURIComponent(url)}`);
  // return response.data;
  
  // For demo purposes, we'll use mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const videoId = extractVideoId(url) || 'dQw4w9WgXcQ';
      resolve(mockVideoDetails(videoId));
    }, 1500); // Simulate network delay
  });
};

// Fetch available download formats
export const fetchDownloadFormats = async (videoId: string): Promise<DownloadFormat[]> => {
  // In a real app, you would make an API call like:
  // const response = await axios.get(`${API_BASE_URL}/formats?videoId=${videoId}`);
  // return response.data;
  
  // For demo purposes, we'll use mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDownloadFormats());
    }, 1000); // Simulate network delay
  });
};

// Download video in specified format
export const downloadVideo = async (videoId: string, formatId: string): Promise<string> => {
  // In a real app, you would make an API call like:
  // const response = await axios.get(`${API_BASE_URL}/download?videoId=${videoId}&formatId=${formatId}`, {
  //   responseType: 'blob'
  // });
  // return URL.createObjectURL(response.data);
  
  // For demo purposes, we'll just return a mock URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/download/${videoId}?format=${formatId}`);
    }, 2000); // Simulate network delay
  });
};