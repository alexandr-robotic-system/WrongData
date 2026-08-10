const yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();
const menuToggle=document.getElementById('menu-toggle');
if(menuToggle){document.querySelectorAll('.nav nav a').forEach(function(link){link.addEventListener('click',function(){menuToggle.checked=false})})}
