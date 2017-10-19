var PullToRefresh=function(){function e(){var e=s.classPrefix,n=s.ptrElement,t=s.iconArrow,r=s.iconRefreshing,o=s.instructionsRefreshing,i=s.instructionsPullToRefresh,l=s.instructionsReleaseToRefresh,c=n.querySelector("."+e+"icon"),a=n.querySelector("."+e+"text");"refreshing"===f?c.innerHTML=r:c.innerHTML=t,"releasing"===f&&(a.innerHTML=l),("pulling"===f||"pending"===f)&&(a.innerHTML=i),"refreshing"===f&&(a.innerHTML=o)}function n(){function n(){var e=s.cssProp,n=s.ptrElement,t=s.classPrefix;n.classList.remove(t+"refresh"),n.style[e]="0px",f="pending"}function t(n){var t=s.shouldPullToRefresh,o=s.triggerElement;t()&&(c=n.touches[0].screenY),"pending"===f&&(clearTimeout(r),p=o.contains(n.target),f="pending",e())}function o(n){var t=s.cssProp,r=s.classPrefix,o=s.distMax,i=s.distThreshold,l=s.ptrElement,h=s.resistanceFunction,v=s.shouldPullToRefresh;return c?a=n.touches[0].screenY:v()&&(c=n.touches[0].screenY),p&&"refreshing"!==f?("pending"===f&&(l.classList.add(r+"pull"),f="pulling",e()),c&&a&&(u=a-c),void(u>0&&(n.preventDefault(),l.style[t]=d+"px",d=h(u/i)*Math.min(o,u),"pulling"===f&&d>i&&(l.classList.add(r+"release"),f="releasing",e()),"releasing"===f&&i>d&&(l.classList.remove(r+"release"),f="pulling",e())))):void(v()&&a>c&&n.preventDefault())}function i(){var t=s.ptrElement,o=s.onRefresh,i=s.refreshTimeout,l=s.distThreshold,h=s.distReload,p=s.cssProp,v=s.classPrefix;if("releasing"===f&&d>l)f="refreshing",t.style[p]=h+"px",t.classList.add(v+"refresh"),r=setTimeout(function(){var e=o(n);e&&"function"==typeof e.then&&e.then(function(){return n()}),e||o.length||n()},i);else{if("refreshing"===f)return;t.style[p]="0px",f="pending"}e(),t.classList.remove(v+"release"),t.classList.remove(v+"pull"),c=a=null,u=d=0}function l(){var e=s.mainElement,n=s.classPrefix,t=s.shouldPullToRefresh;e.classList.toggle(n+"top",t())}return window.addEventListener("touchend",i),window.addEventListener("touchstart",t),window.addEventListener("touchmove",o,v?{passive:s.passive||!1}:void 0),window.addEventListener("scroll",l),{onTouchStart:t,onTouchMove:o,onTouchEnd:i,onScroll:l}}function t(){var e=s.mainElement,n=s.getMarkup,t=s.getStyles,r=s.classPrefix,o=s.onInit;if(!document.querySelector("."+r+"ptr")){var i=document.createElement("div");e!==document.body?e.parentNode.insertBefore(i,e):document.body.insertBefore(i,document.body.firstChild),i.classList.add(r+"ptr"),i.innerHTML=n().replace(/__PREFIX__/g,r),s.ptrElement=i}var l;return document.querySelector("#pull-to-refresh-js-style")?l=document.querySelector("#pull-to-refresh-js-style"):(l=document.createElement("style"),l.setAttribute("id","pull-to-refresh-js-style"),document.head.appendChild(l)),l.textContent=t().replace(/__PREFIX__/g,r).replace(/\s+/g," "),"function"==typeof o&&o(s),{styleNode:l,ptrElement:s.ptrElement}}var r,o=function(){return'<div class="__PREFIX__box"><div class="__PREFIX__content"><div class="__PREFIX__icon"></div><div class="__PREFIX__text"></div></div></div>'},i=function(){return".__PREFIX__ptr {\n  box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.12);\n  pointer-events: none;\n  font-size: 0.85em;\n  font-weight: bold;\n  top: 0;\n  height: 0;\n  transition: height 0.3s, min-height 0.3s;\n  text-align: center;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-end;\n  align-content: stretch;\n}\n.__PREFIX__box {\n  padding: 10px;\n  flex-basis: 100%;\n}\n.__PREFIX__pull {\n  transition: none;\n}\n.__PREFIX__text {\n  margin-top: .33em;\n  color: rgba(0, 0, 0, 0.3);\n}\n.__PREFIX__icon {\n  color: rgba(0, 0, 0, 0.3);\n  transition: transform .3s;\n}\n.__PREFIX__top {\n  touch-action: pan-x pan-down pinch-zoom;\n}\n.__PREFIX__release .__PREFIX__icon {\n  transform: rotate(180deg);\n}\n"},s={},l={distThreshold:60,distMax:80,distReload:50,bodyOffset:20,mainElement:"body",triggerElement:"body",ptrElement:".ptr",classPrefix:"ptr--",cssProp:"min-height",iconArrow:"&#8675;",iconRefreshing:"&hellip;",instructionsPullToRefresh:"",instructionsReleaseToRefresh:"",instructionsRefreshing:"Refreshing",refreshTimeout:500,getMarkup:o,getStyles:i,onInit:function(){},onRefresh:function(){return location.reload()},resistanceFunction:function(e){return Math.min(1,e/2.5)},shouldPullToRefresh:function(){return!window.scrollY}},c=null,a=null,u=0,d=0,f="pending",h=!1,p=!1,v=!1;try{window.addEventListener("test",null,{get passive(){v=!0}})}catch(m){}var g={init:function(e){void 0===e&&(e={});var r;Object.keys(l).forEach(function(n){s[n]=e[n]||l[n]});var o=["mainElement","ptrElement","triggerElement"];o.forEach(function(e){"string"==typeof s[e]&&(s[e]=document.querySelector(s[e]))}),h||(r=n(),h=!0);var i=t(),c=i.styleNode,a=i.ptrElement;return{destroy:function(){window.removeEventListener("touchstart",r.onTouchStart),window.removeEventListener("touchend",r.onTouchEnd),window.removeEventListener("touchmove",r.onTouchMove,v?{passive:s.passive||!1}:void 0),window.removeEventListener("scroll",r.onScroll),c.parentNode.removeChild(c),a.parentNode.removeChild(a),h=!1,r=null,c=null,a=null,s={}}}}};return g}();