import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import { publicRoutes } from '~/routes';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const location = useLocation();
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul>
                    {publicRoutes.map(({ path, icon, label, activeIcon }, index) => {
                        const isActive = location.pathname === path;
                        const classes = cx(isActive ? activeIcon : icon);
                        const liClasses = cx({ [styles.active]: isActive });
                        return (
                            <li key={index} className={liClasses}>
                                <a className={cx('sidebar-items')} href={path}>
                                    <i className={classes}></i>
                                    <span>{label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
