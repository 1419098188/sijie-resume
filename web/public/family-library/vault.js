'use strict';
// Only ciphertext is fetched. The family code and unlocked key never leave this page.
window.FamilyVault=(()=>{
 let key=null,index=null,generation=0,urls=new Map(),script=null,engineUrl=null;
 const text=new TextEncoder(),decode=new TextDecoder();
 const from64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 async function get(relative){
  if(!/^e\/[a-f0-9]{48}\.bin$/.test(relative))throw Error('资料路径不正确。');
  const r=await fetch(relative,{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
  if(!r.ok)throw Error('资料暂时没加载出来，请检查网络后重试。');return new Uint8Array(await r.arrayBuffer());
 }
 async function decrypt(bytes,k,aad){
  if(bytes.length<33||decode.decode(bytes.slice(0,4))!=='FV01')throw Error('资料包格式不正确。');
  return crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.slice(4,16),additionalData:text.encode(aad),tagLength:128},k,bytes.slice(16));
 }
 async function unlock(passphrase){
  lock();const epoch=generation;
  if(!globalThis.isSecureContext||!crypto?.subtle)throw Error('当前浏览器不支持安全解锁，请从微信菜单选择在浏览器打开。');
  const r=await fetch('vault.json',{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});if(!r.ok)throw Error('无法读取资料配置，请稍后重试。');
  const cfg=await r.json();if(cfg.version!==2||cfg.iterations!==600000||cfg.kdf!=='PBKDF2-SHA256')throw Error('网页正在更新，请从家人发来的新专属链接重新进入。');
  const access=new URLSearchParams(location.hash.slice(1)).get('access');
  if(!access||!/^[A-Za-z0-9_-]{43}$/.test(access))throw Error('请使用家人发来的完整专属链接，再输入家庭密码。');
  const combined='family-link-password-v2\0'+access+'\0'+String(passphrase).normalize('NFKC');
  const material=await crypto.subtle.importKey('raw',text.encode(combined),{name:'PBKDF2'},false,['deriveKey']);
  const wrappingKey=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:from64(cfg.salt),iterations:cfg.iterations},material,{name:'AES-GCM',length:256},false,['decrypt']);
  let candidate;
  try {const rawKey=await decrypt(await get(cfg.wrappedKey),wrappingKey,cfg.wrappedKey);candidate=await crypto.subtle.importKey('raw',rawKey,{name:'AES-GCM'},false,['decrypt']);}
  catch{throw Error('密码不对，或专属链接不完整，请核对后重试。');}
  const bytes=await get(cfg.index);let decoded;
  try{decoded=JSON.parse(decode.decode(await decrypt(bytes,candidate,cfg.index)));}catch{throw Error('资料包不完整，请联系家人重新核对。');}
  if(epoch!==generation)throw Error('资料库已锁定。');
  const blob=new Blob([decoded.engine],{type:'text/javascript'});engineUrl=URL.createObjectURL(blob);
  script=document.createElement('script');script.src=engineUrl;
  await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=()=>reject(Error('无法加载检索功能。'));document.head.append(script);});
  if(epoch!==generation){delete window.RecordSearch;throw Error('资料库已锁定。');}
  if(!window.RecordSearch?.search)throw Error('检索功能未准备好。');
  key=candidate;index=decoded;delete index.engine;return index.data;
 }
 async function file(id,type='file'){
  if(!key||!index)throw Error('请先解锁资料库。');if(!/^[A-Z]\d{3}$/.test(id)||!['file','preview'].includes(type))throw Error('资料编号不正确。');
  const cacheKey=id+'/'+type;if(urls.has(cacheKey))return urls.get(cacheKey);
  const entry=index.files[id]?.[type];if(!entry)throw Error('未收录这份材料。');
  const epoch=generation,k=key;const bytes=await get(entry.path);const plain=await decrypt(bytes,k,entry.path);
  if(epoch!==generation||!key)throw Error('资料库已锁定。');
  const url=URL.createObjectURL(new Blob([plain],{type:entry.mime}));const result={url,name:entry.name};
  if(urls.has(cacheKey)){URL.revokeObjectURL(url);return urls.get(cacheKey);}urls.set(cacheKey,result);return result;
 }
 function lock(){generation++;key=null;index=null;for(const item of urls.values())URL.revokeObjectURL(item.url);urls.clear();if(script){script.remove();script=null;}if(engineUrl){URL.revokeObjectURL(engineUrl);engineUrl=null;}delete window.RecordSearch;}
 return {unlock,file,lock,get generation(){return generation;}};
})();
