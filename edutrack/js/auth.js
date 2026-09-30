/* EduTrack — signup and login behaviour (the forms themselves are real HTML in signup.html and login.html) */
/* ---------- landing & auth ---------- */
async function suSubmit(ev){ev.preventDefault();const v=Object.fromEntries(new FormData(ev.target)),em=v.email.trim().toLowerCase();let m='';
if(v.name.trim().length<2)m='Please enter your full name.';else if(!/^\S+@\S+\.\S+$/.test(em))m='Please enter a valid email.';else if(v.password.length<8)m='Password must be at least 8 characters.';else if(v.password!=v.confirm)m='Passwords do not match.';else if(!v.univ.trim()||!v.dept.trim())m='University and department are required.';else if(db.users[em])m='An account with this email already exists.';
if(m){$('#e').textContent=m;return false}
const salt=crypto.randomUUID();db.users[em]={email:em,name:v.name.trim(),univ:v.univ.trim(),dept:v.dept.trim(),level:v.level,scale:v.scale,target:v.scale==5?4.5:3.5,salt,hash:await hash(v.password,salt)};db.data[em]={sems:[],goals:[]};save();pend=em;
$('#f').innerHTML='<h2>Account created</h2><p style="margin-top:8px">How would you like to begin?</p><div class=acts><button type=button class="btn p" data-a=sample>Start with sample academic data</button><button type=button class=btn data-a=scratch>Start from scratch</button></div><p class=note>Sample data = 3 fictional semesters so you can see the dashboard and charts filled in. They are labelled "Sample" and you can delete them any time.</p>';return false}
async function liSubmit(ev){ev.preventDefault();const v=Object.fromEntries(new FormData(ev.target)),em=v.email.trim().toLowerCase(),u=db.users[em];
if(!em||!v.password){$('#e').textContent='Enter your email and password.';return false}
if(!u||await hash(v.password,u.salt)!==u.hash){$('#e').textContent='Incorrect email or password.';return false}
localStorage[SS]=em;dr={id:null,name:'',courses:[]};gd=null;location.href='dashboard.html';return false}

const done=()=>{save();toast('Account created. Please log in.');location.href='login.html'};
Object.assign(acts,{scratch:done,sample(){db.data[pend].sems=SAMPLE.map(([name,cs],i)=>({id:Date.now()+i,name,sample:true,courses:cs.map(([code,title,unit,grade])=>({code,title,unit,grade}))}));done()}});
