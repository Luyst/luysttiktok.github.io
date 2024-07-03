import React, { useContext, useState } from 'react';
import { storage } from '~/service/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import Icons from '~/component/Icons';
import { UserContext } from '~/context/UserProvider';
import { addDocument } from '~/service/service';

const cx = classNames.bind(styles);

const Upload = () => {
    const user = useContext(UserContext).user;
    const [progress, setProgress] = useState(0);
    const [videoURL, setVideoURL] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setVideoURL(url);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setVideoURL(url);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = () => {
        if (selectedFile) {
            const storageRef = ref(storage, `videos/${user.uid}/${selectedFile.name}`);
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
                    setVideoURL(downloadURL);
                    alert('Upload successful!');

                    addDocument('video', {
                        uid: user.uid,
                        videoURL: downloadURL,
                        description: description,
                        like: 0,
                        comment: 0,
                        saved: 0,
                    });
                },
            );
        }
    };

    const handleCancel = () => {
        setVideoURL('');
        setSelectedFile(null);
        setProgress(0);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-container')}>
                <div
                    className={cx(videoURL === '' ? 'upload-card' : 'video-uploaded-card')}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input id="fileInput" type="file" accept="video/*" onChange={handleFileChange} hidden />
                    <i className={cx(Icons.uploadCloud)}></i>
                    <div className={cx('title')}>
                        <p className={cx('title-1')}>Click to select a file</p>
                        <p className={cx('title-2')}>Or drag and drop your video here</p>
                        <progress value={progress} max="100" />
                    </div>
                </div>
            </div>
            {videoURL && (
                <div className={cx('video-container')}>
                    <div className={cx('content-container')}>
                        <div className={cx('content-input')}>
                            <label htmlFor="textarea-content" className={cx('title-input')}>
                                Description
                            </label>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                className={cx('input-decription')}
                                placeholder="Write more about your video here ..."
                                id="textarea-content"
                                type="text"
                            />
                        </div>
                        <div className={cx('button-container')}>
                            <button className={cx('uploadButton')} onClick={handleUpload}>
                                Upload video
                            </button>
                            <button className={cx('cancelButton')} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className={cx('video-preview')}>
                        <video controls>
                            <source src={videoURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
