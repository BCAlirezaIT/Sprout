const writeRecycle = function () {
    let cans = Number(document.getElementById("cans-recycled").value);
    let wood = Number(document.getElementById("wood-recycled").value);
    let batteries = Number(document.getElementById("batteries-recycled").value);
    let paper = Number(document.getElementById("paper-recycled").value);
    let plastic = Number(document.getElementById("plastic-recycled").value);
    let electronics = Number(document.getElementById("electronics-recycled").value);
    let glass = Number(document.getElementById("glass-recycled").value);
    let metal = Number(document.getElementById("metal-recycled").value);
    let other = Number(document.getElementById("other-recycled").value);

    // Logic for Points Earned.
    let pointsEarned = (cans * 1.5) + (wood * 2) + (batteries * 5) + (paper * 1) + (plastic * 3)
        + (electronics * 10) + (glass * 3.5) + (metal * 5.5) + (other);

    console.log(`cans: ${cans}, wood: ${wood}, batteries: ${batteries},
    paper: ${paper}, plastic: ${plastic}, electronics: ${electronics}, glass: ${glass},
    metal: ${metal}, other: ${other}`);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;

            //get the document for current user.
            currentUser.get()
                .then(function () {
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
                        points: pointsEarned,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        console.log($('#modal-content').load('./points_modal.html'));
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'main.html';
        }
    });
}

const recycleButton = document.querySelector('#submit-recycle');

recycleButton.addEventListener('click', function () {
    console.log("Successfully wrote to recycle.");
    writeRecycle();

})

console.log("Recycle.js has been loaded.");
