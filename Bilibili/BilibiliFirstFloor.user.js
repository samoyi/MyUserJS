// ==UserScript==
// @include http://www.bilibili.com/video/av*
// ==/UserScript==

"use strict";

/*
 * 哔哩哔哩视频页面自动抢评论一楼
 * 打开视频页面后，如果没有评论则评论 sFirstComment 的内容
 * 如果已经有评论，则将页面滚动到开视频的位置
*/


let sFirstComment = "第一不死于话多";

window.addEventListener("load", comment, false);
function comment()
{
	let timer = setInterval(function()
	{	
		window.scrollTo(0, document.body.scrollHeight); // 刚开始的时候不能滚到最下面，所以一直滚
		let oCommentArea = document.querySelector(".comm_list");
		if( oCommentArea ) // 如果评论框已加载
		{
			if( oCommentArea.children[0].tagName === "DIV" ) // 并且还没人评论（评论了里面都是li）
			{
				document.querySelector("#comment_text").value = sFirstComment;	
				document.querySelector(".submit-comment").click();
			}
			else
			{
				window.scrollTo(0, document.querySelector(".player-wrapper").offsetTop); // 已经有人评论了，再回滚页面到观看位置
			}
			clearInterval( timer );
		}
	}, 10);
}