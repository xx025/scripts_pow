// ==UserScript==
// @name         apple_buy_at_jp
// @namespace    http://tampermonkey.net/
// @version      0.1.2022年2月14日19点10分
// @description  use at apple
// @author       You
// @match        https://www.apple.com/jp/shop/buy-iphone/iphone-13-pro
// @icon         https://www.google.com/s2/favicons?domain=apple.com
// @grant        none
// ==/UserScript==


window.onload = (function () {

    setInterval(function () {
        let open=document.querySelectorAll(".ac-gn-menuanchor-open")
        if (open.length>0)
        {
            open[0].click()
        }

        let close=document.querySelector("#ac-gn-menuanchor-close")
        if (close)
        {
            close.click()
        }
    }, 5000)

})();
