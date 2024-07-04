import classNames from 'classnames/bind';
import styles from './MenuAction.module.scss';
import Icons from '~/component/Icons';

const cx = classNames.bind(styles);

function MenuAction({ image, videoInfo }) {
    return (
        <menu className={cx('menu-action')}>
            <ul>
                <li className={cx('avatar-img')}>
                    <img src={image} alt="ava" />
                    <i className={cx(Icons.add, 'follow')}></i>
                </li>
                <li>
                    <i className={cx(Icons.like)}></i>
                    <p>{videoInfo.like}</p>
                </li>

                <li>
                    <i className={cx(Icons.comment)}></i>
                    <p>{videoInfo.comment}</p>
                </li>
                <li>
                    <i className={cx(Icons.bookmark)}></i>
                    <p>{videoInfo.saved}</p>
                </li>
                <li>
                    <i className={cx(Icons.share)}></i>
                    <p>0</p>
                </li>
            </ul>
        </menu>
    );
}

export default MenuAction;
