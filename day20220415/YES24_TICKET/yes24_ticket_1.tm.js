// ==UserScript==
// @name         YES24_TICKET_1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  the script run at http://ticket.yes24.com/*
// @author       osci
// @match        http://ticket.yes24.com/Pages/English/Sale/FnPerfSaleProcess.aspx?IdPerf=*
// ==/UserScript==


(function () {
    'use strict';

    function check1() {
        let rdoPays2 = document.querySelector("#rdoPays2");
        let cbxUserInfoAgree1 = document.querySelector("#cbxUserInfoAgree");
        let cbxCancelFeeAgree1 = document.querySelector("#cbxCancelFeeAgree");
        let fdc_PrePayCheck1 = document.querySelector("a.dcursor[onclick='fdc_PrePayCheck();']");
        if (rdoPays2 && cbxUserInfoAgree1 && cbxCancelFeeAgree1 && fdc_PrePayCheck1) {
            rdoPays2.click();
            cbxUserInfoAgree1.click();
            cbxCancelFeeAgree1.click();
            fdc_PrePayCheck1.click();
            console.log("第一步执行完毕。");
        } else {
            setTimeout(() => {
                check1();
            }, 2000);
        }
    }

    check1();
})();