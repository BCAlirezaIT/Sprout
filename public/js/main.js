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