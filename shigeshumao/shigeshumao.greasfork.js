// ==UserScript==
// @name         shigeshumai
// @namespace    http://tampermonkey.net/
// @version      0.2.2022年2月26日
// @description  try to take over the world!
// @author       osci
// @match        http://220.197.177.18:61235/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=177.18
// @grant        none
// ==/UserScript==


let count = 9;
let price = 9;


$(document).ready(function () {
    let my_css = '<style>.topBtn{\n' +
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
        'box-shadow:0px 0px 20px #000;' +
        '}' +
        '    #my_box_script {\n' +
        '        position: fixed;\n' +
        '        top: 200px;\n' +
        '        left: 400px;\n' +
        '        background-color: aliceblue;\n' +
        '        height: 400px;\n' +
        '        width: 800px;\n' +
        '        padding: 20px;\n' +
        '        display:none;' +
        '    }\n' +
        '    #my_box_script textarea {\n' +
        '        width: 755px;\n' +
        '        height: 320px;\n' +
        '        resize: block;\n' +
        '    }</style>'
    $('head').append(my_css);
    $('body').append('<div id="topBtn1" class="topBtn" style="bottom: 150px" >展开</div>');
    $("body").append('<div id="my_box_script">' +
        '<textarea id="input_date"></textarea>' +
        '<button id="dao_ru_my">导入</button>' +
        '<p id="dig_o"></p>' +
        '</div>');

    $("#topBtn1").click(function () {
        let dis = $("#my_box_script").css("display")
        if (dis === 'none') {
            $("#my_box_script").css("display", 'block')
        } else {
            $("#my_box_script").css("display", 'none')
        }
    })

    $("#dao_ru_my").click(function () {
        let data = $("#my_box_script textarea").val();
        let data_list = data.split('\n')
        if (data_list.length > 0) {
            $("#dig_o").text("成功导入" + data_list.length + "条")
            let my_value_str = JSON.stringify(data_list);
            localStorage.setItem("my_title_list", my_value_str);
        }
    })

    function get_flag() {
        let storage_name = "my_price_flag_list"
        let my_flag_list = local_storage_get(storage_name)
        if (my_flag_list === null) {
            local_storage_set(storage_name, [])
            return 0;
        } else {
            //游标最大值为长度减一
            let flag = my_flag_list.length
            my_flag_list[flag] = flag
            local_storage_set(storage_name, my_flag_list)
            return flag + 1
        }
    }

    let urls = location.href

    if (urls.search('products/') > -1) {
        $(".btn-responsive")[0].click();
    } else if (urls.search('addproduct/') > -1) {

        setTimeout(function () {
            $('tbody tr')[0].click()
            console.log("添加商品")
        }, 1000)

        setTimeout(function () {

            let data_list = localStorage.getItem("my_title_list");
            if (!data_list) {
                alert("没有导入数据，请导入数据")
            } else {
                let local_value = JSON.parse(data_list);
                //取到列表
                let flag = get_flag(local_value);


                console.log(local_value)
                console.log(flag)

                console.log(local_value[flag])
                //取一个坐标
                $("#Name").val(local_value[flag])
                $("#Name").trigger("change");
                //商品名字
                $("#Price").val(price)
                $("#Price").trigger("change");
                //价格
            }

        }, 1500)

        setTimeout(function () {
            $("input[type='checkbox'][id='SourceWarehouse_0']")[0].click()
            //选定国内仓
        }, 2000)

        setTimeout(function () {
            let couy = $("input[name='WarehouseQuantity_0']")[0];
            $(couy).val(count)
            $(couy).trigger("change");
            //商品数量
        }, 2500)

        setTimeout(function () {
            $($("button[id='SubmitProduct']")[0]).click()
        }, 3000)

    }

});
