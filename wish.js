!function(){
'use strict';
var _=["wishFab","wishPanel","show","wishInput","wishSubmit","wishListBox","wishClearAll","wishSync","wish_record_list","正在同步...","✅ 云端同步正常","⚠️ 云端连接失败，使用本地缓存","暂无记录，在下方输入你想要的工具/功能","确定清空所有记录？","请输入内容","wish-empty","wish-item","wish-text","wish-time","wish-no","wish-del","wish-sync","success","error","click","input","keydown"];
var $=function(k){return _[k]};
var s=null,l=!1,C=null;

function U(t,x){var e=document.getElementById($(7));e.textContent=t;e.className=$(21)+(x?x:"")}

if(window.supabase){
 s=window.supabase.createClient("https://biwthpkgkveoojuzbcar.supabase.co","sb_publishable_CV17Lu6I4LE9g4XTIU-fRA_rEdiY7IW")
} else {
 U("⚠️ Supabase未加载",$(23));return
}

function G(){try{var r=localStorage.getItem($(8));return r?JSON.parse(r):[]}catch(e){return[]}}
function S(d){try{localStorage.setItem($(8),JSON.stringify(d))}catch(e){}}

async function F(){
 if(l)return;l=!0;U($(9));
 try{
  var r=await s.from('wish_list').select('*').eq('delete','false').order('time',{ascending:!1});
  if(r.error)throw r.error;
  S(r.data);R(r.data);U($(10))
 }catch(e){
  console.error(e);
  var d=G();R(d);U($(11),$(23))
 }finally{l=!1}
}

async function A(v){
 var n=new Date(),t=n.getFullYear()+'-'+(n.getMonth()+1).toString().padStart(2,'0')+'-'+n.getDate().toString().padStart(2,'0')+' '+n.getHours().toString().padStart(2,'0')+':'+n.getMinutes().toString().padStart(2,'0');
 var o={id:Date.now().toString(),text:v,time:t};
 try{
  var r=await s.from('wish_list').insert([o]);
  if(r.error)throw r.error;
  U($(10));await F()
 }catch(e){
  console.error(e);
  var d=G();d.push(o);S(d);U($(11),$(23));await F()
 }
}

async function D(id){
 try{await s.from('wish_list').update({delete:'true',delete_time:new Date().toISOString()}).eq('id',id);await F()}catch(e){console.error(e)}
}

async function K(){
 if(!confirm($(13)))return;
 try{await s.from('wish_list').update({delete:'true',delete_time:new Date().toISOString()}).eq('delete','false');await F()}catch(e){console.error(e)}
}

function R(list){
 var b=document.getElementById($(5));b.innerHTML="";
 if(list.length===0){b.innerHTML='<div class="'+$(15)+'">'+$(12)+'</div>';return}
 list.forEach(function(x,i){
  var d=document.createElement('div');d.className=$(16);
  d.innerHTML='<div class="'+$(17)+'"><span class="'+$(19)+'">'+(i+1)+'.</span>'+x.text+'<div class="'+$(18)+'">'+x.time+'</div></div><button class="'+$(20)+'" data-id="'+x.id+'">✕</button>';
  b.appendChild(d)
 });
 b.querySelectorAll('.'+$(20)).forEach(function(btn){
  btn.addEventListener($(24),async function(){await D(btn.dataset.id)})
 })
}

function H(){
 var p=document.getElementById($(1)),b=document.getElementById($(0));
 var o=p.classList.toggle($(2));
 if(o){document.getElementById($(3)).focus()}
 b.style.transform=o?'rotate(135deg)':'none'
}

function N(){
 var i=document.getElementById($(3)),v=i.value.trim();if(!v){alert($(14));return}
 A(v);i.value=''
}

function T(){
 s.channel('wish_channel').on('postgres_changes',{event:'*',schema:'public',table:'wish_list'},async function(){await F()}).subscribe()
}

document.getElementById($(0)).addEventListener($(24),H);
document.getElementById($(4)).addEventListener($(24),N);
document.getElementById($(3)).addEventListener($(26),function(e){if(e.key==='Enter'){e.preventDefault();N()}});
document.getElementById($(6)).addEventListener($(24),K);
document.addEventListener($(24),function(e){
 var p=document.getElementById($(1));
 if(p.classList.contains($(2))&&!p.contains(e.target)&&e.target!==document.getElementById($(0))){
  p.classList.remove($(2));document.getElementById($(0)).style.transform='none'
 }
});
F();T();
}();
