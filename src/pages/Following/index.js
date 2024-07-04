import React, { useState, useEffect } from 'react';
import Video from '~/component/Video';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { getAllVideo, getVideosByNameID } from '~/service/service';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const cx = classNames.bind(styles);

function Following() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const followings = JSON.parse(localStorage.getItem('followings')) || [];

                if (followings.length > 0) {
                    const listVideoPromises = followings.map((follow) => getVideosByNameID(follow));
                    const list = await Promise.all(listVideoPromises);
                    const followingVideos = list.flat();
                    setVideos(followingVideos);
                } else {
                    setVideos([]);
                }
            } catch (error) {
                console.error('Error fetching videos', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.length === 0 ? (
                <div>
                    You need to follow someone in friends to watch their video
                    <Link to="/friends">
                        <Button>Click me!!!</Button>
                    </Link>
                </div>
            ) : (
                <div className={cx('video-list')}>
                    {videos.map((video) => (
                        <Video key={video.id} videoInfo={video} id={video.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Following;
