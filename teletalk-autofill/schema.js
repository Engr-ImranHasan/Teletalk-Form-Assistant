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
