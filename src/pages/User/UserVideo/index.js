import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Icons from '~/component/Icons';
import classNames from 'classnames/bind';
import styles from './UserVideo.module.scss';

const cx = classNames.bind(styles);

const formatNum = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    return num;
};

function UserVideo({ videos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videoRefs = useRef([]);

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
            <Row xs={3} lg={5} className={cx('video-grid')}>
                {' '}
                {videos.map((video, index) => (
                    <Col className={cx('video-div')} key={index}>
                        <div className={cx('card-container')}>
                            <div className={cx('card-video')}>
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    onClick={() => handleVideoClick(video)}
                                    muted
                                >
                                    <source src={video.videoURL} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ thẻ video.
                                </video>
                                <div className={cx('likeCount')}>
                                    <i className={cx(Icons.heart)}></i>
                                    <span>{formatNum(video.like)}</span>
                                </div>
                            </div>
                            <div className={cx('card-body')}>
                                <p>{video.description}</p>
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
                            <source src={selectedVideo.videoURL} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default UserVideo;
