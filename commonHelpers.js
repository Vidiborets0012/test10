/* empty css                      */import{f as p,i as y}from"./assets/vendor-77e16229.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c=document.querySelector("button[data-start]"),h=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),g=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");let d=null,l=null;c.disabled=!0;const q={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){const r=o[0];r<=new Date?(y.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"}),c.disabled=!0):(d=r,c.disabled=!1)}};p("#datetime-picker",q);c.addEventListener("click",()=>{d&&(c.disabled=!0,document.querySelector("#datetime-picker").disabled=!0,l=setInterval(L,1e3))});function L(){const r=d-new Date;if(r<=0){clearInterval(l),document.querySelector("#datetime-picker").disabled=!1,c.disabled=!0,a(0,0,0,0);return}const{days:s,hours:n,minutes:e,seconds:t}=w(r);a(s,n,e,t)}function a(o,r,s,n){h.textContent=u(o),b.textContent=u(r),g.textContent=u(s),S.textContent=u(n)}function w(o){const t=Math.floor(o/864e5),i=Math.floor(o%864e5/36e5),f=Math.floor(o%864e5%36e5/6e4),m=Math.floor(o%864e5%36e5%6e4/1e3);return{days:t,hours:i,minutes:f,seconds:m}}function u(o){return String(o).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
