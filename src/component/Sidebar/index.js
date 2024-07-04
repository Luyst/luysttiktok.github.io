import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

import styles from './Sidebar.module.scss';
import { publicRoutes } from '~/routes';
import Icons from '../Icons';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const location = useLocation();
    const filter = publicRoutes.filter((route) => route.label !== '');

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('item-container')}>
                    {filter.map(({ path, icon, label, activeIcon }, index) => {
                        const isActive = location.pathname === path;
                        const classes = cx(isActive ? activeIcon : icon);
                        const liClasses = cx({ [styles.active]: isActive });
                        return (
                            <li key={index} className={liClasses}>
                                <Link className={cx('sidebar-items')} to={path}>
                                    <i className={classes}></i>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <footer className={cx('sidebar-footer')}>
                    <div className={cx('footer-content')}>
                        <Typography.Title style={{ color: '#fff' }} level={3}>
                            Contact
                        </Typography.Title>
                        <Typography.Link href="https://github.com/Luyst" target="_blank" rel="noopener noreferrer">
                            <i className={cx(Icons.githubLogo)}></i> GitHub
                        </Typography.Link>
                        <Typography.Link
                            href="https://www.facebook.com/profile.php?id=100028388523941"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={cx(Icons.facebookLogo)}></i> Facebook
                        </Typography.Link>
                        <Typography.Link href="mailto:dhuy15072003@gmail.com">
                            <i className={cx(Icons.gmailLogo)}></i> Gmail
                        </Typography.Link>
                        <Typography.Link href="tel:0905067717">
                            <i className={cx(Icons.phone)}></i> Phone
                        </Typography.Link>
                    </div>
                </footer>
            </div>
        </aside>
    );
};

export default Sidebar;
