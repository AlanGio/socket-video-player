import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

const Controls = () => {

  const [data, setData] = useState({
    text: '',
  });


  const handleInputChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setData({
        ...data,
        [event.target.name] : event.target.value
    })
  }

  const sendForm = (event) => {
    event.preventDefault();
    console.log('textToShow data...' + data.text)
    socket.emit('textToShow', data.text);

    // {text: '', start: 'timestamp', end: 'timestamp'}
    return false;
  }

  return (
    <Form inline onSubmit={sendForm}>
      <Form.Label className="my-1 mr-2" htmlFor="text">Text</Form.Label>
      <Form.Control as="textarea" onChange={handleInputChange} className="my-1 mr-sm-2" rows={3} id="text" name="text" />
      <Button type="submit" className="my-1">Submit</Button>
    </Form>
  );
}

export default Controls;