const writeRecycle = function () {
    console.log("inside write review")
    let cans = Number(document.getElementById("cans-recycled").value);
    let wood = Number(document.getElementById("wood-recycled").value);
    let batteries = Number(document.getElementById("batteries-recycled").value);
    let paper = Number(document.getElementById("paper-recycled").value);
    let plastic = Number(document.getElementById("plastic-recycled").value);
    let electronics = Number(document.getElementById("electronics-recycled").value);
    let glass = Number(document.getElementById("glass-recycled").value);
    let metal = Number(document.getElementById("metal-recycled").value);
    let other = Number(document.getElementById("other-recycled").value);

    console.log(`cans: ${cans}, wood: ${wood}, batteries: ${batteries},
    paper: ${paper}, plastic: ${plastic}, electronics: ${electronics}, glass: ${glass},
    metal: ${metal}, other: ${other}`);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            // let recycleKey = newPostRef.key();
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("users").doc(user.uid).collection("recycling").add({
                        // GUID: recycleKey,
                        cans: cans,
                        wood: wood,
                        batteries: batteries,
                        paper: paper,
                        plastic: plastic,
                        electronics: electronics,
                        glass: glass,
                        metal: metal,
                        other: other,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        //TODO: Change modal to show total points earned.
                        // window.location.href = "login.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            // window.location.href = 'main.html';
        }
    });
}

const recycleButton = document.querySelector('#submit-recycle');

recycleButton.addEventListener('click', function () {
    console.log("Successfully wrote to recycle.");
    writeRecycle();

})

console.log("Recycle.js has been loaded.");
