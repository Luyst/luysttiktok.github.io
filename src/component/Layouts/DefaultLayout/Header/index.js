import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-container')}>
                    <i className={cx('bx', 'bxl-tiktok')}></i>
                    <h3>TikTok</h3>
                </div>
                <div className={cx('center-container')}>
                    <form className={cx('search-form')} action="">
                        <input
                            type="text"
                            name="search-input"
                            id="search-input"
                            placeholder="Tìm kiếm"
                            className={cx('search-input')}
                        />
                        <span className={cx('split')}></span>
                        <button type="submit" className={cx('submit')}>
                            <i className={cx('bx', 'bx-search')}></i>
                        </button>
                    </form>
                </div>
                <div className={cx('right-container')}>
                    <div className={cx('upload', 'item')}>
                        <Button to="./">
                            <i className="bx bx-upload"></i>
                            <span>Tải lên</span>
                        </Button>
                    </div>
                    <div className={cx('message', 'item')}>
                        <i className={cx('bx bx-paper-plane')}></i>
                    </div>
                    <div className={cx('notification ', 'item')}>
                        <i className={cx('bx bx-bell-minus')}></i>
                    </div>
                    <div className={cx('avatar', 'item')}>
                        <div className={cx('img')}></div>
                        <div className={cx('dropmenu')}>
                            <ul>
                                <li>Xem hồ sơ</li>
                                <li>Yêu thích</li>
                                <li>Cài đặt</li>
                                <li>Tiếng Việt</li>
                                <li>Phản hồi và trợ giúp</li>
                                <li>Đăng suất</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
