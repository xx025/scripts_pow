/*
* 为了便捷读取本地数据将此功能定义为一个固定的方法
* */


function local_storage_set(storage_name, data) {
    localStorage.setItem(storage_name, JSON.stringify(data));
}

function local_storage_get(storage_name) {
    let my_flag_list = localStorage.getItem(storage_name);
    if (my_flag_list === null) {
        //如果没有此项则返回空
        return null;
    } else {
        //有此项则正常返回格式化后的数据
        return JSON.parse(my_flag_list);
    }
}