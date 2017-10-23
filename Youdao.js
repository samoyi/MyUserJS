// ==UserScript==
// @name         Youdao
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  增大有道词典弹窗
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        let oWrapper = document.querySelector('#yddWrapper');
        if(oWrapper){
            oWrapper.style.transform = 'scale(1.4) translateY(20%)';
        }
    }, 200);

})();
