window.onload = (function () {
    let htmlDivElementmask = document.createElement("div");
    htmlDivElementmask.innerHTML = '\n' +
        '<div id="script_box" style="     position: absolute;        top: 40px;        left: 200px;        background-color: #e9d53c;        z-index: 99999;        width: auto;        max-width: 700px;\n' +
        '        height: auto;        max-height: 500px;        min-height: 100px;        padding: 10px;\n' +
        '">\n' +
        '    <div style="float: left;width: 380px">\n' +
        '        脚本运行状态：<div id="script_status" style="cloor:green;"></div>\n' +
        '        脚本激活状态：<div id="acv_status"></div>\n' +
        '        <div id="script_box_acd" class="dis" style="display: none;float: left">\n' +
        '            输入激活码：<input type="text" id="av_code"/>\n' +
        '            <button onclick="function set_av_code() {\n' +
        '            let my_code = $(\'#av_code\' ).val();\n' +
        '            let user_id = $.cookie(\'sid\');\n' +
        '            let storage = window.localStorage.getItem(user_id);\n' +
        '            let course_id = $.getUrlParam(\'courseId\');\n' +
        '            let data_ = JSON.parse(storage).data;\n' +
        '            let len_tag_use_of_data_search_course_id = -1;\n' +
        '            for (let i = 0; i < data_.length; i++) {\n' +
        '            if (data_[i][0].search(course_id) !== -1) {\n' +
        '            len_tag_use_of_data_search_course_id = i;\n' +
        '            data_[len_tag_use_of_data_search_course_id] = [course_id, my_code];\n' +
        '            window.localStorage.setItem(user_id, JSON.stringify({data: data_}));\n' +
        '            break;\n' +
        '            }\n' +
        '            }\n' +
        '            location.reload();\n' +
        '            }\n' +
        '            set_av_code()">确定\n' +
        '            </button>\n' +
        '            <br>\n' +
        '            课程识别码：<input type="text" id="course_id_id">\n' +
        '            <br>\n' +
        '            如何获取激活码？\n' +
        '            <br>\n' +
        '            微信扫描下面的支付二维码，加微信：wandouled,\n' +
        '            <br>\n' +
        '            提供账单号获取激活码\n' +
        '            <p style="color: red">注意：此激活码仅用于一科视频课程，一旦获取激活码，超过一小时不予退款</p>\n' +
        '            本人同时在开发做题程序，稍后将会如期发布;购买视频激活码的做题程序将享受优惠\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="dis" style="display: none; max-width: 300px;float:left;">\n' +
        '        <img style="display: block; max-width: 300px;float:left;"\n' +
        '             src="https://cdn.jsdelivr.net/gh/xx025/cloudimg@main/img/20220122042507.jpg">\n' +
        '    </div>\n' +
        '</div>'
    document.body.appendChild(htmlDivElementmask);


    function get_av_code() {
        let user_id = $.cookie('sid');
        let course_id = $.getUrlParam('courseId');
        let storage = window.localStorage.getItem(user_id);
        if (!storage) {
            window.localStorage.setItem(user_id, JSON.stringify({data: []}));
        }
        storage = window.localStorage.getItem(user_id);
        let data_ = JSON.parse(storage).data;
        let len_tag_use_of_data_search_course_id = -1;
        let av_code_of_course_id = "";
        for (let i = 0; i < data_.length; i++) {
            if (data_[i][0].search(course_id) !== -1) {
                len_tag_use_of_data_search_course_id = i;
                av_code_of_course_id = data_[i][1];
                break;
            }
        }
        if (len_tag_use_of_data_search_course_id === -1) {
            data_[data_.length] = [course_id, Math.random()];
            window.localStorage.setItem(user_id, JSON.stringify({data: data_}));
        } else {
            return data_[len_tag_use_of_data_search_course_id][1];
        }
        return get_av_code();
    }

    function encrypt(data) {
        let this_code = window.btoa(data) + 'TMU5HVm5OA8';
        return this_code.replace("=", "").replace("=", "");
    }

    function get_course_and_user_code() {
        return encrypt((encrypt('{' + $.cookie('sid') + ':' + $.getUrlParam('courseId') + '}')));
    }

    function check_av_code() {
        let str2 = window.atob(get_course_and_user_code().replace('TMU5HVm5OA8', ""))
        let str3 = get_av_code();
        if (str3 === str2) {
            return 1;
        } else {
            return -1;
        }
    }

    let play_status = 0;

    function mode_mask(k) {
        $("#script_status").text("正在运行");
        if (k === -1) {
            $("#acv_status").text("未激活");
            $(".dis").css("display", 'block');
            $("#course_id_id").val(get_course_and_user_code());
        } else {
            $("#acv_status").text("已经激活");
        }
    }

    let vat = setInterval(function () {
        if (check_av_code() === -1) {
            clearInterval(vat);
            mode_mask(-1);
        }
        mode_mask(1);
        let play_over = $($(".txt").parent()[0]).css("display");
        if (play_over === 'block') {
            location.reload();
        }
        let played = $($($(".icon-big_play_btn")[0]).parent()[0]).attr('class');
        if (played === 'bigplaybtn j-bigplaybtn z-show') {
            $(".icon-big_play_btn").parent()[0].click();
        }

        if (play_status === 0) {
            let items_list = $(".coursePlayType");
            for (let i = 0; i < items_list.length; i++) {
                let item = $($(items_list[i]).find('span')[0]);
                let status = $(item).attr('data-original-title');
                if (status === "未学习") {
                    let item_parent = $(items_list[i]).parent();
                    let play_btn = $(item_parent[0]).siblings()[0];
                    play_btn.click();
                    break;
                }
            }
            play_status = 1;
        }
        let get_video = $($(".ux-video-player_tip")[0]).find('span').text();
        if (get_video.search('视频获取失败') !== -1) {
            location.reload();
        }
    }, 5000)
})();