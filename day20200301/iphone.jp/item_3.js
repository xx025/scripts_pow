// ==UserScript==
// @name         item3
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


// https://www.apple.com/jp/shop/bag

window.onload = (function () {

    let this_url = location.href
    if (this_url === 'https://www.apple.com/jp/shop/bag') {
        //此脚本为支付页面点击操作
        setTimeout(function () {

            //其他支付操作写进此处

            document.querySelector(".rs-bag-payinfull .rs-bag-checkoutbutton button").click()
        }, 300)

        //如不需点击请注释掉setTimeout方法体
    }

})();
