import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/index.css"
import firebase from "firebase/app";

require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDlXv4JJs5heXKy5cnUNhLNFQikkuX9-F0",
    authDomain: "realtime-chat-d9f69.firebaseapp.com",
    projectId: "realtime-chat-d9f69",
    storageBucket: "realtime-chat-d9f69.appspot.com",
    messagingSenderId: "876550432231",
    appId: "1:876550432231:web:0904564a6285728c430942",
    measurementId: "G-VENBV1TQV6"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
window.db = db;

createApp(App).use(store).use(router).mount('#app')
