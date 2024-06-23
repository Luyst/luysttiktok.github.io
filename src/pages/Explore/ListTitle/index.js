import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
const categories = [
    'Nature',
    'Animals',
    'Cities',
    'People',
    'Sports',
    'Art',
    'Science',
    'Food',
    'Travel',
    'Music',
    'Technology',
    'Fashion',
    'History',
    'Movies',
    'Books',
    'Health',
    'Fitness',
    'Education',
    'Business',
    'Finance',
    'Gaming',
    'Cooking',
    'Photography',
    'Design',
    'Gardening',
    'DIY',
    'Pets',
    'Cars',
    'Architecture',
    'Environment',
];
const ListTitle = ({ onCategoryClick }) => {
    const handleCategoryClick = (category) => {
        onCategoryClick(category);
    };

    return (
        <Carousel indicators={false} interval={null} prevIcon={<span>&#9664;</span>} nextIcon={<span>&#9654;</span>}>
            {[0, 1].map((index) => (
                <Carousel.Item key={index}>
                    <div className="d-flex justify-content-evenly   ">
                        {categories.slice(index * 10, index * 10 + 8).map((category, idx) => (
                            <Button
                                size="lg"
                                variant="secondary"
                                key={index * 5 + idx}
                                className="category-item"
                                onClick={() => handleCategoryClick(category)}
                                style={{
                                    fontSize: '1.6rem',
                                    fontWeight: '700',
                                    padding: '10px 20px',
                                    backgroundColor: '#2f2f2f',
                                    border: 'none',
                                }}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ListTitle;
