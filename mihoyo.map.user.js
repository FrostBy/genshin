// ==UserScript==
// @name         Genshin Map Auto
// @namespace    http://mihoyo.com/
// @version      0.2
// @description  Toggle Markers without with single right click!
// @author       Vladislav Romanovsky
// @match        https://webstatic-sea.hoyolab.com/ys/app/interactive-map/index.html*
// @icon         https://webstatic-sea.hoyolab.com/ys/app/interactive-map/mapicon.png
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

    const interval = setInterval(() => {
        if ($('.mhy-game-gis')[0]?.__vue__?.map) {
            clearInterval(interval);
            $('.mhy-game-gis')[0].__vue__.map.on('mousedown', function (event) {
                console.log(event);
                if (event?.originalEvent?.which === 3) {
                    event.type = 'click';
                    event.target._events.click[0].fn.apply(event.target.ciLayer, [event]);
                    $('.map-popup__switch').triggerRawMouse();
                    $('.leaflet-popup-close-button').triggerRawMouse();
                }
            });
        }
    }, 1000);
})();