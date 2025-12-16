import { useState, useEffect } from 'react';
import { FaDownload, FaTrash, FaPlay, FaCheck } from 'react-icons/fa';
import api from '../utils/api';

const DownloadManager = () => {
  const [downloads, setDownloads] = useState([]);
  const [downloading, setDownloading] = useState({});

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await api.get('/user/downloads');
      setDownloads(response.data);
    } catch (error) {
      console.error('Error fetching downloads:', error);
    }
  };

  const startDownload = async (movie) => {
    setDownloading(prev => ({ ...prev, [movie._id]: { progress: 0, status: 'downloading' } }));
    
    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDownloading(prev => ({ 
          ...prev, 
          [movie._id]: { progress: i, status: 'downloading' } 
        }));
      }
      
      // Save to downloads
      await api.post('/user/downloads', { movieId: movie._id });
      setDownloading(prev => ({ ...prev, [movie._id]: { progress: 100, status: 'completed' } }));
      fetchDownloads();
      
      // Clear downloading state after 2 seconds
      setTimeout(() => {
        setDownloading(prev => {
          const newState = { ...prev };
          delete newState[movie._id];
          return newState;
        });
      }, 2000);
      
    } catch (error) {
      console.error('Download error:', error);
      setDownloading(prev => ({ ...prev, [movie._id]: { progress: 0, status: 'error' } }));
    }
  };

  const deleteDownload = async (downloadId) => {
    try {
      await api.delete(`/user/downloads/${downloadId}`);
      fetchDownloads();
    } catch (error) {
      console.error('Error deleting download:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-20 px-4 lg:px-16">
      <h1 className="text-white text-2xl lg:text-4xl font-bold mb-8">My Downloads</h1>
      
      {downloads.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <FaDownload size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl mb-2">No downloads yet</p>
          <p>Download movies and shows to watch offline</p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((download) => (
            <div key={download._id} className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4">
              <img
                src={download.movie.poster}
                alt={download.movie.title}
                className="w-16 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="text-white font-medium">{download.movie.title}</h3>
                <p className="text-gray-400 text-sm">{download.movie.year}</p>
                <p className="text-gray-400 text-sm">
                  {formatFileSize(download.fileSize || 1024 * 1024 * 500)} • Downloaded {new Date(download.downloadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
                  <FaPlay size={16} />
                </button>
                <button 
                  onClick={() => deleteDownload(download._id)}
                  className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Download Progress Overlay */}
      {Object.keys(downloading).length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gray-900 rounded-lg p-4 min-w-80">
          <h3 className="text-white font-medium mb-2">Downloads</h3>
          {Object.entries(downloading).map(([movieId, status]) => (
            <div key={movieId} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm">Downloading...</span>
                <span className="text-gray-400 text-sm">{status.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DownloadButton = ({ movie, className = "" }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (isDownloaded || isDownloading) return;
    
    setIsDownloading(true);
    try {
      await api.post('/user/downloads', { movieId: movie._id });
      setIsDownloaded(true);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`p-2 rounded-full border-2 transition-all duration-200 ${
        isDownloaded 
          ? 'bg-green-600 text-white border-green-600' 
          : 'bg-netflix-black text-white border-gray-400 hover:border-white hover:bg-gray-800'
      } ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} ${className}`}
      title={isDownloaded ? 'Downloaded' : 'Download'}
    >
      {isDownloading ? (
        <div className="animate-spin w-3 h-3 border border-current border-t-transparent rounded-full" />
      ) : isDownloaded ? (
        <FaCheck size={12} />
      ) : (
        <FaDownload size={12} />
      )}
    </button>
  );
};

export default DownloadManager;