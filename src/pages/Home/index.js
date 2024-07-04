import React, { useState, useEffect } from 'react';

import Video from '~/component/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { getAllVideo } from '~/service/service';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const allVideos = await getAllVideo();
                setVideos(allVideos);
            } catch (error) {
                console.error('Error fetching videos', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-list')}>
                {videos.map((video) => (
                    <Video key={video.id} videoInfo={video} id={video.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
