async function connect(tabId){
 const tab=await chrome.tabs.get(Number(tabId));
 if(!/^https?:\/\//i.test(tab.url||''))throw new Error('সাধারণ ওয়েবসাইটের আবেদন পেজ খুলুন। ব্রাউজারের সেটিংস বা পিডিএফে এটি চলবে না।');
 await chrome.scripting.executeScript({target:{tabId:Number(tabId)},files:['inject.js']});
 return tab;
}
async function siteCall(tabId,message){
 // schema is injected only when the receiver is absent, to avoid redeclaring constants.
 try{return await chrome.tabs.sendMessage(Number(tabId),message);}catch(e){
 await connect(tabId);return await chrome.tabs.sendMessage(Number(tabId),message);
 }
}
