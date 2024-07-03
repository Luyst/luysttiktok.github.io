import { db } from './firebase';
import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    serverTimestamp,
    where,
    getDocs,
    query,
} from 'firebase/firestore';

export const addDocument = async (collectionName, data) => {
    const collectionRef = collection(db, collectionName);

    try {
        await addDoc(collectionRef, {
            ...data,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const updateDocument = async (collectionName, dataId, data) => {
    try {
        const users = await queryForDocuments(collectionName, {
            fieldName: 'uid',
            operator: '==',
            compareValue: dataId,
        });

        if (users.length === 0) {
            throw new Error(`No document found with uid: ${dataId}`);
        }

        const user = users[0];
        const documentRef = doc(db, collectionName, user.id);

        await updateDoc(documentRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating document: ', error);
    }
};
export const getUserList = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        const userList = [];
        querySnapshot.forEach((doc) => {
            userList.push({ id: doc.id, ...doc.data() });
        });
        return userList;
    } catch (error) {
        console.error('Error fetching user: ', error);
        return [];
    }
};
export const getUserByNameID = async (nameID) => {
    try {
        const users = await queryForDocuments('user', {
            fieldName: 'nameID',
            operator: '==',
            compareValue: nameID,
        });
        return users[0];
    } catch (error) {
        console.error('Error getUserByNameID: ', error);
        return [];
    }
};

//how to use
// const condition = {
//     fieldName: 'displayName',
//     operator: '==',
//     compareValue: 'Đức Huy',
// };
// const showData = () => {
//     queryForDocument('user', condition);
// };
export const queryForDocuments = async (collectionName, condition) => {
    try {
        const q = query(
            collection(db, collectionName),
            where(condition.fieldName, condition.operator, condition.compareValue),
        );
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error('Error fetching documents: ', error);
        return [];
    }
};
export const getVideosByUID = async (uid) => {
    const condition = { fieldName: 'uid', operator: '==', compareValue: uid };
    const videos = await queryForDocuments('video', condition);
    return videos;
};

export const getFollowing = async (nameID) => {
    const condition = { fieldName: 'userFollower', operator: '==', compareValue: nameID };
    const followings = await queryForDocuments('follow', condition);

    return followings;
};
export const delFollow = async (userFollower, userFollowing) => {
    try {
        const conditions = [
            { fieldName: 'userFollower', operator: '==', compareValue: userFollower },
            { fieldName: 'userFollowings', operator: '==', compareValue: userFollowing },
        ];
        const q = query(
            collection(db, 'follow'),
            where('userFollower', '==', userFollower),
            where('userFollowings', '==', userFollowing),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
            console.log('Following record deleted successfully');
            return true;
        } else {
            console.log('No matching following records found');
            return false;
        }
    } catch (error) {
        console.error('Error deleting documents:', error.message);
        return false;
    }
};
