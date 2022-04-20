// ==UserScript==
// @name         奥鹏自动答题脚本
// @namespace    http://tampermonkey.net/
// @version      0.22.1
// @description  自动从接口获取答案并自动填写
// @author       曦月
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js
// @match        https://learn.open.com.cn/StudentCenter/OnLineJob/TestPaper*
// @match        http://learn.open.com.cn/StudentCenter/MyWork/UndoneWork*
// @license MIT
// @grant        none
// ==/UserScript==

//全局问题
var question;
//请求的问题封装（方便根据id查找对应的对象）
var map={};
//根据问题的id来获取答案封装
var answer={};
var get_point = false;
// 封装ajax
function addXMLRequestCallback(callback){
    var oldSend, i;
    if( XMLHttpRequest.callbacks ) {
        // we've already overridden send() so just add the callback
        XMLHttpRequest.callbacks.push( callback );
    } else {
        // create a callback queue
        XMLHttpRequest.callbacks = [callback];
        // store the native send()
        oldSend = XMLHttpRequest.prototype.send;
        // override the native send()
        XMLHttpRequest.prototype.send = function(){
            // process the callback queue
            // the xhr instance is passed into each callback but seems pretty useless
            // you can't tell what its destination is or call abort() without an error
            // so only really good for logging that a request has happened
            // I could be wrong, I hope so...
            // EDIT: I suppose you could override the onreadystatechange handler though
            for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                XMLHttpRequest.callbacks[i]( this );
            }
            // call the native send()
            oldSend.apply(this, arguments);
        }
    }
}

//根据问题找出具体的id
function initquestion(question){
    //找出的问题数组
    $(".Test-Info-Right h2").text("自动答题中")
    let list= question.data.paperInfo.Items;
    let nums = 0
    list.forEach((item,index,array)=>{
        map[item.I1]=item
        let itemBankId=item.I4;
        let questionId =item.I1;
        let bust=(new Date()).getTime() ;
        //封装请求
        let basturl = `https://learn.open.com.cn/StudentCenter/OnlineJob/GetQuestionDetail?bust=${bust}&itemBankId=${itemBankId}&questionId=${questionId}&_=1596253257714`
        $.ajax({
            url: basturl,
            type: 'GET',
            dataType: 'json',
            success(data){
                nums++
                console.log("查询到答案");
                // console.log(data.data);
                var choices_list = data.data.Choices
                console.log(choices_list);
                var select = $(`div [itemid="${data.data.I1}"] li`)
                console.log(select);
                for (var i = 0; i < choices_list.length; i++) {
                    if (choices_list[i].IsCorrect) {
                        select.eq(i).click()
                    }
                }
                if (nums === list.length) {
                    console.log("答题完成");
                    $("title").text("答题完成,请手动点击确定"+$("title").text())
                    $("#submitBtn").click()
                }
            }
        });
    })
}


(function() {
    'use strict';
    let url = window.location.href;
    if (url.includes("StudentCenter/OnLineJob/TestPaper")) {
        console.log("开始答题");
        addXMLRequestCallback( function( xhr ) {
            xhr.addEventListener("load", function(){
                if (xhr.readyState == 4 && xhr.status == 200 && !get_point) {
                    if ( xhr.responseURL.includes("homeworkapi.open.com.cn/getHomework") ) {
                        // console.log(xhr.responseURL);
                        // 查询到接口后阻止继续监听
                        get_point = true
                        question=JSON.parse(xhr.responseText);
                        console.log("查询到答案接口");
                        console.log(question);
                        initquestion(question);
                    }
                }
            });
        });
    }else{
        // 未完成作业列表
        console.log("作业列表");
        $("td a").each(function(index,el){
            if ($(el).text() === "做作业") {
                let url = $(el).attr('href')
                open_new_window(url)
            }
        })
        function open_new_window(url) {
            setTimeout(function () {
                window.open(url,'_blank')
            },3000)
        }
    }
})();