// ==UserScript==
// @name         filterJandanPics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  根据好评率来过滤显示煎蛋无聊图和妹子图。不好的图隐藏并停止下载；隐藏广告。
// @author       https://github.com/samoyi/MyUserScript
// @match        http://jandan.net/ooxx*
// @match        http://jandan.net/pic*
// @grant        none
// ==/UserScript==

 
{
	 
	const GOOD_RATE = 10; // OO/XX

	function nextPage()
	{
		let oClickEvent = document.createEvent("MouseEvent");
		oClickEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.querySelector(".previous-comment-page").dispatchEvent(oClickEvent);
	}
		

	let oPicOl = document.querySelector(".commentlist"),
		aLi = oPicOl.querySelectorAll("li"), // 如果插入了广告，则包含广告的li
		nLiAmount = aLi.length,
		aPicLi = [], // 不包含广告的li
		nPicAmount = 0,
		aOOBtn = oPicOl.querySelectorAll(".acv4"), // 所有的OO按钮
		aXXBtn = oPicOl.querySelectorAll(".acva"),
		aOOAmount = [], // 所有的OO数
		aXXAmount = [];

	for(let i=0; i<nLiAmount; i++) // 筛选真正的图片li
	{
		if( aLi[i].id.indexOf("comment-") === -1 )
		{
			aLi[i].style.display = "none"; // 隐藏广告
		}
		else
		{
			aPicLi.push(aLi[i]);
		}
	}	

	let sThisXX = "";
	nPicAmount = aPicLi.length;
	for(let i=0; i<nPicAmount; i++) // 获取所有的OO数和XX数
	{
		aOOAmount.push(aOOBtn[i].nextElementSibling.textContent);
		sThisXX = aXXBtn[i].nextElementSibling.textContent;
		sThisXX =  "0"===sThisXX ? 1 : sThisXX; // 如果XX数是0，则让它等于1
		aXXAmount.push(sThisXX);
	}

	let nGoodAmount = nPicAmount; // 开始时默认所有的图片都是好评率合格的图片
	for(let i=0; i<nPicAmount; i++)
	{
		if( aOOAmount[i]/aXXAmount[i] < GOOD_RATE )
		{
			aPicLi[i].style.display = "none";
			aPicLi[i].querySelector("img").src = ""; // 停止下载不好的图片
			nGoodAmount--;
		}
	}
	if( nGoodAmount ) // 如果有好图添加右键翻页功能
	{
		document.addEventListener("keyup", function(ev)
		{
			if( ev.keyCode === 39 )
			{
				nextPage();
			}
		});
	}
	else // 如果没好图直接翻页
	{
		nextPage();
	}
} 