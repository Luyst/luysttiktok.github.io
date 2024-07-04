import classNames from 'classnames/bind';

import styles from './FooterVideo.module.scss';
import Icons from '~/component/Icons';

const cx = classNames.bind(styles);

const FooterVideo = ({
    isPlaying,
    handlePlayPause,
    handleTimelineChange,
    handleVolumeChange,
    volume,
    author,
    description,
}) => {
    return (
        <footer className={cx('video-footer')}>
            <div className={cx('video-decription')}>
                <span>{author.nameID}</span>
                <p>{description}</p>
                <div className={cx('music-container')}>
                    <i className={cx(Icons.music)}></i>
                    <span>Music here!</span>
                </div>
            </div>
            <div className={cx('control-media')}>
                <button onClick={handlePlayPause} className={cx('play-button')}>
                    <i className={cx('bx', isPlaying ? 'bx-pause' : 'bx-play')}></i>
                </button>
                <input
                    id="timebar"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className={cx('timeline')}
                    onChange={handleTimelineChange}
                />
                <div className={cx('volume')}>
                    <input
                        className={cx('volume-input')}
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <i className={cx('bx bx-volume-full')}></i>
                </div>
            </div>
        </footer>
    );
};

export default FooterVideo;
