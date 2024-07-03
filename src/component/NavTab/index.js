import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './NavTab.module.scss';

const cx = classNames.bind(styles);

function NavTab({ Tabs }) {
    const [tabStyle, setTabStyle] = useState({ tabPosition: '8px', tabWidth: '46px' });

    const [activeTab, setActiveTab] = useState('v1'); // State lưu trữ tab đang được chọn

    const hoverNav = (id) => {
        switch (id) {
            case 'v1':
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' });
                break;
            case 'Video':
                setTabStyle({ tabPosition: '142px', tabWidth: '42px' });
                break;
            case 'Collections':
                setTabStyle({ tabPosition: '272px', tabWidth: '74px' });
                break;
            default:
        }
    };

    const leaveNav = () => {
        switch (activeTab) {
            case 'v1':
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' });
                break;
            case 'Videos':
                setTabStyle({ tabPosition: '142px', tabWidth: '42px' });
                break;
            case 'Collections':
                setTabStyle({ tabPosition: '272px', tabWidth: '74px' });
                break;
            default:
        }
    };
    const clickNav = (id) => {
        setActiveTab(id);
    };
    console.log(activeTab);
    const runTabStyle = {
        left: tabStyle.tabPosition,
        width: tabStyle.tabWidth,
    };
    return (
        <div className={cx('nav-tab')}>
            <ul>
                {Tabs.map((tab, index) => (
                    <li onMouseEnter={() => hoverNav(tab)} onMouseLeave={leaveNav} onClick={() => clickNav(tab)}>
                        <div>{tab === 'v1' ? 'Photo' : tab}</div>
                    </li>
                ))}
            </ul>
            <div className={cx('borderRun')} style={runTabStyle}></div>
        </div>
    );
}

export default NavTab;
