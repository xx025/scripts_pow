
let info = [
    ["scarf jjj", 9, 9],
    ["scarf jabj", 9, 9],
    ["scarf jdfj", 9, 9],
    ["scarf j98j", 9, 9]
]


let uui_d = localStorage.getItem('my_script_flag')

if (!uui_d) {
    //没有这个对象
    localStorage.setItem('my_script_flag', -1)
    uui_d = parseInt(localStorage.getItem('my_script_flag'))
} else {
    uui_d = parseInt(uui_d)
}

uui_d = uui_d + 1;
localStorage.setItem('my_script_flag', uui_d)

let flag = (uui_d) % info.length
console.log(info[flag])

let data = info[flag]


$(document).ready(function () {

    let urls = location.href
    console.log(urls)


    if (urls.search('products/') > -1) {
        function faBuShangPin() {
            $(".btn-responsive")[0].click()
        }

        faBuShangPin()
    } else if (urls.search('addproduct/') > -1) {

        function add_goods() {
            $('tbody tr')[0].click()
        }

        setTimeout(function () {
            add_goods()
            console.log("添加商品")
        }, 1000)

        setTimeout(function () {
            $("#Name").val(data[0])
            $("#Name").trigger("change");
            //商品名字
            $("#Price").val(data[1])
            $("#Price").trigger("change");
            //价格
        }, 1500)

        setTimeout(function () {
            $("input[type='checkbox'][id='SourceWarehouse_0']")[0].click()
            //选定国内仓
        }, 2000)

        setTimeout(function () {
            let couy = $("input[name='WarehouseQuantity_0']")[0];
            $(couy).val(data[2])
            $(couy).trigger("change");
            //商品数量
        }, 2500)

        setTimeout(function () {
            $($("button[id='SubmitProduct']")[0]).click()
        }, 3000)

    }

});