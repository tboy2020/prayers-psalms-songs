/* install-button.js — universal "Install app" button for ANYONE (drop-in, no deps).
   Chrome/Android: native prompt. iPhone/iPad: Add-to-Home-Screen steps. Already installed: nothing. */
(function(){
  function start(){
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    if(standalone) return;
    try{ if(sessionStorage.getItem('ipwa-dismissed')==='1') return; }catch(e){}
    var ua = navigator.userAgent||'';
    var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
    var isAndroid = /Android/.test(ua);
    var deferred=null, tint='#e3bd5a';
    var meta=document.querySelector('meta[name="theme-color"]'); if(meta&&meta.content) tint=meta.content.trim();
    var appName=(document.title||'this app').split(/[—–|-]/)[0].trim();
    var bar=document.createElement('div'); bar.id='ipwa-bar';
    var btn=document.createElement('button'); btn.id='installBtn'; btn.type='button'; btn.innerHTML='📲 Install app';
    var x=document.createElement('button'); x.id='ipwa-x'; x.type='button'; x.setAttribute('aria-label','Dismiss'); x.innerHTML='×';
    x.addEventListener('click',function(){ bar.parentNode&&bar.parentNode.removeChild(bar); try{sessionStorage.setItem('ipwa-dismissed','1');}catch(e){} });
    bar.appendChild(btn); bar.appendChild(x);
    var css='#ipwa-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:99998;display:flex;align-items:stretch;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.4);overflow:hidden;font-family:inherit}'
      +'#ipwa-bar #installBtn{border:0;cursor:pointer;font-family:inherit;font-weight:800;font-size:15px;color:#1a1407;background:linear-gradient(180deg,#f6e3a8,'+tint+');padding:12px 18px}'
      +'#ipwa-bar #ipwa-x{border:0;cursor:pointer;color:#1a1407;background:rgba(0,0,0,.14);font-size:20px;line-height:1;padding:0 13px}';
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
    document.body.appendChild(bar);
    btn.addEventListener('click',function(){ if(deferred){ deferred.prompt(); deferred.userChoice.then(function(){deferred=null;}); return; } openSheet(); });
    window.addEventListener('beforeinstallprompt',function(e){ e.preventDefault(); deferred=e; });
    window.addEventListener('appinstalled',function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); closeSheet(); });
    var ov;
    function build(){
      var c='.ipwa-ov{position:fixed;inset:0;z-index:100000;display:none;align-items:flex-end;justify-content:center;background:rgba(8,12,24,.6)}'
        +'.ipwa-ov.show{display:flex}'
        +'.ipwa-sheet{background:#13263f;color:#eaf1fb;width:100%;max-width:460px;border-radius:22px 22px 0 0;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));box-shadow:0 -12px 44px rgba(0,0,0,.5);font-family:inherit;border-top:1px solid rgba(227,189,90,.3)}'
        +'.ipwa-sheet h4{margin:0 0 4px;font-size:19px;color:#f6e3a8}.ipwa-sheet .isub{margin:0 0 12px;font-size:14px;color:#9db4d4}'
        +'.ipwa-step{display:flex;gap:11px;align-items:flex-start;margin:11px 0;font-size:15px;line-height:1.45}.ipwa-step b{color:#f6e3a8}'
        +'.ipwa-step .num{flex:none;width:25px;height:25px;border-radius:50%;background:'+tint+';color:#1a1407;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:13px}'
        +'.ipwa-close{margin-top:16px;width:100%;border:0;border-radius:14px;padding:13px;font-family:inherit;font-weight:800;font-size:16px;background:linear-gradient(180deg,#f6e3a8,'+tint+');color:#1a1407;cursor:pointer}';
      var st=document.createElement('style'); st.textContent=c; document.head.appendChild(st);
      ov=document.createElement('div'); ov.className='ipwa-ov';
      ov.addEventListener('click',function(e){ if(e.target===ov) closeSheet(); });
      document.body.appendChild(ov);
    }
    function steps(){
      if(isIOS) return [['1','Tap the <b>Share</b> button at the bottom of Safari.'],['2','Scroll and tap <b>Add to Home Screen</b>.'],['3','Tap <b>Add</b> — the app appears on your home screen.']];
      if(isAndroid) return [['1','Tap the <b>⋮ menu</b> at the top-right of Chrome.'],['2','Tap <b>Add to Home screen</b> (or <b>Install app</b>).'],['3','Tap <b>Install</b> — it opens like a real app, offline.']];
      return [['1','Look in the address bar for the <b>install icon</b> ⊕.'],['2','Or open the browser menu and choose <b>Install…</b>.'],['3','Confirm <b>Install</b> — it opens in its own window.']];
    }
    function openSheet(){ if(!ov) build();
      var rows=steps().map(function(s){return '<div class="ipwa-step"><span class="num">'+s[0]+'</span><span>'+s[1]+'</span></div>';}).join('');
      ov.innerHTML='<div class="ipwa-sheet"><h4>📲 Add '+appName+' to your device</h4><p class="isub">Opens full-screen and works offline — no app store, no sign-up.</p>'+rows+'<button class="ipwa-close" type="button">Got it</button></div>';
      ov.querySelector('.ipwa-close').addEventListener('click',closeSheet);
      requestAnimationFrame(function(){ ov.classList.add('show'); });
    }
    function closeSheet(){ if(ov) ov.classList.remove('show'); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
