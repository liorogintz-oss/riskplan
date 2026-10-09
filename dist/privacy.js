// Privacy applicability review shared by all organization types.
const privacyGuide='https://www.gov.il/BlobFolder/reports/guide_tikon13_professional/he/tikun%2013%20_170825.pdf';
const privacyQuestions=[
 ['personal','האם הארגון מנהל או מעבד מידע אישי?'],
 ['publicLaw','האם הגוף הוא גוף ציבורי לפי ההגדרה בחוק הגנת הפרטיות?'],
 ['monitoring','האם העיסוק העיקרי כולל ניטור שוטף ושיטתי של אנשים בהיקף ניכר?'],
 ['sensitive','האם העיסוק העיקרי כולל עיבוד מידע בעל רגישות מיוחדת בהיקף ניכר?'],
 ['supply','האם נאסף מידע לשם מסירתו לאחרים כדרך עיסוק או בתמורה?']
];
const privacyAnswers=Object.fromEntries(privacyQuestions.map(([k])=>[k,'לא ידוע']));
const privacyChecks=[
 ['מיפוי מידע ותפקידים','לתעד מאגרים, מטרות, מקורות, סוגי מידע, בעלי שליטה, מחזיקים וספקים. לבדוק בסיס לעיבוד, יידוע, זכויות נושאי מידע וצמצום מידע.','https://www.gov.il/he/pages/tikun13_qa'],
 ['רישום או הודעה לרשות','לבדוק בנפרד את חובת הרישום וחובת ההודעה לפי סוג המאגר, מטרתו, היקפו והוראות המעבר. פטור מרישום אינו פטור מחובות אחרות.','https://www.gov.il/he/service/notice-obligation'],
 ['ממונה הגנת פרטיות — DPO','לבדוק את קטגוריות החובה, לרבות גוף ציבורי, ניטור שיטתי ועיבוד מידע רגיש בהיקף ניכר, וכן חריגים והסדרים מיוחדים. אין חובה גורפת לכל עסק.','https://www.gov.il/he/pages/amendment-13-26-07-26'],
 ['אבטחת מידע וספקים','לקבוע רמת אבטחה לכל מאגר ולבדוק הרשאות, נהלים, גיבויים, אירועים וספקים. במאגר ברמת אבטחה גבוהה נדרשים סקר ייעודי ומבדקי חדירות לפחות אחת ל־18 חודשים; סקר ארגוני אינו מחליף אותם.','https://www.gov.il/BlobFolder/reports/risk2024/he/Hadirot_Tikon13.pdf'],
 ['יישום תיקון 13 ומעקב','לתעד פערים, אחראים ומועדים, ולהכין ראיות ליישום ולטיפול בפניות. לבדוק הוראות הדין העדכניות ודרישות נוספות לפי הפעילות. ',privacyGuide]
].map(([topic,check,url])=>({topic,check,url,status:'טרם נבדק',owner:'',evidence:''}));
function privacyRecommendation(){
 const flags=[];
 if(privacyAnswers.personal==='לא')flags.push('הוזן שאין עיבוד מידע אישי. יש לאמת זאת גם ביחס לעובדים, לקוחות, תורמים, מתנדבים, ספקים, מצלמות ודיוור לפני קביעה שהדרישות אינן רלוונטיות.');
 else flags.push(privacyAnswers.personal==='כן'?'הוזן שקיים עיבוד מידע אישי: נדרשת בדיקת דרישות הפרטיות לפי המאגרים והפעילות.':'תחילה יש למפות אם קיים מידע אישי; מצב לא ידוע אינו פטור מבדיקה.');
 if(['publicLaw','monitoring','sensitive','supply'].some(k=>privacyAnswers[k]==='כן'))flags.push('סומנו מאפיינים המחייבים בחינה ממוקדת של חובת DPO ו/או רישום. זו הפניה לבדיקה ולא קביעת תחולה.');
 else flags.push('לא סומנו מאפייני סינון חיוביים; אין בכך קביעה שאין חובת DPO, רישום או הודעה. יש להשלים מספרי נושאי מידע, סוגי עיבוד, חריגים ותחולה משפטית.');
 return flags.join(' ');
}
const privacyPanel=document.createElement('section');privacyPanel.id='privacy-check';privacyPanel.className='panel';
privacyPanel.innerHTML=`<h2>פרטיות ותיקון 13 — לכל סוגי הארגונים</h2><p>עסק, חברה, עמותה או גוף ציבורי: בדיקת הדרישות תלויה במידע ובפעילות. הבחירה בסוג גוף אינה קביעה שהוא גוף ציבורי לפי חוק הגנת הפרטיות.</p><div class="fields">${privacyQuestions.map(([key,label])=>`<label>${label}<select data-privacy-answer="${key}"><option>לא ידוע</option><option>כן</option><option>לא</option></select></label>`).join('')}</div><p class="note" id="privacy-recommendation" role="status" aria-live="polite"></p><p><a href="${privacyGuide}" target="_blank" rel="noopener">מדריך רשמי לתיקון 13 ↗</a> · המדריך מסביר את התיקון ואינו נוסח החוק.</p><div id="privacy-rows"></div><button type="button" id="privacy-csv">ייצוא מפת פרטיות ל־CSV</button><p class="report-disclosure">שאלות הסינון אינן ממצות ואינן מחשבון תחולה משפטית. הנתונים נשמרים בזיכרון הדפדפן בלבד; יש לייצא לפני רענון או סגירה.</p>`;
$('method').insertAdjacentElement('beforebegin',privacyPanel);
function renderPrivacyRows(){
 const open=[...$('privacy-rows').querySelectorAll('details')].map((d,i)=>d.open?i:-1);
 $('privacy-rows').innerHTML=privacyChecks.map((r,i)=>`<details class="ngo-risk"><summary>${escape(r.topic)} <span>${escape(r.status)}</span></summary><div class="ngo-risk-body"><p>${escape(r.check)}</p><a href="${r.url}" target="_blank" rel="noopener">מקור רשמי לעיון ↗</a><div class="fields"><label>מצב בדיקה<select data-privacy-row="${i}" data-privacy-key="status">${['טרם נבדק','חל — לאחר בדיקה','לא חל — נימוק תועד','דרושה חוות דעת'].map(s=>`<option ${r.status===s?'selected':''}>${s}</option>`).join('')}</select></label><label>אחראי<input maxlength="200" data-privacy-row="${i}" data-privacy-key="owner" value="${escape(r.owner)}"></label><label>אסמכתה ונימוק<input maxlength="2000" data-privacy-row="${i}" data-privacy-key="evidence" value="${escape(r.evidence)}"></label></div></div></details>`).join('');
 [...$('privacy-rows').querySelectorAll('details')].forEach((d,i)=>d.open=open.includes(i));
 $('privacy-recommendation').textContent=privacyRecommendation();
}
function renderPrivacyReport(){
 let report=$('privacy-report');if(!report){report=document.createElement('div');report.id='privacy-report';$('audit-details').insertAdjacentElement('afterend',report);}
 report.innerHTML=`<h3>נספח פרטיות ותיקון 13</h3><p class="report-disclosure">חל לבחינה בכל סוגי הארגונים. הסינון אינו קובע תחולה משפטית והכלי לא בדק עמידה בדרישות.</p><p>${escape(privacyRecommendation())}</p><ul>${privacyQuestions.map(([key,label])=>`<li>${escape(label)} <strong>${escape(privacyAnswers[key])}</strong></li>`).join('')}</ul><div class="table-wrap"><table><thead><tr><th>נושא</th><th>בדיקה נדרשת</th><th>מצב</th><th>אחראי ואסמכתה</th></tr></thead><tbody>${privacyChecks.map(r=>`<tr><td>${escape(r.topic)}</td><td>${escape(r.check)}</td><td>${escape(r.status)}</td><td>${escape(r.owner||'טרם הוגדר')}<br>${escape(r.evidence||'טרם תועדה')}</td></tr>`).join('')}</tbody></table></div><p><a href="${privacyGuide}" target="_blank" rel="noopener">מדריך הרשות להגנת הפרטיות לתיקון 13</a></p>`;
}
privacyPanel.addEventListener('change',e=>{
 const key=e.target.dataset.privacyAnswer;
 if(key)privacyAnswers[key]=e.target.value;
 const n=e.target.dataset.privacyRow,field=e.target.dataset.privacyKey;
 if(n!==undefined&&field)privacyChecks[+n][field]=e.target.value;
 renderPrivacyRows();if(profile)renderPrivacyReport();
});
const privacyGenerateBase=generate;generate=function(){privacyGenerateBase();renderPrivacyReport()};
$('privacy-csv').onclick=()=>{
 const rows=[['מפת פרטיות ותיקון 13',profile?.org||$('org').value||'ארגון'],['הערה','סינון לבחינה מקצועית; אינו קביעת תחולה או עמידה בדין'],...privacyQuestions.map(([key,label])=>[label,privacyAnswers[key]]),[],['נושא','בדיקה נדרשת','מצב','אחראי','אסמכתה','מקור'],...privacyChecks.map(r=>[r.topic,r.check,r.status,r.owner,r.evidence,r.url])];
 const safe=v=>{const s=String(v??'');return '"'+(/^[=+@\-\t\r]/.test(s)?"'"+s:s).replaceAll('"','""')+'"'};
 const url=URL.createObjectURL(new Blob(['\ufeff'+rows.map(row=>row.map(safe).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='privacy-amendment13.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
renderPrivacyRows();
