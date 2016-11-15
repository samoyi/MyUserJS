// ==UserScript==
// @name         BilibiliCumtomHomePage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自定义哔哩哔哩首页内容
// @author       https://github.com/samoyi/MyUserScript
// @match        http://www.bilibili.com/
// @grant        none
// ==/UserScript==
{

	let aHiddenSectionID = ["b_live", "b_dance", "b_game", "b_fashion", "b_ad", "b_ent", "b_teleplay"], // 不显示的版块
		aHiddenUp = [], // 不显示的UP主
		aHiddenKeywords = []; // 如果视频标题中包含该数组中的某一项的字符串，则屏蔽该视频
		
	let aHighlightUp = ["瞎看什么", "八尾妖姬"], // 高亮显示的UP主
		aHightLightKeywords = ["东方", "東方", "幻想乡", "幻想郷", "弱音", "三妈", "喵帕斯", "悠哉日常大王", "百合"]; // 如果视频标题中包含该数组中的某一项的字符串，则高亮显示该标题



	let aAllSection = document.querySelectorAll(".container-row"),
		aVisibleSection = [];

		
		
	aVisibleSection = hideSections(aHiddenSectionID);


	// 隐藏指定版块并返回显示的版块
	function hideSections( aHiddenSectionID )
	{
		
		/* aSectionID.filter(function(item, index)
		{	
			document.querySelector("#" + item).style.display = "none";
			
			aVisibleSection.splice(index, 1);
		}); */
		return Array.prototype.filter.call(aAllSection, function(item, index)
		{	
			if( aHiddenSectionID.indexOf( item.id ) !== -1 )
			{
				item.style.display = "none";
			}
			else
			{
				return true;
			}
		});
	}

	// 高亮显示指定关键词
	
	highlightKeywords( aVisibleSection, aHightLightKeywords );
	function highlightKeywords( aVisibleSection, aHightLightKeywords )
	{
		let nVisibleSectionAmount = aVisibleSection.length;
		for(let i=0; i<nVisibleSectionAmount; i++)
		{	console.log(aVisibleSection[i]);
			//let aVideoLi = aVisibleSection[i].querySelector(".v-list").children;
			/* for(let j=0, len=aVideoLi.length; j<len; j++ )
			{
				let sTitle = aVideoLi[j].children[0].children[1].querySelector(".t").textContent;
				alert(sTitle);
			} */
		}
		
	} 

	// 隐藏指定
}
