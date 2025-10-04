/**
 * Created by Founder007 on 2017/10/13.
 */
$(function () {
    //动态菜单数据
    var treeData = [{
        text : "新手入门",
        state : "closed",
        children : [{
			text : "新人阅读",
			attributes : {
				url : "page/new.html"
			}
		}, {
			text : "材质变动表",
			attributes : {
				url : "page/pake_table.html"
			}
		}, {
			text : "帮助文档使用指南",
			attributes : {
				url : "page/help.html"
			}
		}
        ]
    }, {
        text : "高级教程",
        state : "closed",
        children : [{
			text : "替换音符盒图标",
			attributes : {
				url : "page/senior/noteblock_icon.html"
			}
		}
        ]
    }, {
        text : "更新日志",
        state : "closed",
        children : [{
			text : "最新更改",
			attributes : {
				url : "page/updata.html"
			}
		}, {
			text : "历史更改",
			state : "closed",
			children : [{
				text : "v3.3.5",
				attributes : {
					url : "page/updata/3.3.5.html"
				}
			}, {
				text : "v3.3.4",
				attributes : {
					url : "page/updata/3.3.4.html"
				}
			}, {
				text : "v3.3.3",
				attributes : {
					url : "page/updata/3.3.3.html"
				}
			}, {
				text : "v3.3.2",
				attributes : {
					url : "page/updata/3.3.2.html"
				}
			}, {
				text : "v3.3.1",
				attributes : {
					url : "page/updata/3.3.1.html"
				}
			}, {
				text : "v3.3",
				attributes : {
					url : "page/updata/3.3.html"
				}
			}, {
				text : "v3.2",
				attributes : {
					url : "page/updata/3.2.html"
				}
			}
			]
		}
        ]
    }, {
        text : "联网帮助",
        state : "closed",
        children : [{
			text : "MCBBS介绍页",
			attributes : {
				url : "https://www.mcbbs.net/thread-867407-1-1.html"
			}
		}, {
			text : "材质包安装教程",
			attributes : {
				url : "https://www.mcbbs.net/thread-880869-1-1.html"
			}
		}, {
			text : "百度网盘下载",
			attributes : {
				url : "https://pan.baidu.com/s/1ms4EHaTjQQ2OlP8OAyFMDw"
			}
		}
        ]
    }, {
        text : "作者信息",
        state : "closed",
        children : [{
			text : "作者介绍",
			attributes : {
				url : "page/author.html"
			}
		}, {
			text : "MCBBS主页",
			attributes : {
				url : "https://www.mcbbs.net/?2153967"
			}
		}, {
			text : "网易我的世界论坛主页",
			attributes : {
				url : "http://mc.netease.com/?526"
			}
		}, {
			text : "爱发电主页",
			attributes : {
				url : "https://afdian.net/@sheep_realms"
			}
		}, {
			text : "萌娘百科主页",
			attributes : {
				url : "https://zh.moegirl.org/User:Sheep-realms"
			}
		}, {
			text : "Bilibili主页",
			attributes : {
				url : "https://space.bilibili.com/43881503"
			}
		}
        ]
    }
    ];

    //实例化树形菜单
    $("#tree").tree({
        data : treeData,
        lines : true,
        onClick : function (node) {
            if (node.attributes) {
                Open(node.text, node.attributes.url);
            }
        }
    });
    //在右边center区域打开菜单，新增tab
    function Open(text, url) {
        var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:99.6%;"></iframe>';
		var pageUrl = url;

        if ($("#tabs").tabs('exists', text)) {
            $('#tabs').tabs('select', text);
        } else {
            $('#tabs').tabs('add', {
                title : text,
                closable : true,
                content : content,
				pageUrl : pageUrl
            });
        }
    }

    //绑定tabs的右键菜单
    $("#tabs").tabs({
        onContextMenu : function (e, title) {
            e.preventDefault();
            $('#tabsMenu').menu('show', {
                left : e.pageX,
                top : e.pageY
            }).data("tabTitle", title);
        }
    });

    //实例化menu的onClick事件
    $("#tabsMenu").menu({
        onClick : function (item) {
            CloseTab(this, item.name);
        }
    });

    //几个关闭事件的实现
    function CloseTab(menu, type) {
        var curTabTitle = $(menu).data("tabTitle");
        var tabs = $("#tabs");

        if (type === "close") {
            tabs.tabs("close", curTabTitle);
            return;
        }

        var allTabs = tabs.tabs("tabs");
        var closeTabsTitle = [];

        $.each(allTabs, function () {
            var opt = $(this).panel("options");
            if (opt.closable && opt.title != curTabTitle && type === "Other") {
                closeTabsTitle.push(opt.title);
            } else if (opt.closable && type === "All") {
                closeTabsTitle.push(opt.title);
            }
        });

        for (var i = 0; i < closeTabsTitle.length; i++) {
            tabs.tabs("close", closeTabsTitle[i]);
        }
    }
});