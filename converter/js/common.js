$('#infobox-close').click(function() {
    $('#infobox').removeClass("show");
})

function getUrlPmt(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

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

String.prototype.replaceAll = function (FindText, RepText) {
    return this.replace(new RegExp(FindText, "g"), RepText);
}