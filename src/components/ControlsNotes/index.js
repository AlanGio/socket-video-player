/* eslint-disable */
import React, { useState, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_URL_SERVER);

const ControlsNotes = ({ videoDuration }) => {
  const [noteText, setNoteText] = useState('');
  const [appear, setAppear] = useState(0);
  const [dissapear, setDissapear] = useState(1);
  const [dissapearLimit, setDissapearLimit] = useState(videoDuration);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!noteText) {
      return null;
    }

    const currentTime = new Date().getTime();
    const noteData = {
      end: currentTime,
      start: currentTime,
      text: noteText,
    };
    socket.emit('noteToShow', noteData);
    setNoteText('');
    return false;
  };

  const handleInputChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const handleAppearChange = useCallback(
    (event) => {
      setDissapearLimit(videoDuration - event.target.value);
      setAppear(event.target.value);
    },
    [videoDuration, appear, dissapearLimit],
  );

  const handleDisappearChange = useCallback(
    (event) => {
      setDissapear(event.target.value);
    },
    [dissapear],
  );

  return (
    <div className="controls-notes">
      <Form onSubmit={handleSubmit}>
        <div className="col-sm-12">
          <Form.Label className="col-sm-12" htmlFor="note"><h4>Add Note:</h4></Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleInputChange}
            className="col-sm-12"
            rows={1}
            value={noteText}
            onKeyDown={handleKeypress}
          />
        </div>

        <div className="col-sm-12">
          <Row>
            <div className="col-sm-6">
              <Form.Label className="col-sm-12" htmlFor="note"><h4>Will appear at {appear} Seconds:</h4></Form.Label>
              <Form.Control className="col-sm-12" type="range" custom min={0} max={videoDuration - 1} step={1} onChange={handleAppearChange} defaultValue={appear} />
            </div>
            <div className="col-sm-6">
              <Form.Label className="col-sm-12" htmlFor="note"><h4>Will dissapear after {dissapear} Seconds:</h4></Form.Label>
              <Form.Control className="col-sm-12" type="range" custom min={1} max={dissapearLimit} step={1} onChange={handleDisappearChange} defaultValue={dissapear} />
            </div>
          </Row>
        </div>

        <div className="col-sm-12">
          <Button type="submit">Send</Button>
        </div>
      </Form>
    </div>
  );
};

export default ControlsNotes;
