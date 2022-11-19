// JavaScript Document

function pageload(){		//页面基础布局生成
	var pagesave=document.getElementsByClassName("side-menu");
	pagesave[0].innerHTML = '<div class="side-menu"><a href="https://sheep-realms.github.io/index.html">首页</a><a href="https://sheep-realms.github.io/archives.html">档案馆</a><div class="side-menu-tltle">工具</div><a href="https://sheep-realms.github.io/special.html">特殊页面</a>';
	
	pagesave=document.getElementsByClassName("bottom");
	pagesave[0].innerHTML = '<div class="bottom-info"><p><a href="https://sheep-realms.github.io/index.html">首页</a> | <a href="#top">回顶部</a></p><p>©SHEEP_REALMS</p></div>';
}