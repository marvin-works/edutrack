/* EduTrack — performance analytics */
/* ---------- performance ---------- */
function perf(){const u=me(),st=stats(),cs=st.sems.flatMap(s=>s.courses.map(c=>({...c,g:gp(u,c.grade),sem:s.name})));
if(!cs.length)return shell('performance','Performance','<div class="card empty">No courses added yet. Save a semester in the <a href="gpa.html">GPA Calculator</a> to see analytics.</div>');
const L=grades(),cnt=Object.fromEntries(L.map(g=>[g,cs.filter(c=>c.grade==g).length])),so=[...cs].sort((a,b)=>b.g-a.g||b.unit-a.unit),w={};cs.filter(c=>c.g<=st.max*.4).forEach(c=>w[c.code]=(w[c.code]||0)+1);const rep=Object.entries(w).filter(e=>e[1]>=2);
const tb=l=>`<div class=sc><table>${l.map(c=>`<tr><td>${esc(c.code)}<td>${esc(c.title)}<td>${c.grade}<td class=mut>${esc(c.sem)}</tr>`).join('')}</table></div>`;
return shell('performance','Performance',`<div class=grid>${[['Total credits',st.tu],['Total courses',cs.length],['Average course grade point',f2(sum(cs,c=>c.g)/cs.length)],['Academic trend',trend(st)]].map(c=>`<div class=card><div class=lbl>${c[0]}</div><div class=big style="font-size:22px">${c[1]}</div></div>`).join('')}</div>
<div class=g2><div class=card><h2>GPA trend</h2><div style="margin-top:10px">${line(st.sems.map(s=>s.gpa),st.max)}</div></div><div class=card><h2>Grade distribution</h2>${L.map(g=>`<div class=row><span>${g}</span><span class=mut>${cnt[g]}</span></div>${bar(cnt[g]/cs.length*100)}`).join('')}</div></div>
<div class=g2><div class=card><h2>Highest-performing courses</h2>${tb(so.slice(0,3))}</div><div class=card><h2>Lowest-performing courses</h2>${tb(so.slice(-3).reverse())}</div></div>
<div class=card style="margin-top:16px"><h2>Courses with repeated weak grades</h2><p class=mut style="margin-top:8px">${rep.length?rep.map(e=>`${esc(e[0])} (${e[1]} times)`).join(', '):'No course code has a repeated weak grade (D or below).'}</p></div>`)}

V.performance=perf;
