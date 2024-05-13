import{a as w,S as C,i as f}from"./assets/vendor-eded45c0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const E="https://pixabay.com/api/",P="43788536-1320d3af2b7eba5483923831a",p=async(t="",r=1,a=15)=>{try{return(await w.get(`${E}?key=${P}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`)).data}catch(o){console.error(o)}},y=(t,r=[])=>{const a=r.map(({tags:o,likes:e,views:s,comments:c,downloads:I,webformatURL:q,largeImageURL:M})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${M}" >
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
                  <span>${c}</span>
                </li>
                <li>
                  <span>Downloads</span>
                  <span>${I}</span>
                </li>
              </ul>
            </a>
          </li>
          `).join("");t.insertAdjacentHTML("beforeend",a)},x=document.querySelector('input[class="search-input"]'),O=document.querySelector('form[class="search"]'),h=document.querySelector('section[class="gallery-section"]'),b='<div id="loader" class="loader"></div>',d=document.querySelector('ul[class="gallery"]'),l=document.getElementById("load-more");let i=[],L="",n=1,m=15,u;const T={captionsData:"alt",captionDelay:250},S=new C("ul.gallery a",T),$={position:"topRight",messageColor:"#ffffff",timeout:5e3,radius:15},g=t=>{f.error({...$,backgroundColor:"#FF2E2E",message:t})},v=t=>{f.info({...$,timeout:1e4,backgroundColor:"lightblue",message:t})},A=t=>{f.info({position:"topLeft",messageColor:"#ffffff",timeout:3e3,radius:15,backgroundColor:"lightgreen",message:t})},B=t=>{const r=setTimeout(()=>{window.scrollBy({top:t*2,left:0,behavior:"smooth"}),clearTimeout(r)},1e3)},D=async()=>{try{h.insertAdjacentHTML("beforebegin",b),n>=u&&(l.classList.add("none"),v("We're sorry, but you've reached the end of search results."));const t=await p(L,n,m),r=document.querySelector("#loader");if(r&&r.remove(),i=[...t.hits],y(d,i),S.refresh(),n+=1,l)return A(`Loaded ${n-1}th page from ${u} pages`);const o=document.querySelector(".gallery-item").getBoundingClientRect();B(o.height)}catch(t){console.error(t)}},k=async t=>{t.preventDefault(),i=[],n=1,d.textContent="",l.classList.replace("load-more","none");const r=t.target,a=x.value.trim();if(L=a,a===""){g("The request must not be empty!");return}try{h.insertAdjacentHTML("beforebegin",b);const o=await p(a,n,m),e=document.querySelector("#loader");e&&e.remove(),o!==null&&o.hits.length>0?(i=[...i,...o.hits],y(d,i),S.refresh(),u=Math.ceil(o.total/m),n+=1,n>1&&l.classList.replace("none","load-more")):g("Sorry, there are no images matching your search query. Please, try again again!")}catch(o){console.error("Error fetching images:",o)}n>=u&&(l.classList.add("none"),v("We're sorry, but you've reached the end of search results.")),r.reset()};O.addEventListener("submit",k);l.addEventListener("click",D);
//# sourceMappingURL=commonHelpers.js.map
