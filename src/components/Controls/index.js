import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

const Controls = ({ limitTime }) => {

  const [commentText, setCommentText] = useState('');

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  }

  const handleKeypress = (event) => {
    if(event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCommentText('');

    const currentTime = new Date().getTime();
    const commentData = {
      end: currentTime + limitTime,
      start: currentTime,
      text: commentText,
    };
    socket.emit('commentToShow', commentData);
    return false;
  }

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Label className="col-sm-2" htmlFor="comment"><h4>Message:</h4></Form.Label>
      <Form.Control
        as="textarea"
        onChange={handleInputChange}
        className="col-sm-8"
        rows={1}
        value={commentText}
        onKeyDown={handleKeypress}
      />
      <div className="col-sm-2">
        <Button type="submit">Send</Button>
      </div>
    </Form>
  );
}

export default Controls;