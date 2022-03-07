

$(document).ready(function () {
        let urls = location.href
        if (urls.search('login.jsp') > -1) {
            // http://202.194.48.46:8080/login.jsp
            $("#TxtUserName").val("")
            let password = 'LDdx@123'
            $("#TxtPassword").val(password)
        } else if (urls.search('manage') > -1) {

            setInterval(function () {
                function RandomNum(Min, Max) {
                    var Range = Max - Min;
                    var Rand = Math.random();
                    var num = Min + Math.floor(Rand * Range); //舍去
                    return num;
                }

                let tr_list = $(".pjzb tbody tr");
                for (let i = 0; i < tr_list.length; i++) {
                    $($(tr_list[i]).find("input")[0]).click()
                }
                let comments = [
                    "重视教学，对教学工作认真、热情、敬业",
                    "尊重学生，一视同仁，关心学生成才成长",
                    "遵守教学规定，按时上下课，不擅自调课",
                    "注重维护课堂纪律，关注学生的学习状态",
                    "教态自然、大方，着装整洁、得体，精神饱满",
                    "备课充分，内容充实，对讲授内容熟练",
                    "基本知识讲解清晰准确，重、难点突出",
                    "教学内容体现本专业前沿问题及最新研究成果",
                    "注重学生实践应用能力培养",
                    "教学适用，能提供参考资料，扩大信息量",
                    "讲课思路清晰，语言规范，形象生动",
                    "根据教学内容灵活运用多种教学方法",
                    "注重启发式教学，重视培养学生分析问题、解决问题能力",
                    "注重培养学生的批判性思维、创新意识和综合能力",
                    "教学手段运用恰当，合理运用现代化教育技术手段",
                    "能较好掌握教学内容，并能消化巩固",
                    "能有效达成专业培养目标",
                    "能激发学生对这门课的学习兴趣",
                    "能学到很多课本以外的东西，使学生受益匪浅",
                    "对学生未来所从事职业有较大帮助",
                ]

                $("#kfxpjText").val(comments[RandomNum(0, comments.length)])

            }, 100)
        }
    }
)