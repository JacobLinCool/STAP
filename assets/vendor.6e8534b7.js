var o=Object.defineProperty,g=(t,e)=>{for(var s in e)o(t,s,{get:e[s],enumerable:!0})},c={};g(c,{english_letters:()=>m,numbers:()=>x,punctuations:()=>F,spaces:()=>l});var _=[...`,.!?;:"'\u201C\u201D\u2018\u2019\u201E<>\u2039\u203A\xAB\xBB_`],p=[..."\u3002\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\uFF08\uFF09\u2500\uFF1F\uFF01\u2026\uFE4F\u300A\u300B\u3008\u3009\uFF3F\xB7\u2014\uFE5D\uFE5E\u3010\u3011"],F=new Set([..._,...p]),f=[..."abcdefghijklmnopqrstuvwxyz"],w=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],m=new Set([...f,...w]),l=new Set([...` \u3000
	`]),x=new Set([..."0123456789"]),E=class{constructor(t=!1){this._case=!1,this._ignore=new Set,this._split=l,t?this.case_sensitive():this.case_insensitive()}ignore(t){return t.forEach(e=>this._ignore.add(e)),this}get_ignore(){return this._ignore}clear_ignore(){return this._ignore.clear(),this}split(t){return t.forEach(e=>this._split.add(e)),this}get_split(){return this._split}clear_split(){return this._split.clear(),this}case_insensitive(){return this._case=!1,this}case_sensitive(){return this._case=!0,this}};function a(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}function v(t){return new Map([...t.entries()].sort((e,s)=>s[1]-e[1]))}var b=class extends E{constructor(t="",e=!1){super(e);this.text="",this.set(t)}set(t){return this.text=t,this}segments(){let t=[(this._case?this.text:this.text.toLowerCase()).replace(new RegExp(`${[...this._ignore].map(e=>a(this._case?e:e.toLowerCase())).join("|")}`,"g"),"")];return this._split.size&&(t=t[0].split(new RegExp(`${[...this._split].map(e=>a(this._case?e:e.toLowerCase())).join("|")}`,"g"))),t}ngram(t){let e=this.segments(),s=new Map;for(let i=0;i<e.length;i++)for(let r=0;r<e[i].length-t+1;r++){let n=e[i].substring(r,r+t);s.set(n,s.has(n)?s.get(n)+1:1)}return s}count(t){t=[...t].sort((i,r)=>r.length-i.length);let e=this.segments(),s=new Map;for(let i=0;i<e.length;i++)for(let r=0;r<e[i].length;r++)for(let n=0;n<t.length;n++){let u=e[i].substring(r,r+t[n].length);if(u===t[n]){s.set(u,s.has(u)?s.get(u)+1:1),r+=t[n].length-1;break}}return s}meaningful(t=2,e=2){if(t<1||e<1)throw new Error("min_length and min_count must be greater than 0");let s=new Map,i=[...new Set(this._split)];for(let r=Math.floor(this.length/e);r>=t;r--){let n=this.ngram(r);for(let[u,h]of n)h>=e&&s.set(u,h);this.clear_split(),this.split([...i,...s.keys()])}return this.clear_split(),this.split(i),s}get length(){return this.text.length}};export{b as g,v as j,c as m};
