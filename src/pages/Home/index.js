import React, { useState, useEffect } from 'react';

import { subscribeToText } from '../../api';

import VideoPlayer from '../../components/VideoPlayer';
import Controls from '../../components/Controls';

import './index.scss';

const VIDEO_URL = `${process.env.PUBLIC_URL}/Big_Buck_Bunny_1080_10s_5MB.mp4`;


const Home = () => {

  const [text, setText] = useState('default!');

  useEffect(() => {
    subscribeToText((err, textCallback) => {
      setText(textCallback);
    }
  )}, []);

  return (
    <div className="App">
      <header className="App-header">
        <VideoPlayer videoUrl={VIDEO_URL} />
        <Controls />
        <h4>{text}</h4>
      </header>
    </div>
  );
}

export default Home;