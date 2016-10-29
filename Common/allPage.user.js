

"use strict";

/*
 * 通用于所有网页
*/


const WINDOW_HEIGHT = window.innerHeight;



// 回到顶部按钮
(function()
{	
	let nTooLong = WINDOW_HEIGHT * 3,
		oBody = document.body;
	
	// 每隔一秒检查一下页面高度，检查是否因异步加载页面变得过长
	let checkLongTimer = setInterval(function()
	{
		if( oBody.offsetHeight > nTooLong )
		{	
			clearInterval(checkLongTimer);
			
			// 如果页面过长，创建回到顶部按钮。开始监听滚动距离。滚动三屏之后，出现回到顶部按钮
			let oUpToTop = document.createElement("div");
			oUpToTop.style.cssText = "display: none; width: 20px; height: 20px; background-color: rgba(0,0,0,0.2); position: fixed; right:0; top: " + WINDOW_HEIGHT/2 + "px";
			oBody.appendChild( oUpToTop );
			
			oUpToTop.addEventListener("click", function()
			{
				window.scrollTo(0, 0);
			});
			window.addEventListener("scroll", function()
			{
				if( oBody.scrollTop > nTooLong )
				{
					oUpToTop.style.display = "block";
				}
				else
				{
					oUpToTop.style.display = "none";
				}
			});
		}
	}, 1000);
})();