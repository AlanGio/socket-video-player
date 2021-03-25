import React from 'react';
import lodash from 'lodash';

import './index.scss';

const formatHour = (time) => {
  const date = new Date(parseInt(time, 10));
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const Comment = ({ start, text }) => (
  <div className="comment" key={start}>
    <strong>{formatHour(start)}</strong>
    {' '}
    {text}
  </div>
);

const CommentsBox = ({ comments }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="comments-box">
      {comments.map((comment) => (
        <Comment {...comment} key={lodash.uniqueId('comment_')} />
      ))}
    </div>
  );
};

export default CommentsBox;
