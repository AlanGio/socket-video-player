import './index.scss';

const VideoPlayer = ({ videoUrl }) => (
  <video className="video-player" autoPlay loop muted playsInline>
    <source src={videoUrl} type="video/mp4" />
  </video>
);

export default VideoPlayer;
