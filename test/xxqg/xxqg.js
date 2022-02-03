// 其实分为了两个域名，
//     分别是www.**.cn和pc.**.cn
//     为了更舒适的进行数据通信，将利用油猴插件本身的存储功能
// 这也迫使这个脚本只能在Tampermonkey插件上运行，所以暴力猴或其他插件工具将无法正常运行此脚本

let div_mask = document.createElement("div");
div_mask.innerHTML = '<div id="script_box"\n' +
    '     style="position: fixed;top: 40px;right: 20px;background-color: #e9d53c; z-index: 99999;width: auto;max-width: 700px;  height: auto;max-height: 500px; min-height: 100px; padding: 10px;">\n' +
    '    <div style="float: left;width: 380px"> 脚本运行状态：\n' +
    '        <div id="script_status" style="color:green; display: block;width: 80%;">无状态</div>\n' +
    '        <br>\n' +
    '    </div>\n' +
    '</div>'
let body_body = document.querySelector("#body-body");
if (body_body) {
    body_body.appendChild(div_mask);
    //在login页面，存在多个body标签，会覆盖二维码
} else {
    document.body.appendChild(div_mask);
}


function is_login() {
    /* 通过cookies token 检测登录状态*/
    if (!Cookies.get('token')) {
        return false;
    } else {
        return true;
    }
}

function set_status(status) {
    document.querySelector("#script_status").textContent = status;
}

function reading() {
    //国际新闻url=https://www.xuexi.cn/xxqg.html?id=cc8b6dc4f4c042e49fc93c279c41dc14
    //总是阅读新的新闻，国际新闻的新内容比较多
    let my_read = sessionStorage.getItem('my_read');

    if (location.href.search("cc8b6dc4f4c042e49fc93c279c41dc14") < 0) {
        sessionStorage.setItem('my_read', '将要跳转新闻页面')
        location.href = 'https://www.xuexi.cn/xxqg.html?id=cc8b6dc4f4c042e49fc93c279c41dc14'
    } else {
        //挑选一篇文章
        set_status("等待挑选一篇文章")
        sessionStorage.setItem('my_read', '将要挑选文章')
        let items = document.querySelectorAll(".text-link-item-title");
        for (let i = 0; i < items.length; i++) {
            let uui = items[i].querySelector("div");
            console.log(uui.textContent)
            break;
        }
    }


}

function performing_tasks(current_task) {
    if (current_task === "阅读") {
        set_status("现在该阅读")
        reading();
    } else if (current_task === "视听") {
        set_status("现在进行试听学习")
    } else if (current_task === "每日答题") {
        set_status("现在进行每日答题")
    } else if (current_task === "每周答题") {
        set_status("每周答题")
    } else if (current_task === "专项答题") {
        set_status("专项答题")
    }
}

function get_task() {
    let current_task = GM_getValue("current_task");
    console.log("GM_getValue(\"current_task\")" + current_task);
    if (!current_task || current_task === "没有任务了") {
        set_status(current_task);
        task_assignment();
    } else {
        performing_tasks(current_task);
        //执行现在的任务
    }
}

function task_assignment() {

    if (location.href.search('https://pc.xuexi.cn/points/my-points.html') < 0) {
        set_status("去往积分页面，在积分页面构建任务");
        location.href = 'https://pc.xuexi.cn/points/my-points.html';
    } else {
        let cards = document.querySelectorAll(".my-points-card-text");
        let my_scores = []
        // ['登录','阅读文章', '试听学习','试听学习时长', '每日答题', '每周答题', '专项答题']
        for (let i = 0; i < cards.length; i++) {
            let this_score = cards[i].textContent.replace("分", "").replace("分", "")
            let score1 = this_score.split("/")
            my_scores[my_scores.length] = [parseInt(score1[0]), parseInt(score1[1])];
        }
        GM_setValue("my_scores", my_scores);

        if (my_scores[1][0] < my_scores[1][1]) {
            GM_setValue("current_task", '阅读');
        } else if (my_scores[3][0] < my_scores[3][1]) {
            //视听有两类积分，第二个是时常积分
            GM_setValue("current_task", '视听');
        } else if (my_scores[4][0] < my_scores[4][1]) {
            GM_setValue("current_task", '每日答题');
        } else if (my_scores[5][0] < my_scores[5][1]) {
            GM_setValue("current_task", '每周答题');
        } else if (my_scores[6][0] < my_scores[6][1]) {
            GM_setValue("current_task", '专项答题');
        } else {
            GM_setValue("current_task", '没有任务了');
        }
        location.reload();
    }

}

function login() {
    if (is_login()) {
        get_task();//已经登录，获取当前的任务
    } else {
        let textContent = document.querySelector(".ddlogintext");
        if (textContent && textContent.textContent === '用学习强国扫码登录，如未安装扫码下载') {
            set_status("已经位于登录页面");
        } else {
            set_status("跳转")
            location.href = 'https://pc.xuexi.cn/points/login.html';
        }
    }
}


setTimeout(function () {
    login();
}, 10000)








