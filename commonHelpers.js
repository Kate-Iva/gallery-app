import{a as E,S as M,i as g}from"./assets/vendor-eded45c0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const P="https://pixabay.com/api/",x="43788536-1320d3af2b7eba5483923831a",f=async(t="",r=1,a=15)=>{try{return(await E.get(`${P}?key=${x}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`)).data}catch(o){console.error(o)}},y=(t,r=[])=>{const a=r.map(({tags:o,likes:e,views:s,comments:i,downloads:$,webformatURL:q,largeImageURL:w})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${w}" >
              <img class="gallery-image" src="${q}" alt="${o}" />
              <ul class="stats-block">
                <li>
                  <span>Likes</span>
                  <span>${e}</span>
                </li>
                <li>
                  <span>Views</span>
                  <span>${s}</span>
                </li>
                <li>
                  <span>Comments</span>
                  <span>${i}</span>
                </li>
                <li>
                  <span>Downloads</span>
                  <span>${$}</span>
                </li>
              </ul>
            </a>
          </li>
          `).join("");t.insertAdjacentHTML("beforeend",a)},C=document.querySelector('input[class="search-input"]'),O=document.querySelector('form[class="search"]'),h=document.querySelector('section[class="gallery-section"]'),b='<div id="loader" class="loader"></div>',u=document.querySelector('ul[class="gallery"]'),c=document.getElementById("load-more");let l=[],L="",n=1,d=15,m;const T={captionsData:"alt",captionDelay:250},S=new M("ul.gallery a",T),v={position:"topRight",messageColor:"#ffffff",timeout:5e3,radius:15},p=t=>{g.error({...v,backgroundColor:"#FF2E2E",message:t})},I=t=>{g.info({...v,backgroundColor:"lightblue",message:t})},A=t=>{const r=setTimeout(()=>{window.scrollBy({top:t*2,left:0,behavior:"smooth"}),clearTimeout(r)},1e3)},B=async()=>{try{h.insertAdjacentHTML("beforebegin",b),n>=m&&(c.classList.add("none"),I("We're sorry, but you've reached the end of search results."));const t=await f(L,n,d),r=document.querySelector("#loader");r&&r.remove(),l=[...t.hits],y(u,l),S.refresh(),n+=1;const o=document.querySelector(".gallery-item").getBoundingClientRect();A(o.height)}catch(t){console.error(t)}},D=async t=>{t.preventDefault(),l=[],n=1,u.textContent="",c.classList.replace("load-more","none");const r=t.target,a=C.value.trim();if(L=a,a===""){p("The request must not be empty!");return}try{h.insertAdjacentHTML("beforebegin",b);const o=await f(a,n,d),e=document.querySelector("#loader");e&&e.remove(),o!==null&&o.hits.length>0?(l=[...l,...o.hits],y(u,l),S.refresh(),m=Math.ceil(o.total/d),n+=1,n>1&&c.classList.replace("none","load-more")):p("Sorry, there are no images matching your search query. Please, try again again!")}catch(o){console.error("Error fetching images:",o)}n>=m&&(c.classList.add("none"),I("We're sorry, but you've reached the end of search results.")),r.reset()};O.addEventListener("submit",D);c.addEventListener("click",B);
//# sourceMappingURL=commonHelpers.js.map
