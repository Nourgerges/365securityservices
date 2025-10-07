/**
 * Utility functions for video poster image generation and optimization
 */

export function generatePosterFromVideo(videoSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.crossOrigin = 'anonymous';
    video.muted = true;
    
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Seek to 2 seconds or 10% of video, whichever is smaller
      video.currentTime = Math.min(2, video.duration * 0.1);
    });
    
    video.addEventListener('seeked', () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const posterDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(posterDataUrl);
    });
    
    video.addEventListener('error', () => {
      reject(new Error('Video failed to load'));
    });
    
    video.src = videoSrc;
    video.load();
  });
}

/**
 * Get optimized video source based on user's connection
 */
export function getOptimizedVideoSrc(originalSrc: string): string {
  const connection = (navigator as any).connection;
  
  if (connection) {
    // For slow connections, we might want to serve a lower quality version
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      // In a real app, you'd have multiple quality versions
      // For now, just return the original
      return originalSrc;
    }
  }
  
  return originalSrc;
}

/**
 * Preload video metadata for faster playback
 */
export function preloadVideoMetadata(videoSrc: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    video.addEventListener('loadedmetadata', () => {
      resolve(video);
    });
    
    video.addEventListener('error', () => {
      reject(new Error('Failed to preload video metadata'));
    });
    
    video.src = videoSrc;
  });
}