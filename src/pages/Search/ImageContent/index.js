import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Icons from '~/component/Icons';
import classNames from 'classnames/bind';
import styles from './ImageContent.module.scss';

const cx = classNames.bind(styles);

const formatNum = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    return num;
};

function ImageContent({ images }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <Container className={cx('content-container')}>
            <Row xs={1} md={2} lg={3}>
                {images.map((image, index) => (
                    <Col className={cx('image-div')} key={index}>
                        <div className={cx('card-container')}>
                            <div className={cx('card-image')}>
                                <img
                                    src={image.src.medium}
                                    alt={image.alt}
                                    style={{ backgroundColor: image.avg_color }}
                                    onClick={() => handleImageClick(image)}
                                />
                                <div className={cx('likeCount')}>
                                    <i className={cx(Icons.heart)}></i>
                                    <span>{formatNum(image.id)}</span>
                                </div>
                            </div>
                            <div className={cx('card-body')}>
                                <a href={image.url} target="_blank" rel="noopener noreferrer">
                                    <p>{image.photographer}</p>
                                </a>
                                <div className={cx('avatar')}>
                                    <img src={image.photographer_image} alt="avatar" />
                                    <span>{image.photographer_url.split('/').pop()}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            {isModalOpen && selectedImage && (
                <div className={cx('modal')} onClick={handleCloseModal}>
                    <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.src.large} alt={selectedImage.alt} />
                    </div>
                </div>
            )}
        </Container>
    );
}

export default ImageContent;
