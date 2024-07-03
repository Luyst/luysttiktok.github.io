import React, { useState } from 'react';

import ListTitle from '../../component/ListTitle';
import VideoContent from '../Search/VideoContent';

import classNames from 'classnames/bind';
import styles from './Explore.module.scss';
import usePexel from '~/hooks/usePexel';
const cx = classNames.bind(styles);

// Hàm debounce để ngăn chặn sự kiện xảy ra quá nhanh

function Explore() {
    const [category, setCategory] = useState('Sports'); // State lưu trữ danh mục hiện tại

    const { items, loading } = usePexel('videos', 'search', category);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div>Loading....</div>
            ) : (
                <>
                    <ListTitle onCategoryClick={handleCategoryClick} nowCategory={category} />
                    <VideoContent videos={items} />
                </>
            )}
        </div>
    );
}

export default Explore;
