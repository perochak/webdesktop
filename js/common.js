(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1",function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,g,m,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,g=_.offset,m=t.extend({},g),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?m.left+=p:"center"===n.at[0]&&(m.left+=p/2),"bottom"===n.at[1]?m.top+=f:"center"===n.at[1]&&(m.top+=f/2),u=e(k.at,p,f),m.left+=u[0],m.top+=u[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=h+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},m),T=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?D.left-=h:"center"===n.my[0]&&(D.left-=h/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=T[0],D.top+=T[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=g.left-D.left,i=e+p-h,s=g.top-D.top,r=s+f-c,u={target:{element:v,left:g.left,top:g.top,width:p,height:f},element:{element:l,left:D.left,top:D.top,width:h,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),l.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,(i>0||u>a(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position});
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m){"use strict";var a;m.support.htmlMenuitem="HTMLMenuItemElement"in window,m.support.htmlCommand="HTMLCommandElement"in window,m.support.eventSelectstart="onselectstart"in document.documentElement,m.ui&&m.widget||(m.cleanData=(a=m.cleanData,function(e){var t,n,o;for(o=0;null!=e[o];o++){n=e[o];try{(t=m._data(n,"events"))&&t.remove&&m(n).triggerHandler("remove")}catch(e){}}a(e)}));var c=null,d=!1,p=m(window),f=0,h={},x={},v={},g={selector:null,appendTo:null,trigger:"right",autoHide:!1,delay:200,reposition:!0,hideOnSecondTrigger:!1,selectableSubMenu:!1,classNames:{hover:"context-menu-hover",disabled:"context-menu-disabled",visible:"context-menu-visible",notSelectable:"context-menu-not-selectable",icon:"context-menu-icon",iconEdit:"context-menu-icon-edit",iconCut:"context-menu-icon-cut",iconCopy:"context-menu-icon-copy",iconPaste:"context-menu-icon-paste",iconDelete:"context-menu-icon-delete",iconAdd:"context-menu-icon-add",iconQuit:"context-menu-icon-quit",iconLoadingClass:"context-menu-icon-loading"},determinePosition:function(e){if(m.ui&&m.ui.position)e.css("display","block").position({my:"center top",at:"center bottom",of:this,offset:"0 5",collision:"fit"}).css("display","none");else{var t=this.offset();t.top+=this.outerHeight(),t.left+=this.outerWidth()/2-e.outerWidth()/2,e.css(t)}},position:function(e,t,n){var o;if(t||n){if("maintain"===t&&"maintain"===n)o=e.$menu.position();else{var a=e.$menu.offsetParent().offset();o={top:n-a.top,left:t-a.left}}var s=p.scrollTop()+p.height(),i=p.scrollLeft()+p.width(),c=e.$menu.outerHeight(),l=e.$menu.outerWidth();o.top+c>s&&(o.top-=c),o.top<0&&(o.top=0),o.left+l>i&&(o.left-=l),o.left<0&&(o.left=0),e.$menu.css(o)}else e.determinePosition.call(this,e.$menu)},positionSubmenu:function(e){if(void 0!==e)if(m.ui&&m.ui.position)e.css("display","block").position({my:"left top-5",at:"right top",of:this,collision:"flipfit fit"}).css("display","");else{var t={top:-9,left:this.outerWidth()-5};e.css(t)}},zIndex:1,animation:{duration:50,show:"slideDown",hide:"slideUp"},events:{preShow:m.noop,show:m.noop,hide:m.noop,activated:m.noop},callback:null,items:{}},s={timer:null,pageX:null,pageY:null},b={abortevent:function(e){e.preventDefault(),e.stopImmediatePropagation()},contextmenu:function(e){var t=m(this);if(!1!==e.data.events.preShow(t,e)&&("right"===e.data.trigger&&(e.preventDefault(),e.stopImmediatePropagation()),!("right"!==e.data.trigger&&"demand"!==e.data.trigger&&e.originalEvent||!(void 0===e.mouseButton||!e.data||"left"===e.data.trigger&&0===e.mouseButton||"right"===e.data.trigger&&2===e.mouseButton)||t.hasClass("context-menu-active")||t.hasClass("context-menu-disabled")))){if(c=t,e.data.build){var n=e.data.build(c,e);if(!1===n)return;if(e.data=m.extend(!0,{},g,e.data,n||{}),!e.data.items||m.isEmptyObject(e.data.items))throw window.console&&(console.error||console.log).call(console,"No items specified to show in contextMenu"),new Error("No Items specified");e.data.$trigger=c,$.create(e.data)}$.show.call(t,e.data,e.pageX,e.pageY)}},click:function(e){e.preventDefault(),e.stopImmediatePropagation(),m(this).trigger(m.Event("contextmenu",{data:e.data,pageX:e.pageX,pageY:e.pageY}))},mousedown:function(e){var t=m(this);c&&c.length&&!c.is(t)&&c.data("contextMenu").$menu.trigger("contextmenu:hide"),2===e.button&&(c=t.data("contextMenuActive",!0))},mouseup:function(e){var t=m(this);t.data("contextMenuActive")&&c&&c.length&&c.is(t)&&!t.hasClass("context-menu-disabled")&&(e.preventDefault(),e.stopImmediatePropagation(),(c=t).trigger(m.Event("contextmenu",{data:e.data,pageX:e.pageX,pageY:e.pageY}))),t.removeData("contextMenuActive")},mouseenter:function(e){var t=m(this),n=m(e.relatedTarget),o=m(document);n.is(".context-menu-list")||n.closest(".context-menu-list").length||c&&c.length||(s.pageX=e.pageX,s.pageY=e.pageY,s.data=e.data,o.on("mousemove.contextMenuShow",b.mousemove),s.timer=setTimeout(function(){s.timer=null,o.off("mousemove.contextMenuShow"),(c=t).trigger(m.Event("contextmenu",{data:s.data,pageX:s.pageX,pageY:s.pageY}))},e.data.delay))},mousemove:function(e){s.pageX=e.pageX,s.pageY=e.pageY},mouseleave:function(e){var t=m(e.relatedTarget);if(!t.is(".context-menu-list")&&!t.closest(".context-menu-list").length){try{clearTimeout(s.timer)}catch(e){}s.timer=null}},layerClick:function(a){var s,i,c=m(this).data("contextMenuRoot"),l=a.button,r=a.pageX,u=a.pageY,d=void 0===r;a.preventDefault(),setTimeout(function(){if(d)null!=c&&null!==c.$menu&&void 0!==c.$menu&&c.$menu.trigger("contextmenu:hide");else{var e,t="left"===c.trigger&&0===l||"right"===c.trigger&&2===l;if(document.elementFromPoint&&c.$layer){if(c.$layer.hide(),null!==(s=document.elementFromPoint(r-p.scrollLeft(),u-p.scrollTop()))&&s.isContentEditable){var n=document.createRange(),o=window.getSelection();n.selectNode(s),n.collapse(!0),o.removeAllRanges(),o.addRange(n)}m(s).trigger(a),c.$layer.show()}if(c.hideOnSecondTrigger&&t&&null!==c.$menu&&void 0!==c.$menu)c.$menu.trigger("contextmenu:hide");else{if(c.reposition&&t)if(document.elementFromPoint){if(c.$trigger.is(s))return void c.position.call(c.$trigger,c,r,u)}else if(i=c.$trigger.offset(),e=m(window),i.top+=e.scrollTop(),i.top<=a.pageY&&(i.left+=e.scrollLeft(),i.left<=a.pageX&&(i.bottom=i.top+c.$trigger.outerHeight(),i.bottom>=a.pageY&&(i.right=i.left+c.$trigger.outerWidth(),i.right>=a.pageX))))return void c.position.call(c.$trigger,c,r,u);s&&t&&c.$trigger.one("contextmenu:hidden",function(){m(s).contextMenu({x:r,y:u,button:l})}),null!=c&&null!==c.$menu&&void 0!==c.$menu&&c.$menu.trigger("contextmenu:hide")}}},50)},keyStop:function(e,t){t.isInput||e.preventDefault(),e.stopPropagation()},key:function(e){var t={};c&&(t=c.data("contextMenu")||{}),void 0===t.zIndex&&(t.zIndex=0);var n=0,o=function(e){""!==e.style.zIndex?n=e.style.zIndex:null!==e.offsetParent&&void 0!==e.offsetParent?o(e.offsetParent):null!==e.parentElement&&void 0!==e.parentElement&&o(e.parentElement)};if(o(e.target),!(t.$menu&&parseInt(n,10)>parseInt(t.$menu.css("zIndex"),10))){switch(e.keyCode){case 9:case 38:if(b.keyStop(e,t),t.isInput){if(9===e.keyCode&&e.shiftKey)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void(null!==t.$menu&&void 0!==t.$menu&&t.$menu.trigger("prevcommand"));if(38===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault()}else if(9!==e.keyCode||e.shiftKey)return void(null!==t.$menu&&void 0!==t.$menu&&t.$menu.trigger("prevcommand"));break;case 40:if(b.keyStop(e,t),!t.isInput)return void(null!==t.$menu&&void 0!==t.$menu&&t.$menu.trigger("nextcommand"));if(9===e.keyCode)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void(null!==t.$menu&&void 0!==t.$menu&&t.$menu.trigger("nextcommand"));if(40===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault();break;case 37:if(b.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;if(t.$selected.parent().hasClass("context-menu-root"))break;var a=t.$selected.parent().parent();return t.$selected.trigger("contextmenu:blur"),void(t.$selected=a);case 39:if(b.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;var s=t.$selected.data("contextMenu")||{};if(s.$menu&&t.$selected.hasClass("context-menu-submenu"))return t.$selected=null,s.$selected=null,void s.$menu.trigger("nextcommand");break;case 35:case 36:return t.$selected&&t.$selected.find("input, textarea, select").length?void 0:((t.$selected&&t.$selected.parent()||t.$menu).children(":not(."+t.classNames.disabled+", ."+t.classNames.notSelectable+")")[36===e.keyCode?"first":"last"]().trigger("contextmenu:focus"),void e.preventDefault());case 13:if(b.keyStop(e,t),t.isInput){if(t.$selected&&!t.$selected.is("textarea, select"))return void e.preventDefault();break}return void(void 0!==t.$selected&&null!==t.$selected&&t.$selected.trigger("mouseup"));case 32:case 33:case 34:return void b.keyStop(e,t);case 27:return b.keyStop(e,t),void(null!==t.$menu&&void 0!==t.$menu&&t.$menu.trigger("contextmenu:hide"));default:var i=String.fromCharCode(e.keyCode).toUpperCase();if(t.accesskeys&&t.accesskeys[i])return void t.accesskeys[i].$node.trigger(t.accesskeys[i].$menu?"contextmenu:focus":"mouseup")}e.stopPropagation(),void 0!==t.$selected&&null!==t.$selected&&t.$selected.trigger(e)}},prevItem:function(e){e.stopPropagation();var t=m(this).data("contextMenu")||{},n=m(this).data("contextMenuRoot")||{};if(t.$selected){var o=t.$selected;(t=t.$selected.parent().data("contextMenu")||{}).$selected=o}for(var a=t.$menu.children(),s=t.$selected&&t.$selected.prev().length?t.$selected.prev():a.last(),i=s;s.hasClass(n.classNames.disabled)||s.hasClass(n.classNames.notSelectable)||s.is(":hidden");)if((s=s.prev().length?s.prev():a.last()).is(i))return;t.$selected&&b.itemMouseleave.call(t.$selected.get(0),e),b.itemMouseenter.call(s.get(0),e);var c=s.find("input, textarea, select");c.length&&c.focus()},nextItem:function(e){e.stopPropagation();var t=m(this).data("contextMenu")||{},n=m(this).data("contextMenuRoot")||{};if(t.$selected){var o=t.$selected;(t=t.$selected.parent().data("contextMenu")||{}).$selected=o}for(var a=t.$menu.children(),s=t.$selected&&t.$selected.next().length?t.$selected.next():a.first(),i=s;s.hasClass(n.classNames.disabled)||s.hasClass(n.classNames.notSelectable)||s.is(":hidden");)if((s=s.next().length?s.next():a.first()).is(i))return;t.$selected&&b.itemMouseleave.call(t.$selected.get(0),e),b.itemMouseenter.call(s.get(0),e);var c=s.find("input, textarea, select");c.length&&c.focus()},focusInput:function(){var e=m(this).closest(".context-menu-item"),t=e.data(),n=t.contextMenu,o=t.contextMenuRoot;o.$selected=n.$selected=e,o.isInput=n.isInput=!0},blurInput:function(){var e=m(this).closest(".context-menu-item").data(),t=e.contextMenu;e.contextMenuRoot.isInput=t.isInput=!1},menuMouseenter:function(){m(this).data().contextMenuRoot.hovering=!0},menuMouseleave:function(e){var t=m(this).data().contextMenuRoot;t.$layer&&t.$layer.is(e.relatedTarget)&&(t.hovering=!1)},itemMouseenter:function(e){var t=m(this),n=t.data(),o=n.contextMenu,a=n.contextMenuRoot;a.hovering=!0,e&&a.$layer&&a.$layer.is(e.relatedTarget)&&(e.preventDefault(),e.stopImmediatePropagation()),(o.$menu?o:a).$menu.children("."+a.classNames.hover).trigger("contextmenu:blur").children(".hover").trigger("contextmenu:blur"),t.hasClass(a.classNames.disabled)||t.hasClass(a.classNames.notSelectable)?o.$selected=null:t.trigger("contextmenu:focus")},itemMouseleave:function(e){var t=m(this),n=t.data(),o=n.contextMenu,a=n.contextMenuRoot;if(a!==o&&a.$layer&&a.$layer.is(e.relatedTarget))return void 0!==a.$selected&&null!==a.$selected&&a.$selected.trigger("contextmenu:blur"),e.preventDefault(),e.stopImmediatePropagation(),void(a.$selected=o.$selected=o.$node);o&&o.$menu&&o.$menu.hasClass("context-menu-visible")||t.trigger("contextmenu:blur")},itemClick:function(e){var t,n=m(this),o=n.data(),a=o.contextMenu,s=o.contextMenuRoot,i=o.contextMenuKey;if(!(!a.items[i]||n.is("."+s.classNames.disabled+", .context-menu-separator, ."+s.classNames.notSelectable)||n.is(".context-menu-submenu")&&!1===s.selectableSubMenu)){if(e.preventDefault(),e.stopImmediatePropagation(),m.isFunction(a.callbacks[i])&&Object.prototype.hasOwnProperty.call(a.callbacks,i))t=a.callbacks[i];else{if(!m.isFunction(s.callback))return;t=s.callback}!1!==t.call(s.$trigger,i,s,e)?s.$menu.trigger("contextmenu:hide"):s.$menu.parent().length&&$.update.call(s.$trigger,s)}},inputClick:function(e){e.stopImmediatePropagation()},hideMenu:function(e,t){var n=m(this).data("contextMenuRoot");$.hide.call(n.$trigger,n,t&&t.force)},focusItem:function(e){e.stopPropagation();var t=m(this),n=t.data(),o=n.contextMenu,a=n.contextMenuRoot;t.hasClass(a.classNames.disabled)||t.hasClass(a.classNames.notSelectable)||(t.addClass([a.classNames.hover,a.classNames.visible].join(" ")).parent().find(".context-menu-item").not(t).removeClass(a.classNames.visible).filter("."+a.classNames.hover).trigger("contextmenu:blur"),o.$selected=a.$selected=t,o&&o.$node&&o.$node.hasClass("context-menu-submenu")&&o.$node.addClass(a.classNames.hover),o.$node&&a.positionSubmenu.call(o.$node,o.$menu))},blurItem:function(e){e.stopPropagation();var t=m(this),n=t.data(),o=n.contextMenu,a=n.contextMenuRoot;o.autoHide&&t.removeClass(a.classNames.visible),t.removeClass(a.classNames.hover),o.$selected=null}},$={show:function(n,e,t){var o=m(this),a={};if(m("#context-menu-layer").trigger("mousedown"),n.$trigger=o,!1!==n.events.show.call(o,n))if(!1!==$.update.call(o,n)){if(n.position.call(o,n,e,t),n.zIndex){var s=n.zIndex;"function"==typeof n.zIndex&&(s=n.zIndex.call(o,n)),a.zIndex=function(e){for(var t=0,n=e;t=Math.max(t,parseInt(n.css("z-index"),10)||0),(n=n.parent())&&n.length&&!(-1<"html body".indexOf(n.prop("nodeName").toLowerCase())););return t}(o)+s}$.layer.call(n.$menu,n,a.zIndex),n.$menu.find("ul").css("zIndex",a.zIndex+1),n.$menu.css(a)[n.animation.show](n.animation.duration,function(){o.trigger("contextmenu:visible"),$.activated(n),n.events.activated(n)}),o.data("contextMenu",n).addClass("context-menu-active"),m(document).off("keydown.contextMenu").on("keydown.contextMenu",b.key),n.autoHide&&m(document).on("mousemove.contextMenuAutoHide",function(e){var t=o.offset();t.right=t.left+o.outerWidth(),t.bottom=t.top+o.outerHeight(),!n.$layer||n.hovering||e.pageX>=t.left&&e.pageX<=t.right&&e.pageY>=t.top&&e.pageY<=t.bottom||setTimeout(function(){n.hovering||null===n.$menu||void 0===n.$menu||n.$menu.trigger("contextmenu:hide")},50)})}else c=null;else c=null},hide:function(t,e){var n=m(this);if(t=t||(n.data("contextMenu")||{}),e||!t.events||!1!==t.events.hide.call(n,t)){if(n.removeData("contextMenu").removeClass("context-menu-active"),t.$layer){setTimeout((o=t.$layer,function(){o.remove()}),10);try{delete t.$layer}catch(e){t.$layer=null}}var o;c=null,t.$menu.find("."+t.classNames.hover).trigger("contextmenu:blur"),t.$selected=null,t.$menu.find("."+t.classNames.visible).removeClass(t.classNames.visible),m(document).off(".contextMenuAutoHide").off("keydown.contextMenu"),t.$menu&&t.$menu[t.animation.hide](t.animation.duration,function(){t.build&&(t.$menu.remove(),m.each(t,function(e){switch(e){case"ns":case"selector":case"build":case"trigger":return!0;default:t[e]=void 0;try{delete t[e]}catch(e){}return!0}})),setTimeout(function(){n.trigger("contextmenu:hidden")},10)})}},create:function(r,u){function d(e){var t=m("<span></span>");if(e._accesskey)e._beforeAccesskey&&t.append(document.createTextNode(e._beforeAccesskey)),m("<span></span>").addClass("context-menu-accesskey").text(e._accesskey).appendTo(t),e._afterAccesskey&&t.append(document.createTextNode(e._afterAccesskey));else if(e.isHtmlName){if(void 0!==e.accesskey)throw new Error("accesskeys are not compatible with HTML names and cannot be used together in the same item");t.html(e.name)}else t.text(e.name);return t}void 0===u&&(u=r),r.$menu=m('<ul class="context-menu-list"></ul>').addClass(r.className||"").data({contextMenu:r,contextMenuRoot:u}),r.dataAttr&&m.each(r.dataAttr,function(e,t){r.$menu.attr("data-"+r.key,t)}),m.each(["callbacks","commands","inputs"],function(e,t){r[t]={},u[t]||(u[t]={})}),u.accesskeys||(u.accesskeys={}),m.each(r.items,function(n,o){var e=m('<li class="context-menu-item"></li>').addClass(o.className||""),t=null,a=null;if(e.on("click",m.noop),"string"!=typeof o&&"cm_separator"!==o.type||(o={type:"cm_seperator"}),o.$node=e.data({contextMenu:r,contextMenuRoot:u,contextMenuKey:n}),void 0!==o.accesskey)for(var s,i=function(e){for(var t,n=e.split(/\s+/),o=[],a=0;t=n[a];a++)t=t.charAt(0).toUpperCase(),o.push(t);return o}(o.accesskey),c=0;s=i[c];c++)if(!u.accesskeys[s]){var l=(u.accesskeys[s]=o).name.match(new RegExp("^(.*?)("+s+")(.*)$","i"));l&&(o._beforeAccesskey=l[1],o._accesskey=l[2],o._afterAccesskey=l[3]);break}if(o.type&&v[o.type])v[o.type].call(e,o,r,u),m.each([r,u],function(e,t){t.commands[n]=o,!m.isFunction(o.callback)||void 0!==t.callbacks[n]&&void 0!==r.type||(t.callbacks[n]=o.callback)});else{switch("cm_seperator"===o.type?e.addClass("context-menu-separator "+u.classNames.notSelectable):"html"===o.type?e.addClass("context-menu-html "+u.classNames.notSelectable):"sub"!==o.type&&o.type?(t=m("<label></label>").appendTo(e),d(o).appendTo(t),e.addClass("context-menu-input"),r.hasTypes=!0,m.each([r,u],function(e,t){t.commands[n]=o,t.inputs[n]=o})):o.items&&(o.type="sub"),o.type){case"cm_seperator":break;case"text":a=m('<input type="text" value="1" name="" />').attr("name","context-menu-input-"+n).val(o.value||"").appendTo(t);break;case"textarea":a=m('<textarea name=""></textarea>').attr("name","context-menu-input-"+n).val(o.value||"").appendTo(t),o.height&&a.height(o.height);break;case"checkbox":a=m('<input type="checkbox" value="1" name="" />').attr("name","context-menu-input-"+n).val(o.value||"").prop("checked",!!o.selected).prependTo(t);break;case"radio":a=m('<input type="radio" value="1" name="" />').attr("name","context-menu-input-"+o.radio).val(o.value||"").prop("checked",!!o.selected).prependTo(t);break;case"select":a=m('<select name=""></select>').attr("name","context-menu-input-"+n).appendTo(t),o.options&&(m.each(o.options,function(e,t){m("<option></option>").val(e).text(t).appendTo(a)}),a.val(o.selected));break;case"sub":d(o).appendTo(e),o.appendTo=o.$node,e.data("contextMenu",o).addClass("context-menu-submenu"),o.callback=null,"function"==typeof o.items.then?$.processPromises(o,u,o.items):$.create(o,u);break;case"html":m(o.html).appendTo(e);break;default:m.each([r,u],function(e,t){t.commands[n]=o,!m.isFunction(o.callback)||void 0!==t.callbacks[n]&&void 0!==r.type||(t.callbacks[n]=o.callback)}),d(o).appendTo(e)}o.type&&"sub"!==o.type&&"html"!==o.type&&"cm_seperator"!==o.type&&(a.on("focus",b.focusInput).on("blur",b.blurInput),o.events&&a.on(o.events,r)),o.icon&&(m.isFunction(o.icon)?o._icon=o.icon.call(this,this,e,n,o):"string"!=typeof o.icon||"fab "!==o.icon.substring(0,4)&&"fas "!==o.icon.substring(0,4)&&"fad "!==o.icon.substring(0,4)&&"far "!==o.icon.substring(0,4)&&"fal "!==o.icon.substring(0,4)?"string"==typeof o.icon&&"mdi-"===o.icon.substring(0,4)?o._icon=u.classNames.icon+" "+u.classNames.icon+"--mdi mdi "+o.icon:o._icon=u.classNames.icon+" "+u.classNames.icon+"-"+o.icon:(e.addClass(u.classNames.icon+" "+u.classNames.icon+"--fa5"),o._icon=m('<i class="'+o.icon+'"></i>')),"string"==typeof o._icon?e.addClass(o._icon):e.prepend(o._icon))}o.$input=a,o.$label=t,e.appendTo(r.$menu),!r.hasTypes&&m.support.eventSelectstart&&e.on("selectstart.disableTextSelect",b.abortevent)}),r.$node||r.$menu.css("display","none").addClass("context-menu-root"),r.$menu.appendTo(r.appendTo||document.body)},resize:function(e,t){var n;e.css({position:"absolute",display:"block"}),e.data("width",(n=e.get(0)).getBoundingClientRect?Math.ceil(n.getBoundingClientRect().width):e.outerWidth()+1),e.css({position:"static",minWidth:"0px",maxWidth:"100000px"}),e.find("> li > ul").each(function(){$.resize(m(this),!0)}),t||e.find("ul").addBack().css({position:"",display:"",minWidth:"",maxWidth:""}).outerWidth(function(){return m(this).data("width")})},update:function(i,c){var l=this;void 0===c&&(c=i,$.resize(i.$menu));var r=!1;return i.$menu.children().each(function(){var e,t=m(this),n=t.data("contextMenuKey"),o=i.items[n],a=m.isFunction(o.disabled)&&o.disabled.call(l,n,c)||!0===o.disabled;if((e=m.isFunction(o.visible)?o.visible.call(l,n,c):void 0===o.visible||!0===o.visible)&&(r=!0),t[e?"show":"hide"](),t[a?"addClass":"removeClass"](c.classNames.disabled),m.isFunction(o.icon)){t.removeClass(o._icon);var s=o.icon.call(this,l,t,n,o);"string"==typeof s?t.addClass(s):t.prepend(s)}if(o.type)switch(t.find("input, select, textarea").prop("disabled",a),o.type){case"text":case"textarea":o.$input.val(o.value||"");break;case"checkbox":case"radio":o.$input.val(o.value||"").prop("checked",!!o.selected);break;case"select":o.$input.val((0===o.selected?"0":o.selected)||"")}o.$menu&&$.update.call(l,o,c)&&(r=!0)}),r},layer:function(e,t){var n=e.$layer=m('<div id="context-menu-layer"></div>').css({height:p.height(),width:p.width(),display:"block",position:"fixed","z-index":t-1,top:0,left:0,opacity:0,filter:"alpha(opacity=0)","background-color":"#000"}).data("contextMenuRoot",e).appendTo(document.body).on("contextmenu",b.abortevent).on("mousedown",b.layerClick);return void 0===document.body.style.maxWidth&&n.css({position:"absolute",height:m(document).height()}),n},processPromises:function(e,t,n){function o(e,t,n){void 0===n?(n={error:{name:"No items and no error item",icon:"context-menu-icon context-menu-icon-quit"}},window.console&&(console.error||console.log).call(console,'When you reject a promise, provide an "items" object, equal to normal sub-menu items')):"string"==typeof n&&(n={error:{name:n}}),a(e,t,n)}function a(e,t,n){void 0!==t.$menu&&t.$menu.is(":visible")&&(e.$node.removeClass(t.classNames.iconLoadingClass),e.items=n,$.create(e,t,!0),$.update(e,t),t.positionSubmenu.call(e.$node,e.$menu))}e.$node.addClass(t.classNames.iconLoadingClass),n.then(function(e,t,n){void 0===n&&o(void 0),a(e,t,n)}.bind(this,e,t),o.bind(this,e,t))},activated:function(e){var t=e.$menu,n=t.offset(),o=m(window).height(),a=m(window).scrollTop(),s=t.height();o<s?t.css({height:o+"px","overflow-x":"hidden","overflow-y":"auto",top:a+"px"}):(n.top<a||n.top+s>a+o)&&t.css({top:a+"px"})}};function l(e){return e.id&&m('label[for="'+e.id+'"]').val()||e.name}m.fn.contextMenu=function(e){var t=this,n=e;if(0<this.length)if(void 0===e)this.first().trigger("contextmenu");else if(void 0!==e.x&&void 0!==e.y)this.first().trigger(m.Event("contextmenu",{pageX:e.x,pageY:e.y,mouseButton:e.button}));else if("hide"===e){var o=this.first().data("contextMenu")?this.first().data("contextMenu").$menu:null;o&&o.trigger("contextmenu:hide")}else"destroy"===e?m.contextMenu("destroy",{context:this}):m.isPlainObject(e)?(e.context=this,m.contextMenu("create",e)):e?this.removeClass("context-menu-disabled"):e||this.addClass("context-menu-disabled");else m.each(x,function(){this.selector===t.selector&&(n.data=this,m.extend(n.data,{trigger:"demand"}))}),b.contextmenu.call(n.target,n);return this},m.contextMenu=function(e,t){"string"!=typeof e&&(t=e,e="create"),"string"==typeof t?t={selector:t}:void 0===t&&(t={});var n=m.extend(!0,{},g,t||{}),o=m(document),a=o,s=!1;switch(n.context&&n.context.length?(a=m(n.context).first(),n.context=a.get(0),s=!m(n.context).is(document)):n.context=document,e){case"update":if(s)$.update(a);else for(var i in x)x.hasOwnProperty(i)&&$.update(x[i]);break;case"create":if(!n.selector)throw new Error("No selector specified");if(n.selector.match(/.context-menu-(list|item|input)($|\s)/))throw new Error('Cannot bind to selector "'+n.selector+'" as it contains a reserved className');if(!n.build&&(!n.items||m.isEmptyObject(n.items)))throw new Error("No Items specified");if(f++,n.ns=".contextMenu"+f,s||(h[n.selector]=n.ns),(x[n.ns]=n).trigger||(n.trigger="right"),!d){var c="click"===n.itemClickEvent?"click.contextMenu":"mouseup.contextMenu",l={"contextmenu:focus.contextMenu":b.focusItem,"contextmenu:blur.contextMenu":b.blurItem,"contextmenu.contextMenu":b.abortevent,"mouseenter.contextMenu":b.itemMouseenter,"mouseleave.contextMenu":b.itemMouseleave};l[c]=b.itemClick,o.on({"contextmenu:hide.contextMenu":b.hideMenu,"prevcommand.contextMenu":b.prevItem,"nextcommand.contextMenu":b.nextItem,"contextmenu.contextMenu":b.abortevent,"mouseenter.contextMenu":b.menuMouseenter,"mouseleave.contextMenu":b.menuMouseleave},".context-menu-list").on("mouseup.contextMenu",".context-menu-input",b.inputClick).on(l,".context-menu-item"),d=!0}switch(a.on("contextmenu"+n.ns,n.selector,n,b.contextmenu),s&&a.on("remove"+n.ns,function(){m(this).contextMenu("destroy")}),n.trigger){case"hover":a.on("mouseenter"+n.ns,n.selector,n,b.mouseenter).on("mouseleave"+n.ns,n.selector,n,b.mouseleave);break;case"left":a.on("click"+n.ns,n.selector,n,b.click);break;case"touchstart":a.on("touchstart"+n.ns,n.selector,n,b.click)}n.build||$.create(n);break;case"destroy":var r;if(s){var u=n.context;m.each(x,function(e,t){if(!t)return!0;if(!m(u).is(t.selector))return!0;(r=m(".context-menu-list").filter(":visible")).length&&r.data().contextMenuRoot.$trigger.is(m(t.context).find(t.selector))&&r.trigger("contextmenu:hide",{force:!0});try{x[t.ns].$menu&&x[t.ns].$menu.remove(),delete x[t.ns]}catch(e){x[t.ns]=null}return m(t.context).off(t.ns),!0})}else if(n.selector){if(h[n.selector]){(r=m(".context-menu-list").filter(":visible")).length&&r.data().contextMenuRoot.$trigger.is(n.selector)&&r.trigger("contextmenu:hide",{force:!0});try{x[h[n.selector]].$menu&&x[h[n.selector]].$menu.remove(),delete x[h[n.selector]]}catch(e){x[h[n.selector]]=null}o.off(h[n.selector])}}else o.off(".contextMenu .contextMenuAutoHide"),m.each(x,function(e,t){m(t.context).off(t.ns)}),h={},f=0,d=!(x={}),m("#context-menu-layer, .context-menu-list").remove();break;case"html5":(!m.support.htmlCommand&&!m.support.htmlMenuitem||"boolean"==typeof t&&t)&&m('menu[type="context"]').each(function(){this.id&&m.contextMenu({selector:"[contextmenu="+this.id+"]",items:m.contextMenu.fromMenu(this)})}).css("display","none");break;default:throw new Error('Unknown operation "'+e+'"')}return this},m.contextMenu.setInputValues=function(e,n){void 0===n&&(n={}),m.each(e.inputs,function(e,t){switch(t.type){case"text":case"textarea":t.value=n[e]||"";break;case"checkbox":t.selected=!!n[e];break;case"radio":t.selected=(n[t.radio]||"")===t.value;break;case"select":t.selected=n[e]||""}})},m.contextMenu.getInputValues=function(e,n){return void 0===n&&(n={}),m.each(e.inputs,function(e,t){switch(t.type){case"text":case"textarea":case"select":n[e]=t.$input.val();break;case"checkbox":n[e]=t.$input.prop("checked");break;case"radio":t.$input.prop("checked")&&(n[t.radio]=t.value)}}),n},m.contextMenu.fromMenu=function(e){var t={};return function s(i,e,c){return c=c||0,e.each(function(){var e,t,n=m(this),o=this,a=this.nodeName.toLowerCase();switch("label"===a&&n.find("input, textarea, select").length&&(e=n.text(),a=(o=(n=n.children().first()).get(0)).nodeName.toLowerCase()),a){case"menu":t={name:n.attr("label"),items:{}},c=s(t.items,n.children(),c);break;case"a":case"button":t={name:n.text(),disabled:!!n.attr("disabled"),callback:function(){n.get(0).click()}};break;case"menuitem":case"command":switch(n.attr("type")){case void 0:case"command":case"menuitem":t={name:n.attr("label"),disabled:!!n.attr("disabled"),icon:n.attr("icon"),callback:function(){n.get(0).click()}};break;case"checkbox":t={type:"checkbox",disabled:!!n.attr("disabled"),name:n.attr("label"),selected:!!n.attr("checked")};break;case"radio":t={type:"radio",disabled:!!n.attr("disabled"),name:n.attr("label"),radio:n.attr("radiogroup"),value:n.attr("id"),selected:!!n.attr("checked")};break;default:t=void 0}break;case"hr":t="-------";break;case"input":switch(n.attr("type")){case"text":t={type:"text",name:e||l(o),disabled:!!n.attr("disabled"),value:n.val()};break;case"checkbox":t={type:"checkbox",name:e||l(o),disabled:!!n.attr("disabled"),selected:!!n.attr("checked")};break;case"radio":t={type:"radio",name:e||l(o),disabled:!!n.attr("disabled"),radio:!!n.attr("name"),value:n.val(),selected:!!n.attr("checked")};break;default:t=void 0}break;case"select":t={type:"select",name:e||l(o),disabled:!!n.attr("disabled"),selected:n.val(),options:{}},n.children().each(function(){t.options[this.value]=m(this).text()});break;case"textarea":t={type:"textarea",name:e||l(o),disabled:!!n.attr("disabled"),value:n.val()};break;case"label":break;default:t={type:"html",html:n.clone(!0)}}t&&(i["key"+ ++c]=t)}),c}(t,m(e).children()),t},m.contextMenu.defaults=g,m.contextMenu.types=v,m.contextMenu.handle=b,m.contextMenu.op=$,m.contextMenu.menus=x});


    $(function() {
        $.contextMenu({
            selector: '.wrap', 
            callback: function(key, options) {
                if(key=='folder'){
                    addfolder()
                }
                if(key=='file'){
                    setUploadFile('file')
                }
                if(key=='link'){
                    addLink('link')
                }
                if(key=='background'){
                    setUploadFile('background');
                }
            
            },
            items: {
                "folder": {name: "New Folder", icon: " mdi mdi-folder-plus"},
                "file": {name: "New File", icon: " mdi mdi-upload"},
                "link": {name: "New Link", icon: " mdi mdi-link-plus"},
                "background": {name: "Change Background", icon: "edit"}
            }
        });
        $.contextMenu({
            selector: '.folder', 
            callback: function(key, options) {
                if(key=='rename'){
                    renameFolder(this);
                }
                if(key=='setpassword'){
                    setFolderPassword(this);
                }
                if(key=='removepassword'){
                    removeFolderPassword(this);
                }
                if(key=='seticon'){
                    setFolderIcon(this);
                }
                if(key=='delete'){
                    removeFolder(this);
                }
            },
            items: {
                "open": {name: "Open Folder", icon: " mdi mdi-folder-open"},
                "rename": {name: "Rename Folder", icon: " mdi mdi-folder-edit"},
                "setpassword": {name: "Set Folder Password", icon: " mdi mdi-folder-lock"},
                "removepassword": {name: "Remove Folder Password", icon: " mdi mdi-folder-lock-open"},
                "delete": {name: "Delete", icon: " mdi mdi-folder-remove"}
            }
        });
        $.contextMenu({
            selector: '.file', 
            callback: function(key, options) {
                if(key=='rename'){
                    renameFile(this);
                }
                if(key=='setpassword'){
                    setFilePassword(this);
                }
                if(key=='removepassword'){
                    removeFilePassword(this);
                }
                if(key=='delete'){
                    removeFile(this);
                }
            },
            items: {
                "open": {name: "Download", icon: " mdi mdi-download"},
                "rename": {name: "Rename File", icon: " mdi mdi-file-edit"},
               // "setpassword": {name: "Set File Password", icon: " mdi mdi-file-lock"},
               // "removepassword": {name: "Remove File Password", icon: " mdi mdi-file-lock-open"},
                "delete": {name: "Delete", icon: " mdi mdi-file-remove"}
            }
        });
        $.contextMenu({
            selector: '.link', 
            callback: function(key, options) {
                if(key=='edit'){
                    renameLink(this);
                }
                if(key=='open'){
                    openLink(this);
                }
                
                if(key=='delete'){
                    removeLink(this);
                }
            },
            items: {
                "open": {name: "Open", icon: " mdi mdi-open-in-new"},
                "edit": {name: "Edit", icon: " mdi mdi-pencil"},
                "delete": {name: "Delete", icon: " mdi mdi-link-off"}
            }
        });
        $('#createfolder').click(function(){
            createFolder();
        });
        $('#srenamefolder').click(function(){
            updateFolder('name');
        });
        
        $('#spoasswirdfolder').click(function(){
            updateFolder('password');
        });
        
        $('#createlink').click(function(){
            createLink();
        });
        $('#srenamelink').click(function(){
            updateLink('name');
        });
        $('#srenamefile').click(function(){
            updateFile('name');
        });
        $('#filepicker').on('change',function(){
            uploadFile();
        });
        $('#sendwallmsg').on('click',function(){
            postonwall();
        });
        $('.wall-messages').animate({
             scrollTop: $('.wall-messages').get(0).scrollHeight
         }, 2000);
    });
function addfolder(){
    $('#parent_folder_id').val($('.parent_folder_id').text());
    $('#addfolder').modal();
}
function renameFolder(folder){
    $('#folder_id').val($(folder).data('id'));
    $('#r_folder_name').val($(folder).data('name'));
    $('#renamefolder').modal();
}
function renameFile(file){
    $('#file_id').val($(file).data('id'));
    $('#r_file_name').val($(file).data('name'));
    $('#renamefile').modal();
}
function renameLink(link){
    $('#link_id').val($(link).data('id'));
    $('#r_link_name').val($(link).data('name'));
    $('#renamelink').modal();
}
function setFolderPassword(folder){
    $('#folder_id').val($(folder).data('id'));
    $('#folder_password').val('');
    $('#passwordfolder').modal();    
}
function createFolder(){
    var parent_folder_id = $('#parent_folder_id').val();
    var name = $('#folder_name').val();
    if(name==''){
        alert('Please enter folder name');
    }else{
        $.ajax({
            url:'/folder/create',
            method:'post',
            data:{
                parent_folder_id:parent_folder_id,
                name:name
            },
            success:function(data){
                if(data.result=='OK'){
                    showFolder(data.folder,parent_folder_id,false);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })
    }
}
function createLink(){
    var folder_id = $('#parent_folder_id').val();
    var name = $('#link_name').val();
    var url = $('#link_url').val();
    var icon = $('#link_icon').val();
    if(name==''){
        alert('Please enter link name');
    }else if(url==''){
        alert('Please enter link url');
    }else if(icon==''){
        alert('Please enter link icon');
    }else{
        $.ajax({
            url:'/link/create',
            method:'post',
            data:{
                folder_id:folder_id,
                name:name,
                url:url,
                icon:icon
            },
            success:function(data){
                if(data.result=='OK'){
                    showLink(data.link,false);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })
    }
}
function updateFolder(key){
    var folder_id = $('#folder_id').val();
    if(key=='name'){
        var value = $('#r_folder_name').val();
    }
    if(key=='password'){
        var value = $('#folder_password').val();
    }
    if(key=='icon'){
        var value = $('#folder_icon').val();
    }
    
    if(value==''){
        alert('Please enter '+key);
    }else{
        $.ajax({
            url:'/folder/update',
            method:'post',
            data:{
                folder_id:folder_id,
                key:key,
                val:value
            },
            success:function(data){
                if(data.result=='OK'){
                    showFolder(data.folder,parent_folder_id,true);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })
    }
}
function updateFile(key){
    var file_id = $('#file_id').val();
    if(key=='name'){
        var value = $('#r_file_name').val();
    }
    if(key=='password'){
        var value = $('#file_password').val();
    }
    
    
    if(value==''){
        alert('Please enter '+key);
    }else{
        $.ajax({
            url:'/file/update',
            method:'post',
            data:{
                file_id:file_id,
                key:key,
                val:value
            },
            success:function(data){
                if(data.result=='OK'){
                    showFile(data.file,parent_folder_id,true);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })
    }
}
function updateLink(key){
    var link_id = $('#link_id').val();
    if(key=='name'){
        var value = $('#r_link_name').val();
    }
    if(key=='password'){
        var value = $('#link_password').val();
    }
    
    
    if(value==''){
        alert('Please enter '+key);
    }else{
        $.ajax({
            url:'/link/update',
            method:'post',
            data:{
                link_id:link_id,
                key:key,
                val:value
            },
            success:function(data){
                if(data.result=='OK'){
                    showLink(data.link,true);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })
    }
}
function showFolder(folder,parent_folder_id,update){
    if(update==false){
        $('.wrap .folder-content').append(folder);
    }else{
        var old = $('.folder-'+$(folder).data('id'));
        $(old).replaceWith(folder);
    }
}
function showLink(link,update){
    if(update==false){
        $('.wrap .folder-content').append(link);
    }else{
        var old = $('.link-'+$(link).data('id'));
        $(old).replaceWith(link);
    }
}
function showFile(file,parent_folder_id,update){
    if(update==false){
        $('.wrap .folder-content').append(file);
    }else{
        var old = $('.file-'+$(file).data('id'));
        $(old).replaceWith(file);
    }
}
function removeFolder(folder){
    var folder_id = $(folder).data('id');
        $.ajax({
            url:'/folder/delete',
            method:'post',
            data:{
                folder_id:folder_id
            },
            success:function(data){
                if(data.result=='OK'){
                    $(folder).remove();
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })    
}
function removeFile(file){
    var file_id = $(file).data('id');
        $.ajax({
            url:'/file/delete',
            method:'post',
            data:{
                file_id:file_id
            },
            success:function(data){
                if(data.result=='OK'){
                    $(file).remove();
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })    
}
function removeLink(link){
    var link_id = $(link).data('id');
        $.ajax({
            url:'/link/delete',
            method:'post',
            data:{
                link_id:link_id
            },
            success:function(data){
                if(data.result=='OK'){
                    $(link).remove();
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })    
}
function removeFolderPassword(folder){
    var folder_id = $(folder).data('id');
    $.ajax({
            url:'/folder/update',
            method:'post',
            data:{
                folder_id:folder_id,
                key:'password',
                val:''
            },
            success:function(data){
                if(data.result=='OK'){
                    showFolder(data.folder,parent_folder_id,true);
                    $.modal.close();
                }else{
                    alert('Something went wrong. Please try again');
                }
            }
        })        
}


function addLink(){
    $('#parent_folder_id').val($('.parent_folder_id').text());
    $('#addlink').modal();
}
function renamelink(folder){
    $('#link_id').val($(folder).data('id'));
    $('#r_link_name').val($(folder).data('name'));
    $('#linkfolder').modal();
}



function setUploadFile(type){
    $('#upload_type').val(type);
    $('#filepicker').trigger('click');
}
function uploadFile(){
    var file_data = $('#filepicker').prop('files')[0];   
    var folder_id = $('.parent_folder_id').text();
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    
    var upload_type=$('#upload_type').val();
    form_data.append('type', upload_type);
    form_data.append('folder_id', folder_id);
    $.ajax({
        url: '/upload',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        method: 'post',
        success: function(data){
                if(data.result=='OK'){
                    if(upload_type=='background'){
                        $('.wrap').css('background-image','url('+data.file+')');
                    }else if(upload_type=='icon'){
                        
                    }else{
                        showFile(data.file,folder_id);
                    }
                    
                }else{
                    alert('Something went wrong. Please try again');
                }           
        },
        beforeSend: function() {
            $('.serverworks').addClass('show');
        },
        complete: function() {
            $('.serverworks').removeClass('show');
        }
     });

}

function countWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n"); 
    return s.split(' ').filter(function(str){return str!="";}).length;
}
function postonwall(){
var msg = $('#wallmsg').val();
var l = countWords(msg);
if(l > 5){
$.ajax({
        url: '/postwall',
        data: {
            message:msg
        },                         
        method: 'post',
        success: function(data){
                if(data.result=='OK'){
                    $('.wall-messages').append(data.content);
                    $('#wallmsg').val('');
                    $('.wall-messages').animate({
                        scrollTop: $('.wall-messages').get(0).scrollHeight
                    }, 2000);
                }else{
                    alert('Something went wrong. Please try again');
                }           
        }
     });    
     }else{
         alert('Please enter text of minimum length 5 words');
     }
}
