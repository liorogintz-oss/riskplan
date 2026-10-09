// NGO-specific survey context, requirement mapping, and report evidence.
const ngoTopics=[
 ['מטרות ואסטרטגיה','פעילות שאינה תואמת מטרות רשומות או אינה משיגה את יעדיה','מטרות רשומות, יעדים מדידים, תוצאות פרויקטים ותלות בשירות יחיד'],
 ['ממשל תאגידי','החלטות ללא סמכות, פיקוח או תיעוד מספק','תפקוד הוועד, האסיפה הכללית וועדת הביקורת; סמכויות, פרוטוקולים ומעקב'],
 ['ניגודי עניינים וצדדים קשורים','החלטות או עסקאות המושפעות מקשרים אישיים','קשרי משפחה ועסקים, העסקת קרובים, גילוי והימנעות מהחלטות'],
 ['ציות ודיווח','דיווח חסר או אי עמידה בדרישות פעילות ומימון','רשם, מס, ניהול תקין, רישיונות, תמיכות והתחייבויות חוזיות'],
 ['תקציב ונזילות','מחסור במזומנים לתשלום שכר וספקים','גירעונות, חריגות, תחזית תזרים, עתודות, הלוואות וערבויות'],
 ['מקורות הכנסה','אובדן מקור מימון מרכזי הפוגע ברציפות השירות','ריכוז הכנסות, חידוש הסכמים, עיכוב תקבולים ופיזור מקורות'],
 ['תרומות וכספים מיועדים','שימוש בכספים בניגוד לתנאי התרומה','ייעוד, תנאי תרומה, מעקב יתרות, קבלות והחזר כספים'],
 ['בנקים, קופה וגבייה','תשלום או גבייה לא תקינים ואובדן כספים','מורשי חתימה, הפרדת תפקידים, התאמות, מזומן, הנחות ושינוי חשבון'],
 ['רכש וספקים','תשלום ללא שירות או בחירת ספק ללא בקרה','השוואת הצעות, פיצול, ספקים קשורים, אישור וקבלת שירות, כפילויות'],
 ['שכר ומשאבי אנוש','תשלום שגוי או פגיעה בזכויות עובדים','נוכחות, שינויי שכר, זכויות סוציאליות, סיום העסקה וסיווג התקשרות'],
 ['מתנדבים','פעילות מתנדב ללא התאמה, הכשרה או פיקוח','מיון, הגדרת תפקיד, סודיות, הרשאות, ביטוח ואוכלוסיות רגישות'],
 ['איכות השירות וזכויות מקבלים','פגיעה בזכויות, בכבוד או באיכות השירות','תלונות, שוויון, נגישות, הסכמה, פרטיות ומניעת הזנחה ופגיעה'],
 ['בטיחות ותפעול','אירוע בטיחות הפוגע במקבלי שירות או עובדים','אש, נפילות, תחזוקת מבנים וציוד, מזון, הסעות ותרופות לפי הפעילות'],
 ['פרטיות, מידע וסייבר','חשיפה או אובדן של מידע אישי ורגיש','הרשאות, ספקי מחשוב, גיבוי ושחזור, מצלמות, דיוור ושימוש ב־AI'],
 ['הונאות ומעילות','מעילה או דיווח פעילות כוזב הגורמים לאובדן כספים ואמון','זיוף, תשלום ללא שירות, גניבת תרומות, עקיפת בקרות ודיווח מוגן'],
 ['חוזים וחשיפה משפטית','התחייבות לא מאושרת או חשיפה לתביעה','אחריות, שיפוי, ביטול, זכויות במקרקעין וקניין רוחני'],
 ['נכסים וביטוח','אובדן נכסים או אירוע ללא כיסוי ביטוחי מתאים','מצאי, שימוש פרטי, התאמת כיסוי, החרגות וגבולות אחריות'],
 ['המשכיות וחירום','הפסקת שירות חיוני בזמן חירום','מלחמה, פינוי, חשמל, מערכות, כוח אדם וספקים מרכזיים'],
 ['מוניטין ואמון הציבור','פגיעה באמון הציבור ותורמים בעקבות פרסום או טיפול לקוי','שקיפות, פרסום מדויק, תלונות ומשברים תקשורתיים'],
 ['ביקורת ותיקון ליקויים','ממצאים חוזרים עקב אי יישום המלצות','אחריות לתיקון, מועדים, מעקב ואימות סגירת ליקוי']
];
const ngoFields=[['process','תהליך ויעד'],['source','מקור דרישה מדויק / סעיף / חוזה'],['exposure','היקף החשיפה — סכום, אנשים, אתרים או מידע'],['impactKinds','סוגי ההשפעה — כספית, משפטית, תפעולית, אדם, מוניטין'],['controls','בקרות קיימות בפועל'],['evidence','ראיות ומקור המידע לדירוג ולבקרות'],['owner','אחראי לניהול הסיכון'],['action','פעולת טיפול מוצעת'],['actionOwner','אחראי לפעולת הטיפול'],['actionBudget','תקציב טיפול משוער'],['deadline','מועד יעד'],['measure','מדד להשלמה']];
const ngoEvidence=['לא נבדקו','תכנון בקרה בלבד','בדיקה חלקית','אפקטיביות נבדקה ותועדה'];
const ngoSourceKinds=['טרם סווג','חוק / תקנה','הנחיית רגולטור','חוזה / תנאי תמיכה או תרומה','נוהל / החלטה פנימית','מסגרת מקצועית'];
const ngoRequirements=[
 ['מוסדות העמותה וביקורת','חוק העמותות, התקנון וסעיפים 30 ו־30א','חוק / תקנה','עמותה: לבדוק סמכויות ועדת ביקורת, תחולת מינוי מבקר פנימי והליך אישור התוכנית. חל״צ כפופה למסגרת אחרת.','https://www.gov.il/blobFolder/policy/associations-guidelines/he/associations-guidelines.pdf'],
 ['התנהלות תקינה','הנחיות רשם העמותות','הנחיית רגולטור','להבחין בין חובה המעוגנת בחוק לבין מדיניות הרשם ותנאי אישור ניהול תקין.','https://www.gov.il/blobFolder/policy/associations-guidelines/he/associations-guidelines.pdf'],
 ['ביקורת פנימית','חוק הביקורת הפנימית והוראות המוחלות מכוח הדין','חוק / תקנה','לבדוק תחולה פרטנית; מינוי מבקר אינו קביעה שכל הוראות החוק חלות באופן זהה.',''],
 ['פרטיות ואבטחת מידע','חוק הגנת הפרטיות ותקנות אבטחת מידע','חוק / תקנה','למפות מידע, הרשאות וספקים. במאגר ברמת אבטחה גבוהה: סקר ייעודי ומבדקי חדירות לפחות אחת ל־18 חודשים; נדרש סיווג המאגר.','https://www.gov.il/BlobFolder/reports/risk2024/he/Hadirot_Tikon13.pdf'],
 ['תיקון 13 ו־DPO','רישום / הודעה וממונה הגנת פרטיות','חוק / תקנה','לבדוק לפי סוג והיקף עיבוד המידע; עצם היות הגוף עמותה אינו יוצר חובת מינוי אוטומטית.','https://www.gov.il/he/pages/amendment-13-26-07-26'],
 ['עובדים','דיני עבודה וזכויות סוציאליות','חוק / תקנה','שכר, נוכחות, פנסיה, חופשה, פיצויים ומניעת הטרדה מינית לפי התחולה.',''],
 ['מס ותרומות','מס הכנסה, מע״מ, ניכויים, ספרים וסעיף 46 אם קיים','חוק / תקנה','להשלים דרישות לפי מעמד המס, הפעילות והאישורים הקיימים.',''],
 ['תמיכות ציבוריות','סעיף 3א לחוק יסודות התקציב, נוהל ומבחן תמיכה','חוזה / תנאי תמיכה או תרומה','אם מתקבלת תמיכה: לצרף את הנוהל והמבחן התקפים והתנאים החלים על המימון.',''],
 ['רכש והתקשרויות','תחולה ספציפית, תנאי מימון וחוזים','חוזה / תנאי תמיכה או תרומה','קבלת כספי ציבור אינה כשלעצמה הוכחה לתחולת חוק חובת המכרזים.',''],
 ['רישוי, נגישות ובטיחות','דינים והוראות ענפיים','חוק / תקנה','לבדוק לפי מתקנים, מזון, הסעות, בריאות, חינוך ורווחה.',''],
 ['אוכלוסיות רגישות','דיווח, מגבלות העסקה, טיפול ופיקוח','חוק / תקנה','למפות לפי האוכלוסייה וסוג המסגרת; אין להסיק חובות אחידות לכל עמותה.',''],
 ['נהלי העמותה','סמכויות, כספים, תרומות, רכש, שכר, מתנדבים, פרטיות וחירום','נוהל / החלטה פנימית','לבדוק קיום ויישום; לסווג מקור כל נוהל, בלי להניח שכל שם נוהל מחויב בחוק.',''],
 ['תכנון ביקורת','Global Internal Audit Standards — 9.4','מסגרת מקצועית','הערכת סיכונים מתועדת לתוכנית ביקורת. תחולה מקצועית אינה חובה משפטית כללית.','https://www.theiia.org/en/standards/2024-standards/global-internal-audit-standards/'],
 ['ניהול סיכונים ובקרה','ISO 31000:2018, IEC 31010:2019, COSO ERM / Internal Control','מסגרת מקצועית','מסגרות מתאימות לבחינה ולאימוץ; אינן חקיקה. לבדוק אם אומצו או נדרשו בהתקשרות.','']
].map(([topic,source,kind,check,url])=>({topic,source,kind,check,url,status:'טרם נבדק',owner:'',evidence:''}));

function ngoIsSelected(){return $('type').value==='ngo'}
function ngoTemplates(){
 const base=ngoTopics.map(([name,desc,questions])=>({name,desc,questions,l:3,i:4,c:0,hours:120,critical:false,details:{sourceKind:'טרם סווג',assessment:ngoEvidence[0]}}));
 const optional=[['ngo-care','בטיחות וזכויות אוכלוסיות רגישות','פגיעה חמורה באדם, התעללות או הזנחה','הסכמה, מוגנות, תלונות, דיווח ופיקוח'],['ngo-transport','הסעות מקבלי שירות','אירוע בטיחות חמור בהסעה','רישוי, כשירות ספק, ליווי, עלייה וירידה ונגישות'],['ngo-food','מזון ותזונה','פגיעה בבריאות עקב מזון לא בטוח','רישוי, שרשרת קירור, אלרגנים וספקים'],['ngo-home','ביקורי בית','פגיעה במקבל שירות או עובד במהלך ביקור בית','זיהוי סיכונים בבית, בדידות, דיווח, פיקוח ותיעוד']];
 optional.forEach(([id,name,desc,questions])=>{if($(id).checked)base.push({name,desc,questions,l:3,i:5,c:0,hours:140,critical:true,details:{assessment:ngoEvidence[0],sourceKind:'טרם סווג'}})});
 return base;
}
const ngoContext=document.createElement('div');ngoContext.id='ngo-context';ngoContext.className='note';ngoContext.hidden=true;
ngoContext.innerHTML='<h3>התאמת סקר לעמותה</h3><p>20 תחומי פתיחה מוצעים. הדירוג והשעות הם הערכות לתיקוף, לא ממצאי סקר. אפשר להסיר תחום שאינו רלוונטי ולתעד את הנימוק בדוח.</p><div class="ngo-activities"><label><input type="checkbox" id="ngo-care"> שירות לאוכלוסיות רגישות</label><label><input type="checkbox" id="ngo-transport"> הסעות</label><label><input type="checkbox" id="ngo-food"> מזון</label><label><input type="checkbox" id="ngo-home"> ביקורי בית</label></div><button type="button" id="ngo-load">הוספת תחומי עמותה חסרים לסקר</button><p>בחירת מאפייני פעילות אינה מזהה אוטומטית את כל הדינים החלים. השאלון אינו מחליף מיפוי דרישות פרטני.</p>';
$('form').insertAdjacentElement('afterbegin',ngoContext);
$('type').addEventListener('change',()=>{ngoContext.hidden=!ngoIsSelected()});
$('form').addEventListener('submit',()=>{if(ngoIsSelected()&&!risks.length&&$('form').checkValidity())risks=ngoTemplates()},true);
$('ngo-load').onclick=()=>{if(!ngoIsSelected())return;ngoTemplates().forEach(r=>{if(!risks.some(old=>old.name===r.name))risks.push(r)});$('form').requestSubmit()};

function ngoField(r,n,key,label){const value=r.details?.[key]||'';return `<label>${label}<input data-risk="${n}" data-detail="${key}" ${key==='deadline'?'type="date"':'type="text" maxlength="2000"'} value="${escape(value)}"></label>`}
function renderNgoRegister(){
 let panel=$('ngo-register');
 if(!panel){panel=document.createElement('section');panel.id='ngo-register';panel.className='panel';$('survey').insertAdjacentElement('afterend',panel);}
 const opened=[...panel.querySelectorAll('details')].map((d,i)=>d.open?i:-1);
 panel.hidden=profile?.type!=='ngo';if(panel.hidden)return;
 const complete=risks.filter(r=>r.details?.owner&&r.details?.source&&r.details?.evidence).length;
 panel.innerHTML=`<h2>מרשם סיכונים לעמותה</h2><p>לכל סיכון אפשר לתעד תרחיש, בקרות, מקור דרישה ואחריות. ${complete} מתוך ${risks.length} סיכונים כוללים אחראי, מקור וראיות. השלמת שדות אינה אישור לנכונותם.</p><div class="note">סולם סבירות מוצע: 1 נדיר, 2 לא סביר, 3 אפשרי, 4 סביר, 5 כמעט ודאי. השפעה: 1 זניחה עד 5 חמורה מאוד. יש לכייל משמעות כספית ותפעולית לארגון. סיכון שיורי נשאר אומדן עד בדיקת בקרות; דירוג הבקרות בטבלה הוא הזנה נפרדת מהראיות כאן.</div>`+risks.map((r,n)=>`<details class="ngo-risk"><summary>${escape(r.name)} <span>שיורי ${score(r)}${r.critical?' · קדימות מיוחדת':''}</span></summary><div class="ngo-risk-body"><p><strong>שאלות לבדיקה:</strong> ${escape(r.questions||'להשלים שאלות לפי התהליך והחשיפה')}</p><label>תרחיש הסיכון — מה עלול לקרות ומדוע<textarea data-risk="${n}" data-detail="desc" maxlength="3000">${escape(r.desc)}</textarea></label><div class="fields">${ngoFields.map(([key,label])=>ngoField(r,n,key,label)).join('')}<label>סיווג מקור הדרישה<select data-risk="${n}" data-detail="sourceKind">${ngoSourceKinds.map(v=>`<option ${r.details?.sourceKind===v?'selected':''}>${v}</option>`).join('')}</select></label><label>מצב בדיקת הבקרות<select data-risk="${n}" data-detail="assessment">${ngoEvidence.map(v=>`<option ${r.details?.assessment===v?'selected':''}>${v}</option>`).join('')}</select></label></div><label class="ngo-critical"><input type="checkbox" data-risk="${n}" data-detail="critical" ${r.critical?'checked':''}> קדימות מיוחדת עקב פגיעה חמורה באדם או הפרה משפטית מהותית</label><p class="report-disclosure">קדימות מיוחדת משבצת תחום לפני הדירוג המספרי, בכפוף לקיבולת. היא אינה משנה את הציון או מבטיחה שיבוץ; פער כיסוי מוצג בדוח. נדרש נימוק:</p>${ngoField(r,n,'priorityReason','נימוק לקדימות מיוחדת')}</div></details>`).join('');
 [...panel.querySelectorAll('details')].forEach((d,i)=>d.open=opened.includes(i));
}
document.addEventListener('change',e=>{
 const n=e.target.dataset.risk,key=e.target.dataset.detail;if(n===undefined||!key)return;
 const r=risks[Number(n)];if(!r)return;r.details??={};
 if(key==='critical')r.critical=e.target.checked;else if(key==='desc')r.desc=e.target.value;else r.details[key]=e.target.value;
 generate();
});

function renderNgoRequirements(){
 let panel=$('ngo-requirements');if(!panel){panel=document.createElement('section');panel.id='ngo-requirements';panel.className='panel';$('ngo-register').insertAdjacentElement('afterend',panel);}
 const opened=[...panel.querySelectorAll('details')].map((d,i)=>d.open?i:-1);
 panel.hidden=profile?.type!=='ngo';if(panel.hidden)return;
 panel.innerHTML='<h2>מפת דרישות לעמותה — לתיקוף</h2><p>אין להסיק חובה כללית לכל עמותה לסקר ארגוני שנתי בפורמט זה. חובות נקודתיות נבדקות לפי דין, פעילות, רגולטור ומימון. ועדת הביקורת והמבקר בוחנים את התהליך; ההנהלה אחראית לניהול הסיכונים.</p><div class="note">עמותה וחל״צ הן צורות משפטיות שונות. מסלול זה מיועד לעמותה; אין להחיל עליה באופן אוטומטי דרישות של חל״צ ולהפך. ההפניות הן נקודת פתיחה ויש לבדוק נוסח ותחולה עדכניים.</div>'+ngoRequirements.map((r,n)=>`<details class="ngo-risk"><summary>${escape(r.topic)} <span>${escape(r.status)}</span></summary><div class="ngo-risk-body"><p><strong>${escape(r.source)}</strong> · ${escape(r.kind)}</p><p>${escape(r.check)}</p>${r.url?`<a href="${r.url}" target="_blank" rel="noopener">עיון במקור ↗</a>`:''}<div class="fields"><label>מצב תחולה<select data-requirement="${n}" data-requirement-key="status">${['טרם נבדק','חל — לאחר בדיקה','לא חל — נימוק תועד','דרושה חוות דעת'].map(v=>`<option ${r.status===v?'selected':''}>${v}</option>`).join('')}</select></label><label>אחראי לבדיקה<input data-requirement="${n}" data-requirement-key="owner" value="${escape(r.owner)}" maxlength="200"></label><label>אסמכתה, סעיף ונימוק תחולה<input data-requirement="${n}" data-requirement-key="evidence" value="${escape(r.evidence)}" maxlength="2000"></label></div></div></details>`).join('');
 [...panel.querySelectorAll('details')].forEach((d,i)=>d.open=opened.includes(i));
}
document.addEventListener('change',e=>{const n=e.target.dataset.requirement,key=e.target.dataset.requirementKey;if(n===undefined||!key)return;ngoRequirements[+n][key]=e.target.value;generate()});

function renderNgoReport(){
 let block=$('ngo-report');if(!block){block=document.createElement('div');block.id='ngo-report';$('audit-details').insertAdjacentElement('afterend',block)}
 block.hidden=profile?.type!=='ngo';if(block.hidden)return;
 const critical=risks.filter(r=>r.critical);const omitted=critical.filter(r=>!alloc.some(y=>y.tasks.includes(r)));
 block.innerHTML=`<h3>נספח עמותה: מקורות, אחריות ותוכנית טיפול</h3><p>קדימות מיוחדת: ${critical.length} תחומים, מהם ${omitted.length} ללא כיסוי${omitted.length?' — '+omitted.map(r=>escape(r.name)).join('، '):''}. כל דירוג פתיחה ושעות דורשים תיקוף. לא נאספו ראיות על ידי הכלי.</p>`+risks.map(r=>`<article class="audit-card"><h4>${escape(r.name)}${r.critical?' — קדימות מיוחדת':''}</h4><p><strong>תרחיש:</strong> ${escape(r.desc)}</p>${ngoFields.map(([key,label])=>`<p><strong>${label}:</strong> ${escape(r.details?.[key]||'טרם תועד')}</p>`).join('')}<p><strong>סוג מקור:</strong> ${escape(r.details?.sourceKind||'טרם סווג')} · <strong>בדיקת בקרות:</strong> ${escape(r.details?.assessment||'לא נבדקו')}</p><p><strong>נימוק לקדימות:</strong> ${escape(r.critical?(r.details?.priorityReason||'טרם תועד — יש להשלים'):'לא סומנה קדימות מיוחדת')}</p></article>`).join('')+`<h3>מפת דרישות: מצב בדיקה</h3><div class="table-wrap"><table><thead><tr><th>דרישה ומקור</th><th>סיווג</th><th>מצב</th><th>אחראי / אסמכתה</th></tr></thead><tbody>${ngoRequirements.map(r=>`<tr><td>${escape(r.topic)}<br>${escape(r.source)}</td><td>${escape(r.kind)}</td><td>${escape(r.status)}</td><td>${escape(r.owner||'טרם הוגדר')}<br>${escape(r.evidence||'טרם תועדה')}</td></tr>`).join('')}</tbody></table></div><p class="report-disclosure">מקורות מקצועיים: הנחיות רשם העמותות, הרשות להגנת הפרטיות ותקני IIA. מסגרת ISO / IEC / COSO אינה חובה משפטית כשלעצמה. מפת הדרישות אינה ממצה ואינה חוות דעת משפטית.</p>`;
}
const ngoGenerateBase=generate;
generate=function(){ngoGenerateBase();renderNgoRegister();renderNgoRequirements();renderNgoReport();if(profile.type==='ngo')$('plan-caption').textContent=`${profile.org} · קדימות מיוחדת תחילה, לאחריה סיכון שיורי יורד ושיבוץ בשנה המוקדמת שבה יש קיבולת. ${profile.reserve}% רזרבה. כל תחום משובץ פעם אחת.`;if(profile.type==='ngo')$('legal').textContent='עמותה: לבדוק את חוק העמותות והתקנון, סמכויות ועדת הביקורת לפי סעיף 30 והוראות המבקר הפנימי לפי סעיף 30א. תחולת חובה נקבעת לפי מאפייני הגוף והדין העדכני. סקר זה אינו חובה שנתית כללית שנקבעה בפורמט אחיד.'};
const ngoCsvBase=$('csv').onclick;
$('csv').onclick=()=>{
 if(profile.type!=='ngo'){ngoCsvBase();return}
 const rows=[['טיוטת מרשם סיכונים לעמותה',profile.org],['הערה','הערכות לתיקוף; הכלי לא אסף ראיות ולא קבע תחולה משפטית'],['תחום','תרחיש','סבירות','השפעה','בקרות','שיורי','קדימות מיוחדת','נימוק',...ngoFields.map(f=>f[1]),'סוג מקור','מצב בדיקת בקרות','שעות','שנה']];
 risks.forEach(r=>rows.push([r.name,r.desc,r.l,r.i,controlNames[r.c],score(r),r.critical?'כן':'לא',r.details?.priorityReason||'',...ngoFields.map(([k])=>r.details?.[k]||''),r.details?.sourceKind||'טרם סווג',r.details?.assessment||'לא נבדקו',r.hours,alloc.find(y=>y.tasks.includes(r))?.year||'לא שובץ']));
 rows.push([],['מפת דרישות'],['תחום','מקור','סיווג','בדיקה נדרשת','מצב תחולה','אחראי','אסמכתה','קישור']);ngoRequirements.forEach(r=>rows.push([r.topic,r.source,r.kind,r.check,r.status,r.owner,r.evidence,r.url]));
 const safe=v=>{const s=String(v??'');return '"'+(/^[=+@\-\t\r]/.test(s)?"'"+s:s).replaceAll('"','""')+'"'};
 const url=URL.createObjectURL(new Blob(['\ufeff'+rows.map(row=>row.map(safe).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='ngo-risk-register.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
