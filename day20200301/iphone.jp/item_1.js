// ==UserScript==
// @name         item_1
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
window.onload = (function () {

    let my_css = document.createElement("style");
    my_css.innerHTML = '#topBtn{\n' +
        'position: fixed;\n' +
        'bottom: 50px;\n' +
        'right: 50px;\n' +
        'width: 60px;\n' +
        'height: 60px;\n' +
        'line-height: 60px;\n' +
        'text-align: center;\n' +
        'color: #FFF;\n' +
        'z-index: 999;\n' +
        'background: #FF5722;\n' +
        'cursor: pointer;\n' +
        'border-radius: 30px;\n' +
        'box-shadow:0px 0px 20px #000;'

    document.head.append(my_css)


    let this_url = location.href
    if (this_url.search('www.apple.com/jp/shop/buy-iphone/iphone-13-pro') > -1 && this_url.search('product=') === -1) {


        //选择机型
        //====================================================================
        let you_choice = [1, 1, 1]
        //三个参数分别代表
        //如果是[-1,1,1] 表示所有都不自动选择
        //如果是[1,-1,1] 表示后两项不自动选择
        //如果是[1,1,-1] 表示最后一项不自动选择

        // 机型基础：1，2（选第几个机型，por\promax ，输入对应数字）
        //颜色：1，2，3，4（选第几个颜色，输入对应数字）
        //存储容量：1，2，3，4（选第几个，输入对应数字）


        let trade_in = 0;//0不选择以旧换新
        //====================================================================
        let iphone_items_selection = document.querySelectorAll(".rf-flagship-productselection-section")
        setTimeout(function () {
            let item_1_base = iphone_items_selection[0]
            let this_list = item_1_base.querySelectorAll(".form-selector input")
            this_list[you_choice[0] - 1].click()
        }, 200)


        setTimeout(function () {
            let item_2_color = iphone_items_selection[1];//颜色
            let this_color_list = item_2_color.querySelectorAll(".form-selector input");
            this_color_list[you_choice[1] - 1].click()

        }, 400)


        setTimeout(function () {
            let item_3_store = iphone_items_selection[2];//存储
            let this_store_list = item_3_store.querySelectorAll(".form-selector input");
            this_store_list[you_choice[2] - 1].click()
        }, 600)


        setTimeout(function () {
            let fade_tran = document.querySelector(".r-fade-transition-enter-done")
            let fade_tran_list = fade_tran.querySelectorAll(".form-selector input")
            fade_tran_list[trade_in].click()

        }, 800)


        setTimeout(function () {

            function jump_url() {
                document.querySelector(".add-to-cart button").click()
            }

            let my_btn = document.createElement("div");
            my_btn.innerHTML = 'GO'
            my_btn.id = 'topBtn'
            my_btn.onclick = jump_url
            document.body.appendChild(my_btn);

        }, 1000)

    }
})();
