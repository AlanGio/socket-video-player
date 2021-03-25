import React from 'react';
import './index.scss';

const VideoPlayer = ({ videoUrl, videoTime }) => (
  <div className="video-player">
    <video id="video" autoPlay loop muted playsInline>
      <source src={videoUrl} type="video/mp4" />
    </video>
    <div className="video-time">{Math.round(videoTime)}</div>
  </div>
);

export default VideoPlayer;
