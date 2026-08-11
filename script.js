const yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();
const menuToggle=document.getElementById('menu-toggle');
if(menuToggle){document.querySelectorAll('.nav nav a').forEach(function(link){link.addEventListener('click',function(){menuToggle.checked=false})})}

/* Scroll reveal */
const revealTargets=document.querySelectorAll('.reveal,.stagger');
const reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!revealTargets.length){/* nothing to reveal */}
else if(reduceMotion || typeof IntersectionObserver==='undefined'){
  revealTargets.forEach(function(el){el.classList.add('is-visible')});
}else{
  const io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.15,rootMargin:'0px 0px -40px 0px'});
  revealTargets.forEach(function(el){io.observe(el)});
}

/* Stat counters */
const counters=document.querySelectorAll('.stats b[data-count]');
if(counters.length && !reduceMotion && typeof IntersectionObserver!=='undefined'){
  counters.forEach(function(el){el.textContent='0'});
  const animateCount=function(el){
    const target=parseInt(el.getAttribute('data-count'),10) || 0;
    if(target<=1){el.textContent=target;return}
    const duration=900;
    const start=performance.now();
    const step=function(now){
      const progress=Math.min((now-start)/duration,1);
      el.textContent=Math.round(progress*target);
      if(progress<1)requestAnimationFrame(step);else el.textContent=target;
    };
    requestAnimationFrame(step);
  };
  const cio=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        animateCount(entry.target);
        cio.unobserve(entry.target);
      }
    });
  },{threshold:0.5});
  counters.forEach(function(el){cio.observe(el)});
}
