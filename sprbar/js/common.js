var lang = {
    "cmd": {
        "msg": {
            "unknown": "未知命令。",
            "webopen": "已打开指定的网页。",
        },
        "value": {
            "bili_au": "&lt;<i>AU号</i>&gt;",
            "bili_av": "&lt;<i>AV号</i>&gt;",
            "bili_bv": "&lt;<i>BV号</i>&gt;",
            "bili_cv": "&lt;<i>CV号</i>&gt;",
            "bili_ss": "&lt;<i>番剧编号</i>&gt;",
            "dz_aid": "&lt;<i>文章ID</i>&gt;",
            "dz_fid": "&lt;<i>版块ID</i>&gt;",
            "dz_pid": "&lt;<i>帖子ID</i>&gt;",
            "dz_tagid": "&lt;<i>标签ID</i>&gt;",
            "dz_tagname": "&lt;<i>标签名称</i>&gt;",
            "dz_tid": "&lt;<i>主题ID</i>&gt;",
            "message": "&lt;<i>消息...</i>&gt;",
            "search": "&lt;<i>搜索关键词...</i>&gt;",
            "uid": "&lt;<i>用户ID</i>&gt;",
            "username": "&lt;<i>用户名</i>&gt;",
        }
    }
}

var sr = {
    "config": {
        "name": "SR",
        "version": "1.0",
    },
    "cmdlist": [
        {"name": "baidu", "value": lang.cmd.value.search},
        {"name": "baidu-img", "value": lang.cmd.value.search},
        {"name": "bilibili", "value": lang.cmd.value.search},
        {"name": "bilibili-aid", "value": lang.cmd.value.bili_av},
        {"name": "bilibili-au", "value": lang.cmd.value.bili_au},
        {"name": "bilibili-bvid", "value": lang.cmd.value.bili_bv},
        {"name": "bilibili-cv", "value": lang.cmd.value.bili_cv},
        {"name": "bilibili-ss", "value": lang.cmd.value.bili_ss},
        {"name": "bilibili-uid", "value": lang.cmd.value.uid},
        {"name": "bing", "value": lang.cmd.value.search},
        {"name": "enwiki", "value": lang.cmd.value.search},
        {"name": "google", "value": lang.cmd.value.search},
        {"name": "google-img", "value": lang.cmd.value.search},
        {"name": "jawiki", "value": lang.cmd.value.search},
        {"name": "log", "value": lang.cmd.value.message},
        {"name": "mcbbs", "value": lang.cmd.value.search},
        {"name": "mcbbs-aid", "value": lang.cmd.value.dz_aid},
        {"name": "mcbbs-fid", "value": lang.cmd.value.dz_fid},
        {"name": "mcbbs-pid", "value": lang.cmd.value.dz_pid},
        {"name": "mcbbs-tagid", "value": lang.cmd.value.dz_tagid},
        {"name": "mcbbs-tagname", "value": lang.cmd.value.dz_tagname},
        {"name": "mcbbs-tid", "value": lang.cmd.value.dz_tid},
        {"name": "mcbbs-uid", "value": lang.cmd.value.uid},
        {"name": "mcbbs-username", "value": lang.cmd.value.username},
        {"name": "mcbbs-user-search", "value": lang.cmd.value.username},
        {"name": "mcbbs-user-space", "value": lang.cmd.value.uid},
        {"name": "mediawiki", "value": lang.cmd.value.search},
        {"name": "moegirl", "value": lang.cmd.value.search},
        {"name": "sogou", "value": lang.cmd.value.search},
        {"name": "touhouwiki", "value": lang.cmd.value.search},
        {"name": "zhwiki", "value": lang.cmd.value.search},
    ]
}

var cmdlist;
var tabmode = false;
var tabindex = 0;

$("#cmd-ok").click(function() {
    let cmdtxt = $("#cmd").val().split(' ');
    let cmdtext;

    if(cmdtxt[0].substring(0,1) == "/") {
        $("#cmd").val('/');
        cmdtxt[0] = cmdtxt[0].substring(1,cmdtxt[0].length);

        cmdtext = cmdtxt[1];
        if (cmdtxt[2] != undefined) {
            for(let m = 2; m < cmdtxt.length; m++) {
                cmdtext = cmdtext + ' ' + cmdtxt[m];
            }
        }

        switch (cmdtxt[0]) {
            case '':
                break;

            // 搜索引擎
            case 'baidu':
                webOpen('https://www.baidu.com/s?wd=' + cmdtext);
                break;
            case 'bing':
                webOpen('https://cn.bing.com/search?q=' + cmdtext);
                break;
            case 'google':
                webOpen('https://www.google.com/search?q=' + cmdtext);
                break;
            case 'sogou':
                webOpen('https://www.sogou.com/web?query=' + cmdtext);
                break;

            // 图片搜索引擎
            case 'baidu-img':
                webOpen('https://image.baidu.com/search/index?tn=baiduimage&word=' + cmdtext);
                break;
            case 'google-img':
                webOpen('https://www.google.com/search?tbm=isch&q=test' + cmdtext);
                break;

            //哔哩哔哩
            case 'bilibili':
                webOpen('https://search.bilibili.com/all?keyword=' + cmdtext);
                break;
            case 'bilibili-aid':
                webOpen('https://www.bilibili.com/video/av' + cmdtxt[1]);
                break;
            case 'bilibili-au':
                webOpen('https://www.bilibili.com/audio/au' + cmdtxt[1]);
                break;
            case 'bilibili-bvid':
                webOpen('https://www.bilibili.com/video/BV' + cmdtxt[1]);
                break;
            case 'bilibili-cv':
                webOpen('https://www.bilibili.com/read/cv' + cmdtxt[1]);
                break;
            case 'bilibili-ss':
                webOpen('https://www.bilibili.com/bangumi/play/ss' + cmdtxt[1]);
                break;
            case 'bilibili-uid':
                webOpen('https://space.bilibili.com/' + cmdtxt[1]);
                break;
                
            // 百科
            case 'enwiki':
                webOpen('https://en.wikipedia.org/w/index.php?search=' + cmdtext);
                break;
            case 'zhwiki':
                webOpen('https://zh.wikipedia.org/w/index.php?search=' + cmdtext);
                break;
            case 'jawiki':
                webOpen('https://ja.wikipedia.org/w/index.php?search=' + cmdtext);
                break;
            case 'mediawiki':
                webOpen('https://www.mediawiki.org/w/index.php?search=' + cmdtext);
                break;

            case 'moegirl':
                webOpen('https://zh.moegirl.org.cn/index.php?search=' + cmdtext);
                break;
            case 'touhouwiki':
                webOpen('https://zh.touhouwiki.net/index.php?search=' + cmdtext);
                break;

            //MCBBS
            case 'mcbbs':
                webOpen('https://www.mcbbs.net/search.php?mod=forum&searchsubmit=yes&wd=' + cmdtext);
                break;
            case 'mcbbs-aid':
                webOpen('https://www.mcbbs.net/portal.php?mod=view&aid=' + cmdtxt[1]);
                break;
            case 'mcbbs-fid':
                webOpen('https://www.mcbbs.net/forum-' + cmdtxt[1] + '-1.html');
                break;
            case 'mcbbs-pid':
                webOpen('https://www.mcbbs.net/forum.php?mod=redirect&goto=findpost&ptid=0&pid=' + cmdtxt[1]);
                break;
            case 'mcbbs-tagid':
                webOpen('https://www.mcbbs.net/misc.php?mod=tag&id=' + cmdtxt[1]);
                break;
            case 'mcbbs-tagname':
                webOpen('https://www.mcbbs.net/misc.php?mod=tag&name=' + cmdtxt[1]);
                break;
            case 'mcbbs-tid':
                webOpen('https://www.mcbbs.net/thread-' + cmdtxt[1] + '-1-1.html');
                break;
            case 'mcbbs-uid':
                webOpen('https://www.mcbbs.net/?' + cmdtxt[1]);
                break;
            case 'mcbbs-username':
                webOpen('https://www.mcbbs.net/home.php?mod=space&username=' + cmdtxt[1]);
                break;
            case 'mcbbs-user-search':
                webOpen('https://www.mcbbs.net/home.php?mod=spacecp&ac=search&username=' + cmdtxt[1]);
                break;
            case 'mcbbs-user-space':
                webOpen('https://www.mcbbs.net/home.php?mod=space&uid=' + cmdtxt[1]);
                break;

            case 'log':
                console.log(cmdtext);
                break;
            default:
                logErr(lang.cmd.msg.unknown);
        }

        tabmode = false;
        tabindex = 0;
        cmdlist = [];
        $('#cmdlist').html("");
        $('#cmdlist').addClass("hide");
    } else {
        $("#cmd").val('');
    }
})

$("#cmd").live("input propertychange",function(event){
    tabmode = false;
    tabindex = 0;
    if($("#cmd").val().substring(0,1) == "/") {
        $('#cmdlist').removeClass("hide");
        let cmdtxt = $("#cmd").val().substring(1,$("#cmd").val().length).split(' ');
        cmdlist = searchCmd(cmdtxt[0]);
        let msgtext = "";

        if(cmdlist[0] == undefined) {
            $('#cmdlist').html("");
            $('#cmdlist').addClass("hide");
            return 0;
        }

        for(let i = 0; i < cmdlist.length && i < 10; i++) {
            msgtext += "/" + cmdlist[i].name + " " + cmdlist[i].value + "<br>";
        }

        if(cmdlist.length > 10) {
            msgtext += "...";
        }

        $('#cmdlist').html(msgtext);
    } else {
        $('#cmdlist').html("");
        $('#cmdlist').addClass("hide");
    }
});

$(document).keydown(function(event){
    if(event.keyCode == 9) {
        if($("#cmd").is(":focus")) {
            if($("#cmd").val().substring(0,1) == "/") {
                event.preventDefault();
                if(tabmode == false) {
                    if(cmdlist[0] != undefined) {
                        tabmode = true;
                        tabindex = 0;
                        $("#cmd").val("/" + cmdlist[0].name);
                    }
                } else if (tabmode == true) {
                    if(tabindex < cmdlist.length -1) {
                        tabindex++;
                        $("#cmd").val("/" + cmdlist[tabindex].name);
                    } else {
                        tabindex = 0;
                        $("#cmd").val("/" + cmdlist[0].name);
                    }
                }
            }
        }
    }
});

function searchCmd(key) {
    let value = sr.cmdlist.filter(function(text) {
        return text.name.indexOf(key) != -1;
    })

    return value;
}

function webOpen(urltext) {
    window.open(urltext, true);
    log(lang.cmd.msg.webopen);
}

function log(message) {
    console.log("[" + sr.config.name + "] " + message);
}

function logErr(message) {
    console.error("[" + sr.config.name + "] " + message);
}

function logWarn(message) {
    console.warn("[" + sr.config.name + "] " + message);
}