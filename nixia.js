function get_av_code() {
    let user_id = $.cookie("a_user");
    let storage = window.localStorage.getItem(user_id);
    if (!storage) {
        window.localStorage.setItem(user_id, JSON.stringify({av_code: "null"}));
        storage = window.localStorage.getItem(user_id);
    }
    return JSON.parse(storage).av_code;
}

function get_user_code() {
    return $.cookie("a_user").split('').reverse().join('');
}

function set_av_code(str_code) {
    let user_id = $.cookie("a_user");
    window.localStorage.setItem(user_id, JSON.stringify({av_code: str_code}));
    return str_code;
}

set_av_code("uuuuu")
