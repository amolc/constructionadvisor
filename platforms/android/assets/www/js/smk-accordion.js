!function(e){e.fn.smk_Accordion=function(c){if(this.length>1)return this.each(function(){e(this).smk_Accordion(c)}),this;var t=this;this.isInteger=function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},this.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},this.isObject=function(e){return"[object Object]"===Object.prototype.toString.call(e)};var n=e.extend({closeAble:!1,closeOther:!0,slideSpeed:150,activeIndex:1},c);e.each(n,function(e,c){var i=e.replace(/([A-Z])/g,"-$1").toLowerCase().toString(),o=t.data(i);(o||!1===o)&&(n[e]=o)}),(n.activeIndex===!1||n.closeOther===!1)&&(n.closeAble=!0);var i=function(){"refresh"===c&&(t.unbind(),t.destroy()),t.createStructure(),t.clickHead()};return this.toggleSection=function(c,i,o){if(i instanceof jQuery||t.isArray(i))var a=i;else if(t.isInteger(i))var a=t.children().eq(i-1);e.each(a,function(i,a){if(t.isInteger(a))var s=e(t.children().eq(a-1)).children().eq(1);else var s=e(a).children().eq(1);o=o>=0?o:n.slideSpeed,o>0?"open"===c?s.slideDown(o):s.slideUp(o):"open"===c?s.show(o):s.hide(o),"open"===c?e(a).addClass("acc_active"):e(a).removeClass("acc_active")})},this.openSection=function(e,c){t.toggleSection("open",e,c)},this.closeSection=function(e,c){t.toggleSection("close",e,c)},this.closeAllSections=function(e,c){t.closeSection(e,c)},this.destroy=function(){e.each(t.children(),function(c,t){var n=e(t),i=n.children();n.removeClass("acc_section"),e(i[0]).removeClass("acc_head"),e(i[1]).removeClass("acc_content")}),t.children(".acc_section").not(".acc_active").children(".acc_content").show()},this.createStructure=function(){t.addClass("smk_accordion"),e.each(t.children(),function(c,t){var n=e(t),i=n.children();n.addClass("acc_section"),i.length<2&&n.append('<div class="acc_content"></div>'),e(i[0]).addClass("acc_head"),e(i[1]).addClass("acc_content")}),t.children(".acc_section").not(".acc_active").children(".acc_content").hide(),t.isArray(n.activeIndex)?t.openSection(n.activeIndex,0):n.activeIndex>1?t.openSection(n.activeIndex,0):!1!==n.activeIndex&&t.openSection(1,0)},this.clickHead=function(){t.on("click",".acc_head",function(){var c=e(this).parent();c.hasClass("acc_active")===!1&&n.closeOther&&t.closeSection(t.children()),c.hasClass("acc_active")?t.closeSection(c):t.openSection(c)})},i(),this}}(jQuery);