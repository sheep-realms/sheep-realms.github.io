
function pageload(){		//页面基础布局生成
	var topbar=document.getElementsByClassName("topbar");
	topbar[0].innerHTML = "<p><a href=\"https://www.mcbbs.net/?2153967\" target=\"_blank\">联系作者</a> | <a href=\"https://www.mcbbs.net/thread-867407-1-1.html\" target=\"_blank\">查看MCBBS介绍</a> | <a href=\"https://pan.baidu.com/s/1ms4EHaTjQQ2OlP8OAyFMDw\" target=\"_blank\">下载/更新</a></p>"
	var bottombar=document.getElementsByClassName("bottombar");
	bottombar[0].innerHTML = "<p>以上帮助没有解决您的问题？<a href=\"https://www.mcbbs.net/thread-867407-1-1.html\" target=\"_blank\">去询问作者>></a></p>"
}

function toggle(id){		//隐藏/显示目录
	var tb=document.getElementById(id);
	var tc=document.getElementById('tog_txt');
	if(tb.style.display==='none') {
		tb.style.display='';
		tc.innerHTML='隐藏';
	} else { 
		tb.style.display='none';
		tc.innerHTML='显示';
	}
}

function indexload(){		//生成目录
	var indextable=document.getElementsByClassName("tog_index");
	indextable[0].innerHTML = "<tr bgcolor=\"#f2f2f2\"><td><p><b>目录</b></p></td><td width=\"120px\"><p><b>[</b><a class=\"pointer\" id=\"tog_txt\" onClick=\"toggle('hide_index');\">隐藏</a><b>]</b></p></td></tr><tr id=\"hide_index\"><td colspan=\"2\"><ol class=\"hide_index_ol\"></ol></td></tr>";
	var h2=document.getElementsByTagName("h2");
	var h2title;
	var index=document.getElementsByClassName("hide_index_ol");
	for(var i=0; i<h2.length; i++) {
		h2[i].setAttribute("id","h2_"+i);
		h2title = h2[i].getAttribute("name");
		index[0].innerHTML += "<li><a href=\"#"+h2[i].getAttribute("id")+"\">"+h2title+"</a></li>";
	}
	if (indextable[0].getAttribute("hide")==="1") {
		toggle('hide_index');
		toggletxt('tog_txt');
	}
}

function notesload(){		//生成注释与外部链接
	var note=document.getElementsByClassName("note");
	var notetext;
	var references=document.getElementsByTagName("references");
	for(var i=0; i<note.length; i++) {
		var n = i+1;
		notetext = note[i].getAttribute("title");
		note[i].setAttribute("id","note_"+n);
		note[i].setAttribute("href","#references_"+n);
		note[i].innerHTML = "["+n+"]";
		if (i>0) {
			references[0].innerHTML += "<br>";
		}
		if (note[i].getAttribute("url")===null) {
			references[0].innerHTML += "<a id=\"references_"+n+"\" href=\"#"+note[i].getAttribute("id")+"\">↑["+n+"]</a> <ref>"+notetext+"</ref>";
		} else {
			references[0].innerHTML += "<a id=\"references_"+n+"\" href=\"#"+note[i].getAttribute("id")+"\">↑["+n+"]</a> <a href=\""+note[i].getAttribute("url")+"\" target=\"_blank\">"+notetext+"</a>";
		}
	}
}