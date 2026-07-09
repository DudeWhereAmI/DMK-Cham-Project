const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, limit } = require('firebase/firestore');

const firebaseConfig = {
    // I need to use the admin SDK or I can't read it?
    // Wait, I can just use a node script to call the REST API?
};
