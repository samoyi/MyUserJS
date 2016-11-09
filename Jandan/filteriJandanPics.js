// ==UserScript==
// @name         filteriJandanPics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  移动端。根据好评率来过滤显示煎蛋无聊图和妹子图。不好的图隐藏并停止下载；隐藏广告。
// @author       https://github.com/samoyi/MyUserScript
// @match        http://i.jandan.net/ooxx*
// @match        http://i.jandan.net/pic*
// @grant        none
// ==/UserScript==

 
	 
var GOOD_RATE = 10; // OO/XX

function nextPage()
{
	var oClickEvent = document.createEvent("MouseEvent");
	oClickEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	document.querySelector(".previous-comment-page").dispatchEvent(oClickEvent);
}
	

var oPicOl = document.querySelector(".commentlist"),
	aLi = oPicOl.querySelectorAll("li"), // 如果插入了广告，则包含广告的li
	nLiAmount = aLi.length,
	aPicLi = [], // 不包含广告的li
	nPicAmount = 0,
	aOOBtn = oPicOl.querySelectorAll(".acv4"), // 所有的OO按钮
	aXXBtn = oPicOl.querySelectorAll(".acva"),
	aOOAmount = [], // 所有的OO数
	aXXAmount = [];

for(var i=0; i<nLiAmount; i++) // 筛选真正的图片li
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

var sThisXX = "";
nPicAmount = aPicLi.length;
for(var j=0; j<nPicAmount; j++) // 获取所有的OO数和XX数
{
	aOOAmount.push(aOOBtn[j].nextElementSibling.textContent);
	sThisXX = aXXBtn[j].nextElementSibling.textContent;
	sThisXX =  "0"===sThisXX ? 1 : sThisXX; // 如果XX数是0，则让它等于1
	aXXAmount.push(sThisXX);
}

var nGoodAmount = nPicAmount; // 开始时默认所有的图片都是好评率合格的图片
for(var k=0; k<nPicAmount; k++)
{
	if( aOOAmount[k]/aXXAmount[k] < GOOD_RATE )
	{
		aPicLi[k].style.display = "none";
		aPicLi[k].querySelector("img").src = ""; // 停止下载不好的图片
		nGoodAmount--;
	}
}
if( !nGoodAmount ) // 如果没有好图自动下一页
{
	nextPage();
}

