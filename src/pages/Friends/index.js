import React, { useState, useEffect, useContext } from 'react';
import { addDocument, delFollow, getUserList } from '~/service/service';
import classNames from 'classnames/bind';
import styles from './Friends.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '~/context/UserProvider';

const cx = classNames.bind(styles);

function Friends() {
    const currentUser = useContext(UserContext);
    const [followList, setFollowList] = useState(currentUser.following);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        const fetchUserList = async () => {
            const users = await getUserList();
            setUserList(users);
        };
        fetchUserList();
    }, [currentUser]);

    const handleFollow = async (e) => {
        const userFollowing = e.target.name;
        if (currentUser.user === null) {
            alert('You must sign in first 💚');
        } else {
            try {
                await addDocument('follow', {
                    userFollower: currentUser.user.nameID,
                    userFollowings: userFollowing,
                });
                let storeUser = JSON.parse(localStorage.getItem('followings'));
                storeUser.push(userFollowing);
                localStorage.setItem('followings', JSON.stringify(storeUser));
                setFollowList([...followList, userFollowing]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUnFollow = async (e) => {
        const userUnFollow = e.target.name;
        try {
            await delFollow(currentUser.user.nameID, userUnFollow);
            setFollowList(followList.filter((user) => user !== userUnFollow));
            let storeUser = JSON.parse(localStorage.getItem('followings'));
            storeUser = storeUser.filter((user) => user !== userUnFollow);
            localStorage.setItem('followings', JSON.stringify(storeUser));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className={cx('wrapper')}>
            <Row lg={3} md={3} xs={1} className={cx('content-container')}>
                {userList.map((user) => (
                    <Col key={user.id} className={cx('user-card')}>
                        <Link to={'/user/' + user.nameID} className={cx('user-card')}>
                            <img className={cx('avatar-items')} src={user.photoURL} alt="avatar" />
                            <div className={cx('infor-container')}>
                                <div className={cx('displayName-item')}>{user.displayName}</div>
                                <div className={cx('nickname-item')}>{user.nameID}</div>
                            </div>
                        </Link>
                        {followList && followList.includes(user.nameID) ? (
                            <button onClick={handleUnFollow} name={user.nameID} className={cx('following-button')}>
                                Following
                            </button>
                        ) : (
                            <button onClick={handleFollow} name={user.nameID} className={cx('follow-button')}>
                                Follow
                            </button>
                        )}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Friends;
