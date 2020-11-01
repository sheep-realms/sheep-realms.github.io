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

function numZh(number) {
    var text = "";
    if (number < 0) {
        text = "负"
    }

    number = number.toString();
    
    for (var i = 0; i<number.length; i++) {
        if (number.substring(i,i+1) == ".") {
            text += "点"
        } else {
            switch (parseInt(number.substring(i,i+1))) {
                case 0: text += "零"; break;
                case 1: text += "一"; break;
                case 2: text += "二"; break;
                case 3: text += "三"; break;
                case 4: text += "四"; break;
                case 5: text += "五"; break;
                case 6: text += "六"; break;
                case 7: text += "七"; break;
                case 8: text += "八"; break;
                case 9: text += "九"; break;
            }
        }
    }

    return text;
}

function numZhGmr(number) {
    var text = "";
    var after = "";
    if (number < 0) {
        after = "负"
        number *= -1;
    }


}

function numHira(number) {
    if (number < 0) number = parseInt(number) * -1
    
    switch (parseInt(number)) {
        case 0: text = "あ"; break;
        case 1: text = "い"; break;
        case 2: text = "う"; break;
        case 3: text = "え"; break;
        case 4: text = "お"; break;
        case 5: text = "か"; break;
        case 6: text = "き"; break;
        case 7: text = "く"; break;
        case 8: text = "け"; break;
        case 9: text = "こ"; break;
        case 10: text = "さ"; break;
        case 11: text = "し"; break;
        case 12: text = "す"; break;
        case 13: text = "せ"; break;
        case 14: text = "そ"; break;
        case 15: text = "た"; break;
        case 16: text = "ち"; break;
        case 17: text = "つ"; break;
        case 18: text = "て"; break;
        case 19: text = "と"; break;
        case 20: text = "な"; break;
        case 21: text = "に"; break;
        case 22: text = "ぬ"; break;
        case 23: text = "ね"; break;
        case 24: text = "の"; break;
        case 25: text = "は"; break;
        case 26: text = "ひ"; break;
        case 27: text = "ふ"; break;
        case 28: text = "へ"; break;
        case 29: text = "ほ"; break;
        case 30: text = "ま"; break;
        case 31: text = "み"; break;
        case 32: text = "む"; break;
        case 33: text = "め"; break;
        case 34: text = "も"; break;
        case 35: text = "や"; break;
        case 36: text = "ゆ"; break;
        case 37: text = "よ"; break;
        case 38: text = "ら"; break;
        case 39: text = "り"; break;
        case 40: text = "る"; break;
        case 41: text = "れ"; break;
        case 42: text = "ろ"; break;
        case 43: text = "わ"; break;
        case 44: text = "を"; break;
        case 45: text = "ん"; break; 
        default: text = number;
    }

    return text;
}

function numKata(number) {
    if (number < 0) number = parseInt(number) * -1
    
    switch (parseInt(number)) {
        case 0: text = "ア"; break;
        case 1: text = "イ"; break;
        case 2: text = "ウ"; break;
        case 3: text = "エ"; break;
        case 4: text = "オ"; break;
        case 5: text = "カ"; break;
        case 6: text = "キ"; break;
        case 7: text = "ク"; break;
        case 8: text = "ケ"; break;
        case 9: text = "コ"; break;
        case 10: text = "サ"; break;
        case 11: text = "シ"; break;
        case 12: text = "ス"; break;
        case 13: text = "セ"; break;
        case 14: text = "ソ"; break;
        case 15: text = "タ"; break;
        case 16: text = "チ"; break;
        case 17: text = "ツ"; break;
        case 18: text = "テ"; break;
        case 19: text = "ト"; break;
        case 20: text = "ナ"; break;
        case 21: text = "ニ"; break;
        case 22: text = "ヌ"; break;
        case 23: text = "ネ"; break;
        case 24: text = "ノ"; break;
        case 25: text = "ハ"; break;
        case 26: text = "ヒ"; break;
        case 27: text = "フ"; break;
        case 28: text = "ヘ"; break;
        case 29: text = "ホ"; break;
        case 30: text = "マ"; break;
        case 31: text = "ミ"; break;
        case 32: text = "ム"; break;
        case 33: text = "メ"; break;
        case 34: text = "モ"; break;
        case 35: text = "ヤ"; break;
        case 36: text = "ユ"; break;
        case 37: text = "ヨ"; break;
        case 38: text = "ラ"; break;
        case 39: text = "リ"; break;
        case 40: text = "ル"; break;
        case 41: text = "レ"; break;
        case 42: text = "ロ"; break;
        case 43: text = "ワ"; break;
        case 44: text = "ヲ"; break;
        case 45: text = "ン"; break;
        default: text = number;
    }

    return text;
}

function numEn(number,type) {
    var start;

    if (type == 1) {
        if (number < 26) {
            return String.fromCharCode(97 + number);
        }
    } else {
        if (number < 26) {
            return String.fromCharCode(65 + number);
        }
    }
    return number;
}