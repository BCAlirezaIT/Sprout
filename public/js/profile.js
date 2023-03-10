var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    var userSignature = userDoc.data().signature;
                    var userGroup = userDoc.data().group;
                    var userCountry = userDoc.data().country;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSignature != null) {
                        document.getElementById("nameInput").value = userSignature;
                    }
                    if (userGroup != null) {
                        document.getElementById("groupInput").value = userGroup;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}
 
populateUserInfo();

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userSignature = document.getElementById('signatureInput').value;
    userGroup = document.getElementById('groupInput').value;
    userCountry = document.getElementById('countryInput').value;
    currentUser.update({
        name: userName,
        signature: userSignature,
        group: userGroup,
        country: userCountry
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}