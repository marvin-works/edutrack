/* EduTrack — profile */
/* ---------- profile ---------- */
function profile(){const u=me();return shell('profile','Profile',`<form class=card onsubmit="return pSave(event)"><div class=grid>${fld(['name','Full name',u.name])}${fld(['univ','University',u.univ])}${fld(['dept','Department',u.dept])}<div><div class=lbl>Level</div><select name=level>${LV.map(l=>`<option ${l==u.level?'selected':''}>${l}</option>`)}</select></div>${fld(['target','Target CGPA',f2(u.target)],'type=number step=0.01')}<div><div class=lbl>Email</div><input value="${esc(u.email)}" disabled></div><div><div class=lbl>Grading scale</div><input value="${u.scale}.0 Scale" disabled></div></div><p class=note>Email and grading scale are fixed in this demo, since changing them would need verification and re-grading of saved courses.</p><p class=err id=e></p><button class="btn p">Save changes</button></form>`)}
function pSave(ev){ev.preventDefault();const v=Object.fromEntries(new FormData(ev.target)),u=me(),t=+v.target;let m='';
if(v.name.trim().length<2)m='Please enter your full name.';else if(!v.univ.trim()||!v.dept.trim())m='University and department are required.';else if(!(t>0))m='Target CGPA must be greater than 0.';else if(t>+u.scale)m='Target CGPA cannot exceed the maximum grading scale.';
if(m){$('#e').textContent=m;return false}
Object.assign(u,{name:v.name.trim(),univ:v.univ.trim(),dept:v.dept.trim(),level:v.level,target:t});save();toast('Profile updated.');route();return false}

V.profile=profile;
