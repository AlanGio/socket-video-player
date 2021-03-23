
const VideoPlayer = ({ videoUrl}) => {
  return (
    <video className="video-web" autoPlay muted playsInline>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;