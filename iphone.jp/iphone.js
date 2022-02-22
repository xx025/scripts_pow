// ==UserScript==
// @name         buy_iphone_13
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


//========================================================================================
//按如下格式填写用户信息即可，同样可通过其他方式组装成如下列表格式，或仅保留一个用户

let users_info = [
    ['小', '军', 'aaa@gmail.com', '18868688866'],
    ['大', '军', 'bbb@gmail.com', '18768688866'],
    ['王', '军', 'ccc@gmail.com', '18668688866'],
    ['张', '军', 'ddd@gmail.com', '18568688866']
]

let select_what = 1;
//选择第几个用户，（选第几个，输入对应数字），
//点击按钮会变化此数字选择不同的用户信息
//亦可锁定为1


//========================================================================================

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

    } else if (this_url.search('www.apple.com/jp/shop/buy-iphone/iphone-13-pro') > -1 && this_url.search('product=') > -1) {
        //检查包
        setTimeout(function () {
            document.querySelector("#root button").click()
        }, 400)

    } else if (this_url === 'https://www.apple.com/jp/shop/bag') {
        //此脚本为支付页面点击操作
        setTimeout(function () {

            //其他支付操作写进此处

            document.querySelector(".rs-bag-payinfull .rs-bag-checkoutbutton button").click()
        }, 300)

        //如不需点击请注释掉setTimeout方法体
    } else if (this_url.search("store.apple.com/jp/shop/signIn") > -1) {
        //此部分为登录页面，要选择作为客人登录

        setTimeout(function () {
            document.querySelector(".rs-guest-checkout button").click()
        }, 300)

    } else if (this_url.search("store.apple.com/jp/shop/checkout") > -1 && this_url.search('Fulfillment-init') > -1) {
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

    } else if (this_url.search('PickupContact-init') > -1) {

        //存在问题，刷新脚本才能运行
        function select_user() {
            let ucc = select_what % users_info.length
            let input_list = document.querySelectorAll(".rf-form-layout-section")[1].querySelectorAll('input')
            let selected_user = users_info[ucc - 1]
            for (const selectedUserKey in selected_user) {
                input_list[selectedUserKey].setAttribute('value', selected_user[selectedUserKey])
            }
            select_what += 1;

        }

        let my_btn = document.createElement("div");
        my_btn.innerHTML = 'Switch'
        my_btn.id = 'topBtn'
        my_btn.onclick = select_user
        document.body.appendChild(my_btn);
        select_user();

        //收信人信息
        setInterval(function () {
            document.querySelectorAll(".as-buttongroup input")[1].click()
            //选择其他人
        }, 1000)
    } else {
        console.log('跳出循环了')
    }


})();
