
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAkBeSmn_RFCSsrxbTjDjH6J_o-u7hcHFk",
            authDomain: "barking-sanctury.firebaseapp.com",
            databaseURL: "https://barking-sanctury-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "barking-sanctury",
            storageBucket: "barking-sanctury.appspot.com",
            messagingSenderId: "647662317869",
            appId: "1:647662317869:web:889d479077a637935063a4"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

        function writeUserData(userId, name, email, imageUrl) {
        const db = getDatabase();
        set(ref(db, "The/" + "Hi"), {
            Name: "Hey"
        });
        }