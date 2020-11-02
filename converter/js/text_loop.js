$('input[type="text"]').click(function() {
    this.select();
})

$('input[type="text"]#change').click(function() {
    var change = parseInt($('#change').val());
    if (parseInt($('#start').val()) <= parseInt($('#end').val())) {
        if (change < 0) $('#change').val(change * -1);
    } else if (parseInt($('#start').val()) > parseInt($('#end').val())) {
        if (change > 0) $('#change').val(change * -1);
    }
    this.select();
})

function start() {
    var start = $('#start').val();
    var end = $('#end').val();
    var change = $('#change').val();
    var before = $('#before').val();
    var content = $('#content').val();
    var after = $('#after').val();

    if (isNaN(start) || isNaN(end) || isNaN(end)) {
        outErr("“起始 / 结束 / 变化”值必须是数字！");
        return;
    } else {
        if (change == 0) {
            if ((start == 127 && end == 0) || (start == 192 && end == 168)) {
                outErr("我知道这几个框框看起来像是拨号上网，但这里只有三个框啊！");
            } else {
                outErr("“变化”值必须是非0数！");
            }
            return;
        } else if (change > 0) {
            if (start > end) {
                outErr("“起始”无法过渡到“结束”值！");
                return;
            }
        } else if (change < 0) {
            if (start < end) {
                outErr("“起始”无法过渡到“结束”值！");
                return;
            }
        }
    }

    $('#output').val(summon(start, end, change, before, content, after));
    $('#output').focus();
    $('#output').select();
}

function summon(start, end, change, before, content, after) {
    var text = "";

    function doEnd(value) {
        if (change > 0) {
            if (value < end) {
                return true;
            } else {
                return false;
            }
        } else if (change < 0) {
            if (value > end) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function numDes(value, add) {
        if (change > 0) {
            return parseInt(end) - value - add + parseInt(start);
        } else if (change < 0) {
            return parseInt(start) - value + add + parseInt(end);
        }
    }

    function format(formatText,value) {
        if (formatText.indexOf("{{{#SPR:NOTFORMAT}}}") != -1) {
            return formatText = formatText.replace("{{{#SPR:NOTFORMAT}}}","");
        }
        formatText = formatText.replace("{{{SPR:NUM}}}",value);
        formatText = formatText.replace("{{{SPR:NUM1}}}",value+1);
        formatText = formatText.replace("{{{SPR:NUM-ZH}}}",numZh(value));
        formatText = formatText.replace("{{{SPR:NUM-ZH-GMR}}}",numZhGmr(value,0));
        formatText = formatText.replace("{{{SPR:NUM-ZH-GMR-F}}}",numZhGmr(value,1));
        formatText = formatText.replace("{{{SPR:NUM-JP-HIRA}}}",numHira(value));
        formatText = formatText.replace("{{{SPR:NUM-JP-KATA}}}",numKata(value));
        formatText = formatText.replace("{{{SPR:NUM-EN-UPPER}}}",numEn(value,0));
        formatText = formatText.replace("{{{SPR:NUM-EN-LOWER}}}",numEn(value,1));
        formatText = formatText.replace("{{{SPR:NUM-DES}}}",numDes(value,0));
        formatText = formatText.replace("{{{SPR:NUM-DES1}}}",numDes(value,1));
        formatText = formatText.replace("{{{SPR:DATE}}}",Date());
        formatText = formatText.replace("{{{SPR:NOW}}}",Date.now());
        return formatText;
    }

    text += format(before,0);

    for (var i = parseInt(start); doEnd(i); i = parseInt(i) + parseInt(change)) {
        text += format(content,i);

        if (i > 32767 || i < -32768) {
            outErr("出于保护机制，循环变量范围超出-32768~32767将不再继续运行程序。");
            break;
        }
    }

    text += format(after,0);
    
    return text;
}