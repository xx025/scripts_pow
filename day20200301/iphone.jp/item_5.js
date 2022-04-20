// ==UserScript==
// @name         item5
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

// 此脚本运行在
// https://www.apple.com/jp/shop/buy-iphone/iphone-13-pro
// https://www.apple.com/jp/shop/buy-iphone/iphone-13-pro?product=MLUK3J/A&purchaseOption=fullPrice&step=attach
// https://www.apple.com/jp/shop/bag
// https://*.store.apple.com/jp/shop/signIn?ssi=*
// https://*.store.apple.com/jp/shop/checkout?_s=Fulfillment-init
// https://*.store.apple.com/jp/shop/checkout?_s=PickupContact-init



window.onload = (function () {


    let this_url = location.href
    if (this_url.search("store.apple.com/jp/shop/checkout") > -1 && this_url.search('Fulfillment-init') > -1) {
        // 此部分为接受方式
        // 选择自己接受，填写邮政编码100-0005
        setTimeout(function () {
            document.querySelectorAll(".as-buttongroup input")[1].click();
            //点击自己接收
        }, 400)
        setTimeout(function () {
            //此部分存在一个输入框捕获的小问题
            let this_input = document.querySelector(".rs-store-locator-search input")
            this_input.value = '100-0005'
            this_input.setAttribute('value', '100-0005')
            //填写邮政编码
        }, 800)
        setTimeout(function () {
            document.querySelector(".rs-store-locator-search button").click()
            //点击应用
        }, 1200)
        setTimeout(function () {
            document.querySelector(".rt-storelocator-store-showmore").click()
            //展开实体店
            //建议适度增加时延
        }, 2000)
        setTimeout(function () {
            this_url = location.href;
            //重新读取一遍url， 存在渲染自动跳转url问题
            console.log(this_url)

            let stiore_list = document.querySelectorAll(".rt-storelocator-store-group .form-selector")
            // let AddressList = ['丸の内', '銀座', ' 新宿', '表参道', '渋谷', '川崎', 'ファミリーマート東京海上日動ビル店']
            let AddressList = ['丸の内', '銀座', ' 新宿', '表参道', '渋谷', '川崎']
            //选择收获地址
            for (const stioreListElement of stiore_list) {
                let this_text = stioreListElement.querySelector(".form-selector-title").textContent
                let this_selectable = false;
                for (const string of AddressList) {
                    if (this_text.search(string) > -1) {
                        this_selectable = true;
                        break;
                    }
                }
                if (this_selectable) {
                    stioreListElement.querySelector("input").click()
                    break;
                }
            }
            //选择实体店
        }, 1700)
        setTimeout(function () {
            document.querySelector("#rs-checkout-continue-button-bottom").click()
            //展开实体店
        }, 2000)
    }

})();
