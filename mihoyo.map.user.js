// ==UserScript==
// @name         Genshin Map Auto
// @namespace    http://mihoyo.com/
// @version      0.1
// @description  Toggle Markers without with single right click!
// @author       Vladislav Romanovsky
// @match        https://webstatic-sea.mihoyo.com/app/ys-map-sea/*
// @icon         https://www.google.com/s2/favicons?domain=webstatic-sea.mihoyo.com/app/ys-map-sea
// @updateURL    https://github.com/FrostBy/genshin/raw/master/mihoyo.map.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    $.fn.triggerRawMouse = function (event = 'click') {
        const clickEvent = new MouseEvent(event, {
            view: unsafeWindow,
            bubbles: true,
            cancelable: true
        });

        return this.each(function () { this.dispatchEvent(clickEvent); });
    };

    $(document).on('mousedown', '.mhy-game-gis-marker', function (event) {
        if (event.which === 3) {
            $(event.target).triggerRawMouse();
            $('.map-popup__switch').triggerRawMouse();
            $('.leaflet-popup-close-button').triggerRawMouse();
        }
    });
})();