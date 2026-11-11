const sharp = require('C:\\Users\\adego\\Documents\\DealStudio-Backend\\node_modules\\sharp');
const OUT = 'C:\\Users\\adego\\Documents\\Bible-Prayers-Songs\\app\\icons\\';
const fs=require('fs'); if(!fs.existsSync(OUT)) fs.mkdirSync(OUT,{recursive:true});
const defs=`<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2d4a"/><stop offset="1" stop-color="#0b1627"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e3a8"/><stop offset="1" stop-color="#e3bd5a"/></linearGradient>
  <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2cf"/><stop offset="1" stop-color="#e3bd5a"/></linearGradient>
</defs>`;
// rising flame (prayer / spirit) above an open book (the Word)
const flame=`<path d="M256,96 C286,132 300,150 300,182 C300,214 280,236 256,236 C232,236 212,214 212,182 C212,158 230,140 243,120 C248,140 262,150 262,166 C274,156 272,132 256,96 Z" fill="url(#fl)"/>`;
const book=`<g>
  <path d="M256,300 L256,428" stroke="#0b1627" stroke-width="10" opacity="0.5"/>
  <path d="M256,300 C214,278 160,276 128,286 L128,430 C160,420 214,422 256,444 Z" fill="url(#g)"/>
  <path d="M256,300 C298,278 352,276 384,286 L384,430 C352,420 298,422 256,444 Z" fill="url(#g)"/>
  <g stroke="#0b1627" stroke-width="5" opacity="0.32" stroke-linecap="round">
    <path d="M158,314 C184,309 214,311 234,322"/><path d="M158,346 C184,341 214,343 234,354"/><path d="M158,378 C184,373 214,375 234,386"/>
    <path d="M354,314 C328,309 298,311 278,322"/><path d="M354,346 C328,341 298,343 278,354"/><path d="M354,378 C328,373 298,375 278,386"/>
  </g>
</g>`;
function svg(maskable){ const inner=maskable?`<g transform="translate(256,266) scale(0.74) translate(-256,-266)">${flame}${book}</g>`:`${flame}${book}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${defs}<rect width="512" height="512" rx="96" fill="url(#bg)"/>${inner}</svg>`; }
function svgSq(){ return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${defs}<rect width="512" height="512" fill="#0f1e33"/>${flame}${book}</svg>`; }
async function run(){
  await sharp(Buffer.from(svg(false))).resize(192,192).png().toFile(OUT+'icon-192.png');
  await sharp(Buffer.from(svg(false))).resize(512,512).png().toFile(OUT+'icon-512.png');
  await sharp(Buffer.from(svg(true))).resize(512,512).png().toFile(OUT+'icon-maskable-512.png');
  await sharp(Buffer.from(svgSq())).resize(180,180).png().toFile(OUT+'apple-touch-icon-180.png');
  console.log('icons written to '+OUT);
}
run().catch(function(e){ console.log('ERR '+e.message); process.exit(1); });
