
import './index.scss';

const formatHour = (time) => {
  const date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit',
    second: '2-digit',
  });
}

const Comment = ({ index, start, text }) => {
  return (
    <div className="comment" key={index}>
      <strong>{formatHour(start)}</strong> {text}
    </div>
  );
};

const CommentsBox = ({ comments }) => {

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="comments-box">
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
}

export default CommentsBox;