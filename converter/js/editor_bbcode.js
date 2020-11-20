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
        case 'url':
            showConIpt('url', '显示文本', '链接地址', null, null, seltxt, "http://");
            return;
    }

    $('#'+$(this).parent().parents('.editor').data('obj')).focus();
    $('#'+$(this).parent().parents('.editor').data('obj')).insertAtCaret(jsontext.text, jsontext.selStart, jsontext.selEnd);
})

function showIpt(id=null) {
    $('.ipt-bar').addClass('close');
    if(id!=null) $('#'+id).removeClass('close');
}

function showConIpt(code, vt0, vt1=null, vt2=null, vt3=null, v0="", v1="", v2="", v3="") {
    $('#iptbox').attr('data-code',code);
    $('#iptbox .vline').addClass('hide');
    $('#iptbox .v').val('');
    $('#iptbox .vl0').removeClass('hide');
    if (vt1 != null) $('#iptbox .vl1').removeClass('hide');
    if (vt2 != null) $('#iptbox .vl2').removeClass('hide');
    if (vt3 != null) $('#iptbox .vl3').removeClass('hide');
    $('#iptbox #vt0').text(vt0);
    $('#iptbox #vt1').text(vt1);
    $('#iptbox #vt2').text(vt2);
    $('#iptbox #vt3').text(vt3);
    $('#iptbox #v0').val(v0);
    $('#iptbox #v1').val(v1);
    $('#iptbox #v2').val(v2);
    $('#iptbox #v3').val(v3);
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
    var v0 = $('#iptbox #v0').val();
    var v1 = $('#iptbox #v1').val();
    var v2 = $('#iptbox #v2').val();
    var v3 = $('#iptbox #v3').val();
    if (v1=="") v1=null;
    if (v2=="") v2=null;
    if (v3=="") v3=null;

    var jsontext = BBCode(code, v0, v1, v2, v3);
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
        if (v3 != null) {

        } else if (v2 != null) {

        } else {
            v1 = v1.toString();
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