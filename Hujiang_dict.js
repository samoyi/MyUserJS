// ==UserScript==
// @name         Hujiang_dict
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  沪江小D日本词典 只适用于日文词典
// @author       You
// @match        https://dict.hjenglish.com/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function()
{
    // 删除页面多余元素
    {
        //删除最顶部
        document.querySelector('#new_top_default_inc_new_header3_pnl_newHead').style.opacity = 0;

        // 删除查询框周围多余元素
        filterNode ( document.querySelector('#xd_search .xd_search_con'), document.querySelector('#search_box') );

        // 删除主体多余元素
        filterNode ( document.querySelector('#main .main_container'), document.querySelector('#headword_jp_1') );
        filterNode ( document.querySelector('#main'), document.querySelector('#main .main_container') );
        filterNode ( document.querySelector('#webbox-content'), document.querySelector('#main') );

        // 筛选oParent的子元素，除了oFilter以外的都变透明
        function filterNode(oParent, oFilter){
            [...(oParent.children)].forEach( (item)=>{
                if( item !== oFilter ){
                    item.style.opacity=0;
                }
            });
        }

        // 删除弹出层
        // 弹出层是异步加载，所以持续删除
        let hideTimer = setInterval(function(){
            hidePopup();
        }, 50);
        setTimeout(function(){
            clearInterval(hideTimer);
        }, 5000);
        function hidePopup(){
            [...(document.body.children)].forEach((item)=>{
                if( item.style.zIndex && Number.parseInt(item.style.zIndex)>0 ){
                    item.style.opacity = 0;
                }
            });
        }
    }




    // 页面切换回来输入框自动获得焦点
    {

        let w = document.querySelector("#w"),
            btn_js = document.querySelector("#btn_js"),
            btn_cj = document.querySelector("#btn_cj"),
            selectInput = function(){
                w.focus();
                w.select();
            };

        window.addEventListener("focus", function(){
            selectInput();
        });

        document.addEventListener("click", function(ev){
            if( ev.target !== w && ev.target !== btn_js && ev.target !== btn_cj ) {
                selectInput();
            }
        });
    }
});
