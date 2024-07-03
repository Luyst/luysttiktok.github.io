import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/service/firebase';
import { getFollowing, queryForDocuments } from '~/service/service';

export const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [following, setFollowing] = useState(() => {
        const storeFollowing = localStorage.getItem('followings');
        return storeFollowing ? JSON.parse(storeFollowing) : null;
    });

    useEffect(() => {
        const fetchUserData = async (uid) => {
            const condition = {
                fieldName: 'uid',
                operator: '==',
                compareValue: uid,
            };
            const users = await queryForDocuments('user', condition);
            if (users.length > 0) {
                const fetchedUser = users[0];
                setUser(fetchedUser);
                localStorage.setItem('user', JSON.stringify(fetchedUser));
            } else {
                setUser(null);
            }
        };

        const fetchFollowing = async (nameID) => {
            const follows = await getFollowing(nameID);
            let followingList = [];
            if (follows.length > 0) {
                follows.forEach((following) => {
                    followingList.push(following.userFollowings);
                });
                localStorage.setItem('followings', JSON.stringify(followingList));
                setFollowing(followingList);
            } else {
                setFollowing(null);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                if (!user || user.uid !== firebaseUser.uid) {
                    fetchUserData(firebaseUser.uid);
                }
                fetchFollowing(user.nameID);
            } else {
                setUser(null);
                setFollowing(null);
                localStorage.removeItem('user');
                localStorage.removeItem('followings');
            }
        });
        return () => unsubscribe();
    }, [user]);

    console.log(user);
    return <UserContext.Provider value={{ user, following }}>{children}</UserContext.Provider>;
}

export default UserProvider;
