import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useContext } from 'react';

import Icons from '~/component/Icons';

import { UserContext } from '~/context/UserProvider';
import { auth } from '~/service/firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const user = useContext(UserContext).user;
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [definitions, setDefinitions] = useState([]);

    const menuRef = useRef(null);
    const formRef = useRef(null);

    const menuClassName = menuVisible ? cx('menu-search', 'active') : cx('menu-search');

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const url = `/api/en-us/api/v3/search/suggestions/${searchTerm}`;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setDefinitions(data.data.attributes.suggestions);
                })
                .catch((error) => alert(error));
        } else {
            setDefinitions([]);
        }
    }, [searchTerm]);

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clickForm = () => {
        setMenuVisible(true);
    };

    //Menu drop
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                formRef.current &&
                !formRef.current.contains(event.target) &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formRef, menuRef]);

    const submitClick = (value, event) => {
        if (event) event.preventDefault();
        window.location.pathname = `/luysttiktok.github.io/search/${value}`;
    };
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Đăng xuất thành công.');
        } catch (error) {
            console.error('Lỗi đăng xuất: ', error);
            alert(error.message);
        }
    };

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to="/" className={cx('left-container')}>
                        <i className={cx(Icons.logo)}></i>
                        <h3>LikTok</h3>
                    </Link>
                    <div className={cx('center-container')}>
                        <div className={cx('search-container')}>
                            <form
                                ref={formRef}
                                className={cx('search-form')}
                                onSubmit={(e) => submitClick(searchTerm, e)}
                            >
                                <input
                                    type="text"
                                    name="search-input"
                                    id="search-input"
                                    placeholder="Tìm kiếm"
                                    className={cx('search-input')}
                                    onChange={onInputChange}
                                    onClick={clickForm}
                                />
                                <span className={cx('split')}></span>
                                <button type="submit" className={cx('submit')}>
                                    <i className={cx(Icons.search)}></i>
                                </button>
                            </form>
                        </div>
                        <div ref={menuRef} className={menuClassName}>
                            <ul>
                                {definitions.map((suggestion, index) => (
                                    <li key={index} onClick={() => submitClick(suggestion)}>
                                        <i className={cx(Icons.search)}></i>
                                        <span>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={cx('right-container')}>
                        {user ? (
                            <>
                                <div className={cx('upload', 'item')}>
                                    <Link to="/upload">
                                        <i className="bx bx-upload"></i>
                                        <span>Tải lên</span>
                                    </Link>
                                </div>
                                <div className={cx('message', 'item')}>
                                    <i className={cx('bx bx-paper-plane')}></i>
                                </div>
                                <div className={cx('notification ', 'item')}>
                                    <i className={cx('bx bx-bell-minus')}></i>
                                </div>
                                <div className={cx('avatar', 'item')}>
                                    <img className={cx('img')} src={user.photoURL} alt="" />
                                    <div className={cx('dropmenu')}>
                                        <ul>
                                            <li>
                                                {' '}
                                                <Link to="/user"> My profile</Link>
                                            </li>

                                            <li onClick={handleSignOut}>Sign out</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link className={cx('login-button')} to="/login">
                                Đăng Nhập
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <div role="dialog" className={cx('motalContainer')}>
                <div className={cx('login-container')}></div>
            </div>
        </>
    );
}

export default Header;
