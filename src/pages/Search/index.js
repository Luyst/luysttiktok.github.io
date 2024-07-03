import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ImageContent from './ImageContent';
import VideoContent from './VideoContent';
import usePexel from '~/hooks/usePexel';

const cx = classNames.bind(styles);

function Search() {
    const [tabStyle, setTabStyle] = useState({ tabPosition: '8px', tabWidth: '46px' });
    const [typeSearch, setTypeSearch] = useState('v1');

    const searchQuery = useParams().query;

    const { items, loading, activeTab } = usePexel(typeSearch, 'search', searchQuery);

    const hoverNav = (id) => {
        switch (id) {
            case 'v1':
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' });
                break;
            case 'videos':
                setTabStyle({ tabPosition: '142px', tabWidth: '42px' });
                break;
            case 'collections':
                setTabStyle({ tabPosition: '272px', tabWidth: '74px' });
                break;
            default:
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' }); // Default to 'v1' tab style
        }
    };

    const leaveNav = () => {
        switch (activeTab) {
            case 'v1':
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' });
                break;
            case 'videos':
                setTabStyle({ tabPosition: '142px', tabWidth: '42px' });
                break;
            case 'collections':
                setTabStyle({ tabPosition: '272px', tabWidth: '74px' });
                break;
            default:
                setTabStyle({ tabPosition: '8px', tabWidth: '46px' }); // Default to 'v1' tab style
        }
    };

    const clickNav = (id) => {
        setTypeSearch(id);
    };

    const runTabStyle = {
        left: tabStyle.tabPosition,
        width: tabStyle.tabWidth,
    };

    return (
        <div className={cx('wrapper')}>
            {/* Nav-tab */}
            <div className={cx('nav-tab')}>
                <ul>
                    <li onMouseEnter={() => hoverNav('v1')} onMouseLeave={leaveNav} onClick={() => clickNav('v1')}>
                        <div>Image</div>
                    </li>
                    <li
                        onMouseEnter={() => hoverNav('videos')}
                        onMouseLeave={leaveNav}
                        onClick={() => clickNav('videos')}
                    >
                        <div>Video</div>
                    </li>
                    <li
                        onMouseEnter={() => hoverNav('collections')}
                        onMouseLeave={leaveNav}
                        onClick={() => clickNav('collections')}
                    >
                        <div>Collection</div>
                    </li>
                </ul>
                <div className={cx('borderRun')} style={runTabStyle}></div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : items.length === 0 ? (
                <div>No results for "{searchQuery}"</div>
            ) : (
                <>
                    {activeTab === 'v1' && <ImageContent images={items} />}
                    {activeTab === 'videos' && <VideoContent videos={items} />}
                </>
            )}
        </div>
    );
}

export default Search;
