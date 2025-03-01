export interface VideoDetails {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

export interface DownloadFormat {
  id: string;
  label: string;
  quality: string;
  format: string;
  size?: string;
}

export interface DownloadProgress {
  isLoading: boolean;
  progress: number;
  error: string | null;
}