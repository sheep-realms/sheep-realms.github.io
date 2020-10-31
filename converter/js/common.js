$('#infobox-close').click(function() {
    $('#infobox').removeClass("show");
})

function out(text, type) {
    $('#infobox #infobox-content').text(text);
    $('#infobox').removeClass("err");
    $('#infobox').removeClass("msg");
    $('#infobox').addClass(type);
    $('#infobox').addClass("show");
}

function outMsg(text) {
    out(text,"msg")
}

function outErr(text) {
    out("错误："+text,"err")
    scrollTo(0,0);
}