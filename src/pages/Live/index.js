import React, { useState, useRef } from 'react';

import ListTitle from '~/component/ListTitle';
import Icons from '~/component/Icons'; // Import thư viện Icons (để sử dụng icon arrow_up và arrow_down)
import BackgroundBlur from '~/component/BackgroundBlur';

import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import usePexel from '~/hooks/usePexel';

const cx = classNames.bind(styles);

function Live() {
    const [category, setCategory] = useState('Nature');
    const scrollContainerRef = useRef(null);

    const { items, loading } = usePexel('videos', 'search', category);
    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const scrollUp = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: -520,
                behavior: 'smooth',
            });
        }
    };

    const scrollDown = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: 520,
                behavior: 'smooth',
            });
        }
    };

    // Mảng ref cho mỗi phần tử video
    const videoRefs = useRef([]);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div>Loading....</div>
            ) : (
                <>
                    <ListTitle onCategoryClick={handleCategoryClick} nowCategory={category} />
                    <div className={cx('main-video-slider')} ref={scrollContainerRef}>
                        {items.map((video, index) => (
                            <div className={cx('video-item')} key={index}>
                                <BackgroundBlur img={video.image} />

                                <video
                                    ref={(el) => (videoRefs.current[index] = el)} // Gán ref cho video
                                    muted
                                >
                                    <source src={video.video_files[2].link} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ thẻ video.
                                </video>
                            </div>
                        ))}

                        <div className={cx('scroll-div')}>
                            <button className={cx('scrollButton', 'up')} onClick={scrollUp}>
                                <i className={cx(Icons.arrow_up)}></i>
                            </button>
                            <button className={cx('scrollButton', 'down')} onClick={scrollDown}>
                                <i className={cx(Icons.arrow_down)}></i>
                            </button>
                        </div>
                        <span className={cx('split-horizon')}></span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Live;
