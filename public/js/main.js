'use strict';

/*
    Modal Variable Set-Up
*/
let modalButton;
let pointsEarned;

/*
    Function to fetch HTML
*/
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

async function loadModalWithHTML(url) {
    const contentDiv = document.querySelector('.modal');
    contentDiv.innerHTML = await fetchHtmlAsText(url);
}

/*
    Slidemenu
*/
(function () {
    var $body = document.body
        , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
    const $footer = document.getElementById("footer");

    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
            $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
            $footer.classList.toggle('invisible');
        });
    }

}).call(this);

/*
    Modal Management 
*/

const modal = document.querySelector('#modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenRecycling = document.querySelector('#recycle-function');
const btnOpenTransportation = document.querySelector('#transportation-function');

const openModal = function () {
    modal.classList.remove('invisible');
    overlay.classList.remove('invisible');
}

const closeModal = function () {
    modal.classList.add('invisible');
    overlay.classList.add('invisible');
}

/*
    Opening Recycling Modal
*/
btnOpenRecycling.addEventListener('click', function () {
    console.log($('#modal-content').load('./recycle_modal.html'));
    openModal();
});


/*
    Opening Transportation Modal
*/
btnOpenTransportation.addEventListener('click', function () {
    console.log($('#modal-content').load('./transportation_modal.html'));
    openModal();
});


/*
    Closing Modals
*/
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('invisible')) {
        closeModal();
    };
});

/**
 * Carousel Management
 */

// Total Points Earned Carousel
const totalPointsEarned = document.querySelector('#carousel-activity-text');
const userID = localStorage.getItem("SproutID");
const userRecycling = db.collection('users').doc(userID).collection('recycling');
const userObserver = userRecycling.onSnapshot(recycleData => {
    let userPoints = 0;
    recycleData.forEach(doc => {
        userPoints += doc.data().points;
    });
    totalPointsEarned.textContent = userPoints;
})

const userName = db.collection("users").doc(userID); // will to to the firestore and go to the document of the user

userName.get().then(userDoc => {
    //get the user name
    var userName = userDoc.data().name;
    console.log(userName);
    //$("#name-goes-here").text(userName); //jquery
    document.getElementById("welcome-user").innerText=userName;

})
