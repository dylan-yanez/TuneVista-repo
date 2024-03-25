import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=youtube_api_key&part=snippet&type=video&q=${searchQuery}&pageToken=${pageToken}`
      );
      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setPageToken(response.data.nextPageToken || '');
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pageToken) return; // Exit early if no pageToken is available
    // Function to handle scroll event
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight
      ) {
        // User has scrolled to the bottom, fetch more videos
        if (!loading) {
          fetchVideos();
        }
      }
    };

    // Attach scroll event listener to the container
    containerRef.current.addEventListener('scroll', handleScroll);

    // Clean up function to remove the scroll event listener
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [pageToken, loading]); // Call useEffect whenever pageToken or loading changes

  useEffect(() => {
    // Call the function to fetch videos when component mounts
    fetchVideos();
  }, [searchQuery]); // Call useEffect whenever searchQuery changes

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', overflowY: 'auto', height: '80vh' }} ref={containerRef}>
      <h2>Searching for "{searchQuery}"...</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ margin: '10px', maxWidth: '300px' }}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              <h3>{video.snippet.title}</h3>
            </a>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchResult;
