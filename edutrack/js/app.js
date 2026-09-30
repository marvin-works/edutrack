/* EduTrack — core: storage, session, GPA/CGPA maths, insights, chart, layout shell, router (loaded on every page) */

const $=s=>document.querySelector(s),LS='edutrack_db',SS='edutrack_session',f2=n=>(+n).toFixed(2),sum=(a,f)=>a.reduce((t,x)=>t+f(x),0);
let db=JSON.parse(localStorage[LS]||'{"users":{},"data":{}}'),dr={id:null,name:'',courses:[]},gd=null,pend=null;
const save=()=>localStorage[LS]=JSON.stringify(db),me=()=>{const e=localStorage[SS];return e&&db.users[e]||null},D=()=>db.data[me().email];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const hash=async(p,s)=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+p)))].map(b=>b.toString(16).padStart(2,'0')).join('');
const SC={5:{A:5,B:4,C:3,D:2,E:1,F:0},4:{A:4,B:3,C:2,D:1,F:0}},gp=(u,g)=>SC[u.scale][g],grades=()=>Object.keys(SC[me().scale]),LV=[100,200,300,400,500,600].map(x=>x+' Level');
const foot='<footer>EduTrack is an academic planning and analytics tool designed to help students understand their academic performance and make informed study decisions. It is not affiliated with any university and does not guarantee academic improvement.</footer>';
const fld=(a,ex='')=>`<div><div class=lbl>${a[1]}</div><input name=${a[0]} ${ex} value="${esc(a[2])}"></div>`;
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),3000)}
/* CGPA = total quality points of ALL semesters / total credit units of ALL semesters (never an average of GPAs) */
function stats(){const u=me(),sems=D().sems.map(s=>{const tu=sum(s.courses,c=>c.unit),tq=sum(s.courses,c=>c.unit*gp(u,c.grade));return{...s,tu,tq,gpa:tu?tq/tu:0}}),tu=sum(sems,s=>s.tu),tq=sum(sems,s=>s.tq);return{sems,tu,tq,cgpa:tu?tq/tu:0,max:+u.scale}}
function trend(st){const g=st.sems.map(s=>s.gpa);if(g.length<2)return'Not enough data';const d=g.at(-1)-g.at(-2);return d>.05?'Improving':d<-.05?'Declining':'Stable'}
function insights(st){const u=me(),o=[],t=+u.target;if(!st.sems.length)return['Save a semester in the GPA Calculator to unlock insights.'];const tr=trend(st);
if(tr=='Improving')o.push('Your semester GPA has been improving. Continue monitoring the subjects contributing most to your progress.');
if(tr=='Declining')o.push('Your recent semester GPA is lower than your previous semester. Review your course-level performance to identify subjects requiring attention.');
const low=st.sems.flatMap(s=>s.courses).filter(c=>gp(u,c.grade)<st.max-1).length;if(low>=3)o.push(`You have ${low} courses with grades below B. Consider prioritizing these courses in your next study cycle.`);
if(t>st.max)o.push('Your current target is above the maximum possible grade point. Consider adjusting the target.');else if(st.cgpa>=t)o.push('You have reached your target CGPA. Use Reach My Goal to see what is needed to maintain it.');else o.push(`You are ${f2(t-st.cgpa)} CGPA points below your target of ${f2(t)}. Use Reach My Goal to see the GPA required.`);return o}
function line(vals,max){if(!vals.length)return'<p class="empty">No semesters saved yet.</p>';const W=600,H=220,p=34,n=vals.length,lo=Math.max(0,Math.floor(Math.min(...vals)*2)/2-.5),x=i=>p+(n<2?(W-2*p)/2:i*(W-2*p)/(n-1)),y=v=>H-p-((v-lo)/(max-lo))*(H-2*p);
return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><g stroke="#2b2f36">${[0,.5,1].map(q=>`<line x1="${p}" x2="${W-p}" y1="${y(lo+q*(max-lo))}" y2="${y(lo+q*(max-lo))}"/>`).join('')}</g><polyline fill="none" stroke="#d9d9db" stroke-width="2" points="${vals.map((v,i)=>x(i)+','+y(v)).join(' ')}"/>${vals.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="#d9d9db"/><text x="${x(i)}" y="${y(v)-10}" fill="#ececed" font-size="11" text-anchor="middle">${f2(v)}</text><text x="${x(i)}" y="${H-8}" fill="#8b9098" font-size="10" text-anchor="middle">S${i+1}</text>`).join('')}</svg>`}
const NAV=[['dashboard','Dashboard','Home'],['gpa','GPA Calculator','GPA'],['performance','Performance','Stats'],['reach','Reach My Goal','Reach'],['goals','Goals','Goals'],['profile','Profile','Me']];
const shell=(h,t,inner)=>`<div class=app><aside><a class=logo href="dashboard.html">EDU<br>TRACK</a><nav>${NAV.map(n=>`<a class="nv ${n[0]==h?'on':''}" href="${n[0]}.html"><span class=f>${n[1]}</span><span class=s>${n[2]}</span></a>`).join('')}<a class=nv href="login.html" data-a=out><span class=f>Logout</span><span class=s>Exit</span></a></nav></aside><main><h1>${t}</h1>${inner}${foot}</main></div>`;
const bar=p=>`<div class=bar><i style="width:${Math.max(0,Math.min(100,p))}%"></i></div>`;

/* ---------- actions, views & router ---------- */
const acts={out(){delete localStorage[SS];dr={id:null,name:'',courses:[]};gd=null}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&acts[b.dataset.a])acts[b.dataset.a](b.dataset.v)});
const V={},PROTECTED=['dashboard','gpa','performance','reach','goals','profile'];
/* Each page sets window.PAGE, then calls route(): guards access and renders that page's view */
function route(){const h=window.PAGE,u=me();
if(PROTECTED.includes(h)&&!u){location.href='login.html';return}
if(!PROTECTED.includes(h)&&u){location.href='dashboard.html';return}
$('#app').innerHTML=V[h]()}
