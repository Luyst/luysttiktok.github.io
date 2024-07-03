import React from 'react';
import className from 'classnames/bind';

import styles from './BackgroundBlur.module.scss';

const cx = className.bind(styles);

const BackgroundBlur = ({ img }) => {
    const backgroundImageStyle = {
        backgroundImage: `url(${img})`,
    };

    return <div className={cx('video-background')} style={backgroundImageStyle}></div>;
};

export default BackgroundBlur;
