import React, { useState, useEffect } from 'react';
import axios from "axios";

import Video from "~/component/Video";

import classNames from "classnames/bind";
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
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
              per_page: 20, // Example param to limit results
            },
          });
          console.log(response.data);
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
                {
                    videos.map(video => (
                        <Video
                          key={video.id}
                          source={video.video_files[0].link}
                          author={video.user}
                          image={videos.image}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
