/* Prayers, Psalms & Songs — service worker. Bump CACHE on every change. */
var CACHE = 'pss-v3';
var SHELL = [
  './','./index.html','./app_data.js','./install-button.js','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon-180.png'
];
self.addEventListener('install', function(e){ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).catch(function(){})); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(k){ return Promise.all(k.map(function(x){ if(x!==CACHE) return caches.delete(x); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch', function(e){
  var req=e.request; if(req.method!=='GET') return;
  if(new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(req).then(function(hit){ return hit || fetch(req).then(function(res){ var cp=res.clone(); caches.open(CACHE).then(function(c){ c.put(req,cp); }).catch(function(){}); return res; }).catch(function(){ return caches.match('./index.html'); }); }));
});
