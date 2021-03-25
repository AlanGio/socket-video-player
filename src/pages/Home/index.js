import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { subscribeToComment, subscribeToNote } from '../../api';

import CommentsBox from '../../components/CommentsBox';
import Controls from '../../components/Controls';
import ControlsNotes from '../../components/ControlsNotes';
import VideoPlayer from '../../components/VideoPlayer';
import NotesBox from '../../components/NotesBox';

import './index.scss';

const VIDEO_URL = `${process.env.PUBLIC_URL}/Big_Buck_Bunny_1080_10s_5MB.mp4`; // Video Internal Route
const MESSAGES_DELAY = 10000; // Time in miliseconds

const Home = () => {
  const [comments, setComments] = useState([]);
  const [notes, _setNotes] = useState([]);
  const [currentNotes, setCurrentNotes] = useState([]);

  const [videoDuration, setVideoDuration] = useState(0);
  const [videoTime, setVideoTime] = useState(null);

  const notesRef = React.useRef(notes);
  const setNotes = (data) => {
    notesRef.current = data;
    _setNotes(data);
  };

  useEffect(() => {
    subscribeToComment((_, commentCallback) => {
      setComments((oldComments) => [...oldComments, commentCallback]);
    });
  }, []);

  useEffect(() => {
    subscribeToNote((_, noteCallback) => {
      setNotes(noteCallback);
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
        setVideoTime(video.currentTime);
        setCurrentNotes(() => notesRef.current.filter((oldNote) => oldNote.start < video.currentTime && oldNote.end > video.currentTime));
      });
    });
  });

  return (
    <div className="home">
      <Container>
        <Row>
          <Col className="main-container">
            <VideoPlayer videoUrl={VIDEO_URL} videoTime={videoTime} />
            <CommentsBox comments={comments} />
            <NotesBox notes={currentNotes} />
          </Col>
        </Row>
        <Row>
          {videoTime && (
            <>
              <Col><Controls limitTime={MESSAGES_DELAY} /></Col>
              <Col><ControlsNotes videoDuration={videoDuration} /></Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
