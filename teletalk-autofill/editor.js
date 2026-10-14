const $=s=>document.querySelector(s);let data={profiles:[],mappings:{},catalog:{},catalogContext:{}},current;const tabId=Number(new URLSearchParams(location.search).get('tab'));
function status(t){$('#status').textContent=t;}
function uid(){return crypto.randomUUID();}
function blank(){return {id:uid(),name:'',values:{},jobsCount:1};}
function options(){const s=$('#profiles');s.replaceChildren();for(const p of data.profiles)s.add(new Option(p.name,p.id));if(!data.profiles.some(p=>p.id===current.id))s.add(new Option('নতুন / অসংরক্ষিত',current.id));s.value=current.id;}
function gather(){current.name=$('#name').value.trim();for(const e of document.querySelectorAll('[data-field]'))current.values[e.dataset.field]=e.type==='checkbox'?e.checked:e.value;}
function fieldSpec(id){return profileFields(current).find(f=>f.id===id);}
function valueFor(id){const e=document.getElementById(id);return e?e.value:String(current?.values[id]??'');}
function baseOptions(id){const key=id.replace(/^job\d+\./,'job.');return CATALOG_SNAPSHOT.catalog[key]||[];}
function optionCode(id,value){const list=[...baseOptions(id),...(data.catalog[id]||[])];const op=list.find(o=>o.text===value)||list.find(o=>String(o.value)===String(value));return op?String(op.value):'';}
function fieldOptions(id){
 const parent=DEPENDENT_PARENTS[id];const live=data.catalog[id]||[];
 if(!parent)return live.length?live:baseOptions(id);
 const parentValue=valueFor(parent);
 if(live.length&&data.catalogContext?.[id]===parentValue)return live;
 const code=optionCode(parent,parentValue),d=CATALOG_SNAPSHOT.dependencies;
 if(id.endsWith('.upazila'))return d.upazilaThanaList.filter(o=>String(o.dist_code)===code).map(o=>({text:o.thana,value:o.thana_code}));
 let list=[],types=[];
 if(id==='ssc.subject'){list=d.subjectGroupSSC;types=['3','6'].includes(code)?['V','Z']:['G','Z'];}
 if(id==='hsc.subject'){list=d.subjectGroupHSC;types=code==='4'?['T','Z']:['7','10'].includes(code)?['M','Z']:code==='8'?['V','Z']:['G','Z'];}
 if(id==='grad.subject'){list=d.subjectDegreeListGRA;const type={1:'E',2:'A',3:'M',4:'G',5:'P',6:'F',7:'B',8:'G'}[code];types=type?[type,'Z']:[];}
 if(!code)return [];
 return list.filter(o=>types.includes(o.type)).map(o=>({text:o.value,value:o.code}));
}
function setSelectOptions(e,list,value='',preserve=true){
 const old=String(value??'');let matching=list.find(o=>String(o.text)===old)||list.find(o=>String(o.value)===old);
 // v1.1 used Unmarried; the official site uses Single.
 if(e.id==='basic.marital'&&old==='Unmarried')matching=list.find(o=>o.text==='Single');
 const selected=matching?matching.text:preserve?old:'';
 e.replaceChildren(new Option('Select',''));
 for(const text of [...new Set([...list.map(o=>o.text),...(selected?[selected]:[])])])e.add(new Option(text,text));e.value=selected;paint(e);
}
function refreshDependents(parent){
 for(const [child,p] of Object.entries(DEPENDENT_PARENTS))if(p===parent){const e=document.getElementById(child);if(e)setSelectOptions(e,fieldOptions(child),e.value,false);}
}

function makeField(id,{bare=false}={}){
 const f=fieldSpec(id);if(!f)throw Error('Unknown field '+id);
 const div=document.createElement('div');div.className='field';div.dataset.rowField=id;
 const label=document.createElement('label');label.htmlFor=id;label.textContent=f.label;if(!bare)div.append(label);
 const line=document.createElement('div');line.className='line';
 const e=document.createElement(f.type==='choice'?'select':f.type==='textarea'?'textarea':'input');e.id=id;e.dataset.field=id;
 if(f.type==='choice'){
 setSelectOptions(e,fieldOptions(id),current.values[id]??'');
 }else{
 e.type=f.type==='check'?'checkbox':f.type==='date'?'date':f.type==='email'?'email':'text';
 if(f.type==='check')e.checked=!!current.values[id];else e.value=current.values[id]??'';
 if(['nameBn','fatherBn','motherBn'].includes(f.key))e.placeholder=f.label;
 if(f.key==='description')e.maxLength=300;
 }
 e.addEventListener('input',()=>{paint(e);updateDynamic();});e.addEventListener('change',()=>{paint(e);refreshDependents(id);updateDynamic();});paint(e);line.append(e);
 const b=document.createElement('button');b.className='map';b.type='button';b.textContent='ঘর চিহ্নিত';b.title=f.label+' — ওয়েবসাইটের ঘর চিহ্নিত করুন';b.onclick=()=>map(f);line.append(b);
 if(f.type==='choice'){
 const custom=document.createElement('button');custom.className='custom-option';custom.type='button';custom.textContent='+';custom.title='সাইটের অপশনের হুবহু লেখা যোগ করুন';custom.onclick=()=>{const t=prompt(f.label+' — ওয়েবসাইটে যেভাবে লেখা আছে, সেভাবে অপশন লিখুন।');if(t?.trim()){const text=t.trim();if(![...e.options].some(o=>o.value===text))e.add(new Option(text,text));e.value=text;paint(e);refreshDependents(id);updateDynamic();}};line.append(custom);
 }
 div.append(line);return div;
}
function paint(e){e.classList.toggle('filled',e.type==='checkbox'?e.checked:!!e.value);}
function row(id,opts){const r=document.createElement('div');r.className='form-row';r.append(makeField(id,opts));return r;}
function section(id,title){const f=document.createElement('fieldset');f.className='site-section';f.id='section-'+id;const l=document.createElement('legend');l.textContent=title;f.append(l);return f;}
function inputValue(id){const e=document.getElementById(id);return e?.type==='checkbox'?e.checked:e?.value;}
function isYes(v){return /^(yes|হ্যাঁ|আছে)$/i.test(String(v??'').trim());}
function updateDynamic(){
 const marital=document.getElementById('basic.marital');const spouse=document.querySelector('[data-row-field="basic.spouse"]');
 if(spouse){spouse.hidden=!isMarried(marital?.value,data.catalog['basic.marital']||[]);document.getElementById('basic.spouse').disabled=spouse.hidden;}
 for(const [status,key] of [['nidStatus','nid'],['birthStatus','birth'],['passportStatus','passport']]){
 const f=document.querySelector('[data-row-field="basic.'+key+'"]');if(f){f.hidden=!isYes(inputValue('basic.'+status));document.getElementById('basic.'+key).disabled=f.hidden;}
 }
 for(const s of ['masters','job']){
 const active=!!inputValue(s+'.enabled');const container=document.getElementById('section-'+s);if(container){container.classList.toggle('off',!active);container.querySelectorAll('[data-field]').forEach(e=>{e.disabled=!active;});}
 }
 const same=!!inputValue('permanent.same');for(const f of FIELDS.filter(f=>f.section==='permanent'&&f.key!=='same')){const e=document.getElementById(f.id);if(e)e.disabled=same;}
 for(const s of ['ssc','hsc','grad','masters']){
 const e=document.getElementById(s+'.result');if(e)e.hidden=!/(gpa|cgpa|marks|grade point)/i.test(inputValue(s+'.resultType')||'')&&!e.value;
 }
 for(let n=1;n<=(current.jobsCount||1);n++){
 const s=n===1?'job':'job'+n;const active=!!inputValue('job.enabled');const to=document.getElementById(s+'.to');if(to)to.disabled=!active||!!inputValue(s+'.current');const d=document.getElementById(s+'.description'),c=document.getElementById(s+'-count');if(c)c.textContent=(d?.value.length||0)+' / 300';
 }
}
function draw(){
 $('#name').value=current.name;$('#form').replaceChildren();
 const basic=section('basic','Basic Information');basic.classList.add('basic-section');
 const basicOrder=['name','nameBn','father','fatherBn','mother','motherBn','dob','nationality','religion','gender','nidStatus','birthStatus','passportStatus','marital','mobile','confirmMobile','email','quota','departmental'];
 const pairs={nidStatus:'nid',birthStatus:'birth',passportStatus:'passport',marital:'spouse'};
 for(const k of basicOrder){const r=row('basic.'+k);if(pairs[k]){r.classList.add('compound-row');r.append(makeField('basic.'+pairs[k]));}basic.append(r);}
 $('#form').append(basic);
 const address=document.createElement('div');address.className='address-pair';
 for(const s of ['present','permanent']){
 const wrapper=document.createElement('div');const top=document.createElement('div');top.className='address-top';
 if(s==='permanent'){const f=makeField('permanent.same');f.classList.add('inline-check');top.append(f);}
 wrapper.append(top);const block=section(s,SECTIONS.find(x=>x[0]===s)[1]);for(const k of ['care','village','district','upazila','office','code'])block.append(row(s+'.'+k));wrapper.append(block);address.append(wrapper);
 }$('#form').append(address);
 for(const s of ['ssc','hsc','grad','masters']){
 if(s==='masters'){const applicable=document.createElement('div');applicable.className='applicable-line';applicable.append(makeField('masters.enabled'));$('#form').append(applicable);}
 const block=section(s,SECTIONS.find(x=>x[0]===s)[1]);if(s==='masters')block.classList.add('optional-section');
 const cols=document.createElement('div');cols.className='academic-columns';const left=document.createElement('div'),right=document.createElement('div');left.className=right.className='academic-column';
 const secondary=['ssc','hsc'].includes(s);for(const k of secondary?['exam','roll','subject']:['exam','institution','year'])left.append(row(s+'.'+k));
 right.append(row(s+'.'+(secondary?'board':'subject')));
 const result=row(s+'.resultType');const line=result.querySelector('.line');line.classList.add('result-line');
 const valueField=makeField(s+'.result',{bare:true});line.append(...valueField.querySelector('.line').childNodes);
 const scale=makeField(s+'.scale',{bare:true});scale.className='supplementary-scale';scale.hidden=!(current.values[s+'.scale']||(data.catalog[s+'.scale']||[]).length);if(!scale.hidden){const se=scale.querySelector('select');se.className='scale-control';line.append(...scale.querySelector('.line').childNodes);}else block.append(scale);
 right.append(result);right.append(row(s+'.'+(secondary?'year':'duration')));cols.append(left,right);block.append(cols);$('#form').append(block);
 }
 const applicable=document.createElement('div');applicable.className='applicable-line';applicable.append(makeField('job.enabled'));$('#form').append(applicable);
 const jobs=section('job','Job Experiences');jobs.classList.add('optional-section');
 const add=document.createElement('button');add.className='add-job';add.type='button';add.textContent='⊕ ADD MORE';add.title='আরেকটি অভিজ্ঞতা যোগ করুন';add.onclick=()=>{gather();if(current.jobsCount>=20)return;current.jobsCount++;draw();};jobs.querySelector('legend').append(add);
 for(let n=1;n<=(current.jobsCount||1);n++){
 const s=n===1?'job':'job'+n;const entry=document.createElement('div');entry.className='job-entry';const num=document.createElement('span');num.className='job-number';num.textContent=n;entry.append(num);
 if(n>1&&n===current.jobsCount){const remove=document.createElement('button');remove.className='remove-job';remove.type='button';remove.textContent='×';remove.title='শেষ অতিরিক্ত অভিজ্ঞতা বাদ দিন';remove.onclick=()=>{gather();for(const f of profileFields(current).filter(x=>x.section==='job'+current.jobsCount))delete current.values[f.id];current.jobsCount--;draw();};entry.append(remove);}
 const cols=document.createElement('div');cols.className='job-columns';const left=document.createElement('div'),right=document.createElement('div');
 for(const k of ['employed','designation'])left.append(row(s+'.'+k));for(const k of ['organization','address'])right.append(row(s+'.'+k));
 const service=document.createElement('div');service.className='form-row service-row';const lab=document.createElement('label');lab.htmlFor=s+'.from';lab.textContent='Length of Service';service.append(lab);const dates=document.createElement('div');dates.className='service-dates';const from=makeField(s+'.from',{bare:true}),to=makeField(s+'.to',{bare:true});const span=document.createElement('span');span.textContent='to';dates.append(from.querySelector('.line'),span,to.querySelector('.line'));service.append(dates);left.append(service);
 const working=row(s+'.current');working.classList.add('working-row');left.append(working);cols.append(left,right);entry.append(cols);
 const description=row(s+'.description');description.classList.add('job-description');entry.append(description);const count=document.createElement('div');count.id=s+'-count';count.className='character-count';entry.append(count);jobs.append(entry);
 }$('#form').append(jobs);updateDynamic();
}

async function persist(){await chrome.storage.local.set(data);}
async function save(){gather();if(!current.name)throw Error('প্রোফাইলের নাম দিন।');const i=data.profiles.findIndex(x=>x.id===current.id);const copy=structuredClone(current);if(i<0)data.profiles.push(copy);else data.profiles[i]=copy;data.selected=current.id;await persist();options();status('প্রোফাইল সেভ হয়েছে: '+current.name);}
async function scan(){
 if(!tabId)throw Error('আবেদন ফরমের ট্যাব থেকে এক্সটেনশন খুলে “এই সাইটের ঘর ও অপশন পড়ুন” চাপুন।');
 status('ওয়েবসাইটের ঘর পড়া হচ্ছে…');gather();const r=await siteCall(tabId,{action:'scan',profile:current,mappings:data.mappings});if(r.error)throw Error(r.error);
 for(const [k,v] of Object.entries(r.catalog))if(v.length)data.catalog[k]=v;
 data.catalogContext={...data.catalogContext,...(r.catalogContext||{})};
 await persist();draw();status(`${r.total}টি ব্যবহারযোগ্য ঘর পাওয়া গেছে। ${r.matched}টি প্রোফাইলের ঘরের সঙ্গে মিলেছে।\n${r.missing.length?'যেগুলো মেলেনি: '+r.missing.join('، '):''}\nসাইটের বর্তমান ড্রপডাউন অপশন আপডেট হয়েছে। জেলা ও পরীক্ষার ধরন অনুযায়ী নির্ভরশীল তালিকা স্বয়ংক্রিয়ভাবে বদলাবে।`);
}
async function map(f){
 try{
 if(!tabId)throw Error('আগে মূল ফরমের ট্যাব থেকে এক্সটেনশন খুলুন।');gather();status('মূল ফরমে গিয়ে “'+f.label+'” ঘরে ক্লিক করুন। Escape চাপলে বাতিল হবে।');
 const tab=await chrome.tabs.get(tabId);await siteCall(tabId,{action:'ping'});await chrome.tabs.update(tabId,{active:true});
 const r=await chrome.tabs.sendMessage(tabId,{action:'pick',field:f});if(r.error)throw Error(r.error);
 data.mappings[r.site]=data.mappings[r.site]||{};data.mappings[r.site][f.id]=r.locator;
 if(r.options?.length)data.catalog[f.id]=r.options;
 await persist();draw();status('ঘরের সংযোগ সেভ হয়েছে: '+f.label+'. আবার এই প্রোফাইলের ট্যাবে ফিরে কাজ চালিয়ে যান।');
 }catch(e){status(e.message);}
}
function run(fn){return async()=>{try{await fn();}catch(e){status(e.message);}};}
$('#new').onclick=()=>{if(!confirm('অসংরক্ষিত পরিবর্তন বাদ দিয়ে নতুন প্রোফাইল খুলবেন?'))return;current=blank();options();draw();status('নতুন প্রোফাইল—তথ্য দিয়ে সেভ করুন।');};
$('#profiles').onchange=()=>{current=structuredClone(data.profiles.find(x=>x.id===$('#profiles').value)||blank());options();draw();status('');};
$('#save').onclick=run(save);$('#scan').onclick=run(scan);
$('#fill').onclick=run(async()=>{await save();status('ফরম পূরণ হচ্ছে…');const r=await siteCall(tabId,{action:'fill',profile:current,mappings:data.mappings});if(r.error)throw Error(r.error);status(r.summary);});
$('#delete').onclick=run(async()=>{if(!confirm('এই প্রোফাইল স্থায়ীভাবে মুছবেন?'))return;data.profiles=data.profiles.filter(x=>x.id!==current.id);current=structuredClone(data.profiles[0]||blank());data.selected=current.id;await persist();options();draw();status('প্রোফাইল মুছে ফেলা হয়েছে।');});
$('#export').onclick=run(async()=>{
 await save();if(!confirm('এই ব্যাকআপে ব্যক্তিগত তথ্য সাধারণ পাঠযোগ্য অবস্থায় থাকবে। নিরাপদে রাখবেন এবং কাউকে দেবেন না। ডাউনলোড করবেন?'))return;
 const blob=new Blob([JSON.stringify({format:'teletalk-profile',version:1,profiles:data.profiles,mappings:data.mappings,catalog:data.catalog},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='চাকরির-প্রোফাইল-ব্যাকআপ.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000);
});
$('#import').onclick=()=>$('#file').click();
$('#file').onchange=run(async()=>{
 const file=$('#file').files[0];if(!file)return;if(file.size>5*1024*1024)throw Error('ফাইলটি খুব বড়।');
 const j=JSON.parse(await file.text());if(j.format!=='teletalk-profile'||j.version!==1||!Array.isArray(j.profiles)||j.profiles.length>100)throw Error('সঠিক ব্যাকআপ ফাইল নয়।');
 const imported=[];for(const p of j.profiles){if(typeof p.name!=='string'||!p.values||typeof p.values!=='object'||Array.isArray(p.values))throw Error('প্রোফাইলের তথ্যের ধরন সঠিক নয়।');const v={};for(const f of profileFields(p)){const x=p.values[f.id];if(typeof x==='string'&&x.length<10000||typeof x==='boolean')v[f.id]=x;}imported.push({id:uid(),name:p.name.slice(0,150),values:v,jobsCount:Math.max(1,Math.min(20,Number(p.jobsCount)||1))});}
 if(!confirm(imported.length+'টি প্রোফাইল যোগ করবেন? পুরোনো প্রোফাইল মুছবে না।'))return;
 // Imported mappings are intentionally excluded: bind website controls locally.
 data.profiles.push(...imported);current=structuredClone(imported[0]||blank());data.selected=current.id;await persist();options();draw();status('তথ্য আমদানি হয়েছে। নিরাপত্তার জন্য ব্যাকআপের ঘরের সংযোগ আমদানি করা হয়নি—প্রয়োজনে আবার চিহ্নিত করুন।');$('#file').value='';
});
(async()=>{data={...data,...await chrome.storage.local.get(['profiles','mappings','catalog','catalogContext','selected'])};current=structuredClone(data.profiles.find(x=>x.id===data.selected)||data.profiles[0]||blank());options();draw();if(new URLSearchParams(location.search).get('scan'))await scan();})().catch(e=>status(e.message));

$('#save-bottom').onclick=run(save);
$('#mapping-mode').onchange=()=>{document.body.classList.toggle('mapping-mode',$('#mapping-mode').checked);};
