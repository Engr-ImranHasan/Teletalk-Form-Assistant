/* Generated from schema.js and content.js. */
(()=>{
/* All visible fields from the supplied BCIC application screenshot.
   Dropdown choices are read from the live form, not invented here. */
const SECTIONS = [
 ['basic','Basic Information'],['present','Present Address (বর্তমান ঠিকানা)'],['permanent','Permanent Address (স্থায়ী ঠিকানা)'],
 ['ssc','SSC/Equivalent Level'],['hsc','HSC/Equivalent Level'],['grad','Graduation/Equivalent Level'],
 ['masters','Masters/Equivalent Level'],['job','Job Experiences']
];
const FIELDS=[];
function field(section,key,label,aliases,type='text'){FIELDS.push({id:section+'.'+key,section,key,label,aliases,type});}
field('basic','post','পদের নাম',['name of the post','post name','post applied for']);
field('basic','name','আবেদনকারীর নাম (ইংরেজি)',["applicant's name",'applicant name','name','applicant_name']);
field('basic','nameBn','আবেদনকারীর নাম (বাংলায়)',['আবেদনকারীর নাম (বাংলায়)','applicant name bangla','name bangla','name_bn','name_bangla']);
field('basic','father','পিতার নাম (ইংরেজি)',["father's name",'father name','father_name']);
field('basic','fatherBn','পিতার নাম (বাংলায়)',['পিতার নাম (বাংলায়)','father name bangla','father_bn','father_bangla']);
field('basic','mother','মাতার নাম (ইংরেজি)',["mother's name",'mother name','mother_name']);
field('basic','motherBn','মাতার নাম (বাংলায়)',['মাতার নাম (বাংলায়)','mother name bangla','mother_bn','mother_bangla']);
field('basic','dob','জন্মতারিখ',['date of birth','dob','birth date'],'date');
for(const [k,l,a] of [
 ['nationality','জাতীয়তা',['nationality']],['religion','ধর্ম',['religion']],['gender','লিঙ্গ',['gender','sex']],
 ['nidStatus','জাতীয় পরিচয়পত্র আছে কি না',['national id','national id status','nid status']],
 ['birthStatus','জন্মনিবন্ধন আছে কি না',['birth registration','birth registration status']],
 ['passportStatus','পাসপোর্ট আছে কি না',['passport id','passport status']],
 ['marital','বৈবাহিক অবস্থা',['marital status','marital']],['quota','কোটা',['quota']],
 ['departmental','বিভাগীয় প্রার্থীর অবস্থা',['departmental status','departmental']]
])field('basic',k,l,a,'choice');
field('basic','spouse','[Spouse Name]',['spouse name','spouse_name','spouse','husband wife name']);
field('basic','nid','জাতীয় পরিচয়পত্র নম্বর (ঘর চালু হলে)',['national id number','nid number','nid no','nid']);
field('basic','birth','জন্মনিবন্ধন নম্বর (ঘর চালু হলে)',['birth registration number','birth registration no','brn']);
field('basic','passport','পাসপোর্ট নম্বর (ঘর চালু হলে)',['passport number','passport no']);
field('basic','mobile','মোবাইল নম্বর',['mobile number','mobile no','mobile','phone']);
field('basic','confirmMobile','মোবাইল নম্বর পুনরায়',['confirm mobile number','confirm mobile','confirm_mobile']);
field('basic','email','ইমেইল',['email','e mail'],'email');
for(const s of ['present','permanent']){
 if(s==='permanent')field(s,'same','বর্তমান ঠিকানার মতোই',['same as present address'],'check');
 field(s,'care','যত্নে (Care Of)',['care of','care']);
 field(s,'village','গ্রাম / সড়ক / বাড়ি / ফ্ল্যাট',['village road house flat','village','road','house','address'],'textarea');
 field(s,'district','জেলা',['district'],'choice');
 field(s,'upazila','উপজেলা / থানা',['upazila p s','upazila','thana','police station'],'choice');
 field(s,'office','ডাকঘর',['post office','post_office']);
 field(s,'code','পোস্ট কোড',['post code','postcode','zip']);
}
for(const s of ['ssc','hsc','grad','masters']){
 if(s==='masters')field(s,'enabled','স্নাতকোত্তর প্রযোজ্য',['if applicable','applicable'],'check');
 field(s,'exam','পরীক্ষা',['examination','exam'],'choice');
 if(s==='ssc'||s==='hsc'){
 field(s,'board','শিক্ষা বোর্ড',['board'],'choice');field(s,'roll','রোল নম্বর',['roll no','roll number','roll']);
 field(s,'subject','গ্রুপ / বিষয়',['group subject','group','subject'],'choice');
 }else{
 field(s,'institution','বিশ্ববিদ্যালয় / প্রতিষ্ঠান',['university inst','university','institution','institute'],'choice');
 field(s,'subject','বিষয় / ডিগ্রি',['subject degree','subject','degree'],'choice');
 field(s,'duration','কোর্সের মেয়াদ',['course duration','duration'],'choice');
 }
 field(s,'resultType','ফলাফলের ধরন',['result','result type'],'choice');
 field(s,'result','জিপিএ / সিজিপিএ / নম্বর (ঘর চালু হলে)',['gpa','cgpa','marks','result value']);
 field(s,'scale','জিপিএ / সিজিপিএ স্কেল (ঘর থাকলে)',['scale','out of'],'choice');
 field(s,'year','পাসের বছর',['passing year','pass year','year'],'choice');
}
field('job','enabled','চাকরির অভিজ্ঞতা প্রযোজ্য',['if applicable','applicable'],'check');
for(const [k,l,a,t] of [
 ['employed','নিয়োগের ধরন',['employed on','employment type'],'choice'],
 ['organization','প্রতিষ্ঠানের নাম',['organization','organisation'],'text'],
 ['designation','পদবি',['designation post','designation'],'text'],
 ['address','প্রতিষ্ঠানের ঠিকানা',['address'],'textarea'],
 ['from','চাকরি শুরুর তারিখ',['length of service from','from'],'date'],
 ['to','চাকরি শেষের তারিখ',['length of service to','to'],'date'],
 ['current','বর্তমানে কর্মরত',['currently working'],'check'],
 ['description','কাজের বিবরণ (সাইটে ৩০০ অক্ষর সীমা দেখা যাচ্ছে)',['job description','description'],'textarea']
])field('job',k,l,a,t);
const SECTION_ALIASES={basic:['basic information'],present:['present address','বর্তমান ঠিকানা'],permanent:['permanent address','স্থায়ী ঠিকানা'],ssc:['ssc equivalent level','ssc/equivalent level'],hsc:['hsc equivalent level','hsc/equivalent level'],grad:['graduation equivalent level','graduation/equivalent level'],masters:['masters equivalent level','masters/equivalent level'],job:['job experience']};
function profileFields(profile){
 const base=[...FIELDS];
 for(let n=2;n<=Math.min(20,Number(profile?.jobsCount)||1);n++)for(const f of FIELDS.filter(x=>x.section==='job'&&x.key!=='enabled'))base.push({...f,id:'job'+n+'.'+f.key,section:'job'+n,label:f.label});
 return base;
}

// Screenshot labels; identifiers stay unchanged for old saved profiles.
const SITE_LABELS={
 'basic.post':'Name of the Post','basic.name':"Applicant's Name",'basic.nameBn':'আবেদনকারীর নাম (বাংলায়)',
 'basic.father':"Father's Name",'basic.fatherBn':'পিতার নাম (বাংলায়)',
 'basic.mother':"Mother's Name",'basic.motherBn':'মাতার নাম (বাংলায়)',
 'basic.dob':'Date of Birth','basic.nationality':'Nationality','basic.religion':'Religion','basic.gender':'Gender',
 'basic.nidStatus':'National ID','basic.nid':'[National ID Number]','basic.birthStatus':'Birth Registration',
 'basic.birth':'[Birth Registration Number]','basic.passportStatus':'Passport ID','basic.passport':'[Passport Number]',
 'basic.marital':'Marital Status','basic.spouse':'[Spouse Name]','basic.mobile':'Mobile Number',
 'basic.confirmMobile':'Confirm Mobile Number','basic.email':'Email','basic.quota':'Quota','basic.departmental':'Departmental Status'
};
for(const f of FIELDS){
 const s=f.section,k=f.key;
 if(SITE_LABELS[f.id])f.label=SITE_LABELS[f.id];
 else if(['present','permanent'].includes(s))f.label=({same:'Same as Present Address',care:'Care Of',village:'Village/ Road/ House/ Flat',district:'District',upazila:'Upazila/P.S.',office:'Post Office',code:'Post Code'})[k]||f.label;
 else if(['ssc','hsc','grad','masters'].includes(s))f.label=({enabled:'If Applicable',exam:'Examination',board:'Board',roll:'Roll No',subject:['ssc','hsc'].includes(s)?'Group/Subject':'Subject/Degree',institution:'University/Inst.',resultType:'Result',result:'GPA / CGPA / Marks',scale:'Scale',year:'Passing Year',duration:'Course Duration'})[k]||f.label;
 else if(s==='job')f.label=({enabled:'If Applicable',employed:'Employed on',organization:'Organization',designation:'Designation/Post',address:'Address',from:'Length of Service',to:'to',current:'Currently Working',description:'Job Description'})[k]||f.label;
}
function isMarried(value,options=[]){
 const raw=String(value??'').trim();const op=options.find(o=>String(o.value)===raw);
 return /^(married|বিবাহিত)$/i.test(op?String(op.text).trim():raw);
}

// Verified IDs from the real BCIC 202606 application HTML.
const BCIC_IDS = {"basic.name":"name","basic.nameBn":"name_bn","basic.father":"father","basic.fatherBn":"father_bn","basic.mother":"mother","basic.motherBn":"mother_bn","basic.dob":"dob","basic.nationality":"nationality","basic.religion":"religion","basic.gender":"gender","basic.nidStatus":"nid","basic.nid":"nid_no","basic.birthStatus":"breg","basic.birth":"breg_no","basic.passportStatus":"passport","basic.passport":"passport_no","basic.marital":"marital_status","basic.spouse":"spouse_name","basic.mobile":"mobile","basic.confirmMobile":"confirm_mobile","basic.email":"email","basic.quota":"quota","basic.departmental":"dep_status","permanent.same":"same_as_present","masters.enabled":"if_applicable_mas","job.enabled":"if_applicable_exp","job.employed":"employment_type","job.designation":"designation","job.from":"job_start_date","job.to":"job_end_date","job.current":"currently_working","job.organization":"organization","job.address":"office_address","job.description":"job_description","present.care":"present_careof","present.village":"present_village","present.district":"present_district","present.upazila":"present_upazila","present.office":"present_post","present.code":"present_postcode","permanent.care":"permanent_careof","permanent.village":"permanent_village","permanent.district":"permanent_district","permanent.upazila":"permanent_upazila","permanent.office":"permanent_post","permanent.code":"permanent_postcode","ssc.exam":"ssc_exam","ssc.subject":"ssc_group","ssc.board":"ssc_board","ssc.roll":"ssc_roll","ssc.resultType":"ssc_result_type","ssc.result":"ssc_result","ssc.year":"ssc_year","hsc.exam":"hsc_exam","hsc.subject":"hsc_group","hsc.board":"hsc_board","hsc.roll":"hsc_roll","hsc.resultType":"hsc_result_type","hsc.result":"hsc_result","hsc.year":"hsc_year","grad.exam":"gra_exam","grad.subject":"gra_subject","grad.institution":"gra_institute","grad.resultType":"gra_result_type","grad.result":"gra_result","grad.year":"gra_year","grad.duration":"gra_duration","masters.exam":"mas_exam","masters.subject":"mas_subject","masters.institution":"mas_institute","masters.resultType":"mas_result_type","masters.result":"mas_result","masters.year":"mas_year","masters.duration":"mas_duration"};
const DEPENDENT_PARENTS = {"present.upazila":"present.district","permanent.upazila":"permanent.district","ssc.subject":"ssc.exam","hsc.subject":"hsc.exam","grad.subject":"grad.exam"};

(()=>{
 if(globalThis.__teletalkAssistant)return;globalThis.__teletalkAssistant=true;
 const norm=s=>String(s??'').toLowerCase().replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const site=()=>location.origin+location.pathname;
 const forbidden=e=>['password','file','submit','button','reset','hidden'].includes(e.type)||/captcha|verification|verify.?code|security.?code|declaration|declare|agree|consent|যাচাইকরণ/.test(norm([e.id,e.name,e.placeholder,label(e)].join(' ')))||e.id==='ta-overlay';
 function texts(node){if(!node)return '';const clone=node.cloneNode(true);clone.querySelectorAll?.('select,input,textarea,script,style,button').forEach(x=>x.remove());return clone.textContent?.trim()||'';}
 function label(e){
 const explicit=[...(e.labels||[])].map(texts).join(' ').trim();if(explicit)return explicit;
 if(e.getAttribute('aria-label'))return e.getAttribute('aria-label');
 const cell=e.closest('td,th');
 if(cell){const own=texts(cell);if(own)return own;let p=cell.previousElementSibling;if(p&&/^(TD|TH)$/.test(p.tagName))return texts(p);}
 let p=e.previousSibling;for(let i=0;p&&i<4;i++,p=p.previousSibling){const t=p.nodeType===3?p.textContent:texts(p);if(t?.trim())return t.trim();}
 const group=e.closest('.form-group,.field');if(group)return texts(group);
 return e.placeholder||'';
 }
 function controls(){
 const out=[];let section='basic';const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;
 while(n=walker.nextNode()){
 if(n.nodeType===3){if(n.parentElement.closest('select,option,script,style,#ta-overlay,button'))continue;const text=norm(n.textContent);if(!text||text.length>100)continue;
 for(const [key,aa] of Object.entries(SECTION_ALIASES)){if(aa.some(a=>text===norm(a)||text.startsWith(norm(a)+' ')))section=key;}
 }else if(n.matches?.('input,select,textarea')&&!n.closest('#ta-overlay')&&!forbidden(n)){
 let sec=section;const l=norm(label(n));
 if(n.type==='checkbox'&&/if applicable|^applicable$/.test(l)){
 // In Teletalk, the activation checkbox can precede the section heading.
 let next=n.closest('tr')?.nextElementSibling||n.parentElement?.nextElementSibling;const hint=norm(texts(next));
 if(/masters/.test(hint))sec='masters';else if(/job experience/.test(hint))sec='job';
 }
 if(n.type==='checkbox'&&/same as present/.test(l))sec='permanent';
 out.push({e:n,section:sec,label:label(n),index:out.length});
 }
 }return out;
 }
 function locator(c){return {id:c.e.id||'',name:c.e.name||'',tag:c.e.tagName,type:c.e.type||'',index:c.index,label:norm(c.label)};}
 function resolve(loc,cs){
 const pool=cs.filter(c=>c.e.tagName===loc.tag&&c.e.type===loc.type);
 let c;if(loc.id){const hits=pool.filter(c=>c.e.id===loc.id);if(hits.length===1)c=hits[0];}
 if(!c&&loc.name){const hits=pool.filter(c=>c.e.name===loc.name);if(hits.length===1)c=hits[0];}
 if(!c)c=cs[loc.index];
 if(!c||c.e.tagName!==loc.tag||c.e.type!==loc.type||loc.label&&norm(c.label)!==loc.label)return null;
 return c;
 }
 function match(f,cs,maps){
 const saved=maps[site()]?.[f.id];
 if(saved){
  const mapped=resolve(saved,cs);
  if(!isBCIC()||!/^job\d*$/.test(f.section)||f.key==='enabled')return {c:mapped,mapped:true};
  const ordinal=f.section==='job'?0:Number(f.section.slice(3))-1,expected=jobRows()[ordinal];
  if(mapped&&expected?.contains(mapped.e))return {c:mapped,mapped:true};
  // A deleted/reordered job row can invalidate an old mapping; use verified row-local fields instead.
 }

 if(f.key==='post')return {c:null};
 if(location.hostname==='bcic.teletalk.com.bd'&&location.pathname==='/bcic202606/application.php'){
  const key=f.id.replace(/^job\d+\./,'job.');const known=BCIC_IDS[key];
  if(known){
   const jobMatch=f.section.match(/^job(\d+)?$/);let candidates;
   if(jobMatch&&f.key!=='enabled'){
    const ordinal=jobMatch[1]?Number(jobMatch[1])-1:0,row=jobRows()[ordinal];
    candidates=row?cs.filter(c=>row.contains(c.e)&&c.e.name?.endsWith(`[${known}]`)):[];
   }else candidates=cs.filter(c=>c.e.id===known);
   if(candidates.length===1)return {c:candidates[0]};
  }
 }
 if(/^job\d/.test(f.section))return {c:null};
 const hits=[];
 for(const c of cs){
 if(c.section!==f.section)continue;
 if((f.type==='check')!==(c.e.type==='checkbox'))continue;
 const lbl=norm(c.label),ids=[norm(c.e.id),norm(c.e.name)],ph=norm(c.e.placeholder);let score=0;
 for(const a of f.aliases){const aa=norm(a);if(lbl===aa)score=Math.max(score,100+aa.length/100);if(ids.includes(aa))score=Math.max(score,90+aa.length/100);if(ph===aa)score=Math.max(score,85+aa.length/100);}
 // Never infer a Bangla name from an English label or a number from a status dropdown.
 if(f.key.endsWith('Bn')&&!/বাংলা|bangla|bangali|bengali| bn$/.test(norm([c.label,c.e.id,c.e.name,c.e.placeholder].join(' '))))score=0;
 if(['nid','birth','passport','result'].includes(f.key)&&c.e.tagName==='SELECT')score=0;
 if(f.type==='choice'&&c.e.tagName!=='SELECT')score=0;
 if(score)hits.push({c,score});
 }
 hits.sort((a,b)=>b.score-a.score);if(!hits.length||hits[1]?.score===hits[0].score)return {c:null};return {c:hits[0].c};
 }
 function choiceOptions(e){return e.tagName==='SELECT'?[...e.options].filter(o=>!o.disabled&&o.value!==''&&!/^(select|please select|নির্বাচন)/i.test(o.textContent.trim())).map(o=>({text:o.textContent.trim(),value:o.value})):[];}
 function scan(p,maps){const cs=controls(),catalog={},catalogContext={},missing=[];let matched=0;const used=new Set();
 if(!cs.length)return {error:'এই পেজে আবেদন ফরমের ঘর নেই। মূল সাইট থেকে সার্কুলার ও পদ নির্বাচন করে তথ্য দেওয়ার আসল ফরম খুলুন।'};
 for(const f of profileFields(p)){const {c}=match(f,cs,maps);if(c&&!used.has(c.e)){used.add(c.e);matched++;if(c.e.tagName==='SELECT'){
  catalog[f.id]=choiceOptions(c.e);const parentId=DEPENDENT_PARENTS[f.id];
  if(parentId){const parent=match(FIELDS.find(f=>f.id===parentId),cs,maps).c;catalogContext[f.id]=parent?.e.selectedOptions?.[0]?.textContent?.trim()||'';}
 }}else if(f.key!=='post')missing.push(f.label);}
 return {catalog,catalogContext,total:cs.length,matched,missing};
 }

 function visible(e){return e.getClientRects().length>0&&!e.disabled&&!e.readOnly;}
 function change(e,v){
 if(e.type==='checkbox'){
 if(e.checked!==!!v)e.click();return e.checked===!!v;
 }
 if(e.tagName==='SELECT'){
 if(e.id==='marital_status'&&v==='Unmarried')v='Single';
 let hits=[...e.options].filter(o=>!o.disabled&&norm(o.textContent)===norm(v));
 if(!hits.length)hits=[...e.options].filter(o=>!o.disabled&&o.value===String(v));
 if(hits.length!==1)return false;const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;setter.call(e,hits[0].value);
 }else{
 let value=String(v);
 if(/^\d{4}-\d{2}-\d{2}$/.test(value)&&e.type!=='date'){
 if(/yyyy.*mm.*dd/i.test(e.placeholder||''))value=value;
 else{const [y,m,d]=value.split('-');value=/\//.test(e.placeholder||'')?`${d}/${m}/${y}`:`${d}-${m}-${y}`;}
 }
 const proto=e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
 Object.getOwnPropertyDescriptor(proto,'value').set.call(e,value);
 if(e.value!==value)return false;
 }
 e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));e.dispatchEvent(new Event('blur',{bubbles:true}));return true;
 }
 const pause=ms=>new Promise(r=>setTimeout(r,ms));
 function isBCIC(){return location.hostname==='bcic.teletalk.com.bd'&&location.pathname==='/bcic202606/application.php';}
 function jobRows(){return [...document.querySelectorAll('#expSection .jobExpTemplate')].filter(row=>row.querySelector('select[name*="[employment_type]"]'));}
 function waitUntil(test,timeout=5000){
  return new Promise((resolve,reject)=>{
   if(test()){resolve();return;}
   const observer=new MutationObserver(()=>{if(test()){cleanup();resolve();}});
   const timer=setTimeout(()=>{cleanup();reject(Error('নতুন অভিজ্ঞতার সারি আসেনি।'));},timeout);
   function cleanup(){observer.disconnect();clearTimeout(timer);}
   observer.observe(document.body,{subtree:true,childList:true,attributes:true});
  });
 }
 async function addJobRow(number){
  if(jobRows().length>=number)return false;
  const button=document.getElementById('addNewJob');
  if(!isBCIC()||!button||button.tagName!=='BUTTON'||button.type!=='button'||!button.closest('#expSection')||!/\baddNewExp\s*\(/.test(button.getAttribute('onclick')||''))throw Error('এই ফরমের নিরাপদ ADD MORE বোতাম শনাক্ত করা যায়নি।');
  if(!visible(button))throw Error('ADD MORE বোতাম নিষ্ক্রিয় বা লুকানো। If Applicable চালু আছে কি না দেখুন।');
  const pending=waitUntil(()=>jobRows().length>=number);button.click();await pending;await pause(120);return true;
 }
 async function fill(p,maps){
 if(!p||!p.values)return {error:'প্রোফাইলে তথ্য নেই।'};
 const fs=profileFields(p),done=new Set(),why=new Map(),claimed=new Map(),attempted=new Set();
 const jobInfo={requested:p.values['job.enabled']?Math.max(1,Math.min(20,Math.trunc(Number(p.jobsCount))||1)):0,created:0,filled:0,reused:0,stopped:''};
 function eligible(f,cs){
  const v=p.values[f.id];if(f.key==='post'||v===undefined||v===''||v===null)return false;
  if(f.section==='masters'&&f.key!=='enabled'&&!p.values['masters.enabled'])return false;
  if(f.section.startsWith('job')&&f.key!=='enabled'&&!p.values['job.enabled'])return false;
  if(f.section==='permanent'&&f.key!=='same'&&p.values['permanent.same'])return false;
  if(f.key==='to'&&p.values[f.section+'.current'])return false;
  if(f.id==='basic.spouse'){const marital=match(FIELDS.find(x=>x.id==='basic.marital'),cs||controls(),maps).c;if(!isMarried(p.values['basic.marital'],marital?choiceOptions(marital.e):[]))return false;}
  return true;
 }
 async function apply(f,cs){
  if(done.has(f.id)||!eligible(f,cs))return;
  const {c,mapped}=match(f,cs,maps),v=p.values[f.id];
  // BCIC's additional row template has no Currently Working checkbox.
  // An unchecked optional checkbox needs no invented field or error.
  if(f.key==='current'&&v===false&&!c)return;
  attempted.add(f.id);
  if(!c){why.set(f.id,f.key==='current'&&v===true?'সাইটের এই সারিতে Currently Working ঘর নেই; শেষ তারিখ দিয়ে প্রোফাইলের টিক সরান':mapped?'সংরক্ষিত সংযোগ আর মেলেনি':'ঘর শনাক্ত হয়নি');return;}
  if(claimed.has(c.e)&&claimed.get(c.e)!==f.id){why.set(f.id,'একই ঘর একাধিক তথ্যের সঙ্গে মিলেছে');return;}
  if(!visible(c.e)){why.set(f.id,'ঘর নিষ্ক্রিয় / লুকানো / পরিবর্তনযোগ্য নয়');return;}
  try{
   if(change(c.e,v)){done.add(f.id);claimed.set(c.e,f.id);why.delete(f.id);const oldOutline=c.e.style.outline;c.e.style.outline='2px solid #278258';setTimeout(()=>{c.e.style.outline=oldOutline;},2500);await pause(c.e.tagName==='SELECT'||c.e.type==='checkbox'?220:12);}
   else why.set(f.id,'অপশন / তারিখ / মান মেলেনি');
  }catch(e){why.set(f.id,'সাইটের নিয়মে বসানো যায়নি');}
 }
 const ordinary=fs.filter(f=>!/^job\d*$/.test(f.section)||f.id==='job.enabled');
 for(let pass=0;pass<6;pass++){
  const cs=controls();for(const f of ordinary)await apply(f,cs);
  if(ordinary.every(f=>!eligible(f,cs)||done.has(f.id)))break;
  await pause(450);
 }
 if(jobInfo.requested){
  for(let number=1;number<=jobInfo.requested;number++){
   const section=number===1?'job':'job'+number,rowFields=fs.filter(f=>f.section===section&&f.key!=='enabled');
   try{
    if(isBCIC()){
     if(number===1&&!jobRows().length)throw Error('প্রথম চাকরির অভিজ্ঞতার সারি পাওয়া যায়নি।');
     if(jobRows().length<number){if(await addJobRow(number))jobInfo.created++;}
     else jobInfo.reused++;
    }
   }catch(e){
    jobInfo.stopped='অভিজ্ঞতা '+number+': '+e.message;
    for(const f of fs.filter(f=>/^job\d*$/.test(f.section)&&f.key!=='enabled'&&(f.section==='job'?1:Number(f.section.slice(3)))>=number&&eligible(f))){attempted.add(f.id);why.set(f.id,'সারি তৈরি করা যায়নি');}
    break;
   }
   for(let pass=0;pass<3;pass++){
    const cs=controls();for(const f of rowFields)await apply(f,cs);
    const pending=rowFields.filter(f=>attempted.has(f.id)&&!done.has(f.id));
    if(!pending.length)break;await pause(300);
   }
   const missing=rowFields.filter(f=>attempted.has(f.id)&&!done.has(f.id));
   if(!missing.length)jobInfo.filled++;
   if(missing.length&&number<jobInfo.requested){
    jobInfo.stopped='অভিজ্ঞতা '+number+'-এর কিছু ঘর পূরণ হয়নি। আগে তা ঠিক করুন; পরের সারি যোগ করা বন্ধ রাখা হয়েছে।';
    for(const f of fs.filter(f=>/^job\d+$/.test(f.section)&&Number(f.section.slice(3))>number&&eligible(f))){attempted.add(f.id);why.set(f.id,'আগের সারি অসম্পূর্ণ থাকায় পূরণ বন্ধ');}
    break;
   }
  }
 }
 const missing=[...attempted].filter(k=>!done.has(k));
 const fieldLabel=id=>{const f=fs.find(f=>f.id===id);const n=f?.section==='job'?1:/^job\d+$/.test(f?.section)?Number(f.section.slice(3)):null;return(n?'অভিজ্ঞতা '+n+' — ':'')+(f?.label||id);};
 const detail=missing.map(k=>fieldLabel(k)+': '+why.get(k)).join('\n');
 const jobSummary=jobInfo.requested?`অভিজ্ঞতা: ${jobInfo.filled}/${jobInfo.requested}টি সারি পূরণ; ${jobInfo.created}টি নতুন সারি যোগ করা হয়েছে।\n`:'';
 const summary=`${done.size}টি ঘরে তথ্য বসানো হয়েছে। ${missing.length}টি ঘর পূরণ করা যায়নি।\n`+jobSummary+(jobInfo.stopped?jobInfo.stopped+'\n':'')+(detail?detail+'\n':'')+'ক্যাপচা, ঘোষণা ও সাবমিট স্পর্শ করা হয়নি। সব তথ্য যাচাই করুন।'+(missing.length?'\nনা-মেলা ঘর ও ADD MORE বোতাম যাচাই করে আবার চেষ্টা করুন।':'');
 const report={at:new Date().toISOString(),profile:p.name,site:site(),filled:[...done],missing:missing.map(id=>({id,reason:why.get(id)})),jobs:jobInfo};
 await chrome.storage.local.set({lastReport:report});return {summary,report};
 }

 let cancelPick, busy=false;
 function pick(f,respond){
 cancelPick?.();const box=document.createElement('div');box.id='ta-overlay';box.textContent='টেলিটক সহকারী: “'+f.label+'” ঘরে ক্লিক করুন। বাতিল: Escape';
 Object.assign(box.style,{position:'fixed',top:'10px',left:'10px',right:'10px',padding:'18px',background:'#123f34',color:'white',font:'16px system-ui',zIndex:'2147483647',boxShadow:'0 3px 20px #0005',borderRadius:'8px'});document.body.append(box);
 const cleanup=()=>{box.remove();document.removeEventListener('click',click,true);document.removeEventListener('keydown',key,true);clearTimeout(timer);cancelPick=null;};
 const abort=()=>{cleanup();respond({error:'ঘর চিহ্নিত করা বাতিল হয়েছে।'});};cancelPick=abort;
 const key=e=>{if(e.key==='Escape')abort();};
 const click=e=>{const el=e.target.closest('input,select,textarea');if(!el||forbidden(el))return;e.preventDefault();e.stopImmediatePropagation();const c=controls().find(x=>x.e===el);if(!c)return;const result={site:site(),locator:locator(c),options:choiceOptions(el)};cleanup();respond(result);};
 document.addEventListener('click',click,true);document.addEventListener('keydown',key,true);const timer=setTimeout(abort,120000);
 }
 chrome.runtime.onMessage.addListener((m,sender,respond)=>{
 if(sender.id!==chrome.runtime.id)return;
 if(m.action==='ping'){respond({ok:true});return;}
 if(m.action==='scan'){try{respond(scan(m.profile,m.mappings||{}));}catch(e){respond({error:e.message});}return;}
 if(m.action==='pick'){pick(m.field,respond);return true;}
 if(m.action==='fill'){if(busy){respond({error:'ফরম পূরণের একটি কাজ চলছে। শেষ হলে আবার চেষ্টা করুন।'});return;}busy=true;fill(m.profile,m.mappings||{}).then(r=>{busy=false;respond(r);}).catch(e=>{busy=false;respond({error:e.message});});return true;}
 });
})();

})();
