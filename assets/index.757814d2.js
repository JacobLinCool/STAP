const G=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const d of e)if(d.type==="childList")for(const t of d.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&c(t)}).observe(document,{childList:!0,subtree:!0});function n(e){const d={};return e.integrity&&(d.integrity=e.integrity),e.referrerpolicy&&(d.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?d.credentials="include":e.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(e){if(e.ep)return;e.ep=!0;const d=n(e);fetch(e.href,d)}};G();const X="KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3ZhciBnPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxjPSh0LGUpPT57Zm9yKHZhciBzIGluIGUpZyh0LHMse2dldDplW3NdLGVudW1lcmFibGU6ITB9KX0saD17fTtjKGgse2VuZ2xpc2hfbGV0dGVyczooKT0+bSxudW1iZXJzOigpPT54LHB1bmN0dWF0aW9uczooKT0+RixzcGFjZXM6KCk9Pmx9KTt2YXIgcD1bLi4uYCwuIT87OiInXHUyMDFDXHUyMDFEXHUyMDE4XHUyMDE5XHUyMDFFPD5cdTIwMzlcdTIwM0FceEFCXHhCQl9gXSxfPVsuLi4iXHUzMDAyXHVGRjBDXHUzMDAxXHVGRjFCXHVGRjFBXHUzMDBDXHUzMDBEXHUzMDBFXHUzMDBGXHVGRjA4XHVGRjA5XHUyNTAwXHVGRjFGXHVGRjAxXHUyMDI2XHVGRTRGXHUzMDBBXHUzMDBCXHUzMDA4XHUzMDA5XHVGRjNGXHhCN1x1MjAxNFx1RkU1RFx1RkU1RVx1MzAxMFx1MzAxMSJdLEY9bmV3IFNldChbLi4ucCwuLi5fXSksZj1bLi4uImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Il0sdz1bLi4uIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaIl0sbT1uZXcgU2V0KFsuLi5mLC4uLnddKSxsPW5ldyBTZXQoWy4uLmAgXHUzMDAwCglgXSkseD1uZXcgU2V0KFsuLi4iMDEyMzQ1Njc4OSJdKSxFPWNsYXNze2NvbnN0cnVjdG9yKHQ9ITEpe3RoaXMuX2Nhc2U9ITEsdGhpcy5faWdub3JlPW5ldyBTZXQsdGhpcy5fc3BsaXQ9bCx0P3RoaXMuY2FzZV9zZW5zaXRpdmUoKTp0aGlzLmNhc2VfaW5zZW5zaXRpdmUoKX1pZ25vcmUodCl7cmV0dXJuIHQuZm9yRWFjaChlPT50aGlzLl9pZ25vcmUuYWRkKGUpKSx0aGlzfWdldF9pZ25vcmUoKXtyZXR1cm4gdGhpcy5faWdub3JlfWNsZWFyX2lnbm9yZSgpe3JldHVybiB0aGlzLl9pZ25vcmUuY2xlYXIoKSx0aGlzfXNwbGl0KHQpe3JldHVybiB0LmZvckVhY2goZT0+dGhpcy5fc3BsaXQuYWRkKGUpKSx0aGlzfWdldF9zcGxpdCgpe3JldHVybiB0aGlzLl9zcGxpdH1jbGVhcl9zcGxpdCgpe3JldHVybiB0aGlzLl9zcGxpdC5jbGVhcigpLHRoaXN9Y2FzZV9pbnNlbnNpdGl2ZSgpe3JldHVybiB0aGlzLl9jYXNlPSExLHRoaXN9Y2FzZV9zZW5zaXRpdmUoKXtyZXR1cm4gdGhpcy5fY2FzZT0hMCx0aGlzfX07ZnVuY3Rpb24gYSh0KXtyZXR1cm4gdC5yZXBsYWNlKC9bLS9cXF4kKis/LigpfFtcXXt9XS9nLCJcXCQmIil9ZnVuY3Rpb24gdih0KXtyZXR1cm4gbmV3IE1hcChbLi4udC5lbnRyaWVzKCldLnNvcnQoKGUscyk9PnNbMV0tZVsxXSkpfXZhciBkPWNsYXNzIGV4dGVuZHMgRXtjb25zdHJ1Y3Rvcih0PSIiLGU9ITEpe3N1cGVyKGUpO3RoaXMudGV4dD0iIix0aGlzLnNldCh0KX1zZXQodCl7cmV0dXJuIHRoaXMudGV4dD10LHRoaXN9c2VnbWVudHMoKXtsZXQgdD1bKHRoaXMuX2Nhc2U/dGhpcy50ZXh0OnRoaXMudGV4dC50b0xvd2VyQ2FzZSgpKS5yZXBsYWNlKG5ldyBSZWdFeHAoYCR7Wy4uLnRoaXMuX2lnbm9yZV0ubWFwKGU9PmEodGhpcy5fY2FzZT9lOmUudG9Mb3dlckNhc2UoKSkpLmpvaW4oInwiKX1gLCJnIiksIiIpXTtyZXR1cm4gdGhpcy5fc3BsaXQuc2l6ZSYmKHQ9dFswXS5zcGxpdChuZXcgUmVnRXhwKGAke1suLi50aGlzLl9zcGxpdF0ubWFwKGU9PmEodGhpcy5fY2FzZT9lOmUudG9Mb3dlckNhc2UoKSkpLmpvaW4oInwiKX1gLCJnIikpKSx0fW5ncmFtKHQpe2xldCBlPXRoaXMuc2VnbWVudHMoKSxzPW5ldyBNYXA7Zm9yKGxldCBuPTA7bjxlLmxlbmd0aDtuKyspZm9yKGxldCBpPTA7aTxlW25dLmxlbmd0aC10KzE7aSsrKXtsZXQgcj1lW25dLnN1YnN0cmluZyhpLGkrdCk7cy5zZXQocixzLmhhcyhyKT9zLmdldChyKSsxOjEpfXJldHVybiBzfWNvdW50KHQpe3Q9Wy4uLnRdLnNvcnQoKG4saSk9PmkubGVuZ3RoLW4ubGVuZ3RoKTtsZXQgZT10aGlzLnNlZ21lbnRzKCkscz1uZXcgTWFwO2ZvcihsZXQgbj0wO248ZS5sZW5ndGg7bisrKWZvcihsZXQgaT0wO2k8ZVtuXS5sZW5ndGg7aSsrKWZvcihsZXQgcj0wO3I8dC5sZW5ndGg7cisrKXtsZXQgdT1lW25dLnN1YnN0cmluZyhpLGkrdFtyXS5sZW5ndGgpO2lmKHU9PT10W3JdKXtzLnNldCh1LHMuaGFzKHUpP3MuZ2V0KHUpKzE6MSksaSs9dFtyXS5sZW5ndGgtMTticmVha319cmV0dXJuIHN9bWVhbmluZ2Z1bCh0PTIsZT0yKXtpZih0PDF8fGU8MSl0aHJvdyBuZXcgRXJyb3IoIm1pbl9sZW5ndGggYW5kIG1pbl9jb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwIik7bGV0IHM9bmV3IE1hcCxuPVsuLi5uZXcgU2V0KHRoaXMuX3NwbGl0KV07Zm9yKGxldCBpPU1hdGguZmxvb3IodGhpcy5sZW5ndGgvZSk7aT49dDtpLS0pe2xldCByPXRoaXMubmdyYW0oaSk7Zm9yKGxldFt1LG9db2YgcilvPj1lJiZzLnNldCh1LG8pO3RoaXMuY2xlYXJfc3BsaXQoKSx0aGlzLnNwbGl0KFsuLi5uLC4uLnMua2V5cygpXSl9cmV0dXJuIHRoaXMuY2xlYXJfc3BsaXQoKSx0aGlzLnNwbGl0KG4pLHN9Z2V0IGxlbmd0aCgpe3JldHVybiB0aGlzLnRleHQubGVuZ3RofX07b25tZXNzYWdlPWZ1bmN0aW9uKHQpe2NvbnN0IGU9dC5kYXRhLHM9bmV3IGQoZSkuc3BsaXQoaC5wdW5jdHVhdGlvbnMpLG49dihzLm1lYW5pbmdmdWwoKSk7cG9zdE1lc3NhZ2Uobil9fSkoKTsK",i=typeof window!="undefined"&&window.Blob&&new Blob([atob(X)],{type:"text/javascript;charset=utf-8"});function p(){const l=i&&(window.URL||window.webkitURL).createObjectURL(i);try{return l?new Worker(l):new Worker("data:application/javascript;base64,"+X,{type:"module"})}finally{l&&(window.URL||window.webkitURL).revokeObjectURL(l)}}const u=new p;let a=0;document.querySelector("#file").addEventListener("drop",l=>{l.preventDefault(),l.stopPropagation();const o=l.dataTransfer.files[0];let n="";if(o.type.startsWith("text")){const c=new FileReader;c.onload=function(e){n=e.target.result,document.querySelector("#file-content").value=n,s()},c.readAsText(o)}});document.querySelector("#file-content").addEventListener("input",s);async function s(){if(a>Date.now())return;a=Date.now()+1e3;const l=document.querySelector("#file-content").value,o=l.length;console.time("parse: "+o);const n=new Promise(c=>{u.onmessage=function(e){c(e.data)}});u.postMessage(l),console.log(await n),console.timeEnd("parse: "+o),document.querySelector("#meaningful-words").value=`Map(${(await n).size}) {
${[...(await n).entries()].reduce((c,[e,d])=>c+`    '${e}' => ${d},
`,"")}}`}