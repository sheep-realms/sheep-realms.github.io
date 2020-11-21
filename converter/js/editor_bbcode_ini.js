let ExtendMcbbs = {
    "name": "MCBBS",
    "addCode": [
        {
            "name": "注释",
            "title" : "在文字的正上方添加注释",
            "show": "R",
            "code": "ruby",
            "var": [
                {
                    "title": "正文",
                    "default": "",
                    "tip": "被注释的正文内容",
                }, {
                    "title": "注释",
                    "default": "",
                    "tip": "注释的内容",
                }
            ],
        }, {
            "name": "爱发电",
            "title" : "爱发电",
            "show": "电",
            "code": "afd",
            "var": [
                {
                    "title": "爱发电ID",
                    "default": "",
                    "tip": "爱发电的用户ID",
                }
            ],
        }
    ],
};

function loadBBCodeExtend(id) {
    if (id == "mcbbs") {
        var objtext;
        var code, title, vt = new Array(), v = new Array(), vm = new Array(), vspt=false;
        
        for (var i = 0; i<ExtendMcbbs.addCode.length; i++) {

            code = ExtendMcbbs.addCode[i].code;
            title = ExtendMcbbs.addCode[i].title;

            for (var j = 0; j <4; j++) {
                try {
                    vt[j] = ExtendMcbbs.addCode[i].var[j].title;
                    vm[j] = ExtendMcbbs.addCode[i].var[j].tip;
                } catch (error) {
                    vt[j] = "";
                    vm[j] = "";
                }
            }

            //构建单元
            objtext = "<button class='btn-" + code + "' title='" + title + "' onclick='showConIpt(\"" + code + "\", \"" + vt[0] + "\", \"" + vt[1] + "\", \"" + vt[2] + "\", \"" + vt[3] + "\", \"{{{SELECTTEXT}}}\", \"\", \"\", \"\", \"" + vm[0] + "\", \"" + vm[1] + "\", \"" + vm[2] + "\", \"" + vm[3] + "\")'>" + ExtendMcbbs.addCode[i].show + "</button>";
            addCodeBtn(objtext);
        }
    }

    $('.extend-bar').addClass('close');

    function addCodeBtn(obj) {
        if (($('.tool-group-extend p').children().length) % 2 == 0) {
            $('.tool-group-extend').append("<p></p>");
            $('.tool-group-extend p:last-child').append(obj);
        } else {
            $('.tool-group-extend p:last-child').append(obj);
        }
    }
}