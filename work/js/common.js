let username = "Sheep-realms";

let userconfig = {
    "list": [
        {
            "name": "System",
        }
    ]
};

let taskLastId = 2;

String.prototype.replaceAll = function (FindText, RepText) {
    return this.replace(new RegExp(FindText, "g"), RepText);
}

$('#cmdstart').click(function() {
    startWindowAuto();
});

$('#background').click(function() {
    startWindow('close');
});

// $('#background').dblclick(function() {
//     if ($('#background').hasClass('blur')) {
//         $('#background').removeClass('blur');
//     } else {
//         $('#background').addClass('blur');
//     }
// });

$('.cmditem').click(function() {
    if ($(this).hasClass('lost')) {
        $(this).removeClass('lost');
    } else {
        $(this).addClass('lost');
    }
});

// $('.task-title').click(function() {
//     var $obj = $(this).parent('.task-item');
//     if ($obj.hasClass('close')) {
//         $obj.removeClass('close');
//     } else {
//         $obj.addClass('close');
//     }
// });

$('#cmdtask').on('click', '.task-title', function() {
    var $obj = $(this).parent('.task-item');
    if ($obj.hasClass('close')) {
        $obj.removeClass('close');
    } else {
        $obj.addClass('close');
    }
})

$('#spr-cmd-ok').click(function() {
    Command($('#cmdipttxt').val());
    $('#cmdipttxt').val('');
});

function Command(cmd) {
    if (cmd == "") return;
    var cmdtxt = cmd.split(' ');
    msgSend(username, cmd);

    var retInfo = "";

    var cmdtext = cmdtxt[1];
    if (cmdtxt[2] != undefined) {
        for(var m = 2; m < cmdtxt.length; m++) {
            cmdtext = cmdtext + ' ' + cmdtxt[m];
        }
    }

    switch (cmdtxt[0]) {
        case ' ':
            break;
        case 'desktop':
            if (cmdtxt[1] == "effect") {
                if (cmdtxt[2] == "blur") {
                    if (cmdtxt[3] == "1") {
                        $('#background').addClass('blur');
                    } else {
                        $('#background').removeClass('blur');
                    }
                    retInfo = "已应用桌面效果。";
                }
            }
            break;
        case 'help':
            retInfo = cmdHelp(cmdtxt[1]);
            break;
        case 'media':
            sysMedia(cmdtxt[1], cmdTextCut(cmd, 2));
            break;
        case 'msg':
            msgOut(cmdtext);
            break;
        case 'note':
            retInfo = sysNote(cmdtext);
            break;
        case 'startw':
            startWindow(cmdtxt[1]);
            break;
        case 'taskkill':
            taskKill(cmdtxt[1],cmdtxt[2]);
            break;
        case 'tasklist':
            retInfo = taskList();
            break;
        case 'timer':
            retInfo = sysTimer(cmdtxt[1], cmdTextCut(cmd, 2));
            break;
    }

    if (retInfo != "") msgOut(retInfo);
}

function cmdTextCut(cmd,index) {
    var cmdtxt = cmd.split(' ');
    var cmdtext = cmdtxt[index];
    for(var m = index + 1; m < cmdtxt.length; m++) {
        cmdtext = cmdtext + ' ' + cmdtxt[m];
    }
    return cmdtext;
}

function msgOut(text,noHTML=false) {
    if (noHTML) {
        text = text.replaceAll('<','&lt;');
        text = text.replaceAll('>','&gt;');
    }
    $('#cmdouttxt').append('<p>' + text + '</p>');
    $("#cmdout").scrollTop($("#cmdout")[0].offsetHeight);
}

function msgSend(user,text) {
    msgOut('&lt;' + user + '&gt;: ' + text, true);
}

function startWindow(value) {
    switch (value) {
        case 'auto':
            startWindowAuto();
            return 1;
        case 'open':
            $('.start-win').removeClass('hide');
            $('#cmdipttxt').focus();
            return 1;
        case 'close':
            $('.start-win').addClass('hide');
            return 1;
        default:
            return 0;
    }
}

function startWindowAuto() {
    if ($('#cmdlist').hasClass('hide')) {
        $('.start-win').removeClass('hide');
        $('#cmdipttxt').focus();
    } else {
        $('.start-win').addClass('hide');
    }
}

//获取任务ID
function getTaskId() {
    taskLastId++;
    return taskLastId;
}

//终止任务
function taskKill(type, value) {
    if (type == 'id') {
        $('#cmdtask .task-item[data-id="' + value + '"]').remove();
    } else if (type == 'name') {
        $('#cmdtask .task-item[data-name="' + value + '"]').remove();
    }
}

//任务列表
function taskList() {
    var text = "<table><tr><td>ID</td><td>Name</td></tr>";
    var $obj = $('#cmdtask .task-item');
    for (var i = 0; i < $obj.length; i++) {
        text += "<tr><td>" + $obj[i].dataset.id + "</td><td>" + $obj[i].dataset.name + "</td></tr>";
    }
    text += "</table>"
    return text;
}

//笔记程序
function sysNote(text) {
    $('#cmdtask').append('<div class="task-item" data-id="' + getTaskId() + '" data-name="note"><div class="task-title">' + lang.system.app.note.name + '</div><div class="task-content">' + text + '</div></div>');
    return "[" + lang.system.app.note.name + "] " + lang.system.app.note.cmd.noteset;
}

//时钟程序
function sysTimer(cmd, value) {
    switch (cmd) {
        case 'name':
            $('#clock .text').text(value);
            return "[" + lang.system.app.timer.name + "] " + lang.system.app.timer.cmd.nameset.replace('$1',value);
        default:
            return "[" + lang.system.app.timer.name + "] " + lang.system.cmd.unknown;
    }
}

//媒体程序
function sysMedia(cmd, value) {
    switch (cmd) {
        case 'open':
            $('#cmdouttxt').addClass('close');
            $('#cmdoutmedia').removeClass('close');
            break;
        case 'close':
            $('#cmdouttxt').removeClass('close');
            $('#cmdoutmedia').addClass('close');
            $("#cmdout").scrollTop($("#cmdout")[0].offsetHeight);
            break;
        case 'clear':
            $('#iframe-media').attr('src', '');
            break;
        case 'goto':
            if ($('#cmdoutmedia').hasClass('close')) {
                $('#cmdouttxt').addClass('close');
                $('#cmdoutmedia').removeClass('close');
            }
            $('#iframe-media').attr('src', value);
            break;
        case 'getsrc':
            msgOut($('#iframe-media').attr('src'));
            break;
        case 'end':
            $('#cmdouttxt').removeClass('close');
            $('#cmdoutmedia').addClass('close');
            $('#iframe-media').attr('src', '');
            $('#start-window').removeClass('media-mode');
            $("#cmdout").scrollTop($("#cmdout")[0].offsetHeight);
            break;
        case 'mode':
            if (value == 1) {
                $('#start-window').addClass('media-mode');
            } else {
                $('#start-window').removeClass('media-mode');
            }
            break;
    }
}