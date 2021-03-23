import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { subscribeToComment } from '../../api';

import CommentsBox from '../../components/CommentsBox';
import Controls from '../../components/Controls';
import VideoPlayer from '../../components/VideoPlayer';

import './index.scss';

const VIDEO_URL = `${process.env.PUBLIC_URL}/Big_Buck_Bunny_1080_10s_5MB.mp4`;
const MESSAGES_DELAY = 3000; // Time in miliseconds

const Home = () => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    subscribeToComment((err, commentCallback) => {
      setComments(comments => [...comments, commentCallback]);
    }
  )}, []);

  console.log(comments, 'comments')
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
}

export default Home;