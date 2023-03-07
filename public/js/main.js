'use strict';

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
    console.log(event.key);

    if (event.key === 'Escape' && !modal.classList.contains('invisible')) {
        closeModal();
    };
})