
import React, { useState, useRef, useEffect } from 'react';
import ScenicView from './ScenicView';
import welcomeVideo from "../../assets/welcome.mp4"
import loopVideo from "../../assets/map.mp4";
import './Test.css';

const Test = () => {
  const [playSecondVideo, setPlaySecondVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoEnd = () => {
      setPlaySecondVideo(true);
    };

    const playVideoOnInteraction = () => {
      videoRef.current.play();
      window.removeEventListener('mousemove', playVideoOnInteraction);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    window.addEventListener('mousemove', playVideoOnInteraction);

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
      window.removeEventListener('mousemove', playVideoOnInteraction);
    };
  }, []);

  return (
    <div className="container">
      <div className="video-section">
        {!playSecondVideo ? (
          <video ref={videoRef} src={welcomeVideo} autoPlay playsInline className="video" />
        ) : (
          <video src={loopVideo} autoPlay muted loop playsInline className="video" />
        )}
      </div>
      <div className="text-section">
        <ScenicView />
      </div>
    </div>
  );
};

export default Test;
