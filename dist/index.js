"use strict";(()=>{var o=()=>{let e=document.querySelector('[dd-skip-to-main-content="trigger"]'),t=document.querySelector('[dd-skip-to-main-content="target"]');!e||!t||["click","keypress"].forEach(r=>{e.addEventListener(r,n=>{n.type==="keydown"&&n.which!==13||(n.preventDefault(),t.setAttribute("tabindex","-1"),t.focus())})})};var i=()=>{let e=document.querySelector('[dd-date="current-year"]');if(!e)return;let t=new Date().getFullYear();e.innerText=t.toString()};var c=()=>{let e=document.querySelectorAll('[dd-circle-highlight="wrapper"]'),t=document.querySelectorAll('[dd-circle-highlight="element"]');!e||!t||e.forEach((r,n)=>{let a=t[n];r.innerHTML='<span class="z-index-2">'+r.textContent+"</span>",r.appendChild(a.cloneNode(!0))})};var l=()=>{let e=navigator.userAgent.toLowerCase(),t=e.indexOf("safari/")>-1&&e.indexOf("chrome/")===0,r=document.querySelectorAll('[dd-clip-path="true"]');!t||!r||r.forEach(n=>{n.style.backdropFilter="none"})};window.Webflow;window.Webflow.push(()=>{o(),i(),c(),l()});})();
