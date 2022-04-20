// ==UserScript==
// @name         item4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apple.com/jp/*
// @match        https://www.apple.com/jp/shop/*
// @match        https://*.store.apple.com/jp/shop*
// @icon         https://www.google.com/s2/favicons?domain=apple.com
// @grant        none
// ==/UserScript==

window.onload = (function () {
    let this_url = location.href
    if (this_url.search("store.apple.com/jp/shop/signIn") > -1) {
        //此部分为登录页面，要选择作为客人登录
        setTimeout(function () {
            document.querySelector(".rs-guest-checkout button").click()
        }, 300)

    }
})();
