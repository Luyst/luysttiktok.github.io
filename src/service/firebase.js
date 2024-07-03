import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBQ1ZKw7ZPEWlGYmgJVuI14se_nxj78oOA',
    authDomain: 'tiktok-clone-ab8be.firebaseapp.com',
    projectId: 'tiktok-clone-ab8be',
    storageBucket: 'tiktok-clone-ab8be.appspot.com',
    messagingSenderId: '164892559657',
    appId: '1:164892559657:web:99bc7054de65d8a1624f38',
    measurementId: 'G-TKMGKZKGW8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);

export { auth, db, storage };
