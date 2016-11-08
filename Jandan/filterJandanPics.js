// ==UserScript==
// @name         filterJandanPics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  根据好评率来过滤显示煎蛋无聊图和妹子图
// @author       https://github.com/samoyi/MyUserScript
// @match        http://jandan.net/ooxx*
// @match        http://jandan.net/pic*
// @grant        none
// ==/UserScript==

/* 
 * TODO
 * 1. match是否能匹配第一页
 * 2. 加入当前页没有自动翻页功能
 * 3. 加入快捷键翻页功能
 */
document.addEventListener("DOMContentLoaded",function()
{
	const GOOD_RATE = 10; // OO/XX
	
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
		if( aLi[i].id.indexOf("comment-") !== -1 )
		{
			aPicLi.push(aLi[i]);
		}
		
	}	
	
	nPicAmount = aPicLi.length;
	for(let i=0; i<nPicAmount; i++) // 获取所有的OO数和XX数
	{
		aOOAmount.push(aOOBtn[i].nextElementSibling.textContent);
		aXXAmount.push(aXXBtn[i].nextElementSibling.textContent);
	}

	for(let i=0; i<nPicAmount; i++)
	{
		if( aOOAmount[i]/aXXAmount[i] < GOOD_RATE )
		{
			aPicLi[i].style.display = "none";
		}
	}
});