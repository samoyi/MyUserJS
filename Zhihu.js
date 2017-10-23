// ==UserScript==
// @name         Zhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽包含指定关键词的知乎提问
// @author       You
// @author       https://www.zhihu.com/
// @match        https://www.zhihu.com/search*
// @grant        none
// ==/UserScript==

{
    setInterval(function(){
        let answers = document.querySelectorAll('.list .item'),
        keywords = ['如何看待', '如何评价', '评价'];
        [...answers].forEach((item)=>{
            let bHasKeyword = keywords.some((keyword)=>{
                return item.querySelector('.title a').innerHTML.includes(keyword);
            });
            if(bHasKeyword){
                item.style.display = 'none';
            }
        });
    }, 1000);
}
