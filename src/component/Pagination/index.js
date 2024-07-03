import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className={cx('pagination')}>
                <li className={cx('page-item', { disabled: currentPage === 1 })}>
                    <button className={cx('page-link')} onClick={() => onPageChange(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>
                {pages.map((page) => (
                    <li key={page} className={cx('page-item', { active: page === currentPage })}>
                        <button className={cx('page-link')} onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className={cx('page-item', { disabled: currentPage === totalPages })}>
                    <button className={cx('page-link')} onClick={() => onPageChange(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
