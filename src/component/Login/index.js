import React, { useContext, useState } from 'react';
import { auth } from '~/service/firebase';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import styles from './Login.module.scss';
import { UserContext } from '~/context/UserProvider';
import classNames from 'classnames/bind';
import { Typography } from 'antd';
import Icons from '../Icons';
import NewUserModal from './NewUserModal';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Login = () => {
    const user = useContext(UserContext);
    const [isNewUser, setIsNewUser] = useState(false);
    const [newUser, setNewUser] = useState();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(result);
            const { displayName, email, photoURL, uid } = result.user;

            if (additionalUserInfo.isNewUser) {
                setNewUser({ displayName, email, photoURL, uid });
                setIsNewUser(true);
                return;
            }
            window.location.pathname = `/luysttiktok.github.io/user`;
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };
    if (user.user !== null) {
        alert('You have already signed in');
        window.location.pathname = `/luysttiktok.github.io/`;
    }
    const handleEmailLogin = async () => {
        alert('This method is not currently usable, please use a Google account ❤');
    };

    const handleFacebookLogin = async () => {
        alert('This method is not currently usable, please use a Google account ❤');
    };

    const handlePhoneNumberLogin = async () => {
        alert('This method is not currently usable, please use a Google account ❤');
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header-container')}>
                <Link to="/" className={cx('left-container')}>
                    <i className={cx(Icons.logo)}></i>
                    <h3>LikTok</h3>
                </Link>
                <Typography.Title level={3} className={cx('title')}>
                    Made by Duc Huy
                </Typography.Title>
            </header>
            {isNewUser ? (
                <NewUserModal newUser={newUser} />
            ) : (
                <div className={cx('login-container')}>
                    <Typography.Title level={2} className={cx('title')}>
                        Welcome to login !!
                    </Typography.Title>
                    <button className={cx('button-login')} onClick={handleGoogleLogin}>
                        <i className={cx(Icons.googleLogo)}></i>
                        Login with Google
                    </button>
                    <button className={cx('button-login')} onClick={handleEmailLogin}>
                        <i className={cx(Icons.gmailLogo)}></i>
                        Login with Email
                    </button>
                    <button className={cx('button-login')} onClick={handleFacebookLogin}>
                        <i className={cx(Icons.facebookLogo)}></i>
                        Login with Facebook
                    </button>
                    <button className={cx('button-login')} onClick={handlePhoneNumberLogin}>
                        <i className={cx(Icons.phone)}></i>
                        Login with Phone Number
                    </button>
                </div>
            )}
            <footer className={cx('footer-container')}>
                <div className={cx('footer-content')}>
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
    );
};

export default Login;
