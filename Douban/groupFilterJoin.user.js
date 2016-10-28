// ==UserScript==
// @include https://www.douban.com/group/*
// ==/UserScript==


"use strict";

/*
 * 
*/





// 回到顶部按钮
(function()
{	
	let aAsideGroup = document.querySelectorAll(".group-list-item");
	aAsideGroup.forEach(function(item, index, array)
	{
		if( Number.parseInt(item.querySelector(".title").querySelector("span").textContent.slice(1, -1)) > 15000 )
		{
			alert( item.querySelector(".title").querySelector("a").textContent );
		}
	});
})();