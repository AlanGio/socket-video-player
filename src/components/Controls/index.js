import React, { useState } from 'react';
import openSocket from 'socket.io-client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './index.scss';

const socket = openSocket(process.env.REACT_APP_URL_SERVER);

const Controls = ({ limitTime }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!commentText) {
      return null;
    }

    const currentTime = new Date().getTime();
    const commentData = {
      end: currentTime + limitTime,
      start: currentTime,
      text: commentText,
    };
    socket.emit('commentToShow', commentData);
    setCommentText('');
    return false;
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="controls">
      <Form onSubmit={handleSubmit}>
        <div className="col-sm-12">
          <Form.Label htmlFor="comment"><h4>Chat:</h4></Form.Label>
        </div>
        <div className="col-sm-12">
          <Form.Control
            as="textarea"
            onChange={handleInputChange}
            rows={4}
            value={commentText}
            onKeyDown={handleKeypress}
          />
        </div>
        <div className="col-sm-12">
          <Button type="submit">Send</Button>
        </div>
      </Form>
    </div>
  );
};

export default Controls;
