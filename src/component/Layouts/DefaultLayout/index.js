import Header from '~/component/Header';
import Sidebar from '~/component/Sidebar';
import classNames from 'classnames/bind';
import style from './Default.module.scss';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <main className={cx('content')}>{children}</main>
            </div>
        </div>
    );
}

export default DefaultLayout;
