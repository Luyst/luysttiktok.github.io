import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import Icons from '~/component/Icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '~/service/firebase';
import { updateDocument } from '~/service/service';

const cx = classNames.bind(styles);

const EditProfileModal = ({ user, show, handleClose }) => {
    const [progress, setProgress] = useState(0);
    const [avatarURL, setAvatarURL] = useState(user.photoURL || 'default-avatar.png');
    const [selectedFile, setSelectedFile] = useState(null);
    const [editForm, setEditForm] = useState({ displayName: user.displayName, bio: user.bio });

    if (!show) return null;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setAvatarURL(url);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };
    console.log(editForm);

    const handleChangeProfile = async () => {
        if (selectedFile) {
            const storageRef = ref(storage, `image/${user.uid}/${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error('Upload error:', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateDocument('user', user.uid, {
                        photoURL: downloadURL,
                        displayName: editForm.displayName,
                        bio: editForm.bio,
                    });
                    const storeUser = JSON.parse(localStorage.getItem('user'));

                    storeUser.photoURL = downloadURL;
                    storeUser.displayName = editForm.displayName;
                    storeUser.bio = editForm.bio;

                    localStorage.setItem('user', JSON.stringify(storeUser));
                    alert('Update successful!');
                    window.location.reload();
                },
            );
        } else {
            await updateDocument('user', user.uid, {
                uid: user.uid,
                displayName: editForm.displayName,
                bio: editForm.bio,
            });

            const storeUser = JSON.parse(localStorage.getItem('user'));
            storeUser.displayName = editForm.displayName;
            storeUser.bio = editForm.bio;

            localStorage.setItem('user', JSON.stringify(storeUser));

            alert('Update successful!');
            window.location.reload();
        }
    };

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal-header')}>
                    <h1>Edit profile</h1>
                    <button onClick={handleClose} className={cx('close-button')}>
                        <i className={Icons.close}></i>
                    </button>
                </div>
                <div className={cx('modal-body')}>
                    <form className={cx('form-container')}>
                        <div className={cx('form-group', 'photo-section')}>
                            <label className={cx('form-label')}>Profile photo</label>
                            <div className={cx('photo-container')}>
                                <div
                                    className={cx('edit-photo')}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    <img src={avatarURL ? avatarURL : user.photoURL} alt="Profile" />
                                    <i className={Icons.edit}></i>
                                    <input
                                        id="fileInput"
                                        onChange={handleAvatarChange}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Username</label>
                            <div className={cx('form-static-text')}>{user.nameID}</div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="formDisplayName">
                                Name
                            </label>
                            <input
                                id="formDisplayName"
                                type="text"
                                name="displayName"
                                value={editForm.displayName}
                                onChange={handleInputChange}
                                className={cx('form-control')}
                                autoFocus
                            />
                        </div>
                        <div className={cx('form-group', 'bio')}>
                            <label className={cx('form-label')} htmlFor="formDescription">
                                Bio
                            </label>
                            <textarea
                                id="formDescription"
                                name="bio"
                                placeholder="Bio"
                                value={editForm.bio}
                                onChange={handleInputChange}
                                className={cx('form-control')}
                            />
                        </div>
                    </form>
                </div>
                <div className={cx('modal-footer')}>
                    <div className={cx('button-container')}>
                        <button onClick={handleClose} className={cx('btn', 'btn-secondary')}>
                            Cancel
                        </button>
                        <button onClick={handleChangeProfile} className={cx('btn', 'btn-primary')}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
