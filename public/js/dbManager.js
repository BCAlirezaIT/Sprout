function addScript(src) {
    sc0 = document.createElement("script");
    sc0.src = src;
    sc0.defer = true;
    document.head.appendChild(sc0);
}

// addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
// addScript("https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js");
// addScript("https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js");
// addScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js");
// addScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js");
// addScript("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js");


var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();