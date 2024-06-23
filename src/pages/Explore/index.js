import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListTitle from './ListTitle';

import classNames from 'classnames/bind';
import styles from './Explore.module.scss';

const cx = classNames.bind(styles);

function Explore() {
    const [videos, setVideos] = useState([]);
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [category, setCategory] = useState('Nature');
    const apiKey = 'IOduAJDREt7mMPT0xfjHQCeGaMWhHS5rYmTrsghYiIVT9H8zKCq0rNRg';

    useEffect(() => {
        if (!category) return;

        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://api.pexels.com/videos/search', {
                    headers: {
                        Authorization: apiKey,
                    },
                    params: {
                        query: category,
                        min_duration: '30s',
                        min_width: '360px',
                        min_height: '600px',
                        page: '1',
                        per_page: 40,
                    },
                });
                setVideos(response.data.videos);
            } catch (error) {
                console.error('Error fetching videos from Pexels', error);
            }
        };

        fetchVideos();
    }, [category]);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
        setVideos([]); // Clear existing videos when switching categories
    };

    // Array of refs for each video element
    const videoRefs = useRef([]);

    // Function to handle hover
    const handleVideoHover = (index) => {
        setHoveredVideo(index);
        videoRefs.current[index].play(); // Play the specific video
    };

    // Event handler for mouse leave
    const handleVideoLeave = (index) => {
        setHoveredVideo(null); // Reset hovered video state
        videoRefs.current[index].pause(); // Pause the specific video
        videoRefs.current[index].currentTime = 0; // Reset video to start
    };

    return (
        <div className={cx('wrapper')}>
            <ListTitle onCategoryClick={handleCategoryClick} />
            <Container className={cx('content-container')}>
                <Row xs={1} md={3} lg={5}>
                    {videos.map((video, index) => (
                        <Col className={cx('video-div')} key={index}>
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                onMouseEnter={() => handleVideoHover(index)}
                                onMouseLeave={() => handleVideoLeave(index)}
                                muted
                            >
                                <source src={video.video_files[2].link} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Explore;
