import React, { useRef } from 'react';
import styles from './ListTitle.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const categories = [
    'Sports',
    'Art',
    'Travel',
    'Music',
    'Fashion',
    'Movies',
    'Books',
    'Health',
    'Fitness',
    'Education',
    'Business',
    'Finance',
    'Cooking',
    'Gardening',
    'Photography',
    'Writing',
    'Dancing',
    'Volunteering',
    'Crafting',
    'Gaming',
    'Hiking',
    'Camping',
    'Fishing',
    'Shopping',
    'Yoga',
    'Meditation',
    'Theater',
];

const ListTitle = ({ onCategoryClick, nowCategory }) => {
    const scrollContainerRef = useRef(null);

    const handleCategoryClick = (category) => {
        onCategoryClick(category);
    };
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('scrollButton', 'right')} onClick={scrollLeft}>
                &lt;
            </button>
            <div className={cx('scrollContainer')} ref={scrollContainerRef}>
                <div className={cx('categoryRow')}>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={cx(category === nowCategory ? 'nowCategoryItem' : 'categoryItem')}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <button className={cx('scrollButton', 'left')} onClick={scrollRight}>
                &gt;
            </button>
        </div>
    );
};

export default ListTitle;
