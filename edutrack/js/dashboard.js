/* EduTrack — dashboard */
/* ---------- dashboard ---------- */
function dash(){const u=me(),st=stats(),last=st.sems.at(-1),t=+u.target,gap=t-st.cgpa,h=new Date().getHours();
return shell('dashboard',`Good ${h<12?'morning':h<17?'afternoon':'evening'}, ${esc(u.name)}`,`${st.sems.some(s=>s.sample)?'<p class=note style="margin:-10px 0 14px">Sample data is loaded. Delete the sample semesters in the GPA Calculator to start with your own records.</p>':''}
<div class=grid>${[['Current CGPA',f2(st.cgpa)],['Latest Semester GPA',last?f2(last.gpa):'—'],['Credits Completed',st.tu],['Target CGPA',f2(t)]].map(c=>`<div class=card><div class=lbl>${c[0]}</div><div class=big>${c[1]}</div></div>`).join('')}</div>
<div class=g2><div class=card><h2>GPA trend</h2><div style="margin-top:10px">${line(st.sems.map(s=>s.gpa),st.max)}</div></div>
<div class=card><h2>Academic overview</h2><div class=row><span class=mut>Current CGPA</span><b>${f2(st.cgpa)}</b></div><div class=row><span class=mut>Target CGPA</span><b>${f2(t)}</b></div><div class=row><span class=mut>Difference</span><b>${gap>0?f2(gap)+' below target':f2(-gap)+' above target'}</b></div><div class=row><span class=mut>Progress</span><b>${f2(Math.min(100,st.cgpa/t*100))}%</b></div>${bar(st.cgpa/t*100)}</div></div>
<div class=g2><div class=card><h2>Recent academic performance</h2><div class=sc><table>${st.sems.slice(-4).map(s=>`<tr><td>${esc(s.name)}<td>${f2(s.gpa)}</tr>`).join('')||'<tr><td class=empty>No semesters saved yet.</tr>'}</table></div><p class=lbl style="margin-top:12px">Trend: ${trend(st)}</p></div>
<div class=card><h2>Your academic insights</h2>${insights(st).map(i=>`<p style="margin-top:10px">${i}</p>`).join('')}</div></div>`)}

V.dashboard=dash;
