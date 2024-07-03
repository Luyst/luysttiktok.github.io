import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Icons from '~/component/Icons';
import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

const formatNum = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    return num;
};

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function VideoContent({ videos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videoRefs = useRef([]);

    // Handle video hover with debounce
    const handleVideoHover = debounce((index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].play().catch((error) => console.error('Error playing video:', error));
        }
    }, 200);

    // Handle video leave with debounce
    const handleVideoLeave = debounce((index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].pause();
            videoRefs.current[index].currentTime = 0;
        }
    }, 200);

    // Handle video click to open modal
    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    // Handle closing modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <Container className={cx('content-container')}>
            <Row xs={1} md={2} lg={3}>
                {videos.map((video, index) => (
                    <Col className={cx('video-div')} key={index}>
                        <div className={cx('card-container')}>
                            <div className={cx('card-video')}>
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    onMouseEnter={() => handleVideoHover(index)}
                                    onMouseLeave={() => handleVideoLeave(index)}
                                    onClick={() => handleVideoClick(video)}
                                    muted
                                >
                                    <source src={video.video_files[2].link} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ thẻ video.
                                </video>
                                <div className={cx('likeCount')}>
                                    <i className={cx(Icons.heart)}></i>
                                    <span>{formatNum(video.user.id)}</span>
                                </div>
                            </div>

                            <div className={cx('card-body')}>
                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                    <p>{video.url}</p>
                                </a>
                                <div className={cx('avatar')}>
                                    <img src={video.image} alt="avatar" />
                                    <span>{video.user.url.split('/').pop()}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            {/* Modal for displaying selected video */}
            {isModalOpen && selectedVideo && (
                <div className={cx('modal')} onClick={handleCloseModal}>
                    <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                        <video controls>
                            <source src={selectedVideo.video_files[2].link} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default VideoContent;
