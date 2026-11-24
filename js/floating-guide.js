// РАХАТ — экскурсовод и смена текста при прокрутке
window.mountFloatingGuide=function(stops,getLang){
 if(window.guideCleanup)window.guideCleanup();
 stops=stops.filter(s=>s.el);if(!stops.length)return;
 const panel=document.createElement('aside');panel.className='floating-guide';panel.innerHTML='<img src="assets/images/virtual-guide.webp" alt=""><div class="floating-paper"><small></small><p aria-live="polite"></p></div><button type="button" class="guide-toggle" aria-expanded="true">−</button>';
 document.body.append(panel);const paper=panel.querySelector('.floating-paper'),msg=paper.querySelector('p'),label=paper.querySelector('small'),btn=panel.querySelector('button');let frame=0,last='',closed=matchMedia('(max-width:750px)').matches;
 if(closed){panel.classList.add('collapsed');btn.textContent='+';btn.setAttribute('aria-expanded','false');}
 function update(){frame=0;let active=stops[0];const line=innerHeight*.46;for(const s of stops){if(s.el.getBoundingClientRect().top<=line)active=s;else break;}const kz=getLang()==='kz',value=active.lines[kz?1:0];label.textContent=kz?'Экскурсовод сөзі':'Слова экскурсовода';btn.setAttribute('aria-label',kz?'Экскурсоводты көрсету немесе жасыру':'Показать или свернуть экскурсовода');if(value!==last){last=value;msg.textContent=value;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)paper.animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350});}}
 function schedule(){if(!frame)frame=requestAnimationFrame(update)}
 btn.onclick=()=>{closed=!closed;panel.classList.toggle('collapsed',closed);btn.textContent=closed?'+':'−';btn.setAttribute('aria-expanded',String(!closed));};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);document.addEventListener('click',schedule);update();window.guideCleanup=()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);document.removeEventListener('click',schedule);cancelAnimationFrame(frame);panel.remove();};
};
