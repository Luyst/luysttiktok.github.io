import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewUserModal.module.scss';
import { addDocument } from '~/service/service';

const cx = classNames.bind(styles);

const NewUserModal = ({ newUser }) => {
    const [newMember, setNewMember] = useState(newUser);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };
    const handleSave = async () => {
        try {
            await addDocument('user', {
                ...newMember,
                liked: 0,
                follower: 0,
                following: 0,
            });
            alert('Sign in success!');
            window.location.pathname = '/user';
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={cx('modal-content')}>
            <div className={cx('modal-header')}>
                <h1>Create your LuystID</h1>
            </div>
            <div className={cx('modal-body')}>
                <form className={cx('form-container')}>
                    <input
                        className={cx('form-control')}
                        type="text"
                        name="nameID"
                        id="nameID"
                        onChange={handleInputChange}
                        placeholder="This ID can be change in future"
                    />
                </form>
            </div>
            <div className={cx('modal-footer')}>
                <div className={cx('button-container')}>
                    <button className={cx('btn', 'btn-secondary')}>Cancel</button>
                    <button onClick={handleSave} className={cx('btn', 'btn-primary')}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewUserModal;
