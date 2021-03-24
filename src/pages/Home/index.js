/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import subscribeToComment from '../../api';

import CommentsBox from '../../components/CommentsBox';
import Controls from '../../components/Controls';
import ControlsNotes from '../../components/ControlsNotes';
import VideoPlayer from '../../components/VideoPlayer';
import NotesBox from '../../components/NotesBox';

import './index.scss';

const VIDEO_URL = `${process.env.PUBLIC_URL}/Big_Buck_Bunny_1080_10s_5MB.mp4`; // Video Internal Route
const MESSAGES_DELAY = 10000; // Time in miliseconds

const mock = [
  {
    start: 1,
    end: 9,
    text: 'Pepe',
  },
  {
    start: 2,
    end: 4,
    text: 'Papapapapa',
  },
];

const Home = () => {
  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState(mock);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    subscribeToComment((err, commentCallback) => {
      setComments((oldComments) => [...oldComments, commentCallback]);
    });
  }, []);

  useEffect(() => {
    const intervalComments = setInterval(() => {
      setComments((oldComments) => oldComments.filter((oldComment) => Math.sign(Date.now() - oldComment.end) === -1));
    }, 2500);
    return () => clearInterval(intervalComments);
  }, []);

  useEffect(() => {
    const video = document.getElementById('video');

    video.addEventListener('loadedmetadata', () => {
      setVideoDuration(video.duration);
      video.addEventListener('timeupdate', () => {
        setNotes(mock);
        setNotes((oldNotes) => oldNotes.filter((oldNote) => video.currentTime >= oldNote.start && video.currentTime <= oldNote.end));
      });
    });
  }, []);

  return (
    <div className="home">
      <Container>
        <Row>
          <Col className="main-container">
            <VideoPlayer videoUrl={VIDEO_URL} />
            <CommentsBox comments={comments} />
            <NotesBox notes={notes} />
          </Col>
        </Row>
        <Row>
          <Col><Controls limitTime={MESSAGES_DELAY} /></Col>
          <Col><ControlsNotes videoDuration={videoDuration} /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
