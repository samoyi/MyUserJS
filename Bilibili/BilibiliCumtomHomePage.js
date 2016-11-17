// ==UserScript==
// @name         BilibiliCumtomHomePage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自定义哔哩哔哩首页内容
// @author       https://github.com/samoyi/MyUserScript
// @match        http://www.bilibili.com/
// @grant        none
// ==/UserScript==


/*
 *  说明：
 *  1. 自定义区域是左边从上到下，从“推广”到“特别推荐”结束的版块。
 *  2. 不包括“新番放送表”和“热门节目”，这两个都不是独立版块版块。
 *  3. 各版块ID：
 *    	推广 		b_promote
 *	  	动画 		b_douga	
 *		活动推广 	b_tag_promote
 *		番剧 		b_bangumi
 *		音乐 		b_music
 *		科技 		b_technology
 *      生活 		b_life
 *		鬼畜 		b_kichiku
 *		电影 		b_movie
 *  	电视剧 		b_teleplay
 *		时尚 		b_fashion
 * 		广告 		b_ad
 *		娱乐 		b_ent
 *		游戏 		b_game
 *		舞蹈 		b_dance
 *		直播 		b_live
 *		特别推荐 	b_recommend
 */
	
// 设置区域 ------------------------------------------------------------------------------------------------------------------------	
let aHiddenSectionID = ["b_live", "b_dance", "b_game", "b_fashion", "b_ad", "b_ent", "b_teleplay"], // 不显示的版块ID
	aHiddenUp = [], // 不显示的UP主
	aHiddenKeywords = [], // 如果视频标题中包含该数组中的某一项的字符串，则屏蔽该视频
	aHighlightUp = ["瞎看什么", "八尾妖姬"], // 高亮显示的UP主
	aHightLightKeywords = ["的", "东方", "東方", "幻想乡", "幻想郷", "弱音", "三妈", "喵帕斯", "悠哉日常大王", "百合"]; // 如果视频标题中包含该数组中的某一项的字符串，则高亮显示该标题

const HEIGHTLIGHT_COLOR = "red";	// 高亮颜色
		
	
// 公共函数区域 -------------------------------------------------------------------------------------------------------------------

// 添加DOM监听器
function addDomObserver(oTarget, oConfig, fnCallback)
{
	var observer = new MutationObserver(function(mutations, instance) { fnCallback(mutations, instance); });
	 
	var oConfig = oConfig;

	observer.observe(oTarget, oConfig);
}
		
		
// 功能区域	-----------------------------------------------------------------------------------------------------------------------
window.addEventListener("load", function()
{	
	let aAllSection = document.querySelectorAll(".container-row"), // 所有版块
		aVisibleSection = aAllSection; // 显示的版块。默认为所有版块


	// 隐藏指定版块并返回显示的版块
	if( aHiddenSectionID.length )
	{
		aVisibleSection = hideSections(aHiddenSectionID);
		function hideSections( aHiddenSectionID )
		{
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
	}
	

	
	// 高亮显示指定关键词
	/*
	 *  因为某一版块的视频是滚动条滚到时才加载的，所以需要监听各版块视频列表区域的DOM变化
	 */
	if( aHightLightKeywords.length )
	{
		// 监听器配置。只监听子元素变化
		var oConfig = { 
						childList: true, 
						subtree: false
					};
						
		// 高亮标题。参数为某一版块的视频列表，高亮其中含有关键字的视频列表标题
		function hightlightTitle( aVideoList )
		{	
			for(let i=0, len=aVideoList.length; i<len; i++ )
			{		
				let oTitle = aVideoList[i].querySelector(".t");
				let bHasKeywords = aHightLightKeywords.some(function(item)
				{
					return oTitle.textContent.indexOf( item ) !== -1;
				});
				if( bHasKeywords )
				{
					oTitle.style.backgroundColor = HEIGHTLIGHT_COLOR;
				} 
			}
		}
		
		highlightKeywordTitle(aHightLightKeywords );
		function highlightKeywordTitle(aHightLightKeywords )
		{
			let nVisibleSectionAmount = aVisibleSection.length, // 被显示的版块的总数
				aVideoLi = [];	// 每一个板块中的视频li
			
			 // 获得不同版块的视频列表ul
			function getVideoUl(oVisibleSection)
			{
				let oVideoUl = oVisibleSection.querySelector(".v-list"); // 常规版块
				if( !oVideoUl)
				{
					oVideoUl = oVisibleSection.querySelector(".rm-list"); // 推广、特别推荐
				}
				return oVideoUl;
			}
			
			for(let i=0; i<nVisibleSectionAmount; i++)
			{	
				let oVideoUl = getVideoUl(aVisibleSection[i]);
				aVideoLi = oVideoUl.querySelectorAll("li");
				if( aVideoLi )
				{
					hightlightTitle( aVideoLi ); // 已经显示出来的li直接高亮，没显示的在监听到显示后再高亮
				}
				
				addDomObserver(oVideoUl, oConfig, function(mutations) // 给每一个视频列表ul添加DOM监听
				{	
					mutations.forEach(function(item)
					{
						if( item.type === "childList" )
						{
							hightlightTitle( item.target.querySelectorAll("li") );
						}
					});
				}); 
			}
		}
	}
	 

	// 隐藏指定
});
