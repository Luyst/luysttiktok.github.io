import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Video from '~/component/Video';

import classNames from 'classnames/bind';
import styles from './Following.module.scss';

const cx = classNames.bind(styles);

function Following() {
    const [videos, setVideos] = useState([]);
    const apiKey = 'IOduAJDREt7mMPT0xfjHQCeGaMWhHS5rYmTrsghYiIVT9H8zKCq0rNRg';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://api.pexels.com/videos/popular', {
                    headers: {
                        Authorization: apiKey,
                    },
                    params: {
                        min_duration: '30s',
                        min_witdh: '360px',
                        min_height: '600px',
                        page: '3',
                        per_page: 10, // Example param to limit results
                    },
                });
                setVideos(response.data.videos);
            } catch (error) {
                console.error('Error fetching videos from Pexels', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-list')}>
                {videos.map((video) => (
                    <Video
                        key={video.id}
                        source={video.video_files[2].link}
                        author={video.user}
                        image={video.image}
                        id={video.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Following;
