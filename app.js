(() => {
'use strict';
const D=window.EXHIBITION, main=document.querySelector('main'), dialog=document.querySelector('dialog'), open=document.querySelector('#menu-open');
const menus=[['newspaper','NEWSPAPER'],['messenger','MESSENGER'],['archive','MEME ARCHIVE'],['tv','TV'],['about','ABOUT']];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=s=> {const v=String(s||'');return /^(assets\/|\.\/assets\/)/.test(v)&&!v.includes('..')?esc(v):'';};
const link=(r,t,cl='')=>`<a class="${cl}" href="#/${r}">${t}</a>`;
function media(m,n){const src=url(m.src);return `<figure class="media">${src?(m.type==='video'?`<video controls playsinline preload="metadata" aria-label="${esc(m.alt)}"><source src="${src}">영상을 지원하지 않는 브라우저입니다.</video>`:`<img src="${src}" alt="${esc(m.alt)}" loading="lazy">`):`<div class="placeholder" role="img" aria-label="${esc(m.caption)}"><span>DESIGNED REJECTION / ${esc(n)}</span><b>${esc(n)}</b><small>${m.type==='video'?'VIDEO':'IMAGE'} — 자료 교체 예정</small></div>`}<figcaption>${esc(m.caption)}</figcaption></figure>`;}
function heading(label,title,back='',backText='홈으로'){return `<article class="page">${link(back,'← '+backText,'back')}<p class="eyebrow">${label}</p><h1 id="page-title">${esc(title)}</h1>`;}
function close(){if(dialog.open)dialog.close();open.setAttribute('aria-expanded','false');}
document.querySelector('#navigation').innerHTML=menus.map(([r,t],i)=>link(r,`<small>0${i+1}</small>${t}`)).join('');
open.addEventListener('click',()=>{dialog.showModal();open.setAttribute('aria-expanded','true');});
document.querySelector('#menu-close').addEventListener('click',close);
dialog.addEventListener('close',()=>open.setAttribute('aria-expanded','false'));
dialog.addEventListener('click',e=>{if(e.target.closest('a')){close();if(e.target.closest('a').hash===location.hash)main.focus();}});
function render(initial=false){
close(); const route=location.hash.replace(/^#\/?/,'').replace(/\/$/,'');let title='홈';
document.querySelectorAll('nav a').forEach(a=>{if(a.hash===`#/${route}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
if(!route){main.innerHTML=`<div class="landing"><div class="sculpture" aria-label="전시의 다섯 메뉴">${menus.map(([r,t])=>link(r,`<span class="sr-only">${t}</span>`,'bar')).join('')}</div><div class="intro"><h1 id="page-title">〈설계된 거절〉</h1><p>${esc(D.project.intro)}</p>${link('archive','EXPLORE THE EXHIBITION →','text-link')}</div></div>`;}
else if(route==='archive'){title='MEME ARCHIVE';main.innerHTML=heading('03 / TEN MEMES, TEN QUESTIONS',title)+`<p class="lead">열 개의 밈을 통해 일상에 숨은 거절을 읽습니다.<br>궁금한 장면부터 선택해 보세요.</p><p class="note">기존 대화의 사례를 바탕으로 구성한 해설 초안입니다. 최종 작품 제목·순서와 이미지·영상은 교체 예정입니다.</p><div class="archive">${D.memes.map(m=>link('meme/'+m.id,`<div class="placeholder"><span>MEME ${m.id}</span><b>${m.id}</b><small>작품 자료 교체 예정</small></div><h2>${esc(m.title)}</h2><p>${esc(m.question)}</p>`,'card')).join('')}</div></article>`;}
else if(route.startsWith('meme/')&&D.memes.some(m=>'meme/'+m.id===route)){const i=D.memes.findIndex(m=>'meme/'+m.id===route),m=D.memes[i];title=m.title;main.innerHTML=heading(`MEME ${m.id} / 10`,title,'archive','밈 아카이브')+media(m.media,m.id)+`<div class="reading"><p class="question"><small>QUESTION ${m.id}</small>${esc(m.question)}</p><section><h2>디자인 사례</h2><p>${esc(m.case)}</p></section><section><h2>어떤 행동이 제한되는가</h2><p>${esc(m.interpretation)}</p></section><section><h2>관객이 주목할 점</h2><p>${esc(m.look)}</p></section><p class="note">기존 대화의 사례를 바탕으로 쓴 전시 해설 초안입니다. 최종 작품 자료와 대조해 수정해 주세요.</p></div><div class="page-nav">${i?link('meme/'+D.memes[i-1].id,'← '+D.memes[i-1].title):link('archive','← 전체 밈')}${i<9?link('meme/'+D.memes[i+1].id,D.memes[i+1].title+' →'):link('about','프로젝트 소개 →')}</div></article>`;}
else if(D.media.some(m=>m.id===route)){const m=D.media.find(m=>m.id===route);title=m.name;main.innerHTML=heading(`EXHIBITION / ${m.medium}`,title)+`<h2>${esc(m.title)}</h2>`+media(m.media,m.name)+`<div class="reading"><section><h2>매체에 관하여</h2><p>${esc(m.body)}</p></section><section><h2>이렇게 관람해 보세요</h2><p>${esc(m.look)}</p></section><p class="question"><small>A QUESTION TO TAKE WITH YOU</small>${esc(m.question)}</p></div>${link('archive','열 개의 밈 살펴보기 →','text-link')}</article>`;}
else if(route==='about'){title='ABOUT';main.innerHTML=heading('05 / ABOUT THE PROJECT',title)+`<div class="reading"><h2>설계된 거절<br>보이지 않는 가이드라인</h2><p>${esc(D.project.intro)}</p><section><h2>열 개의 밈, 열 개의 질문</h2><p>익숙해서 지나쳤던 사물과 화면을 밈의 언어로 다시 바라봅니다. 무엇을 할 수 있는가뿐 아니라 무엇을 할 수 없게 만드는가를 묻습니다.</p></section><section><h2>세 매체를 잇는 도슨트</h2><p>신문에서는 읽기의 질서를, 버디버디 메신저에서는 소통의 인터페이스를, 브라운관 TV에서는 반복되는 밈의 장면을 만납니다. 이 웹사이트는 각 다이와 열 개의 밈을 연결하는 관람 안내입니다. 정해진 순서 없이 탐색할 수 있습니다.</p></section></div><div class="about-list">${menus.slice(0,4).map(([r,t],i)=>link(r,`<span>0${i+1} / ${t}</span><span>↗</span>`)).join('')}</div><p class="note">졸업전시 프로젝트 · 작품 사진·영상 및 작가 크레딧 추가 예정<br>웹 해설은 기존 기획 대화를 바탕으로 편집한 초안입니다.</p></article>`;}
else {title='페이지를 찾을 수 없습니다';main.innerHTML=heading('404',title)+`<p>주소를 확인하거나 전시 메뉴를 선택해 주세요.</p>${link('','홈으로 →','text-link')}</article>`;}
document.title=title+' | 설계된 거절';window.scrollTo(0,0);if(!initial)main.focus();
main.querySelectorAll('img,video').forEach(el=>el.addEventListener('error',()=>{const box=document.createElement('div');box.className='placeholder';box.textContent='자료를 불러올 수 없습니다. 파일 경로를 확인해 주세요.';el.replaceWith(box);},{once:true}));
}
window.addEventListener('hashchange',()=>render());render(true);
})();
