// ==UserScript==
// @name         filterTopicsByGroup.user
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在“我的小组话题”页面只显示指定小组的话题列表；如果当前页没有指定小组的话题，则直接跳转到下一页；方向键右键可以跳转到下一页。
// @author       https://github.com/samoyi/MyUserScript
// @match        https://www.douban.com/group/
// @match        https://www.douban.com/group/?start=*
// @grant        none
// ==/UserScript==

{	
	let aBisibleGroupUrl = [ // 只显示这两个小组的话题
		"https://www.douban.com/group/xiaotanzi/", // 北京租房
		"https://www.douban.com/group/26926/" // 北京租房豆瓣
	];
	
	let aTopic = document.querySelector(".olt").querySelectorAll("tr"); // 话题列表
	let bHideAll = true;
	aTopic.forEach(function(item)
	{
		if( -1 === aBisibleGroupUrl.indexOf( item.querySelector(".td-group").children[0].href ) )
		{	
			item.style.display = "none";
		}
		else
		{
			bHideAll = false;
		}
	});
	
	function nextPage()
	{
		let oClickEvent = document.createEvent("MouseEvent");
		oClickEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.querySelector(".next").querySelector("a").dispatchEvent(oClickEvent);
	}
	if( bHideAll ) // 该页没有指定小组的话题
	{	
		nextPage();
	}
	else // 添加右键跳转下一页
	{
		document.addEventListener("keyup", function(ev)
		{
			if( ev.keyCode === 39 )
			{
				nextPage();
			}
		});
	}
}