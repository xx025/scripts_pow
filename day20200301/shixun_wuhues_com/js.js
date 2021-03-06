!function () {
    let e = null;
    let t = !1;
    const n = {
        set: function (e, t) {
            if (window.localStorage) window.localStorage.setItem(e, t); else {
                var n = new Date;
                n.setTime(n.getTime() + 2592e6), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString()
            }
        }, get: function (e) {
            if (window.localStorage) return window.localStorage.getItem(e);
            var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (t = document.cookie.match(n)) ? unescape(t[2]) : null
        }, del: function (e) {
            if (window.localStorage) return window.localStorage.removeItem(e);
            var t = new Date;
            t.setTime(t.getTime() - 1);
            var n = this.get(e);
            null != n && (document.cookie = e + "=" + n + ";expires=" + t.toGMTString())
        }
    };

    function o(e) {
        window.console && window.console.log && console.log("%c " + e, "color: #fff; margin: 1em 0; padding: 5px 0; background: # 222f3e;")
    }


    i(e, t = null)
    {
        var n = window.location.search.substring(1);
        null != t && (t.substr(t.indexOf("?") + 1), n = t.substr(t.indexOf("?") + 1));
        for (var o = n.split("&"), i = 0; i < o.length; i++) {
            var d = o[i].split("=");
            if (d[0] === e) return d[1]
        }
        return !1
    }
    const d = {
        player: null, idList: [], nodeId: 0, courseId: 0, mainInterval: null, 初始化: function () {
            if (this.nodeId = i("nodeId"), this.idList = this.getIdList(), this.courseId = this.getCourseId(), this.player = e, window.console && window.console.log) {
                console.clear();
                this.player.getMetaDate();
                console.log("%c傲星英华学堂网课助手%c https://www.aoaostar.com", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"), console.log("%c最后更新时间：2022年1月26日22 :25:26 ", "颜色：#fff；边距：1em 0；内边距：5px 0；background: #3498db;"), console.log(`%c 当前课程ID：${this.courseId} %c 章节ID：${this.nodeId}`, "background: #35495e; padding: 4px; border- radius: 3px 0 0 3px; color: #fff", "background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff"), console.log("%c 加载完成时间：" + (new Date).toLocaleString(), "color: #fff; margin: 1em 0; padding: 5px 0; background: #636e72;")
            }
        }, main: function () {
            if (!this.judgementState()) return;
            let e = this;
            null == document.getElementById("videoContent") && e.isOver() && o("恭喜你，已全部刷完"), this.mainInterval = setInterval((() = > {
                o(                "播放状态检查，是否播放完成："+t), !0 === t && e.over()
        }),
            3e3
        )
        }, getCourseId: function () {
            let e = document.querySelector(". wrapper .curPlace .center");
            return null == e ? (e = window.location.href, this.courseId = i("courseId", e)) : this.courseId = i("courseId", e.lastChild.href), !1 === i("courseId") && (window.location.href = this.getFullUrl(this.nodeId)), this.courseId
        }, over: function () {
            if (o("播放完成"), o("视频长度为" + this.player.getMetaDate().duration + "秒"), this.isOver()) o("恭喜你，已全部刷"), clearInterval(this.mainInterval); else {
                o("2秒后跳转下一段");
                let e = this;
                setTimeout((function () {
                    window.location.href = e.getFullUrl(e.getNextId())
                }), 2e3)
            }
        }, judgementState() {
            let e = this;
            return null != document.getElementById("error-main") ? " 章节数据有误,联系老师!" === document.querySelector("#error-main .name").innerText ? (o("章节数据有误,准备跳下一段"), setTimeout((function () {
                window.location.href = this.getFullUrl(this.getNextId())
            }), 2e3), !1) : "当前章节尚未等待，请先学完上一个视频" === document.querySelector("#error-主要的.name”）。innerText&&o("当前未解锁
        )
            (准备打开上一个任务
            ",setTimeout((function(){window.location.href=e.getFullUrl(e.LastId())}),!1 ):this.idList[this.idList.length-1]===this.nodeId?(o("
            恭喜你，当前为最后一课
            "),!0):null!=document.getElementById("
            videoContent
            " )||o("
            当前页面没有信息，准备接下来发现一些播放
            "),setTimeout((function(){window.location.href=e.getFullUrl(e.getNextId())}),2e3 ),!1)},getIdList:function(){const e=document.querySelectorAll(".two.list.item
            a
            ");let t=[];for(let n=0;n<e.length; n++){let o=e[n].getAttribute("
            href
            "),i=o.substring(o.lastIndexOf("
            nodeId = ")+7);t.push(i)}return t},getLastId: function(){for(var e in this.idList)if(this.idList[e]===this.nodeId)return this.idList[parseInt(e)-1];return o("
            获取上一个Id失败
            "),this.nodeId},getNextId:function(){for(var e in this.idList)if(this.idList[e]===this.nodeId)return this.idList[parseInt(e)+1];return o("
            获取下一个Id失败
            "),this.nodeId},getNearId:function(){for(const e in this.idList)if(this.idList[e]>this.nodeId&&0!==e)return this.idList[parseInt(e)-1];return o("
            获取最近Id失败，跳转第一课
            "),this.idList[0]},isOver:function(){return this.idList[this.idList.length-1]===this.nodeId},getFullUrl:function(e){return`${window .location.origin}/user/node?courseId=${this.courseId}&nodeId=${e}&t=${(new Date).getTime()}`}};var r=$("
            #video - 文件
            ").val()||"
            ",a=$("
            #video - nodeId
            ").val()||"
            ",s=$("
            #user - id
            ").val()||"
            0
            ",l=$("
            #study - state
            ").val()||0;l=parseInt(l);var c=" / user / node / study
            ",u=0,g=0,f =0,h="
            stop
            ",p="
            node_
            "+s+"
            _
            "+a;window.setInterval((function(){n.set("
            node_play_
            "+s,a)}),567),window.setInterval((function(){n.get("
            node_play_
            "+s);"
            playing
            "===h&&g++}),1e3);var m=2 ===l,w=null,I="
            ",v=function(t,n){f=g;让 i={nodeId:a,studyId:u,studyTime:g};n&&(n.length> 4&&(n=n.substr(0,4)),i.code=n+I),void 0!==t&&1===t&&g<1&&(i.studyTime=1),$.ajax({方法： "
            post
            ",url:c,data:i,dataType:"
            json
            "}).then((t=>(n&&(t.status?o("
            验证码验证
            "正确):o("
            码错误
            ") ),t.status&&(u=t.studyId,n?(h="
            playing
            ",e.videoPlay()):"
            提交学时成功！"!==t.msg&&(o(`提交学时异常，${ t.msg}，2秒后刷新页面`),setTimeout((()=>{window.location.reload()}),2e3))),t))).then((t=>{t. need_code&&(h="
            pause
            ",e.videoPause(),null===w&&(w=1,o(t.msg),o("
            识别验证中，请稍后，可能需要多次码请求成功，稍安勿躁
            "),fetch(" / service / code ? r = "+Math.random()).then((function(e){return e.blob()})).then((e=>{let t=new FormData; t.append("file
            ",e),fetch("
            ",{method:"post",body:t,mode:"cors"}).then( (e=>e.json())).then((t=>{let n=new FileReader;n.onload=()=>{console.log(`%c %c 识别结果 %c ${t .data} `,`padding: 40px 120px;background-image: url(${n.result});background-size: contains;background-repeat: no-repeat;color: transparent;`,"background: #35495e ; padding: 4px; border-radius: 3px 0 0 3px; color: #fff","background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff")},n.readAsDataURL (e),I="_",v(1,t.data),w=null})).catch((e=>{console.log(e)}))}))))})) };window.addEventListener("unload",(function(e){var t=new FormData,n={nodeId:a,studyId:u,studyTime:g,closeSend:1};for(var o in n)t.append(o,n[o]);window.navigator.sendBeacon(c,t)} ));var y=1e4;"function"==typeof window.navigator.sendBeacon&&(y=3e4),window.setInterval((function(){null==e||g<=f||v()} ),y),window.loadHandler=function(){e.addListener("play",(function(){h="playing",0===u&&v(1),m||(m=!0) })),e.addListener("pause",(function(){h="pause",v()})),e.addListener("end",(function(){h="end",n .del(p),v(),e.changeConfig("config","timeScheduleAdjust",1),t=!0})),e.addListener("time",(function(e){n.set (p,e)})),l<2&&e.changeConfig("config","timeScheduleAdjust",1)};var x={container:"#videoContent",variable:"player",drag:"start",加载："loadHandler",autoplay:!0,flashplayer:!1,volume:0,video:[[r,"video/mp4","中文标清",0]]},b=n.get(p);b| |(b=0),b>0&&(x.seek=b),e=new ckplayer(x),d.initialize(),d.main()}();