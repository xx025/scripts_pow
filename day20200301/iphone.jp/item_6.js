// ==UserScript==
// @name         item6
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


    let qqu = setInterval(function () {
        let this_url = location.href
        if (this_url.search('PickupContact-init') > -1) {
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

            if (document.querySelector("#topBtn") === null) {
                let my_btn = document.createElement("div");
                my_btn.innerHTML = 'Switch'
                my_btn.id = 'topBtn'
                my_btn.onclick = select_user
                document.body.appendChild(my_btn);

            }
            select_user();

            //收信人信息
            setInterval(function () {
                document.querySelectorAll(".as-buttongroup input")[1].click()
                //选择其他人
            }, 1000)
            clearInterval(qqu)
        }

    }, 1000)


})();
