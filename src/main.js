import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
const config = {
    apiKey: "AIzaSyB3Lh4HdwTxqjhGCbMS7t95Ot7Q-RAoxuo",
    authDomain: "pakle-4ad95.firebaseapp.com",
    projectId: "pakle-4ad95",
    storageBucket: "pakle-4ad95.appspot.com",
    messagingSenderId: "1068350111704",
    appId: "1:1068350111704:web:a8b7be222d4d5800a43cad"
}
const Firebase = initializeApp(config);

createApp(App).use(router).mount('#app')
