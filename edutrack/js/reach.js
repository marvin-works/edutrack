/* EduTrack — target CGPA calculator (Reach My Goal) */
/* ---------- reach my goal ---------- */
function reach(){const u=me(),st=stats();return shell('reach','Reach My Goal',`<div class=card><div class=grid>${[['rc','Current CGPA',f2(st.cgpa)],['rt','Target CGPA',f2(u.target)],['rd','Completed credit units',st.tu],['rr','Remaining credit units','']].map(x=>`<div><div class=lbl>${x[1]}</div><input id=${x[0]} type=number step=any value="${x[2]}"></div>`).join('')}</div><p class=err id=e></p><button class="btn p" data-a=calc>Calculate</button></div><div id=res></div>`)}
/* Required GPA = (Target × (Completed+Remaining) − CurrentCGPA × Completed) ÷ Remaining */
function calc(){const mx=+me().scale,[c,t,d,r]=['rc','rt','rd','rr'].map(i=>parseFloat($('#'+i).value));let m='';
if([c,t,d,r].some(isNaN))m='Please fill in every field with a valid number.';else if(c<0||c>mx)m=`Current CGPA must be between 0 and ${mx}.`;else if(t>mx)m='Target CGPA cannot exceed the maximum grading scale.';else if(t<=0)m='Target CGPA must be greater than 0.';else if(d<0)m='Completed credit units cannot be negative.';else if(r<0)m='Remaining credit units cannot be negative.';else if(r==0)m='Remaining credit units must be greater than 0.';
$('#e').textContent=m;if(m){$('#res').innerHTML='';return}
const req=(t*(d+r)-c*d)/r,best=(c*d+mx*r)/(d+r);let h;
if(req>mx+1e-9)h=`Your target cannot be reached with the remaining credits under the current grading scale.<div class=big>Maximum achievable CGPA: ${f2(best)}</div>`;
else if(req<=0)h=`You have already reached this target. Even a GPA of 0 across your remaining ${r} credits keeps your CGPA at or above ${f2(t)}.`;
else h=`You need approximately <b>${f2(req)}</b> GPA across your remaining ${r} credits to reach a ${f2(t)} CGPA.${c>=t?' You are already at or above target; this is the minimum needed to hold it.':''}<div style="margin-top:12px">${bar(req/mx*100)}</div>`;
$('#res').innerHTML=`<div class=card style="margin-top:16px">${h}</div>`}

acts.calc=calc;
V.reach=reach;
