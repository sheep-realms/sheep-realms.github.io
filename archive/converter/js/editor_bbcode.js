$(function() {
    (function ($) {
        "use strict";
        $.fn.extend({
            insertAtCaret : function (myValue, selStart=myValue.length, selEnd=myValue.length) {
                var $t = $(this)[0];
                if (document.selection) {
                    this.focus();
                    var sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                } else
                    if ($t.selectionStart || $t.selectionStart == '0') {
                        var startPos = $t.selectionStart;
                        var endPos = $t.selectionEnd;
                        var scrollTop = $t.scrollTop;
                        $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                        this.focus();
                        $t.selectionStart = startPos + selStart;
                        $t.selectionEnd = startPos + selEnd;
                        $t.scrollTop = scrollTop;
                    } else {
                        this.value += myValue;
                        this.focus();
                    }
            },

            getSelText : function () {
                var $t = $(this)[0];
                if (document.selection) {
                    return document.selection.createRange();
                } else {
                    if ($t.selectionStart || $t.selectionStart == '0') {
                        return $t.value.substr($t.value.selectionStart, $t.value.selectionEnd)
                    } else {
                        
                    }
                }
            }
        });
    })(jQuery);
})

function selText(id) {
    obj = document.getElementById(id);
	var start = obj.selectionStart;
	var end = obj.selectionEnd;
    return obj.value.substring(start,end)
}

$('button[class*="btn"]').click(function() {
    var jsontext = {};
    var textid = $(this).parent().parents('.editor').data('obj');
    var seltxt = selText(textid);
    var code = $(this).data('code').toLowerCase();

    switch (code) {
        case 'b':
        case 'i':
        case 'u':
        case 's':
        case 'quote':
        case 'code':
            jsontext = BBCode(code, seltxt);
            break;
        case 'hr':
            jsontext = BBCode(code);
            break;
        case 'font':
            showIpt('iptbox-font');
            break;
        case 'size':
            showIpt('iptbox-size');
            break;
        case 'p':
            showConIpt('p', '内容', '行高', '缩进字符', '对齐方式', '{{{SELECTTEXT}}}', "30", "2", "left", "需要自动排版的内容（使用“{{{SELECTTEXT}}}”指代选中的内容）", "每行的高度（单位：像素）", "首行缩进的字符数", "left / centent / right", true);
            return;
        case 'align':
            jsontext = BBCode(code, seltxt, $(this).data('v1').toLowerCase());
            break;
        case 'url':
            showConIpt('url', '显示文本', '链接地址', null, null, seltxt, "http://", "", "", "显示在链接上的内容", "链接地址");
            return;
        case 'img':
            showConIpt('url', '图片地址', '宽度', '高度', null, seltxt, "", "", "", "图片文件的链接地址", "图片的宽度（填写此参数必须填写高度）", "图片的高度");
            return;
        default:
            var v0t = $(this).data('v0-title');
            var v1t = $(this).data('v1-title');
            var v2t = $(this).data('v2-title');
            var v3t = $(this).data('v3-title');
            var v0tp = $(this).data('v0-tip');
            var v1tp = $(this).data('v1-tip');
            var v2tp = $(this).data('v2-tip');
            var v3tp = $(this).data('v3-tip');
            showConIpt(
                code,
                v0t, v1t, v2t, v3t,
                seltxt, "", "", "",
                v0tp, v1tp, v2tp, v3tp
            );
    }

    $('#'+$(this).parent().parents('.editor').data('obj')).focus();
    $('#'+$(this).parent().parents('.editor').data('obj')).insertAtCaret(jsontext.text, jsontext.selStart, jsontext.selEnd);
})

$('button[class*="btn"]').dblclick(function() {
    var jsontext = {};
    var textid = $(this).parent().parents('.editor').data('obj');
    var seltxt = selText(textid);
    var code = $(this).data('code').toLowerCase();

    switch (code) {
        case 'p':
            iptbarOut();
            return;
        case 'url':
        case 'img':
            jsontext = BBCode(code, seltxt);
            break;
        default:
            return;
    }

    showIpt();
    $('#'+$(this).parent().parents('.editor').data('obj')).focus();
    $('#'+$(this).parent().parents('.editor').data('obj')).insertAtCaret(jsontext.text, jsontext.selStart, jsontext.selEnd);
})

function showIpt(id=null) {
    if (id!=null) {
        if ($('#'+id).hasClass('close') != true && id != "iptbox") {
            $('#'+id).addClass('close');
            return;
        }
    }
    $('.ipt-bar').addClass('close');

    if(id!=null) $('#'+id).removeClass('close');
}

function showConIpt(code, vt0, vt1=null, vt2=null, vt3=null, v0="", v1="", v2="", v3="", vm0="", vm1="", vm2="", vm3="", vspt=false) {
    $('#iptbox').attr('data-code',code);
    $('#iptbox').attr('data-vspt',vspt);
    //if (vspt==true) $('#iptbox').attr('data-vspt',"1");
    $('#iptbox .vline').addClass('hide');
    $('#iptbox .v').val('');
    $('#iptbox .vl0').removeClass('hide');

    if (vt1 != null && vt1 != "") $('#iptbox .vl1').removeClass('hide');
    if (vt2 != null && vt2 != "") $('#iptbox .vl2').removeClass('hide');
    if (vt3 != null && vt3 != "") $('#iptbox .vl3').removeClass('hide');

    $('#iptbox #vt0').text(vt0);
    $('#iptbox #vt1').text(vt1);
    $('#iptbox #vt2').text(vt2);
    $('#iptbox #vt3').text(vt3);

    $('#iptbox #v0').val(v0);
    $('#iptbox #v1').val(v1);
    $('#iptbox #v2').val(v2);
    $('#iptbox #v3').val(v3);

    if (vm0 != "") {
        $('#iptbox #vm0').text(vm0);
        $('#iptbox #vm0').removeClass('hide');
    }
    if (vm1 != "") {
        $('#iptbox #vm1').text(vm1);
        $('#iptbox #vm1').removeClass('hide');
    }
    if (vm2 != "") {
        $('#iptbox #vm2').text(vm2);
        $('#iptbox #vm2').removeClass('hide');
    }
    if (vm3 != "") {
        $('#iptbox #vm3').text(vm3);
        $('#iptbox #vm3').removeClass('hide');
    }

    showIpt('iptbox');
    if (v0 == "") {
        $('#iptbox #v0').focus();
    } else {
        $('#iptbox #v1').focus();
        $('#iptbox #v1').select();
    }
}

function output(code, v1=null, v2=null, v3=null, vspt=false, nospace=false) {
    var text = selText('main-text');
    if (nospace) {
        if (v1=="") v1=null;
        if (v2=="") v2=null;
        if (v3=="") v3=null;
    }
    var jsontext = BBCode(code, text, v1, v2, v3, vspt);
    $('#main-text').focus();
    $('#main-text').insertAtCaret(jsontext.text, jsontext.selStart, jsontext.selEnd);
    showIpt();
}

function iptbarOut() {
    var code = $('#iptbox').data('code');
    var vspt = $('#iptbox').data('vspt');
    // var vspt = false;
    // if ($('#iptbox').data('vspt') == "1") {
    //     vspt = true;
    // }
    var v0 = $('#iptbox #v0').val();
    var v1 = $('#iptbox #v1').val();
    var v2 = $('#iptbox #v2').val();
    var v3 = $('#iptbox #v3').val();
    if (v1=="") v1=null;
    if (v2=="") v2=null;
    if (v3=="") v3=null;

    v0 = v0.replaceAll('{{{SELECTTEXT}}}', selText('main-text'));

    var jsontext = BBCode(code, v0, v1, v2, v3, vspt);
    $('#main-text').focus();
    $('#main-text').insertAtCaret(jsontext.text, jsontext.selStart, jsontext.selEnd);
    showIpt();
}

function BBCode(code, text=null, v1=null, v2=null, v3=null, vspt=false) {
    var vt = "";
    if (vspt) {
        vt = " ";
    }

    if (v1 != null || v2 != null || v3 != null) {
        v1 = v1.toString();
        if (v3 != null) {
            v2 = v2.toString();
            v3 = v3.toString();
            return {
                "text": "[" + code + "=" + v1 + "," + vt + v2 + "," + vt + v3 + "]" + text + "[/" + code + "]",
                "selStart": code.length + 5 + v1.length + vt.length*2 + v2.length + v3.length,
                "selEnd": code.length + 5 + v1.length + vt.length*2 + v2.length + v3.length + text.length,
            };
        } else if (v2 != null) {
            v2 = v2.toString();
            return {
                "text": "[" + code + "=" + v1 + "," + vt + v2 + "]" + text + "[/" + code + "]",
                "selStart": code.length + 4 + v1.length + vt.length + v2.length,
                "selEnd": code.length + 4 + v1.length + vt.length + v2.length + text.length,
            };
        } else {
            return {
                "text": "[" + code + "=" + v1 + "]" + text + "[/" + code + "]",
                "selStart": code.length + 3 + v1.length,
                "selEnd": code.length + 3 + v1.length + text.length,
            };
        }
    } else {
        if (text != null) {
            return {
                "text": "[" + code + "]" + text + "[/" + code + "]",
                "selStart": code.length + 2,
                "selEnd": code.length + 2 + text.length,
            };
        } else {
            return {
                "text": "[" + code + "]",
                "selStart": code.length + 2,
                "selEnd": code.length + 2,
            };
        }
    }
}