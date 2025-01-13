(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,a(r.key),r)}}function n(e,t,n){return(t=a(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(t){var n=function(t){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,"string");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}var r=function(){return e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"key","tasks"),n(this,"arrayTask",[]),this.loadTasks()},a=[{key:"createTask",value:function(e,t,n){var a={title:e,description:t,date:n,createdDate:(new Date).toLocaleDateString()};this.arrayTask.push(a),this.saveTasks()}},{key:"saveTasks",value:function(){localStorage.setItem(this.key,JSON.stringify(this.arrayTask))}},{key:"filterTasks",value:function(e,t,n){var a=this;return this.arrayTask.filter((function(r){var l=!e||a.fuzzyMatch(r.title,e),i=!t||r.tags&&a.fuzzyMatch(r.tags,t),c=!n||r.date===n;return l&&i&&c}))}},{key:"fuzzyMatch",value:function(e,t){return new RegExp(t.split("").join(".*"),"i").test(e)}},{key:"loadTasks",value:function(){this.arrayTask=this.getTask()}},{key:"getTask",value:function(){var e=localStorage.getItem(this.key);if(e)try{var t=JSON.parse(e);return Array.isArray(t)?t:(console.warn("Data in localStorage is not an array"),[])}catch(e){return console.error("Failed to parse tasks from localStorage:",e),[]}return[]}},{key:"showTask",value:function(){return this.arrayTask}},{key:"deleteTask",value:function(e){this.arrayTask=this.arrayTask.filter((function(t){return t.title!==e})),this.saveTasks()}},{key:"clickTask",value:function(e){var t=this.arrayTask.find((function(t){return t.title===e}));return t?{title:t.title,description:t.description}:null}},{key:"deleteTaskAll",value:function(){localStorage.removeItem(this.key),this.arrayTask=[]}},{key:"editTask",value:function(e,t,n){var a=this.arrayTask.findIndex((function(t){return t.title===e}));-1!==a&&(this.arrayTask[a].title=t,this.arrayTask[a].description=n,this.saveTasks())}}],a&&t(e.prototype,a),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,a}();!function(){var e,t,n=new r,a=new Date,l=a.getMonth(),i=a.getFullYear(),c=null,o=document.getElementById("taskContainer");function s(){o.innerHTML="";var e=n.showTask(),t={},a=document.getElementById("filter-title").value.trim(),r=document.getElementById("filter-tags").value.trim(),c=document.getElementById("filter-date").value;function d(e){var t=document.getElementById("task-popupDetail"),a=document.getElementById("edit-title"),r=document.getElementById("edit-description");a.value=e.title,r.value=e.description,t.style.display="block",document.getElementById("save-changes").onclick=function(){var l=a.value.trim(),i=r.value.trim();l&&i?(n.editTask(e.title,l,i),s(),t.style.display="none"):alert("Пожалуйста, заполните все поля.")},document.getElementById("delete-task").onclick=function(){n.deleteTask(e.title),s(),t.style.display="none"},t.style.display="block"}n.filterTasks(a,r,c).forEach((function(e){var t=document.createElement("div");t.classList.add("task");var n=document.createElement("h3");n.textContent=e.title,n.addEventListener("click",(function(){d(e)}));var a=document.createElement("p");a.textContent=e.description;var r=document.createElement("p");r.textContent="Назначенная дата: ".concat(e.date),t.appendChild(n),t.appendChild(a),t.appendChild(r),o.appendChild(t)}));var u=document.getElementById("close-popupDetail");null==u||u.addEventListener("click",(function(){document.getElementById("task-popupDetail").style.display="none"})),e.forEach((function(e){var n=e.date;t[n]||(t[n]=[]),t[n].push(e);var a=document.createElement("div");a.classList.add("task");var r=document.createElement("h3");r.textContent=e.title,r.addEventListener("click",(function(){d(e)}));var l=document.createElement("p");l.textContent=e.description;var i=document.createElement("p");i.textContent="Назначенная дата: ".concat(e.date),a.appendChild(r),a.appendChild(l),a.appendChild(i),o.appendChild(a)})),document.getElementById("filter-btn").addEventListener("click",(function(){s()})),document.querySelectorAll(".calendar-cell[data-date]").forEach((function(e){var n=e.getAttribute("data-date");if(n){var a="".concat(i,"-").concat(l+1,"-").concat(n),r=e.querySelector(".tasks-list");r&&r.remove();var c=t[a];if(c){var o=document.createElement("div");o.classList.add("tasks-list"),c.forEach((function(e){var t=document.createElement("div");t.className="current-task",t.textContent=e.title,t.addEventListener("click",(function(){d(e)})),o.appendChild(t)})),e.appendChild(o)}}}))}s();var d=document.getElementById("save-task");function u(){var e=document.querySelector(".calendar-grid");document.getElementById("month").textContent=a.toLocaleString("ru-RU",{month:"long",year:"numeric"}),e.innerHTML="",["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].forEach((function(t){e.innerHTML+='<div class="calendar-cell calendar-cell--header">'.concat(t,"</div>")}));for(var t=new Date(i,l+1,0).getDate(),n=new Date(i,l,1).getDay(),r=new Date(i,l,0).getDate(),o=n-1;o>=0;o--){var d=r-o;e.innerHTML+='<div class="calendar-cell calendar-cell--previous">'.concat(d,"</div>")}for(var u=1;u<=t;u++)e.innerHTML+='<div class="calendar-cell" data-date="'.concat(u,'">').concat(u,"</div>");for(var v=42-(n+t),y=1;y<=v;y++)e.innerHTML+='<div class="calendar-cell calendar-cell--next">'.concat(y,"</div>");var m=document.getElementById("task-popup"),f=document.getElementById("close-popup"),k=document.querySelectorAll(".calendar-cell[data-date]");null==f||f.addEventListener("click",(function(){m&&(m.style.display="none",c=null)})),k.forEach((function(e){e.addEventListener("click",(function(t){if(t.target.closest(".tasks-list"))console.log("Вы кликнули по задачам, попап не будет открыт.");else{var n=e.getAttribute("data-date");n?(console.log("Выбранная дата: ".concat(n)),c="".concat(i,"-").concat(l+1,"-").concat(n),function(){if(m){var e=document.getElementById("task-title"),t=document.getElementById("task-description");e.value="",t.value="",m.style.display="block"}}()):console.log("Атрибут data-date не найден.")}}))}));var p=document.getElementById("task"),h=document.getElementById("task-popupTasks"),g=document.getElementById("close-popupTasks");p.addEventListener("click",(function(){h.style.display="block"})),g.addEventListener("click",(function(){h.style.display="none"})),s()}function v(e){(l+=e)>11?(l=0,i++):l<0&&(l=11,i--),a.setFullYear(i,l),u()}null==d||d.addEventListener("click",(function(e){e.preventDefault();var t=document.getElementById("task-title"),a=document.getElementById("task-description"),r=t.value.trim(),l=a.value.trim();r&&l&&c&&(n.createTask(r,l,c),s(),t.value="",a.value=""),c=null})),null===(e=document.querySelector(".control-button-next"))||void 0===e||e.addEventListener("click",(function(){return v(1)})),null===(t=document.querySelector(".control-button-prev"))||void 0===t||t.addEventListener("click",(function(){return v(-1)})),u()}()})();