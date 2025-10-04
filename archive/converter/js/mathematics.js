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

function numZhGmr(num,type=0) {
    var before = "";
    if (num < 0) {
        before = "负"
        num = parseInt(num) * -1
    }

    var arr1, arr2;
    if (type == 0) {
        arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        arr2 = new Array('','十','百','千','万','十','百','千','亿','十','百','千','兆','十','百','千','京','十','百','千','垓','十','百','千','杼','十','百','千','穰','十','百','千','沟','十','百','千','涧','十','百','千','正','十','百','千','载','十','百','千','极','十','百','千','恒河沙','十','百','千','阿僧祇','十','百','千','那由他','十','百','千','不可思议','十','百','千','无量','十','百','千');
    } else if (type == 1) {
        arr1 = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        arr2 = new Array('','拾','佰','仟','万','拾','佰','仟','亿','拾','佰','仟','兆','拾','佰','仟','京','拾','佰','仟','垓','拾','佰','仟','杼','拾','佰','仟','穰','拾','佰','仟','沟','拾','佰','仟','涧','拾','佰','仟','正','拾','佰','仟','载','拾','佰','仟','极','拾','佰','仟','恒河沙','拾','佰','仟','阿僧祇','拾','佰','仟','那由他','拾','佰','仟','不可思议','拾','佰','仟','无量','拾','佰','仟');
    }
    
    if(!num || isNaN(num)){
        return "零";
    }
    var english = num.toString().split("")
    var result = "";
    for (var i = 0; i < english.length; i++) {
        var des_i = english.length - 1 - i;
        result = arr2[i] + result;
        var arr1_index = english[des_i];
        result = arr1[arr1_index] + result;
    }

    if (type == 0) {
        result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
        result = result.replace(/零+/g, '零');
        result = result.replace(/零兆/g, '兆').replace(/零亿/g, '亿').replace(/零万/g, '万');
        result = result.replace(/兆亿/g, '兆').replace(/兆万/g, '兆').replace(/亿万/g, '亿');
        result = result.replace(/零+$/, '')
        result = result.replace(/^一十/g, '十');
    } else if (type == 1) {
        result = result.replace(/零(仟|佰|拾)/g, '零').replace(/拾零/g, '拾');
        result = result.replace(/零+/g, '零');
        result = result.replace(/零兆/g, '兆').replace(/零亿/g, '亿').replace(/零万/g, '万');
        result = result.replace(/兆亿/g, '兆').replace(/兆万/g, '兆').replace(/亿万/g, '亿');
        result = result.replace(/零+$/, '')
        result = result.replace(/^壹拾/g, '拾');
    }

    return before + result;

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

function numEn(number,type=0) {
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

function numCorner(number,type=0) {
    var sup = new Array("⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹");
    var sub = new Array("₀","₁","₂","₃","₄","₅","₆","₇","₈","₉");
    var text = "";
    number = number.toString();

    if (type == 0) {
        for (var i = 0; i<number.length; i++) {
            text += sup[parseInt(number.substring(i,i+1))];
        }
    } else if (type == 1) {
        for (var i = 0; i<number.length; i++) {
            text += sub[parseInt(number.substring(i,i+1))];
        }
    }

    return text;
}