(()=>{"use strict";var e={364:(e,t,n)=>{n.r(t)},888:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderCalendar=function(){let e=new Date(l,a+1,0),t=e.getDate();const c=document.getElementById("month");c&&(c.textContent=n.toLocaleDateString("ru-Ru",{month:"long",year:"numeric"}));const s=document.querySelector(".container_calendar__box-day");for(let e=0;e<o;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),r++,e.textContent=r.toString()}const u=n.toLocaleString("ru-Ru",{month:"long"}),i=n.getFullYear(),m=n.getDate();for(let e=1;e<=t;e++){const t=document.createElement("div"),n=document.createElement("div");t.className="days",n.className="dayInCells",null==s||s.appendChild(t),t.appendChild(n);const a=document.createElement("div");a.className="taskInCells",t.appendChild(a),a.textContent="задача с заголовком",d(t,n),n.textContent=e.toString(),c&&e===m&&c.textContent===`${u} ${i} г.`&&n.classList.add("currentDay")}const g=document.querySelectorAll(".days");let y=new Date(l,a+1,1).getDate();for(let e=g.length;e<42;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),e.textContent=y.toString(),y++}var D;null===(D=document.querySelector(".next_month_btn"))||void 0===D||D.addEventListener("click",(()=>{s&&(s.innerHTML=" "),a+=1,12===a&&(a=0,l+=1);const o=new Date(l,a);c&&(c.textContent=o.toLocaleDateString("ru-Ru",{month:"long",year:"numeric"})),e=new Date(l,a+1,0),t=e.getDate();const r=(new Date(l,a,1).getDay()+6)%7;let d=new Date(l,a,-r).getDate();for(let e=0;e<r;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),d++,e.textContent=d.toString()}const u=n.toLocaleString("ru-Ru",{month:"long"}),i=n.getFullYear(),m=n.getDate();for(let e=1;e<=t;e++){const t=document.createElement("div"),n=document.createElement("div");t.className="days",n.className="dayInCells",null==s||s.appendChild(t),t.appendChild(n),n.textContent=e.toString(),c&&e===m&&c.textContent===`${u} ${i} г.`&&n.classList.add("currentDay")}const g=document.querySelectorAll(".days");let y=new Date(l,a+1,1).getDate();for(let e=g.length;e<42;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),e.textContent=y.toString(),y++}})),function(){var o;null===(o=document.querySelector(".prev_month_btn"))||void 0===o||o.addEventListener("click",(()=>{s&&(s.innerHTML=" "),a-=1,0===a&&(a=12,l-=1);const o=new Date(l,a);c&&(c.textContent=o.toLocaleDateString("ru-Ru",{month:"long",year:"numeric"})),e=new Date(l,a+1,0),t=e.getDate();const r=(new Date(l,a,1).getDay()+6)%7;let d=new Date(l,a,-r).getDate();for(let e=0;e<r;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),d++,e.textContent=d.toString()}const u=n.toLocaleString("ru-Ru",{month:"long"}),i=n.getFullYear(),m=n.getDate();for(let e=1;e<=t;e++){const t=document.createElement("div"),n=document.createElement("div");t.className="days",n.className="dayInCells",null==s||s.appendChild(t),t.appendChild(n),n.textContent=e.toString(),c&&e===m&&c.textContent===`${u} ${i} г.`&&n.classList.add("currentDay")}const g=document.querySelectorAll(".days");let y=new Date(l,a+1,1).getDate();for(let e=g.length;e<42;e++){const e=document.createElement("div");e.className="days daysPrevNext",null==s||s.appendChild(e),e.textContent=y.toString(),y++}}))}()};const n=new Date;let a=n.getMonth(),l=n.getFullYear();const o=(new Date(l,a,1).getDay()+6)%7;let r=new Date(l,a,-o).getDate();function d(e,t){e.addEventListener("click",(()=>{console.log("Кликнули по дню:",e,t)}))}}},t={};function n(a){var l=t[a];if(void 0!==l)return l.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(364),(0,n(888).renderCalendar)()})();