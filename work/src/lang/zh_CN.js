let lang = {
    "system": {
        "app": {
            "media": {
                "name": "媒体",
                "cmd": {
                    "close": "已关闭媒体窗口。",
                    "end": "已终止媒体程序。",
                    "goto": "已打开文件：$1",
                    "mode": "已切换模式为：$1",
                    "mode_0": "默认",
                    "mode_1": "宽屏",
                    "open": "已打开媒体窗口。"
                }
            },
            "note": {
                "name": "笔记",
                "cmd": {
                    "noteset": "已创建新的笔记。",
                    "noteset_err": "创建笔记时发生错误。",
                }
            },
            "timer": {
                "name": "时钟",
                "cmd": {
                    "nameset": "已修改时钟名称为：$1",
                    "timeset": "已修改时钟时间为：$1"
                }
            }
        },
        "cmd": {
            "unknown": "未知命令。",
        },
        "task": {
            "name": "任务",
        }
    }
}

function cmdHelp(value="") {
    var text = "";

    switch (value) {
        case '':
            text += "=====帮助手册=====<br>";
            text += "desktop - 桌面操作<br>";
            text += "help - 显示此帮助手册<br>";
            text += "media - 媒体程序<br>";
            text += "msg - 输出消息<br>";
            text += "note - 添加笔记<br>";
            text += "startw - 开始屏幕操作<br>";
            text += "taskkill - 终止任务<br>";
            text += "tasklist - 任务列表<br>";
            text += "timer - 时钟操作<br>";
            text += "已列出全部命令。<br>";
            text += "输入 help &lt;<i>命令</i>&gt; 获取命令语法帮助。";
            break;
        case 'desktop':
            text += "（该功能未完成）";
            break;
        case 'help':
            text = "语法： help &lt;<i>命令</i>&gt;<br>你有什么问题？";
            break;
        case 'media':
            text += "语法：<br>media &lt;<i>操作</i>&gt; ...<br>media (close|end|open)<br>media goto &lt;<i>URL地址...</i>&gt;<br>media mode (0|1);<br>";
            text += "* 操作<br>";
            text += "-- close - 关闭媒体窗口<br>";
            text += "-- end - 终止媒体程序<br>";
            text += "-- goto - 使用媒体程序打开文件<br>";
            text += "-- mode - 媒体程序显示模式<br>";
            text += "--- 0 - 默认<br>";
            text += "--- 1 - 宽屏<br>";
            text += "-- open - 打开媒体窗口<br>";
            break;
        case 'msg':
            text = "语法： msg &lt;<i>消息...</i>&gt;";
            break;
        case 'note':
            text = "语法： note &lt;<i>笔记内容...</i>&gt;";
            break;
        case 'startw':
            text = "（该功能未完成）";
            break;
        case 'taskkill':
            text = "语法： taskkill (id|name) &lt;<i>值</i>&gt;";
            break;
        case 'tasklist':
            text = "该命令无参数。";
            break;
        case 'timer':
            text = "（该功能未完成）";
            break;
        default:
            text = "未知命令。";
    }

    return text;
}