import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import subscribeToComment from '../../api';

import CommentsBox from '../../components/CommentsBox';
import Controls from '../../components/Controls';
import VideoPlayer from '../../components/VideoPlayer';

import './index.scss';

const VIDEO_URL = `${process.env.PUBLIC_URL}/Big_Buck_Bunny_1080_10s_5MB.mp4`; // Video Internal Route
const MESSAGES_DELAY = 10000; // Time in miliseconds

const Home = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    subscribeToComment((err, commentCallback) => {
      setComments((oldComments) => [...oldComments, commentCallback]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setComments((oldComments) => oldComments.filter((oldComment) => Math.sign(Date.now() - oldComment.end) === -1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Container>
        <Row>
          <Col className="main-container">
            <VideoPlayer videoUrl={VIDEO_URL} />
            <CommentsBox comments={comments} />
          </Col>
        </Row>
        <Row>
          <Col><Controls limitTime={MESSAGES_DELAY} /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
