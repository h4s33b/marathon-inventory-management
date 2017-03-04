import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBQ3F5JFqSMHu-ej9ht1hkAV8p1e3QtLRY",
    authDomain: "marathon-inventorymanagement.firebaseapp.com",
    databaseURL: "https://marathon-inventorymanagement.firebaseio.com",
    storageBucket: "marathon-inventorymanagement.appspot.com",
    messagingSenderId: "129306866670"
};

firebase.initializeApp(config);
export const database = firebase.database();

export const storage = firebase.storage();

export const fbAuth = firebase.auth();
 