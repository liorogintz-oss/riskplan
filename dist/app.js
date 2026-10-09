const $=id=>document.getElementById(id);let risks=[],alloc=[],pending=[],profile=null,dirty=false;
const seed=[['רכש והתקשרויות','פגיעה בשוויון, חריגות התקשרות ותלות בספקים',4,4,1,180],['אבטחת מידע ופרטיות','דליפת מידע, השבתה והרשאות עודפות',4,5,1,220],['כספים ותשלומים','טעויות תשלום, חריגות תקציב והונאה',3,5,2,180],['משאבי אנוש ושכר','תשלומים שגויים והיעדר הפרדת תפקידים',3,4,2,140],['ממשל תאגידי וציות','החלטות ללא בקרה והפרת דרישות דין',3,5,1,160],['שירות ותפעול','כשל במתן שירות ופגיעה ברציפות',3,4,2,160],['ניהול פרויקטים','עיכובים וחריגה מתקציב ומיעדים',4,4,1,200],['המשכיות עסקית','אי יכולת להתאושש מאירוע חירום',3,5,1,140]];
const reductions=[0,.2,.4,.6];const controlNames=['לא הוערכו / חסרות','חלשות','בינוניות','חזקות'];
function score(r){return Math.round(r.l*r.i*(1-reductions[r.c])*10)/10}function band(s){return s>=12?'high':s>=6?'mid':''}function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function selectOptions(max,val,labels){return Array.from({length:max},(_,i)=>`<option value="${labels?i:i+1}" ${(labels?i:i+1)===val?'selected':''}>${labels?labels[i]:i+1}</option>`).join('')}
function render(){ $('risks').innerHTML=risks.map((r,n)=>`<tr><td><input aria-label="שם סיכון ${n+1}" data-n="${n}" data-key="name" value="${escape(r.name)}" maxlength="120"><small>${escape(r.desc)}</small></td><td><select aria-label="סבירות ${n+1}" data-n="${n}" data-key="l">${selectOptions(5,r.l)}</select></td><td><select aria-label="השפעה ${n+1}" data-n="${n}" data-key="i">${selectOptions(5,r.i)}</select></td><td><select aria-label="בקרות ${n+1}" data-n="${n}" data-key="c">${selectOptions(4,r.c,controlNames)}</select></td><td><span class="score ${band(score(r))}">${score(r)}</span></td><td><input aria-label="שעות ${n+1}" type="number" min="1" max="100000" data-n="${n}" data-key="hours" value="${r.hours}"></td><td><button aria-label="הסרת סיכון ${n+1}" data-remove="${n}">×</button></td></tr>`).join('');summary();}
function summary(){$('stats').innerHTML=`<div><strong>${risks.length}</strong>תחומי ביקורת</div><div><strong>${risks.filter(r=>score(r)>=12).length}</strong>סיכונים גבוהים</div><div><strong>${Math.floor(profile.budget*(1-profile.reserve/100))}</strong>שעות למשימות בשנה</div>`;renderMatrix();}

function generate(){const capacity=Math.floor(profile.budget*(1-profile.reserve/100));alloc=Array.from({length:profile.years},(_,i)=>({year:profile.start+i,used:0,tasks:[]}));pending=[];if(profile.type==='bank'){const built=bankAllocate(profile,risks);alloc=built.alloc;pending=built.pending}else{[...risks].sort((a,b)=>Number(Boolean(b.critical))-Number(Boolean(a.critical))||score(b)-score(a)||(profile.type==='government'?govAuditPriority(b)-govAuditPriority(a):0)||b.l*b.i-a.l*a.i).forEach(r=>{const y=alloc.find(y=>y.used+r.hours<=capacity);if(y){y.tasks.push(r);y.used+=r.hours}else pending.push({...r})})};$('schedule').style.gridTemplateColumns=`repeat(${profile.years},minmax(0,1fr))`;$('schedule').innerHTML=alloc.map(y=>`<article class="year"><h3>${y.year}</h3><small>${y.used} / ${capacity} שעות למשימות</small>${y.tasks.map(r=>`<div class="task">${escape(r.name)}<span>${r.hours} שעות · ציון שיורי ${score(r)}</span></div>`).join('')||'<p>קיבולת פנויה</p>'}</article>`).join('');$('plan-caption').textContent=`${profile.org} · שיבוץ חד־פעמי של כל תחום לפי דירוג יורד וקיבולת השנה המוקדמת ביותר. ${profile.reserve}% מהתקציב נשמר כרזרבה.`;$('unallocated').textContent=pending.length?`פער כיסוי: ${pending.map(r=>r.name).join('، ')} (${pending.reduce((a,r)=>a+r.hours,0)} שעות) לא שובצו. יש לשנות משאבים או היקף ולתעד את החלטת הגורם המאשר.`:'כל התחומים שובצו באופק התכנון. יש להחליט מקצועית על ביקורות חוזרות, מטלות חובה ותדירות לפי הסיכון.';dirty=false;$('generate').textContent='עדכון תוכנית העבודה ←';}
$('form').addEventListener('submit',e=>{e.preventDefault();profile={org:$('org').value.trim(),type:$('type').value,sector:$('sector').value,employees:+$('employees').value,start:+$('start').value,years:+$('years').value,budget:+$('budget').value,reserve:+$('reserve').value,goals:$('goals').value.trim()};if(!profile.org){$('org').setCustomValidity('יש להזין שם ארגון');$('org').reportValidity();return}if(!risks.length){risks=seed.map(([name,desc,l,i,c,hours])=>({name,desc,l,i,c,hours}));if(['private','listed'].includes(profile.type))risks[0].desc='חריגות רכש, ניגודי עניינים ותלות בספקים';if(profile.sector==='בריאות'){risks.push({name:'בטיחות מטופלים',desc:'אירועי בטיחות ופגיעה באיכות הטיפול',l:4,i:5,c:1,hours:220})}if(profile.sector==='פיננסים'){risks.push({name:'סיכונים פיננסיים',desc:'חשיפות אשראי, נזילות וציות ענפי',l:4,i:5,c:1,hours:220})}if(profile.sector==='תשתיות'){risks.push({name:'בטיחות ותשתיות',desc:'פגיעה בבטיחות ואי זמינות תשתית קריטית',l:4,i:5,c:1,hours:220})}}$('legal').textContent=({public:'גוף ציבורי: יש לבדוק את התחולה לפי הגדרת גוף ציבורי בחוק הביקורת הפנימית ואת מנגנון אישור התוכנית לפי סעיף 7.',municipal:'רשות מקומית: יש לבדוק את הוראות פקודת העיריות או דיני המועצות החלים על הרשות ואת סמכויות המבקר ואישור תוכנית העבודה.',bank:'תאגיד בנקאי: יש לבדוק רישיון, מעמד פיקוחי והוראות ניהול בנקאי תקין, לצד דיני חברות ובנקאות. חברה ציבורית או פרטית מתועדת בנפרד במסלול הבנקאי.',government:'חברה ממשלתית: יש לבדוק את חוק הביקורת הפנימית, חוק החברות הממשלתיות והנחיות רשות החברות החלות על הגוף.',listed:'חברה ציבורית: יש לבדוק את חוק החברות, לרבות ההוראות בדבר מבקר פנימי ותוכנית עבודה, ואת הוראות חוק הביקורת הפנימית המוחלות מכוחו.',private:'חברה פרטית: אין להסיק תחולה אוטומטית של חוק הביקורת הפנימית. יש לבדוק דין ענפי, מאפייני הגוף ודרישות חוזיות או ממשל תאגידי.',clc:'חל״צ: יש לבדוק את הוראות חוק החברות לחברה לתועלת הציבור, מוסדות הביקורת ומנגנון אישור התוכנית. אין להחיל אוטומטית את מסלול העמותה.',ngo:'עמותה: יש לבדוק את הדין החל לפי הצורה המשפטית, מאפייני הגוף והיקף הפעילות. אין להסיק תחולה גורפת של חוק הביקורת הפנימית.'})[profile.type];$('results').hidden=false;render();generate();$('survey').scrollIntoView({behavior:'smooth'});});$('org').addEventListener('input',()=> $('org').setCustomValidity(''));
$('risks').addEventListener('change',e=>{const key=e.target.dataset.key;if(!key)return;const r=risks[+e.target.dataset.n];if(key==='name'){if(!e.target.value.trim()){e.target.value=r.name;return}r.name=e.target.value.trim()}else{const v=Number(e.target.value),max=key==='hours'?100000:key==='c'?3:5,min=key==='c'?0:1;if(!Number.isInteger(v)||v<min||v>max){e.target.value=r[key];return}r[key]=v}render();generate();});$('risks').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;risks.splice(+b.dataset.remove,1);render();generate();});$('add').onclick=()=>{risks.push({name:'סיכון חדש',desc:'נדרש תיעוד גורמי הסיכון והבקרות',l:3,i:3,c:0,hours:100});render();generate()};$('generate').onclick=generate;$('print').onclick=()=>window.print();
$('csv').onclick=()=>{const rows=[['טיוטת סקר ותוכנית ביקורת',profile.org],['תחום פעילות',profile.sector],['עובדים',profile.employees],['יעדים והקשר',profile.goals],['תקציב שנתי',profile.budget],['רזרבה באחוזים',profile.reserve],['הערה','טיוטה לתיקוף מקצועי; בקרות טרם נבדקו'],['תחום','תיאור','סבירות','השפעה','רמת בקרות','סיכון מובנה','סיכון שיורי','שעות','שנה']];risks.forEach(r=>rows.push([r.name,r.desc,r.l,r.i,controlNames[r.c],r.l*r.i,score(r),r.hours,alloc.find(y=>y.tasks.includes(r))?.year||'לא שובץ']));const safe=v=>{const s=String(v);return '"'+(/^[=+@\-\t\r]/.test(s)?"'"+s:s).replaceAll('"','""')+'"'};const blob=new Blob(['\ufeff'+rows.map(row=>row.map(safe).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='riskplan-draft.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};

// Explicit updates use the latest profile and take the user to the result.
$('generate').onclick=()=>{
  if(!$('org').value.trim()) $('org').setCustomValidity('יש להזין שם ארגון');
  if(!$('form').reportValidity()){
    $('profile').scrollIntoView({behavior:'smooth'});
    return;
  }
  profile={org:$('org').value.trim(),type:$('type').value,sector:$('sector').value,
    employees:+$('employees').value,start:+$('start').value,years:+$('years').value,
    budget:+$('budget').value,reserve:+$('reserve').value,goals:$('goals').value.trim()};
  summary();
  generate();
  let status=$('plan-status');
  if(!status){
    status=document.createElement('p');
    status.id='plan-status';
    status.className='note';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    $('plan-caption').insertAdjacentElement('afterend',status);
  }
  status.textContent=`תוכנית העבודה עודכנה לפי הנתונים הנוכחיים · ${new Date().toLocaleTimeString('he-IL')} · ${alloc.reduce((n,y)=>n+y.tasks.length,0)} משימות שובצו${pending.length?` · ${pending.length} משימות ללא כיסוי`:''}.`;
  $('plan').setAttribute('tabindex','-1');
  $('plan').focus({preventScroll:true});
  $('plan').scrollIntoView({behavior:'smooth',block:'start'});
};

function mapLikelihood(r,mode){
  return mode==='residual'?r.l*(1-reductions[r.c]):r.l;
}
function renderMatrix(){
  const mode=$('map-mode').value;
  const residual=mode==='residual';
  $('matrix-title').textContent=residual?'מפת סיכונים שיוריים':'מפת סיכונים מובנים';
  $('matrix').innerHTML=Array.from({length:25},(_,n)=>{
    const impact=5-Math.floor(n/5),column=n%5+1;
    const matched=risks.filter(r=>r.i===impact&&Math.ceil(mapLikelihood(r,mode))===column);
    const cellScore=impact*column;
    const label=residual?`סבירות מותאמת מעל ${column-1} ועד ${column}`:`סבירות ${column}`;
    const title=`השפעה ${impact}, ${label}: ${matched.length} סיכונים${matched.length?' — '+matched.map(r=>r.name).join(', '):''}`;
    return `<span style="background:${cellScore>=15?'#edb9a0':cellScore>=8?'#edddb0':'#d6e3ce'}" title="${escape(title)}" aria-label="${escape(title)}">${matched.length||'·'}</span>`;
  }).join('');
  $('matrix').setAttribute('aria-label',`${$('matrix-title').textContent}: ${risks.length} סיכונים. השפעה בשורות וסבירות בעמודות.`);
  $('matrix-note').textContent=residual
    ?'השפעה ↑ · סבירות מותאמת לבקרות →. להמחשה, הפחתת הבקרות מוחלת על הסבירות. הערך ממוקם בטווח התא העליון (למשל 2.4 בתא 3); הציון המדויק בטבלה. צבע התא מייצג את גבולו העליון.'
    :'השפעה ↑ · סבירות →. המפה המובנית מתייחסת לסבירות ולהשפעה לפני בקרות; שינוי בקרות משפיע על המפה השיורית בלבד.';
  $('matrix-status').textContent=`${risks.length} סיכונים במפה · מתעדכנת לפי הערכים בטבלה`;
}
$('map-mode').addEventListener('change',renderMatrix);

function renderProfessionalReport(){
  const total=profile.type==='bank'?bankDemand(profile,risks):risks.reduce((n,r)=>n+r.hours,0);
  const scheduled=alloc.reduce((n,y)=>n+y.used,0);
  const capacity=Math.floor(profile.budget*(1-profile.reserve/100));
  const high=risks.filter(r=>score(r)>=12).sort((a,b)=>score(b)-score(a));
  const uncoveredHigh=pending.filter(r=>score(r)>=12);
  let report=$('executive-report');
  if(!report){
    report=document.createElement('div');report.id='executive-report';
    $('schedule').insertAdjacentElement('beforebegin',report);
  }
  report.innerHTML=`<div class="report-heading"><span>טיוטה לתיקוף ואישור מקצועי</span><span>הופק: ${new Date().toLocaleDateString('he-IL')} · אופק: ${profile.start}–${profile.start+profile.years-1}</span></div>
    <h3>תקציר מנהלים</h3>
    <p>תוכנית הביקורת של <strong>${escape(profile.org)}</strong> כוללת ${risks.length} תחומי סיכון, מהם ${high.length} בדירוג שיורי גבוה (12 ומעלה). שובצו ${alloc.reduce((n,y)=>n+y.tasks.length,0)} ביקורות בהיקף ${scheduled.toLocaleString('he-IL')} שעות מתוך ${total.toLocaleString('he-IL')} שעות שהוערכו לכלל התחומים.</p>
    <p><strong>מוקדי עדיפות:</strong> ${high.length?high.slice(0,4).map(r=>escape(r.name)+' ('+score(r)+')').join('، '):'לא זוהו סיכונים גבוהים לפי הדירוגים שהוזנו. יש לתקף את הדירוגים לפני הסקת מסקנות.'}</p>
    ${profile.goals?`<p><strong>יעדים והקשר שהוזנו:</strong> ${escape(profile.goals)}</p><p class="report-disclosure">היעדים מוצגים כהקשר. הקשר בין כל ביקורת ליעד דורש מיפוי מקצועי; הטקסט החופשי אינו משוקלל אוטומטית בדירוג.</p>`:''}
    <div class="report-metrics"><div><strong>${capacity.toLocaleString('he-IL')}</strong>שעות למשימות בשנה</div><div><strong>${profile.budget-capacity}</strong>שעות רזרבה בשנה</div><div><strong>${total?Math.round(scheduled/total*100):0}%</strong>כיסוי לפי שעות מוערכות</div></div>
    <p class="report-disclosure">שיעור הכיסוי מתייחס לשעות של התחומים שהוזנו בלבד; אינו שיעור כיסוי של כלל סיכוני הארגון.</p>
    <div class="report-gap"><strong>החלטות נדרשות לפני אישור</strong><ul>
      <li>${pending.length?`לא שובצו ${pending.length} תחומים: ${pending.map(r=>escape(r.name)).join('، ')}. פער המשאבים: ${pending.reduce((n,r)=>n+r.hours,0)} שעות.`:'כל התחומים שהוזנו שובצו; יש לבחון אם יקום הביקורת מלא.'}</li>
      <li>${uncoveredHigh.length?`נדרשת החלטה מפורשת לגבי סיכונים גבוהים ללא כיסוי: ${uncoveredHigh.map(r=>escape(r.name)).join('، ')}.`:'יש לתקף את הסיכונים הגבוהים ואת נימוקי סדר העדיפויות.'}</li>
      <li>לאשר זמינות וכישורי צוות, מטלות חובה, תדירות ביקורות ומנגנון עדכון שנתי.</li>
    </ul></div>`;
  let details=$('audit-details');
  if(!details){details=document.createElement('div');details.id='audit-details';$('schedule').insertAdjacentElement('afterend',details);}
  details.innerHTML=`<h3>כרטיסי ביקורת — היקף מוצע</h3>`+alloc.map(y=>y.tasks.map(r=>`<article class="audit-card">
    <div class="audit-card-title"><h4>${escape(r.name)}</h4><span>${y.year} · ${r.hours} שעות · סיכון שיורי ${score(r)}</span></div>
    <p><strong>הסיכון:</strong> ${escape(r.desc)}</p>
    <p><strong>מטרת הביקורת המוצעת:</strong> להעריך אם הבקרות בתחום ${escape(r.name)} מתוכננות ומיושמות באופן שמצמצם את הסיכון המתואר.</p>
    <p><strong>היקף ובדיקות מוצעים:</strong> מיפוי התהליך והאחריות, סקירת נהלים והרשאות, ראיונות עם בעלי תפקידים ובדיקת מדגם של פעולות ובקרות. התקופה, גודל המדגם והמערכות ייקבעו בתכנון המשימה.</p>
    <p><strong>נימוק התעדוף:</strong> סבירות ${r.l}/5 × השפעה ${r.i}/5 = סיכון מובנה ${r.l*r.i}; בקרות שהוערכו כ״${controlNames[r.c]}״, הפחתה משוערת ${reductions[r.c]*100}%, וציון שיורי ${score(r)}. ${r.critical?'סומנה קדימות מיוחדת, המחייבת נימוק ותיקוף. ':''}השיבוץ לשנת ${y.year} נקבע לפי קדימות מיוחדת, דירוג וקיבולת, ולא מכוח דרישה משפטית.</p>
    <p><strong>תוצר מתוכנן:</strong> ממצאים מבוססי ראיות, המלצות ותוכנית פעולות עם אחראים ומועדי יעד, לתיאום עם הגורמים המבוקרים.</p>
    <p class="report-disclosure">מקור הדירוג: הערכות שהוזנו בכלי. יש לוודא תיעוד ראיות לבקרות, בעל הסיכון, כישורים ייעודיים והיקף סופי לפני אישור; במסלולים הייעודיים, הפרטים שתועדו מופיעים בנספחים.</p>
    </article>`).join('')).join('')+`<div class="report-gap"><strong>מתודולוגיה ומגבלות</strong><p>הסקר מבוסס על תחומים מוצעים והערכות משתמש, ללא איסוף ראיות עצמאי. הבקרות טרם נבדקו. ${profile.type==='bank'?'במסלול הבנקאי, המנוע משבץ מחזורים שנבחרו לפי מועדי יעד ותעדוף איכותי.':'המנוע משבץ כל תחום פעם אחת, לפי ציון שיורי יורד ובשנה המוקדמת שבה יש קיבולת.'} הוא אינו מפצל משימה בין שנים. רזרבה: ${profile.reserve}%. בדיקות חובה וביקורות חוזרות דורשות החלטה מקצועית.</p><p>המסגרת מתייחסת לעקרונות תקני IIA 9.1, 9.4 ו־10.1–10.3. תחולת הדין בישראל והעמידה בחוק ובתקנים דורשות אימות מקצועי נפרד.</p><p>שם המבקר/ת: __________________ &nbsp; הגורם המאשר: __________________ &nbsp; תאריך אישור: __________________</p></div>`;
}
const generateBase=generate;
generate=function(){generateBase();renderProfessionalReport();};
