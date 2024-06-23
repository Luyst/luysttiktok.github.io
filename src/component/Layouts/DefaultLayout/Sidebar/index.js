import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul>
                    <li>
                        <a href="/">
                            <i className={cx('bx bx-home')}></i>
                            <span>Dành cho bạn</span>
                        </a>
                    </li>
                    <li>
                        <a href="/explore">
                            <i className={cx('bx bx-compass')}></i>
                            <span>Khám phá</span>
                        </a>
                    </li>
                    <li>
                        <a href="/following">
                            <i className="bx bx-user-check"></i>
                            <span>Đang Follow</span>
                        </a>
                    </li>
                    <li>
                        <a href="/friends">
                            <i className="bx bx-group"></i>
                            <span>Bạn bè</span>
                        </a>
                    </li>
                    <li>
                        <a href="/live">
                            <i className="bx bx-video"></i>
                            <span>LIVE</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-user"></i>
                            <span>Hồ sơ</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
