const $=s=>document.querySelector(s);let tabId;
(async()=>{
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});tabId=tab?.id;
 const d=await chrome.storage.local.get(['profiles','selected']);
 for(const p of d.profiles||[]){const o=new Option(p.name,p.id);$('#profiles').add(o);}
 if((d.profiles||[]).some(p=>p.id===d.selected))$('#profiles').value=d.selected;
 if(!$('#profiles').value){$('#fill').disabled=true;$('#status').textContent='আগে নিজের নামে একটি প্রোফাইল তৈরি করে সেভ করুন।';}
})().catch(e=>$('#status').textContent=e.message);
$('#profiles').onchange=()=>chrome.storage.local.set({selected:$('#profiles').value});
$('#edit').onclick=()=>chrome.tabs.create({url:chrome.runtime.getURL('editor.html')+'?tab='+tabId});
$('#scan').onclick=()=>chrome.tabs.create({url:chrome.runtime.getURL('editor.html')+'?tab='+tabId+'&scan=1'});
$('#fill').onclick=async()=>{
 $('#fill').disabled=true;$('#status').textContent='ঘর শনাক্ত ও তথ্য বসানো হচ্ছে…';
 try{
 const d=await chrome.storage.local.get(['profiles','mappings']);const p=(d.profiles||[]).find(x=>x.id===$('#profiles').value);
 if(!p)throw Error('প্রোফাইল পাওয়া যায়নি।');
 const r=await siteCall(tabId,{action:'fill',profile:p,mappings:d.mappings||{}});
 $('#status').textContent=r.error||r.summary;
 }catch(e){$('#status').textContent='কাজটি করা যায়নি: '+e.message+'\nফরমের ট্যাব রিফ্রেশ করে আবার চেষ্টা করুন।';}
 finally{$('#fill').disabled=false;}
};
