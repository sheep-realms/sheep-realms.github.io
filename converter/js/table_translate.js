


function start() {
    $('#output').val(translate($('#input').val(), $('#exp').val(), $('#ext').val()));
    $('#output').addClass("change");
    $('#output').focus();
}

function translate(text, from_lang, to_lang) {
    var text2 = "";
    var table;

    switch(from_lang) {
        case "csv":
            table = expCsv(text);
            break;
        case "json":
            table = eval('(' + text + ')');
            break;
        case "lang":
            table = expLang(text);
            break;
        default:
            table = expCsv(text);
    }

    switch(to_lang) {
        case "csv":
            text2 = extCsv(table);
            break;
        case "csv":
            text2 = extBBCode(table);
            break;
        case "html":
            text2 = extHTML(table);
            break;
        case "json":
            text2 = JSON.stringify(table);
            break;
        case "lang":
            text2 = extLang(table);
            break;
        case "md":
            text2 = extMarkdown(table);
            break;
        case "mw":
            text2 = extMediaWiki(table);
            break;
        default:
            text2 = extBBCode(table);
}

    return text2;
}

function expCsv(text) {         //解释CSV
    //此类信息相当纯粹，可以直接处理
    var table = {"tr": [{"td": [{"text": ""}]}]};
    var tr = new Array();
    var td = new Array();

    text = text.replace("\\,","__SPR:F__");

    tr = text.split("\n");
    for(var i = 0; i<tr.length; i++) {
        td = tr[i].split(",");
        table.tr[i] = {"td":[]};
        for(var j = 0; j<td.length; j++) {
            table.tr[i].td[j] = {"text": td[j].replace("__SPR:F__",",")};
        }
    }

    return table;
}

function extCsv(table) {        //展开CSV
    var text = "";

    for(var i = 0; i<table.tr.length; i++) {
        if (i != 0) {text += "\n";}
        for(var j = 0; j<table.tr[i].td.length; j++) {
            if (j != 0) {text += ",";}
            text += table.tr[i].td[j].text;
        }
    }

    return text;
}

function expBBCode(text) {     //解释BBCode(Discuz!X)
    //以处理字符流的形式处理此数据
    var table = {};
    var search = text.toLowerCase().indexOf("[table");
    var search_end = text.indexOf("]");
    var search_stop;
    var search_start = text.toLowerCase().indexOf("[table");

    //检测头部
    if(search != -1) {

        //头部
        if(text.indexOf("=") < search_end) {
            if(text.indexOf(",") < search_end) {
                table = {
                    "width": text.substring(search_start + 6, text.indexOf(",",search_start)),
                    "color": text.substring(text.indexOf(",",search_start) + 1, text.indexOf("]",search_start) - 1),
                    "tr": []
                };
            } else {
                table = {
                    "width": text.substring(search_start + 6, text.indexOf("]",search_start)),
                    "tr": []
                };
            }
        } else {
            table = {"tr": []};
        }
        search_start = text.indexOf("]",search_start) + 1;
        
        if(text.indexOf("[/table]",search_start) != -1) {
            search_stop = text.toLowerCase().indexOf("[/table]",search_start);
        } else {
            search_stop = text.length;
        }

        //内容
        do {
            //行
            search_end = text.toLowerCase().indexOf("[/tr]",search_start)
            search = text.toLowerCase().indexOf("[tr",search_start);
            if(search < search_end && search != -1) {
                search_start = text.toLowerCase().indexOf("[tr",search_start);
            }

            do {
                search_start = text.toLowerCase().indexOf("[td",search_start)
            } while ((text.toLowerCase().indexOf("[/td]",search_start) > search_end) || text.toLowerCase().indexOf("[/td]",search_start) == -1);

        } while (text.toLowerCase().indexOf("[/tr]",search_start) == -1);


    }

    return 0;
}

function extBBCode(table) {     //展开BBCode(Discuz!X)
    var text = "";

    //预制方法
    function getWidth(width) {      //格式化宽度数据
        if(width.substring(width.length-1) == "%") {
        } else {
            width = parseInt(width);
        }
        return width;
    }

    //头部
    text += "[table";
    if(table.width != undefined) {text += "=" + getWidth(table.width);}
    text += "]\n";

    //内容
    for(var i = 0; i<table.tr.length; i++) {
        text += "[tr]";
        for(var j = 0; j<table.tr[i].td.length; j++) {
            text += "[td";
            if(table.tr[i].td[j].width != undefined) {text += "=" + getWidth(table.tr[i].td[j].width);}
            text += "]" + table.tr[i].td[j].text + "[/td]";
        }
        text += "[/tr]\n";
    }

    text += "[/table]";

    return text;
}

function extHTML(table) {     //展开HTML
    var text = "";

    //头部
    text += "<table";
    if(table.width != undefined) {text += " style=\"width:" + table.width + "\"";}
    text += ">\n";

    //内容
    for(var i = 0; i<table.tr.length; i++) {
        text += "\t<tr>\n";
        for(var j = 0; j<table.tr[i].td.length; j++) {
            text += "\t\t<td";
            if(table.tr[i].td[j].width != undefined) {text += " style=\"width:" + table.width + "\"";}
            text += ">" + table.tr[i].td[j].text + "</td>\n";
        }
        text += "\t</tr>\n";
    }

    text += "</table>";

    return text;
}

function expLang(text) {    //解释语言配置文件
    //此类信息相当纯粹，可以直接处理
    var table = {"tr": [{"td": [{"text": ""}]}]};
    var tr = new Array();
    var td = new Array();

    tr = text.split("\n");
    for(var i = 0; i<tr.length; i++) {
        table.tr[i].td[0] = {"text": tr[i].substring(0,tr[i].indexOf("="))};
        table.tr[i].td[1] = {"text": tr[i].substring(tr[i].indexOf("=") + 1)};
    }
    

    return table;
}

function extLang(table) {     //展开语言配置文件
    var text = "";

    for(var i = 0; i<table.tr.length; i++) {
        text += table.tr[i].td[0].text + "=" + table.tr[i].td[1].text + "\n";
    }

    return text;
}

function extMarkdown(table) {
    var text = "";

    //内容
    for(var i = 0; i<table.tr.length; i++) {
        for(var j = 0; j<table.tr[i].td.length; j++) {
                text += "| " + table.tr[i].td[j].text + " ";
        }
        text += "|\n";
    }

    return text;
}

function extMediaWiki(table) {     //展开MediaWiki
    var text = "";

    //头部
    text += "{|";
    if(table.width != undefined) {text += " style=\"width:" + table.width + "\"";}
    text += "\n";

    //内容
    for(var i = 0; i<table.tr.length; i++) {
            text += "|-\n";
        for(var j = 0; j<table.tr[i].td.length; j++) {
                text += "|";
            if(table.tr[i].td[j].width != undefined) {
                text += " style=\"width:" + table.tr[i].td[j].width + "\" | ";
            } else {
                if (j == 0) {
                    text += " ";
                } else {
                    text += "| ";
                }
            }
            text += table.tr[i].td[j].text + " ";
        }
        text += "\n";
    }

    text += "|}";

    return text;
}